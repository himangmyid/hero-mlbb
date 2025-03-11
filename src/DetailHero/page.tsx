import React from "react";
import Image from "next/image";

interface Skill {
  name: string;
  icon?: string;
  des: string;
  tips: string;
}

interface HeroData {
  cover_picture?: string;
  name?: string;
  type?: string;
  skill?: { skill?: Skill[] };
}

const DetailHero: React.FC<{ data?: HeroData }> = ({ data }) => {
  console.log("Received Hero Data:", data); // Debugging

  if (!data) return <p>Data not available</p>;

  return (
    <div className="p-4">
      {data.cover_picture ? (
        <Image
          src={data.cover_picture}
          alt={data.name || "Hero Cover"}
          width={300}
          height={400}
          className="rounded-md"
          priority
        />
      ) : (
        <p>No Cover Image</p>
      )}
      <h1 className="text-2xl font-bold">{data.name || "Unknown Hero"}</h1>
      <p>Type: {data.type || "Unknown Type"}</p>

      <h2 className="text-xl font-semibold mt-4">Skills</h2>
      {data.skill?.skill?.length ? (
        <div>
          {data.skill.skill.map((s, index) => (
            <div key={index} className="mt-2 border p-2 rounded-md">
              {s.icon ? (
                <Image
                  src={s.icon}
                  alt={s.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                  priority
                />
              ) : (
                <p>No Skill Icon</p>
              )}
              <h3 className="font-semibold">{s.name}</h3>
              <p>{s.des}</p>
              <p className="text-sm italic">Tips: {s.tips}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No Skills Available</p>
      )}
    </div>
  );
};

export default DetailHero;
