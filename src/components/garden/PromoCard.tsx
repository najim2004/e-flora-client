import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift } from "lucide-react";

export default function PromoCard() {
  return (
    <Card className="bg-gradient-to-r from-green-500 to-green-600 border-0 text-white shadow-lg">
      <CardContent className="md:p-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col md:flex-row items-center text-center md:text-start gap-4">
            <div className="h-12 min-w-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Gift className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1">
                🌱 Premium Organic Fertilizer
              </h3>
              <p className="text-green-100">
                Boost your crop growth with 20% off premium fertilizers!
              </p>
            </div>
          </div>
          <Button variant="secondary" className="bg-white text-green-600 hover:bg-green-50">
            Shop Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
