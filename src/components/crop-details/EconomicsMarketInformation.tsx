import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Crop } from "@/types/cropDetails";

interface EconomicsMarketInformationProps {
  crop: Crop;
}

const EconomicsMarketInformation: React.FC<EconomicsMarketInformationProps> = ({ crop }) => {
  return (
    <Card className="border-green-100 shadow-sm">
      <CardHeader>
        <CardTitle className="text-green-800">
          Economics & Market Information
        </CardTitle>
        <CardDescription className="text-green-700">
          Yield potential, production costs, and market insights
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="font-medium text-green-800 mb-3">
              Expected Yield
            </h3>
            <ul className="space-y-2 text-green-700">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Average yield: {crop.economics.yield.average}</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Potential yield: {crop.economics.yield.potential}</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>
                  Factors affecting yield: {crop.economics.yield.factorsAffectingYield}
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-green-800 mb-3">
              Production Costs
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-green-100">
                    <th className="border border-green-200 px-4 py-2 text-left text-green-800">
                      Item
                    </th>
                    <th className="border border-green-200 px-4 py-2 text-right text-green-800">
                      Cost (Taka/Acre)
                    </th>
                    <th className="border border-green-200 px-4 py-2 text-right text-green-800">
                      Percentage
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-green-200 px-4 py-2 text-green-700">
                      Land preparation
                    </td>
                    <td className="border border-green-200 px-4 py-2 text-right text-green-700">
                      {crop.economics.productionCosts.landPreparation.cost}
                    </td>
                    <td className="border border-green-200 px-4 py-2 text-right text-green-700">
                      {crop.economics.productionCosts.landPreparation.percentage}%
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-green-200 px-4 py-2 text-green-700">
                      Seeds
                    </td>
                    <td className="border border-green-200 px-4 py-2 text-right text-green-700">
                      {crop.economics.productionCosts.seeds.cost}
                    </td>
                    <td className="border border-green-200 px-4 py-2 text-right text-green-700">
                      {crop.economics.productionCosts.seeds.percentage}%
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-green-200 px-4 py-2 text-green-700">
                      Fertilizers
                    </td>
                    <td className="border border-green-200 px-4 py-2 text-right text-green-700">
                      {crop.economics.productionCosts.fertilizers.cost}
                    </td>
                    <td className="border border-green-200 px-4 py-2 text-right text-green-700">
                      {crop.economics.productionCosts.fertilizers.percentage}%
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-green-200 px-4 py-2 text-green-700">
                      Irrigation
                    </td>
                    <td className="border border-green-200 px-4 py-2 text-right text-green-700">
                      {crop.economics.productionCosts.irrigation.cost}
                    </td>
                    <td className="border border-green-200 px-4 py-2 text-right text-green-700">
                      {crop.economics.productionCosts.irrigation.percentage}%
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-green-200 px-4 py-2 text-green-700">
                      Plant protection (pesticides)
                    </td>
                    <td className="border border-green-200 px-4 py-2 text-right text-green-700">
                      {crop.economics.productionCosts.plantProtection.cost}
                    </td>
                    <td className="border border-green-200 px-4 py-2 text-right text-green-700">
                      {crop.economics.productionCosts.plantProtection.percentage}%
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-green-200 px-4 py-2 text-green-700">
                      Labor
                    </td>
                    <td className="border border-green-200 px-4 py-2 text-right text-green-700">
                      {crop.economics.productionCosts.labor.cost}
                    </td>
                    <td className="border border-green-200 px-4 py-2 text-right text-green-700">
                      {crop.economics.productionCosts.labor.percentage}%
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-green-200 px-4 py-2 text-green-700">
                      Harvesting and post-harvest
                    </td>
                    <td className="border border-green-200 px-4 py-2 text-right text-green-700">
                      {crop.economics.productionCosts.harvestingPostHarvest.cost}
                    </td>
                    <td className="border border-green-200 px-4 py-2 text-right text-green-700">
                      {crop.economics.productionCosts.harvestingPostHarvest.percentage}%
                    </td>
                  </tr>
                  <tr className="bg-green-50 font-medium">
                    <td className="border border-green-200 px-4 py-2 text-green-800">
                      Total
                    </td>
                    <td className="border border-green-200 px-4 py-2 text-right text-green-800">
                      {crop.economics.productionCosts.total}
                    </td>
                    <td className="border border-green-200 px-4 py-2 text-right text-green-800">
                      100%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-green-600 mt-2">
              Note: Costs are approximate and may vary based on location, input
              prices, and farming practices.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-green-800 mb-3">
              Market Information
            </h3>
            <ul className="space-y-2 text-green-700">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Current market price: {crop.economics.market.price}</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Market demand: {crop.economics.market.demand}</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Storage life: {crop.economics.market.storageLife}</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>
                  Price fluctuation: {crop.economics.market.priceFluctuation}
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-green-800 mb-3">
              Profitability Analysis
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-green-100">
                    <th className="border border-green-200 px-4 py-2 text-left text-green-800">
                      Item
                    </th>
                    <th className="border border-green-200 px-4 py-2 text-right text-green-800">
                      Amount (Taka/Acre)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-green-200 px-4 py-2 text-green-700">
                      Average yield (kg/acre)
                    </td>
                    <td className="border border-green-200 px-4 py-2 text-right text-green-700">
                      {crop.economics.profitabilityAnalysis.averageYield}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-green-200 px-4 py-2 text-green-700">
                      Average price (Taka/kg)
                    </td>
                    <td className="border border-green-200 px-4 py-2 text-right text-green-700">
                      {crop.economics.profitabilityAnalysis.averagePrice}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-green-200 px-4 py-2 text-green-700">
                      Gross revenue (Taka/acre)
                    </td>
                    <td className="border border-green-200 px-4 py-2 text-right text-green-700">
                      {crop.economics.profitabilityAnalysis.grossRevenue}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-green-200 px-4 py-2 text-green-700">
                      Total cost (Taka/acre)
                    </td>
                    <td className="border border-green-200 px-4 py-2 text-right text-green-700">
                      {crop.economics.profitabilityAnalysis.totalCost}
                    </td>
                  </tr>
                  <tr className="bg-green-50 font-medium">
                    <td className="border border-green-200 px-4 py-2 text-green-800">
                      Net profit (Taka/acre)
                    </td>
                    <td className="border border-green-200 px-4 py-2 text-right text-green-800">
                      {crop.economics.profitabilityAnalysis.netProfit}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-green-200 px-4 py-2 text-green-700">
                      Benefit-Cost Ratio (BCR)
                    </td>
                    <td className="border border-green-200 px-4 py-2 text-right text-green-700">
                      {crop.economics.profitabilityAnalysis.benefitCostRatio}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-green-600 mt-2">
              Note: Profitability may vary based on yield, market prices, and
              production costs.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EconomicsMarketInformation;
