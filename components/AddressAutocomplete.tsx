"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface Suggestion {
  display_name: string;
  place_id: number;
}

interface Props {
  name?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

export default function AddressAutocomplete({
  name = "property_address",
  placeholder = "Property Address",
  required = false,
  className = "",
}: Props) {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const fetchSuggestions = useCallback(async (query: string) => {
    if (query.length < 3) {
      setSuggestions([]);
      setOpen(false);
      return;
    }
    setLoading(true);
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&countrycodes=us&q=${encodeURIComponent(query)}&limit=5`;
      const res = await fetch(url, {
        headers: { "User-Agent": "selltoadam-website" },
      });
      const data: Suggestion[] = await res.json();
      setSuggestions(data);
      setOpen(data.length > 0);
    } catch {
      setSuggestions([]);
      setOpen(false);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setValue(q);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchSuggestions(q), 300);
  };

  const handleSelect = (suggestion: Suggestion) => {
    setValue(suggestion.display_name);
    setSuggestions([]);
    setOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <input
        type="text"
        name={name}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        required={required}
        autoComplete="off"
        className={className}
      />
      {loading && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <div className="w-4 h-4 border-2 border-brand-green border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      {open && suggestions.length > 0 && (
        <ul className="absolute z-50 left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((s) => (
            <li
              key={s.place_id}
              onMouseDown={() => handleSelect(s)}
              className="px-4 py-2.5 text-sm text-gray-800 cursor-pointer hover:bg-brand-green hover:text-white transition-colors border-b border-gray-100 last:border-0"
            >
              {s.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
