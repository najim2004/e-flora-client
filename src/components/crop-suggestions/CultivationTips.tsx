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
      <h3 className="font-medium text-green-800">Cultivation Tips</h3>
      {cultivationTips?.map((tip) => (
        <Card key={tip.title} className="border-green-100 mt-4">
          <CardContent className="p-4">
            <h4 className="font-medium text-green-800 mb-2">{tip.title}</h4>
            <ul className="space-y-2 text-green-700 text-sm">
              {tip.tips.map((t, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
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
