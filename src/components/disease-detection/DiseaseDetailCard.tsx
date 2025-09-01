import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { LucideIcon } from 'lucide-react';

interface DiseaseDetailCardProps {
  title: string;
  icon: LucideIcon;
  items: string[] | undefined;
}

export function DiseaseDetailCard({ title, icon: Icon, items }: DiseaseDetailCardProps) {
  if (!items || items.length === 0) {
    return null; // Items na thakle render korbe na
  }

  return (
    <Card className="border-border shadow-lg">
      <CardHeader className="pb-4 flex flex-row items-center gap-3">
        <Icon className="h-6 w-6 text-primary" />
        <CardTitle className="text-primary text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <ul className="space-y-2 text-foreground">
          {items.map((item, index) => (
            <li key={index} className="flex items-start text-base">
              <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
