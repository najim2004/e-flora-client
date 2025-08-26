import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const weekdayShorts = ["S", "M", "T", "W", "T", "F", "S"];

function getMonthNameAndYear(date: Date) {
  return (
    date.toLocaleString("default", { month: "long" }) + " " + date.getFullYear()
  );
}

function getDaysInMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

export default function MiniCalendar() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const today = now.getDate();
  const daysInMonth = getDaysInMonth(now);

  // First day of the month (0 = Sunday)
  const firstDay = new Date(year, month, 1).getDay();

  // Prepare calendar slots: blank slots till first day, then dates
  const blanks = Array.from({ length: firstDay });
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <Card className="bg-white border-green-200 shadow-md">
      <CardHeader>
        <CardTitle className="text-green-800">
          {getMonthNameAndYear(now)}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1 text-center text-xs">
          {weekdayShorts.map((day) => (
            <div key={day} className="p-2 font-medium text-gray-500">
              {day}
            </div>
          ))}
          {/* Blank slots before first of month */}
          {blanks.map((_, i) => (
            <div key={"blank-" + i} className="p-2" />
          ))}
          {days.map((date) => (
            <div
              key={date}
              className={`p-2 rounded-full relative transition-colors duration-150
                ${
                  date === today
                    ? "bg-green-600 text-white font-bold shadow-green-400/40 shadow-sm"
                    : "text-gray-700 hover:bg-gray-100"
                }
              `}
            >
              {date}
              {/* Just a dot for today if not using strong bg: */}
              {date === today && (
                <span className="absolute left-1/2 -bottom-1.5 -translate-x-1/2 block h-1.5 w-1.5 rounded-full bg-white/80 shadow-md" />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
