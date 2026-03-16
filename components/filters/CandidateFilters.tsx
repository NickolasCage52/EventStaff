"use client";

const ROLES = [
  "Официант",
  "Бармен",
  "Хостес",
  "Администратор",
  "Повар",
  "Координатор",
  "Кассир",
];

const experienceOptions: { value: "any" | "1year" | "3years"; label: string }[] = [
  { value: "any", label: "Любой опыт" },
  { value: "1year", label: "От 1 года" },
  { value: "3years", label: "От 3 лет" },
];

interface CandidateFiltersProps {
  selectedRoles: string[];
  setSelectedRoles: (roles: string[] | ((prev: string[]) => string[])) => void;
  experience: "any" | "1year" | "3years";
  setExperience: (v: "any" | "1year" | "3years") => void;
  roleCounts?: Record<string, number>;
}

export function CandidateFilters({
  selectedRoles,
  setSelectedRoles,
  experience,
  setExperience,
  roleCounts = {},
}: CandidateFiltersProps) {
  const toggleRole = (role: string) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="font-medium text-ink mb-4">Роль</h3>
        <div className="space-y-3">
          {ROLES.map((role) => (
            <label
              key={role}
              className="flex items-center justify-between gap-2 cursor-pointer text-sm text-ink/80 hover:text-ink group"
            >
              <span className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedRoles.includes(role)}
                  onChange={() => toggleRole(role)}
                  className="rounded border-mist text-emerald focus:ring-emerald/30 w-4 h-4"
                />
                {role}
              </span>
              {roleCounts[role] !== undefined && (
                <span className="text-ink/50 text-xs">{roleCounts[role]}</span>
              )}
            </label>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-medium text-ink mb-4">Опыт</h3>
        <div className="space-y-3">
          {experienceOptions.map((opt) => (
            <label
              key={opt.value}
              className="flex items-center gap-2 cursor-pointer text-sm text-ink/80 hover:text-ink"
            >
              <input
                type="radio"
                name="experience-candidate"
                value={opt.value}
                checked={experience === opt.value}
                onChange={() => setExperience(opt.value)}
                className="text-emerald focus:ring-emerald/30"
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
