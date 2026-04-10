"use client";

import { useState, FormEvent } from "react";
import AddressAutocomplete from "./AddressAutocomplete";

type Variant = "banner" | "hero" | "middle" | "full";

interface LeadFormProps {
  variant?: Variant;
  submitLabel?: string;
}

// --- Helpers ---

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

function isValidPhone(value: string): boolean {
  return value.replace(/\D/g, "").length >= 10;
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

// --- Modal ---

const CONTACT_OPTIONS = ["📱 Text Me", "📞 Call Me"];
const TIME_OPTIONS = ["⚡ Available Now", "🌅 Mornings", "☀️ Mid Day", "🌆 Afternoons", "🌙 Evenings"];

interface ModalState {
  show: boolean;
  leadId: string;
  contactPref: string;
  bestTime: string;
  saving: boolean;
  done: boolean;
}

function FollowUpModal({
  modal,
  setModal,
}: {
  modal: ModalState;
  setModal: React.Dispatch<React.SetStateAction<ModalState>>;
}) {
  const handleConfirm = async () => {
    setModal((m) => ({ ...m, saving: true }));
    try {
      await fetch(`/api/leads/${modal.leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contactPreference: modal.contactPref,
          bestTime: modal.bestTime,
        }),
      });
    } catch {
      // fail silently — preference is nice-to-have
    }
    setModal((m) => ({ ...m, saving: false, done: true }));
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto animate-in"
        style={{ animation: "modalIn 0.25s ease-out" }}
      >
        <style>{`
          @keyframes modalIn {
            from { opacity: 0; transform: scale(0.94) translateY(8px); }
            to   { opacity: 1; transform: scale(1)    translateY(0);   }
          }
        `}</style>

        {modal.done ? (
          <div className="p-8 text-center">
            <span className="text-5xl leading-none">🏠</span>
            <h2 className="mt-4 text-2xl font-extrabold text-brand-green">
              Perfect!
            </h2>
            <p className="mt-2 text-gray-600 text-lg">
              We&apos;ll be in touch soon based on your response preference.
            </p>
          </div>
        ) : (
          <div className="p-6">
            <div className="text-center mb-5">
              <div className="text-4xl mb-2">🎉</div>
              <h2 className="text-xl font-extrabold text-brand-dark">
                We Got Your Info!
              </h2>
              <p className="mt-1 text-gray-500 text-sm">
                One quick thing — how should we reach you?
              </p>
            </div>

            {/* Contact method */}
            <div className="mb-5">
              <p className="text-sm font-semibold text-gray-700 mb-2">
                Preferred Contact Method:
              </p>
              <div className="grid grid-cols-2 gap-2">
                {CONTACT_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setModal((m) => ({ ...m, contactPref: opt }))}
                    className={`py-3 px-4 rounded-xl text-sm font-semibold border-2 transition-all ${
                      modal.contactPref === opt
                        ? "bg-brand-green border-brand-green text-white shadow-md scale-[1.02]"
                        : "bg-white border-gray-200 text-gray-700 hover:border-brand-green"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Best time */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-gray-700 mb-2">
                Best Time to Reach You:
              </p>
              <div className="grid grid-cols-2 gap-2">
                {TIME_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setModal((m) => ({ ...m, bestTime: opt }))}
                    className={`py-3 px-4 rounded-xl text-sm font-semibold border-2 transition-all ${
                      modal.bestTime === opt
                        ? "bg-brand-green border-brand-green text-white shadow-md scale-[1.02]"
                        : "bg-white border-gray-200 text-gray-700 hover:border-brand-green"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={handleConfirm}
              disabled={modal.saving}
              className="w-full btn-gold text-lg py-4 font-extrabold tracking-wide disabled:opacity-70"
            >
              {modal.saving ? "Saving..." : "CONFIRM →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// --- Main Component ---

export default function LeadForm({
  variant = "hero",
  submitLabel = "Get My Cash Offer",
}: LeadFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  // Controlled inputs for validation
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");

  // Modal
  const [modal, setModal] = useState<ModalState>({
    show: false,
    leadId: "",
    contactPref: "📱 Text Me",
    bestTime: "⚡ Available Now",
    saving: false,
    done: false,
  });

  const validatePhone = (val: string) => {
    if (val && !isValidPhone(val)) {
      setPhoneError("Please enter a valid phone number");
      return false;
    }
    setPhoneError("");
    return true;
  };

  const validateEmail = (val: string) => {
    if (val && !isValidEmail(val)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate before submitting
    const phoneOk = phone ? validatePhone(phone) : true;
    const emailOk = email ? validateEmail(email) : true;
    if (!phoneOk || !emailOk) return;

    setSubmitting(true);
    setSubmitError(false);

    const fd = new FormData(e.currentTarget);
    const body = {
      address: fd.get("property_address") as string,
      name: (fd.get("name") as string) || undefined,
      phone: phone || undefined,
      email: email || undefined,
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
        const lead = await res.json();
        (e.target as HTMLFormElement).reset();
        setPhone("");
        setEmail("");
        setModal({
          show: true,
          leadId: lead.id,
          contactPref: "📱 Text Me",
          bestTime: "⚡ Available Now",
          saving: false,
          done: false,
        });
      } else {
        setSubmitError(true);
      }
    } catch {
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-md border border-gray-300 focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/30 text-brand-dark";
  const inputErrorClass =
    "w-full px-4 py-3 rounded-md border border-red-400 focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-200 text-brand-dark";
  const selectClass = inputClass + " bg-white";

  const phoneInput = (cls?: string) => (
    <div>
      <input
        type="tel"
        name="phone"
        placeholder="Phone Number"
        required
        value={phone}
        onChange={(e) => {
          const formatted = formatPhone(e.target.value);
          setPhone(formatted);
          if (phoneError) validatePhone(formatted);
        }}
        onBlur={() => validatePhone(phone)}
        className={phoneError ? inputErrorClass : (cls ?? inputClass)}
      />
      {phoneError && (
        <p className="text-red-500 text-xs mt-1">{phoneError}</p>
      )}
    </div>
  );

  const emailInput = (cls?: string) => (
    <div>
      <input
        type="email"
        name="email"
        placeholder="Email Address"
        required
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (emailError) validateEmail(e.target.value);
        }}
        onBlur={() => validateEmail(email)}
        className={emailError ? inputErrorClass : (cls ?? inputClass)}
      />
      {emailError && (
        <p className="text-red-500 text-xs mt-1">{emailError}</p>
      )}
    </div>
  );

  // Banner: minimal inline form
  if (variant === "banner") {
    return (
      <>
        {modal.show && <FollowUpModal modal={modal} setModal={setModal} />}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <AddressAutocomplete
            required
            className="flex-1 px-4 py-3 rounded-md border border-gray-300 focus:border-brand-green focus:outline-none text-brand-dark"
          />
          <div className="flex-1">
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(formatPhone(e.target.value))}
              onBlur={() => validatePhone(phone)}
              className={`w-full px-4 py-3 rounded-md border ${phoneError ? "border-red-400" : "border-gray-300"} focus:border-brand-green focus:outline-none text-brand-dark`}
            />
            {phoneError && <p className="text-red-500 text-xs mt-1">{phoneError}</p>}
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="btn-gold whitespace-nowrap disabled:opacity-70"
          >
            {submitting ? "Submitting..." : submitLabel}
          </button>
        </form>
      </>
    );
  }

  return (
    <>
      {modal.show && <FollowUpModal modal={modal} setModal={setModal} />}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-xl p-6 space-y-4"
      >
        {/* Address — always */}
        <AddressAutocomplete required className={inputClass} />

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
            {phoneInput()}
            {emailInput()}
          </div>
        ) : (
          <>
            {phoneInput()}
            {(variant === "middle" || variant === "full") && emailInput()}
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
          disabled={submitting}
          className="w-full btn-gold text-lg py-4 disabled:opacity-70"
        >
          {submitting ? "Submitting..." : submitLabel}
        </button>

        {submitError && (
          <p className="text-red-600 text-sm text-center">
            Something went wrong. Please call us at (413) 423-1110.
          </p>
        )}
        <p className="text-xs text-gray-500 text-center">
          No obligation. 100% free. Offer within 24 hours.
        </p>
      </form>
    </>
  );
}
