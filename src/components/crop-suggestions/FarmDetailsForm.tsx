"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin } from "lucide-react";
import { errorToast } from "../customToast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export const formSchema = z.object({
  location: z.string().min(1, {
    message: "Location is required.",
  }),
  soilType: z.string().min(1, {
    message: "Soil type is required.",
  }),
  farmSize: z.string().min(1, {
    message: "Farm size is required.",
  }),
  irrigation: z.string().min(1, {
    message: "Irrigation availability is required.",
  }),
});

interface FarmDetailsFormProps {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  isLoading?: boolean;
}

export default function FarmDetailsForm({
  onSubmit,
  isLoading = false,
}: FarmDetailsFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: "",
      soilType: "",
      farmSize: "",
      irrigation: "",
    },
  });

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          form.setValue("location", `${coords.latitude}, ${coords.longitude}`);
        },
        (error) => {
          console.log("Error getting location:", error);
          errorToast("Failed to detect your location");
        }
      );
    } else {
      errorToast("Geolocation is not supported by this browser.");
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location (Latitude, Longitude)</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="Enter latitude, longitude"
                      className="pr-10"
                      {...field}
                    />
                    <MapPin
                      onClick={handleUseCurrentLocation}
                      className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary cursor-pointer"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="soilType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Soil Type</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select soil type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="clay">Clay Soil</SelectItem>
                      <SelectItem value="sandy">Sandy Soil</SelectItem>
                      <SelectItem value="loamy">Loamy Soil</SelectItem>
                      <SelectItem value="silty">Silty Soil</SelectItem>
                      <SelectItem value="peaty">Peaty Soil</SelectItem>
                      <SelectItem value="chalky">Chalky Soil</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="farmSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Farm Size (Acres)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter farm size"
                    min={0}
                    className=""
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="irrigation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Irrigation Availability</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select availability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full">Full irrigation</SelectItem>
                      <SelectItem value="partial">
                        Partial irrigation
                      </SelectItem>
                      <SelectItem value="rainfed">Rainfed only</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className="w-full bg-primary hover:bg-primary/80"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Get Recommendations"}
          </Button>
        </form>
      </Form>
    </>
  );
}
