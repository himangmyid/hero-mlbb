"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Hero {
  heroid: string;
  name: string;
  key: string;
}

const ListHero: React.FC = () => {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHeroes = async (): Promise<void> => {
      try {
        const response = await fetch("/api/hero", { cache: "no-store" });

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const result: { data: Hero[] } = await response.json();
        console.log("Heroes data:", result); // Debugging

        setHeroes(result.data);
      } catch (error) {
        console.error("Failed to fetch heroes:", error);
        setError("Failed to fetch heroes. Please try again later.");
      }
    };

    fetchHeroes();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Daftar Hero MLBB</h1>

      {error && <p className="text-red-500">{error}</p>}

      <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {heroes.map((hero) => (
          <li key={hero.heroid} className="border p-2 rounded-lg shadow hover:shadow-md">
            <Link href={`/detail-hero/${hero.heroid}`} className="block text-center">
              <div className="cursor-pointer">
                <Image
                  src={hero.key ? `https:${hero.key}` : "/fallback-image.jpg"} 
                  alt={hero.name} 
                  width={100} 
                  height={100} 
                  className="mx-auto mb-2 rounded-lg"
                  priority
                  unoptimized
                />
                <p className="font-semibold">{hero.name}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListHero;
