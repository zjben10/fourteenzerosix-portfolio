"use client";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="mt-auto py-16 px-6 md:px-12"
      style={{ borderTop: "1px solid rgba(26,23,20,0.1)" }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-10">
        {/* Left */}
        <div>
          <a
            href="https://www.linkedin.com/in/zoeibenzon/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="inline-flex transition-colors duration-200"
            style={{ color: "rgba(26,23,20,0.45)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--brand-sage)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(26,23,20,0.45)")}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
            </svg>
          </a>
        </div>

        {/* Right */}
        <div className="flex flex-col items-start md:items-end gap-4">
          <p
            className="text-[10px] tracking-wider"
            style={{ color: "rgba(26,23,20,0.3)" }}
          >
            © {new Date().getFullYear()} Zoei Benzon. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
