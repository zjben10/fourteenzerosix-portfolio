"use client";
import { useState } from "react";

export default function PasswordGate({
  password,
  children,
}: {
  password: string;
  children: React.ReactNode;
}) {
  const [input, setInput] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);

  if (unlocked) return <>{children}</>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === password) {
      setUnlocked(true);
    } else {
      setError(true);
      setInput("");
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center px-6"
      style={{ minHeight: "calc(100vh - 4rem)", paddingTop: "4rem" }}
    >
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            className="mx-auto mb-4"
            style={{ color: "var(--brand-terracotta)" }}
          >
            <rect x="6" y="14" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
            <path d="M10 14v-4a6 6 0 0 1 12 0v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="16" cy="21" r="1.5" fill="currentColor" />
          </svg>
          <p
            className="text-xs tracking-[0.25em] uppercase font-medium mb-2"
            style={{ color: "var(--brand-terracotta)" }}
          >
            Protected
          </p>
          <p
            className="text-sm"
            style={{ color: "rgba(26,23,20,0.5)" }}
          >
            Enter the password to view this project.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="password"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setError(false);
            }}
            placeholder="Password"
            autoFocus
            className="w-full px-4 py-3 text-sm outline-none transition-colors"
            style={{
              backgroundColor: "rgba(26,23,20,0.05)",
              border: error
                ? "1px solid var(--brand-terracotta)"
                : "1px solid rgba(26,23,20,0.15)",
              color: "var(--brand-dark)",
            }}
          />
          {error && (
            <p
              className="text-xs"
              style={{ color: "var(--brand-terracotta)" }}
            >
              Incorrect password. Please try again.
            </p>
          )}
          <button
            type="submit"
            className="w-full py-3 text-xs tracking-[0.15em] uppercase font-medium transition-opacity hover:opacity-80"
            style={{
              backgroundColor: "var(--brand-dark)",
              color: "var(--brand-cream)",
            }}
          >
            Unlock
          </button>
        </form>
      </div>
    </div>
  );
}
