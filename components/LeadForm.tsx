"use client";

import { useState, FormEvent } from "react";

const WEB3FORMS_KEY = "761a948d-2cba-415e-bddb-acbc23921868";

type Variant = "hero" | "middle" | "full";

interface LeadFormProps {
  variant?: Variant;
  submitLabel?: string;
}

export default function LeadForm({
  variant = "hero",
  submitLabel = "Get My Cash Offer",
}: LeadFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    const formData = new FormData(e.currentTarget);
    formData.append("access_key", WEB3FORMS_KEY);
    formData.append("subject", "New Cash Offer Lead - Sell To Adam");
    formData.append("from_name", "Sell To Adam Website");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 text-center">
        <p className="text-lg font-semibold text-brand-green">
          Thank you! We&apos;ll be in touch within 24 hours.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full px-4 py-3 rounded-md border border-gray-300 focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/30 text-brand-dark";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-xl p-6 space-y-4"
    >
      {/* Address — always full width */}
      <input
        type="text"
        name="property_address"
        placeholder="Property Address"
        required
        className={inputClass}
      />

      {/* Name — hero and full variants */}
      {(variant === "hero" || variant === "full") && (
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          className={inputClass}
        />
      )}

      {/* Phone + Email side-by-side on hero variant */}
      {variant === "hero" ? (
        <div className="grid sm:grid-cols-2 gap-4">
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            required
            className={inputClass}
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            className={inputClass}
          />
        </div>
      ) : (
        <>
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            required
            className={inputClass}
          />
          {(variant === "middle" || variant === "full") && (
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              className={inputClass}
            />
          )}
        </>
      )}

      {variant === "full" && (
        <textarea
          name="comments"
          placeholder="Tell us about your property (optional)"
          rows={4}
          className={inputClass}
        />
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full btn-gold text-lg py-4 disabled:opacity-70"
      >
        {status === "loading" ? "Submitting..." : submitLabel}
      </button>
      {status === "error" && (
        <p className="text-red-600 text-sm text-center">
          Something went wrong. Please call us at (413) 423-1110.
        </p>
      )}
      <p className="text-xs text-gray-500 text-center">
        No obligation. 100% free. Offer within 24 hours.
      </p>
    </form>
  );
}
