"use client";
import { useState } from "react";
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

import { MapPin } from "lucide-react";
import { errorToast } from "../customToast";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

// Zod schema
const plantTypeEnum = z.enum([
  "vegetable",
  "fruit",
  "flower",
  "herb",
  "tree",
  "ornamental",
]);

const schema = z.object({
  forMyGarden: z.boolean(),
  plantType: z.array(plantTypeEnum).min(1, "Select at least one plant type"),
  location: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  soilType: z.string().optional(),
  area: z.number().optional(),
  waterSource: z.string().optional(),
  purpose: z.string().optional(),
  sunlight: z.string().optional(),
  currentCrops: z.string().optional(),
  gardenImage: z.custom<File>((file) => file instanceof File).optional(),
});

type FormData = z.infer<typeof schema>;

type SelectFieldProps = {
  name: keyof FormData;
  label: string;
  options: { value: string; label: string }[];
  control: Control<FormData>;
  placeholder?: string;
};

function SelectField({
  name,
  label,
  options,
  control,
  placeholder,
}: SelectFieldProps) {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Select
              onValueChange={field.onChange}
              value={typeof field.value === "string" ? field.value : ""}
              defaultValue={typeof field.value === "string" ? field.value : ""}
            >
              <SelectTrigger className="!h-10 w-full">
                <SelectValue placeholder={placeholder || `Select ${label}`} />
              </SelectTrigger>
              <SelectContent>
                {options.map(({ value, label }) => (
                  <SelectItem key={value} value={value}>
                    {label}
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
}

export default function FarmDetailsForm({
  onSubmit,
  isLoading = false,
}: {
  onSubmit: (values: FormData) => void;
  isLoading?: boolean;
}) {
  // Important: set defaultValues with plantType at least one empty array or minimum one
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      forMyGarden: false,
      plantType: [],
    },
  });

  const [locLoading, setLocLoading] = useState(false);

  const getLocation = () => {
    if (!navigator.geolocation) return errorToast("Geolocation not supported");
    setLocLoading(true);
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const lat = pos.coords.latitude,
        lon = pos.coords.longitude;
      form.setValue("latitude", lat);
      form.setValue("longitude", lon);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
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

  const forMyGarden = form.watch("forMyGarden");
  const plantTypes = plantTypeEnum.options;

  const soilOptions = [
    { value: "loamy", label: "Loamy" },
    { value: "sandy", label: "Sandy" },
    { value: "clayey", label: "Clayey" },
    { value: "silty", label: "Silty" },
    { value: "peaty", label: "Peaty" },
    { value: "chalky", label: "Chalky" },
    { value: "unknown", label: "Unknown" },
  ];

  const waterSourceOptions = [
    { value: "tube-well", label: "Tube-well" },
    { value: "tap", label: "Tap" },
    { value: "rainwater", label: "Rainwater" },
    { value: "storage", label: "Storage" },
    { value: "manual", label: "Manual" },
    { value: "uncertain", label: "Uncertain" },
  ];

  const purposeOptions = [
    { value: "eat", label: "Eat" },
    { value: "sell", label: "Sell" },
    { value: "decor", label: "Decor" },
    { value: "educational", label: "Educational" },
    { value: "mixed", label: "Mixed" },
  ];

  const sunlightOptions = [
    { value: "full", label: "Full" },
    { value: "partial", label: "Partial" },
    { value: "shade", label: "Shade" },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Switch */}
        <div className="flex items-center justify-between border p-3 rounded-lg">
          <FormLabel className="text-base">For my garden</FormLabel>
          <Switch
            checked={forMyGarden}
            onCheckedChange={(v) => form.setValue("forMyGarden", v)}
          />
        </div>

        {/* Plant Type Checkboxes */}
        <FormField
          name="plantType"
          control={form.control}
          render={() => (
            <div>
              <FormLabel className="text-base">Plant Type</FormLabel>
              <div className="flex flex-wrap gap-4 mt-2">
                {plantTypes.map((type) => (
                  <div key={type} className="flex items-center gap-2">
                    <Checkbox
                      checked={(form.watch("plantType") ?? []).includes(type)}
                      onCheckedChange={(v) => {
                        const prev = form.getValues("plantType") ?? [];
                        if (v) {
                          if (!prev.includes(type)) {
                            form.setValue("plantType", [...prev, type]);
                          }
                        } else {
                          form.setValue(
                            "plantType",
                            prev.filter((t) => t !== type)
                          );
                        }
                      }}
                    />
                    <span className="capitalize">{type}</span>
                  </div>
                ))}
              </div>
              <FormMessage />
            </div>
          )}
        />

        {/* Manual fields show only if NOT forMyGarden */}
        {!forMyGarden && (
          <>
            {/* Location and get location button */}
            <div className="flex gap-2">
              <FormField
                name="location"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="City, State, Country" {...field} />
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
                <MapPin size={18} />
              </Button>
            </div>

            <SelectField
              name="soilType"
              label="Soil Type"
              options={soilOptions}
              control={form.control}
              placeholder="Select soil type"
            />

            <FormField
              name="area"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Garden Area (Acres)</FormLabel>
                  <FormControl>
                    <Input type="number" min={0} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SelectField
              name="waterSource"
              label="Water Source"
              options={waterSourceOptions}
              control={form.control}
              placeholder="Select water source"
            />

            <SelectField
              name="purpose"
              label="Purpose"
              options={purposeOptions}
              control={form.control}
              placeholder="Select purpose"
            />

            <SelectField
              name="sunlight"
              label="Sunlight"
              options={sunlightOptions}
              control={form.control}
              placeholder="Select sunlight exposure"
            />

            <FormField
              name="currentCrops"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Crops</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="tomato, spinach, cabbage"
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="gardenImage"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Garden Image (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      onChange={(e) => {
                        field.onChange(e.target.files?.[0] ?? undefined);
                      }}
                      accept="image/*"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        {/* Submit */}
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
