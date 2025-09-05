import { Card } from "@/components/ui/card";
import Image from "next/image";

const mockPromos = [
  {
    id: 1,
    title: "Spring Fest Discount!",
    description: "Get 20% off on all seeds and gardening tools this spring.",
    image: "/mock-promo-1.jpg",
    cta: "Shop Now",
    link: "#"
  },
  {
    id: 2,
    title: "Gardener Webinar",
    description: "Free webinar: Maximizing harvest in urban gardens.",
    image: "/mock-promo-2.jpg",
    cta: "Reserve a Spot",
    link: "#"
  }
];

export default function PromoOffersSection() {
  return (
    <section className="mb-6">
      <h3 className="text-lg font-semibold text-green-800 mb-3">Promotions & Offers</h3>
      <div className="flex flex-col sm:flex-row gap-4">
        {mockPromos.map((promo) => (
          <Card key={promo.id} className="flex-1 flex flex-col justify-between p-0 overflow-hidden border-green-200 shadow-md min-w-[210px]">
            <div className="relative h-28 bg-green-50 overflow-hidden">
              <Image src={promo.image} alt={promo.title} width={300} height={150} className="object-cover w-full h-full" />
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="text-green-800 font-bold text-base mb-1">{promo.title}</div>
                <div className="text-gray-600 text-sm mb-2">{promo.description}</div>
              </div>
              <a href={promo.link} className="inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded font-medium text-sm transition mt-2">
                {promo.cta}
              </a>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
