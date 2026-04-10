"use client";

import { useState, FormEvent } from "react";

type Variant = "banner" | "hero" | "middle" | "full";

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
    const fd = new FormData(e.currentTarget);

    const body = {
      address: fd.get("property_address") as string,
      name: (fd.get("name") as string) || undefined,
      phone: (fd.get("phone") as string) || undefined,
      email: (fd.get("email") as string) || undefined,
      soonToSell: (fd.get("soon_to_sell") as string) || undefined,
      askingPrice: (fd.get("asking_price") as string) || undefined,
      immediateRepairs: (fd.get("immediate_repairs") as string) || undefined,
      notes: (fd.get("comments") as string) || undefined,
      source: "Website",
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) {
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
  const selectClass = inputClass + " bg-white";

  // Banner: minimal — address + phone inline
  if (variant === "banner") {
    return (
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-3"
      >
        <input
          type="text"
          name="property_address"
          placeholder="Property Address"
          required
          className="flex-1 px-4 py-3 rounded-md border border-gray-300 focus:border-brand-green focus:outline-none text-brand-dark"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          className="flex-1 px-4 py-3 rounded-md border border-gray-300 focus:border-brand-green focus:outline-none text-brand-dark"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-gold whitespace-nowrap disabled:opacity-70"
        >
          {status === "loading" ? "Submitting..." : submitLabel}
        </button>
      </form>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-xl p-6 space-y-4"
    >
      {/* Address — always */}
      <input
        type="text"
        name="property_address"
        placeholder="Property Address"
        required
        className={inputClass}
      />

      {/* Name — hero and full */}
      {(variant === "hero" || variant === "full") && (
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          className={inputClass}
        />
      )}

      {/* Phone + Email */}
      {variant === "hero" ? (
        <div className="grid sm:grid-cols-2 gap-4">
          <input type="tel" name="phone" placeholder="Phone Number" required className={inputClass} />
          <input type="email" name="email" placeholder="Email Address" required className={inputClass} />
        </div>
      ) : (
        <>
          <input type="tel" name="phone" placeholder="Phone Number" required className={inputClass} />
          {(variant === "middle" || variant === "full") && (
            <input type="email" name="email" placeholder="Email Address" required className={inputClass} />
          )}
        </>
      )}

      {/* Extra fields — full variant only */}
      {variant === "full" && (
        <>
          <select name="soon_to_sell" className={selectClass}>
            <option value="">How soon are you looking to sell?</option>
            <option>Immediately</option>
            <option>1–3 months</option>
            <option>3–6 months</option>
            <option>6–12 months</option>
            <option>Just exploring</option>
          </select>
          <input
            type="text"
            name="asking_price"
            placeholder="Asking Price (optional)"
            className={inputClass}
          />
          <select name="immediate_repairs" className={selectClass}>
            <option value="">Immediate Repairs Needed?</option>
            <option>None</option>
            <option>Minor</option>
            <option>Moderate</option>
            <option>Major</option>
            <option>Unknown</option>
          </select>
          <textarea
            name="comments"
            placeholder="Tell us about your property (optional)"
            rows={4}
            className={inputClass}
          />
        </>
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
