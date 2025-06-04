'use client'

import { Card, CardContent } from "@/components/ui/card";

export default function CultivationTips() {
  return (
    <div className="mt-6">
      <h3 className="font-medium text-green-800 mb-2">
        Cultivation Tips
      </h3>
      <Card className="border-green-100">
        <CardContent className="p-4">
          <h4 className="font-medium text-green-800 mb-2">
            Rice (Boro) Cultivation
          </h4>
          <ul className="space-y-2 text-green-700 text-sm">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">•</span>
              <span>Best planting time: December-January</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">•</span>
              <span>Seed rate: 20-25 kg/acre</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">•</span>
              <span>
                Fertilizer recommendation: N:P:K at 80:40:40 kg/acre
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">•</span>
              <span>
                Water management: Maintain 2-3 cm water level during
                vegetative stage
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
