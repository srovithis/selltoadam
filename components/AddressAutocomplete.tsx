"use client";

import { useEffect, useRef } from "react";

interface Props {
  name?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    google: any;
  }
}

export default function AddressAutocomplete({
  name = "property_address",
  placeholder = "Property Address",
  required = false,
  className = "",
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;
    if (!apiKey || !inputRef.current) return;

    const initAutocomplete = () => {
      if (!inputRef.current || !window.google?.maps?.places) return;
      const autocomplete = new window.google.maps.places.Autocomplete(
        inputRef.current,
        {
          componentRestrictions: { country: "us" },
          fields: ["formatted_address"],
          types: ["address"],
        }
      );
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (place?.formatted_address && inputRef.current) {
          // Directly set the DOM value so FormData picks it up
          inputRef.current.value = place.formatted_address;
        }
      });
    };

    // Already loaded
    if (window.google?.maps?.places) {
      initAutocomplete();
      return;
    }

    // Script already in DOM (another instance loading it)
    if (document.getElementById("google-places-script")) {
      const interval = setInterval(() => {
        if (window.google?.maps?.places) {
          clearInterval(interval);
          initAutocomplete();
        }
      }, 100);
      return () => clearInterval(interval);
    }

    // Load script
    const script = document.createElement("script");
    script.id = "google-places-script";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = initAutocomplete;
    document.head.appendChild(script);
  }, []);

  return (
    <input
      ref={inputRef}
      type="text"
      name={name}
      placeholder={placeholder}
      required={required}
      className={className}
      autoComplete="off"
    />
  );
}
