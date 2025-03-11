"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useRouter } from 'next/navigation';

interface Skill {
  name: string;
  icon: string;
  des: string;
  tips?: string;
}

interface Equipment {
  name: string;
  icon: string;
  des?: string[];
  equipment_id?: string | number;
}

interface CounterHero {
  name: string;
  icon: string;
  heroid?: string | number;
  best_mate_tips?: string;
  restrain_hero_tips?: string;
  by_restrain_tips?: string;
}

interface HeroData {
  cover_picture: string;
  gallery_picture?: string;
  name: string;
  type: string;
  mag?: string | number;
  phy?: string | number;
  alive?: string | number;
  diff?: string | number;
  skill?: {
    skill: Skill[];
    item?: {
      main?: { icon: string };
      secondary?: { icon: string };
      battle_first?: { icon: string };
      battle_second?: { icon: string };
      tips?: string;
    };
  };
  gear?: {
    out_pack: Array<{ 
      equipment_id: number | string;
      equip: Equipment 
    }>;
    out_pack_tips?: string;
  };
  counters?: {
    best?: CounterHero & { best_mate_tips?: string };
    counters?: CounterHero & { restrain_hero_tips?: string };
    countered?: CounterHero & { by_restrain_tips?: string };
  };
}

const ensureHttps = (url?: string): string => {
  if (!url) return "https://placehold.co/600x400.png";
  if (url.startsWith("https://")) return url;
  if (url.startsWith("//")) return `https:${url}`;
  if (url.startsWith("http://")) return url.replace("http://", "https://");
  return `https://${url}`;
};

const Loading = () => (
  <div className="flex justify-center items-center min-h-[300px]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    <p className="ml-3 text-lg font-semibold">Loading...</p>
  </div>
);

const ErrorMessage = () => (
  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-center my-8">
    <p className="text-lg font-medium">Data tidak tersedia</p>
    <p className="text-sm mt-1">Silahkan coba kembali nanti atau periksa ID hero</p>
  </div>
);

