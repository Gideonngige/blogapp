import { useEffect, useState } from "react";

const stats = [
  { label: "Lines of Code", value: 120000 },
  { label: "Projects Completed", value: 25 },
  { label: "Happy Clients", value: 18 },
];

export default function StatsSection() {
  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    const interval = setInterval(() => {
      setCounts((prev) =>
        prev.map((count, i) =>
          count < stats[i].value
            ? count + Math.ceil(stats[i].value / 100)
            : stats[i].value
        )
      );
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-blue-600 text-white">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {stats.map((stat, i) => (
          <div key={i}>
            <h2 className="text-4xl md:text-5xl font-bold">
              {counts[i].toLocaleString()}+
            </h2>
            <p className="mt-2 text-lg text-blue-100">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
