"use client";
import { useState, useEffect } from "react";
import { useForm, Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Loader, MapPin } from "lucide-react";
import { errorToast } from "../customToast";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

// ---------------- Types ----------------
export type GardenType =
  | "rooftop"
  | "balcony"
  | "backyard"
  | "indoor"
  | "terrace"
  | "field";
export type GardenerType = "beginner" | "intermediate" | "expert";

// ---------------- Constants ----------------
const plantTypeEnum = z.enum([
  "vegetable",
  "fruit",
  "flower",
  "herb",
  "tree",
  "ornamental",
]);

const gardenTypeEnum = z.enum([
  "rooftop",
  "balcony",
  "backyard",
  "indoor",
  "terrace",
  "field",
]);
const gardenerTypeEnum = z.enum(["beginner", "intermediate", "expert"]);

const schema = z
  .object({
    forMyGarden: z.boolean(),
    avoidCurrentCrops: z.boolean().optional(),
    gardenType: gardenTypeEnum.optional(),
    gardenerType: gardenerTypeEnum.optional(),
    plantType: z.array(plantTypeEnum).min(1, "Select at least one plant type"),
    location: z.string().min(1, "Location is required").optional(),
    latitude: z.number().min(-90).max(90).optional(),
    longitude: z.number().min(-180).max(180).optional(),
    soilType: z.string().min(1, "Soil type is required").optional(),
    area: z.number().positive("Area must be positive").optional(),
    waterSource: z.string().min(1, "Water source is required").optional(),
    purpose: z.string().min(1, "Purpose is required").optional(),
    sunlight: z.string().min(1, "Sunlight is required").optional(),
    currentCrops: z.string().optional(),
    gardenImage: z.custom<File>((f) => f instanceof File).optional(),
  })
  // Required when not forMyGarden
  .refine((d) => d.forMyGarden || !!d.location, {
    path: ["location"],
    message: "Location is required",
  })
  .refine((d) => d.forMyGarden || d.latitude != null, {
    path: ["latitude"],
    message: "Latitude is required",
  })
  .refine((d) => d.forMyGarden || d.longitude != null, {
    path: ["longitude"],
    message: "Longitude is required",
  })
  .refine((d) => d.forMyGarden || !!d.soilType, {
    path: ["soilType"],
    message: "Soil type is required",
  })
  .refine((d) => d.forMyGarden || d.area != null, {
    path: ["area"],
    message: "Area is required",
  })
  .refine((d) => d.forMyGarden || !!d.waterSource, {
    path: ["waterSource"],
    message: "Water source is required",
  })
  .refine((d) => d.forMyGarden || !!d.purpose, {
    path: ["purpose"],
    message: "Purpose is required",
  })
  .refine((d) => d.forMyGarden || !!d.sunlight, {
    path: ["sunlight"],
    message: "Sunlight is required",
  })
  // Required when forMyGarden is false
  .refine((d) => d.forMyGarden || !!d.gardenType, {
    path: ["gardenType"],
    message: "Garden type is required",
  })
  .refine((d) => d.forMyGarden || !!d.gardenerType, {
    path: ["gardenerType"],
    message: "Gardener type is required",
  });

export type FormData = z.infer<typeof schema>;

const options = {
  soilType: ["loamy", "sandy", "clayey", "silty", "peaty", "chalky", "unknown"],
  waterSource: [
    "tube-well",
    "tap",
    "rainwater",
    "storage",
    "manual",
    "uncertain",
  ],
  purpose: ["eat", "sell", "decor", "educational", "mixed"],
  sunlight: ["full", "partial", "shade"],
  gardenType: ["rooftop", "balcony", "backyard", "indoor", "terrace", "field"],
  gardenerType: ["beginner", "intermediate", "expert"],
};

