'use client'

import { Card, CardContent } from "@/components/ui/card";

interface CultivationTipsProps {
  cultivationTips: {
    title: string;
    tips: string[];
  }[];
}

export default function CultivationTips({ cultivationTips }: CultivationTipsProps) {
  return (
    <div className="mt-6">
      <h3 className="font-medium text-primary">Cultivation Tips</h3>
      {cultivationTips?.map((tip) => (
        <Card key={tip.title} className="border-border mt-4">
          <CardContent className="p-4">
            <h4 className="font-medium text-primary mb-2">{tip.title}</h4>
            <ul className="space-y-2 text-primary/80 text-sm">
              {tip.tips.map((t, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