const StatsSection = ({ stats }: { stats: Record<string, number | string> }) => {
  // Map stat keys to better display names
  const statNames: Record<string, string> = {
    mag: "Magic",
    phy: "Physical",
    alive: "Durability",
    diff: "Difficulty"
  };

  return (
    <div className="mt-4 p-4 bg-white rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Statistik Hero</h2>
      <div className="space-y-4">
        {Object.entries(stats).map(([key, value]) => {
          const displayValue = Number(value) || 0;
          const percentage = (displayValue / 10) * 100;
          return (
            <div key={key} className="mb-2">
              <div className="flex justify-between mb-1">
                <span className="text-gray-700 font-medium">{statNames[key] || key}</span>
                <span className="text-gray-600 text-sm">{displayValue}/10</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${percentage}` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const SkillsSection = ({ skills, tips }: { skills: Skill[], tips?: string }) => (
  <div className="mt-4 p-4 bg-white rounded-lg">
    <h2 className="text-2xl font-semibold mb-4 text-gray-700">Skill</h2>
    {tips && (
      <div className="bg-blue-50 p-3 mb-4 rounded-md text-sm text-blue-800">
        <strong>Tips:</strong> {tips}
      </div>
    )}
    <ul className="space-y-4">
      {skills.map((s, index) => (
        <li key={index} className="flex items-start gap-4 p-4 border-b border-gray-100">
          {s.icon && (
            <div className="flex-shrink-0">
              <Image
                src={ensureHttps(s.icon)}
                alt={s.name || "Skill icon"}
                width={50}
                height={50}
                className="rounded-full"
                priority
              />
            </div>
          )}
          <div className="flex-grow">
            <h3 className="font-semibold text-lg text-gray-800">{s.name || "Unnamed Skill"}</h3>
            <div 
              className="text-gray-600 text-sm mt-1" 
              dangerouslySetInnerHTML={{ __html: s.des || "Tidak ada deskripsi" }}
            />
            {s.tips && (
              <div className="mt-2 text-xs text-gray-500">
                <strong>Tips:</strong> {s.tips}
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  </div>
);

const GearSection = ({ gear, tips }: { gear: Equipment[], tips?: string }) => (
  <div className="mt-4 p-4 bg-white rounded-lg">
    <h2 className="text-2xl font-semibold mb-4 text-gray-700">Build Rekomendasi</h2>
    {tips && (
      <div className="bg-gray-50 p-3 mb-4 rounded-md text-sm text-gray-700">
        <strong>Tips:</strong> {tips}
      </div>
    )}
    <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
      {gear.map((g, index) => (
        <div key={index} className="flex flex-col items-center">
          {g.icon && (
            <div className="mb-2">
              <Image
                src={ensureHttps(g.icon)}
                alt={g.name || "Gear icon"}
                width={45}
                height={45}
                className="rounded"
                priority
              />
            </div>
          )}
          <h3 className="font-medium text-center text-xs text-gray-600">{g.name || "Unnamed Gear"}</h3>
        </div>
      ))}
    </div>
    <div className="mt-4 space-y-2">
      {gear.map((g, index) => (
        g.des && g.des.length > 0 && (
          <div key={index} className="text-xs text-gray-500 p-2 bg-gray-50 rounded">
            <strong>{g.name}:</strong> {g.des.join(" ")}
          </div>
        )
      ))}
    </div>
  </div>
);

const CountersSection = ({ counters }: { counters?: HeroData["counters"] }) => {
  if (!counters) return null;
  
  return (
    <div className="mt-4 p-4 bg-white rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Partner & Counter</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {counters.best && (
          <div className="p-3 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-700 mb-2">Partner Terbaik</h3>
            <div className="flex items-center">
              {counters.best.icon && (
                <Image
                  src={ensureHttps(counters.best.icon)}
                  alt={counters.best.name || "Hero icon"}
                  width={40}
                  height={40}
                  className="rounded-full mr-2"
                />
              )}
              <span className="font-medium">{counters.best.name || "Unknown Hero"}</span>
            </div>
            {counters.best.best_mate_tips && (
              <p className="text-xs mt-2 text-gray-600">{counters.best.best_mate_tips}</p>
            )}
          </div>
        )}

        {counters.counters && (
          <div className="p-3 bg-green-50 rounded-lg">
            <h3 className="font-semibold text-green-700 mb-2">Counter</h3>
            <div className="flex items-center">
              {counters.counters.icon && (
                <Image
                  src={ensureHttps(counters.counters.icon)}
                  alt={counters.counters.name || "Hero icon"}
                  width={40}
                  height={40}
                  className="rounded-full mr-2"
                />
              )}
              <span className="font-medium">{counters.counters.name || "Unknown Hero"}</span>
            </div>
            {counters.counters.restrain_hero_tips && (
              <p className="text-xs mt-2 text-gray-600">{counters.counters.restrain_hero_tips}</p>
            )}
          </div>
        )}

        {counters.countered && (
          <div className="p-3 bg-red-50 rounded-lg">
            <h3 className="font-semibold text-red-700 mb-2">Dicounter Oleh</h3>
            <div className="flex items-center">
              {counters.countered.icon && (
                <Image
                  src={ensureHttps(counters.countered.icon)}
                  alt={counters.countered.name || "Hero icon"}
                  width={40}
                  height={40}
                  className="rounded-full mr-2"
                />
              )}
              <span className="font-medium">{counters.countered.name || "Unknown Hero"}</span>
            </div>
            {counters.countered.by_restrain_tips && (
              <p className="text-xs mt-2 text-gray-600">{counters.countered.by_restrain_tips}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const DetailHero = () => {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const [hero, setHero] = useState<HeroData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) {
      setError(true);
      setLoading(false);
      return;
    }

    const fetchHero = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/hero/detail?id=${id}`);
        
        if (!res.ok) throw new Error(res.statusText);
        
        const result = await res.json();
        if (!result.data) throw new Error("Data tidak valid");
        
        setHero(result.data);
        setError(false);
      } catch (error) {
        console.error("Gagal memuat data hero:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchHero();
  }, [id]);

  const handleBack = () => {
    const previousId = parseInt(id) - 1;
    router.push(`/detail-hero/${previousId}`);
  };

  const handleHome = () => {
    router.push('/');
  };

  const handleNext = () => {
    const nextId = parseInt(id) + 1;
    router.push(`/detail-hero/${nextId}`);
  };

  if (loading) return <Loading />;
  if (error || !hero) return <ErrorMessage />;

  // Prepare stats object
  const stats: Record<string, string | number> = {};
  if (hero.mag) stats.mag = hero.mag;
  if (hero.phy) stats.phy = hero.phy;
  if (hero.alive) stats.alive = hero.alive;
  if (hero.diff) stats.diff = hero.diff;

  return (
    <div className="max-w-4xl mx-auto bg-gray-100 min-h-screen">
      <div className="relative w-full h-48 md:h-64 bg-gradient-to-b from-gray-800 to-gray-600">
        {hero.cover_picture && (
          <Image
            src={ensureHttps(hero.cover_picture)}
            alt={hero.name || "Hero Cover"}
            fill
            className="object-cover object-center opacity-40"
            priority
          />
        )}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
          <h1 className="text-3xl font-bold text-white">
            {hero.name || "Hero Tanpa Nama"}
          </h1>
          <div className="mt-1">
            <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
              {hero.type || "Unknown"}
            </span>
          </div>
        </div>
      </div>

      <div className="p-4">
        {Object.keys(stats).length > 0 && <StatsSection stats={stats} />}

        {hero.skill?.skill?.length ? (
          <SkillsSection 
            skills={hero.skill.skill} 
            tips={hero.skill.item?.tips}
          />
        ) : null}

        {hero.gear?.out_pack?.length ? (
          <GearSection 
            gear={hero.gear.out_pack.map(g => g.equip)} 
            tips={hero.gear.out_pack_tips}
          />
        ) : null}

        <CountersSection counters={hero.counters} />
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between p-4">
        <button onClick={handleBack} className="bg-blue-500 text-white px-4 py-2 rounded">
          Back to Previous ID
        </button>
        <button onClick={handleHome} className="bg-green-500 text-white px-4 py-2 rounded">
          Home
        </button>
        <button onClick={handleNext} className="bg-blue-500 text-white px-4 py-2 rounded">
          Next to Next ID
        </button>
      </div>
    </div>
  );
};

export default DetailHero;