// ---------------- Reusable Fields ----------------
const SelectField = ({
  name,
  label,
  opts,
  control,
}: {
  name: keyof FormData;
  label: string;
  opts: string[];
  control: Control<FormData>;
}) => (
  <FormField
    name={name}
    control={control}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Select
            onValueChange={field.onChange}
            value={(field.value as string) || ""}
          >
            <SelectTrigger className="!h-10 w-full">
              <SelectValue placeholder={`Select ${label}`} />
            </SelectTrigger>
            <SelectContent>
              {opts.map((o) => (
                <SelectItem key={o} value={o}>
                  {o.charAt(0).toUpperCase() + o.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

const NumberField = ({
  name,
  label,
  control,
  min = 0,
}: {
  name: keyof FormData;
  label: string;
  control: Control<FormData>;
  min?: number;
}) => (
  <FormField
    name={name}
    control={control}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input
            type="number"
            min={min}
            value={typeof field.value === "number" ? field.value : ""}
            onChange={(e) => {
              const val = e.target.value;
              field.onChange(val === "" ? undefined : e.target.valueAsNumber);
            }}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

// ---------------- Main Component ----------------
export default function FarmDetailsForm({
  onSubmit,
  clear = false,
  isLoading = false,
}: {
  onSubmit: (v: FormData) => void;
  clear?: boolean;
  isLoading?: boolean;
}) {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      forMyGarden: false,
      avoidCurrentCrops: false,
      plantType: [],
    },
  });
  const [locLoading, setLocLoading] = useState(false);

  const forMyGarden = form.watch("forMyGarden");
  const plantTypes = plantTypeEnum.options;

  useEffect(() => {
    if (forMyGarden) {
      form.reset({
        forMyGarden: true,
        avoidCurrentCrops: false,
        plantType: form.getValues("plantType"),
      });
    }
  }, [forMyGarden, form]);

  const getLocation = () => {
    if (!navigator.geolocation) return errorToast("Geolocation not supported");
    setLocLoading(true);
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      form.setValue("latitude", latitude);
      form.setValue("longitude", longitude);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
        );
        const data = await res.json();
        const city =
          data.address.city || data.address.town || data.address.village || "";
        form.setValue(
          "location",
          `${city}, ${data.address.state || ""}, ${data.address.country || ""}`
        );
      } catch {
        errorToast("Failed to fetch location");
      } finally {
        setLocLoading(false);
      }
    });
  };

  const handleFormSubmit = (v: FormData) => {
    onSubmit(v);
    if (clear) {
      form.reset({
        forMyGarden: false,
        avoidCurrentCrops: false,
        plantType: [],
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="space-y-6"
      >
        {/* For My Garden Switch */}
        <div className="flex items-center justify-between border p-3 rounded-lg">
          <FormLabel className="text-base">For my garden</FormLabel>
          <Switch
            checked={forMyGarden}
            onCheckedChange={(v) => form.setValue("forMyGarden", v)}
          />
        </div>

        {/* Avoid current crops - only if forMyGarden is true */}
        {forMyGarden && (
          <div className="flex items-center justify-between border p-3 rounded-lg">
            <FormLabel className="text-base">Avoid current crops</FormLabel>
            <Switch
              checked={form.watch("avoidCurrentCrops")}
              onCheckedChange={(v) => form.setValue("avoidCurrentCrops", v)}
            />
          </div>
        )}

        {/* GardenType & GardenerType - only if forMyGarden is false */}
        {!forMyGarden && (
          <>
            <SelectField
              name="gardenType"
              label="Garden Type"
              opts={options.gardenType}
              control={form.control}
            />
            <SelectField
              name="gardenerType"
              label="Gardener Type"
              opts={options.gardenerType}
              control={form.control}
            />
          </>
        )}

        {/* Plant Type */}
        <FormField
          name="plantType"
          control={form.control}
          render={() => (
            <div>
              <FormLabel className="text-base">Plant Type</FormLabel>
              <div className="flex flex-wrap gap-4 mt-2">
                {plantTypes.map((t) => (
                  <label key={t} className="flex items-center gap-2 capitalize">
                    <Checkbox
                      checked={(form.watch("plantType") ?? []).includes(t)}
                      onCheckedChange={(v) => {
                        const prev = form.getValues("plantType") ?? [];
                        form.setValue(
                          "plantType",
                          v ? [...prev, t] : prev.filter((x) => x !== t)
                        );
                      }}
                    />{" "}
                    {t}
                  </label>
                ))}
              </div>
              <FormMessage />
            </div>
          )}
        />

        {/* Extra fields if not forMyGarden */}
        {!forMyGarden && (
          <>
            <div className="flex gap-2">
              <FormField
                name="location"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input
                        disabled={locLoading}
                        placeholder="City, State, Country"
                        {...field}
                        CardHeader
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="outline"
                onClick={getLocation}
                disabled={locLoading}
                className="mt-auto h-10 text-primary"
              >
                {locLoading ? (
                  <Loader size={18} className="animate-spin" />
                ) : (
                  <MapPin size={18} />
                )}
              </Button>
            </div>

            <SelectField
              name="soilType"
              label="Soil Type"
              opts={options.soilType}
              control={form.control}
            />
            <NumberField
              name="area"
              label="Garden Area (SQF)"
              control={form.control}
            />
            <SelectField
              name="waterSource"
              label="Water Source"
              opts={options.waterSource}
              control={form.control}
            />
            <SelectField
              name="purpose"
              label="Purpose"
              opts={options.purpose}
              control={form.control}
            />
            <SelectField
              name="sunlight"
              label="Sunlight"
              opts={options.sunlight}
              control={form.control}
            />

            <FormField
              name="currentCrops"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Crops</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="tomato, spinach, cabbage" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading || locLoading}
        >
          {isLoading ? "Loading..." : "Get Recommendations"}
        </Button>
      </form>
    </Form>
  );
}
