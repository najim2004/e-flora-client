import { Lightbulb } from "lucide-react";

const mockTip = {
  title: "Water Early, Not Late!",
  content:
    "Watering your garden early in the morning minimizes evaporation and gives plants plenty of time to absorb moisture before the sun gets too hot.",
};

export default function FeaturedTipsSection() {
  return (
    <section className="mb-6">
      <div className="flex items-center gap-2 mb-2">
        <Lightbulb className="text-yellow-400" size={20} />
        <h3 className="text-lg font-semibold text-green-800">Featured Gardening Tip</h3>
      </div>
      <div className="border rounded bg-yellow-50/40 border-yellow-100 p-4 flex items-center gap-3">
        <span className="text-yellow-900 font-bold text-base">{mockTip.title}</span>
        <span className="text-gray-700 text-sm ml-2">{mockTip.content}</span>
      </div>
    </section>
  );
}
