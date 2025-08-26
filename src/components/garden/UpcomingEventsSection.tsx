import { CalendarDays } from "lucide-react";

const mockEvents = [
  { id: 1, date: "2024-05-20", title: "Community Gardening Day", description: "Join other local gardeners, share and learn!" },
  { id: 2, date: "2024-06-01", title: "Soil Health Workshop", description: "Free event at city park: Interactive demo on testing and improving your soil." },
];

function formatDate(date: string) {
  const d = new Date(date);
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export default function UpcomingEventsSection() {
  return (
    <section className="mb-6">
      <h3 className="text-lg font-semibold text-green-800 mb-3 flex gap-2 items-center"><CalendarDays size={20} className="text-green-600" /> Upcoming Events</h3>
      <div className="flex flex-col gap-3">
        {mockEvents.map(ev => (
          <div key={ev.id} className="p-3 bg-green-50 rounded border border-green-100 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
            <span className="font-semibold text-green-700 min-w-[70px] flex-shrink-0">{formatDate(ev.date)}</span>
            <span className="flex-1 text-gray-700 font-medium">{ev.title}</span>
            <span className="block text-xs text-gray-500">{ev.description}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
