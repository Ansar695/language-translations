import React from "react";
import { translatePage } from "../i18n/translator";

const languages = [
  { code: "en", label: "English" },
  { code: "es", label: "Spanish" },
  { code: "fr", label: "French" },
  { code: "ur", label: "Urdu" },
  // Add more languages here
];

export const LanguageSwitcher = () => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    translatePage(e.target.value);
  };

  return (
    <div className="p-2">
      <select
        onChange={handleChange}
        className="p-2 border rounded bg-white text-black"
      >
        <option value="">Select Language</option>
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
};
