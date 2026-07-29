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
        <div className="flex items-center gap-4">
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
          <a
            href="https://github.com/zjben10"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
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
              <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.26.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.305 3.492.998.108-.776.42-1.305.762-1.605-2.665-.303-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.236-3.22-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 0 1 3.003-.404c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.805 5.624-5.478 5.92.43.372.814 1.102.814 2.222 0 1.606-.015 2.9-.015 3.293 0 .32.216.694.825.576C20.565 22.297 24 17.797 24 12.5 24 5.87 18.627.5 12 .5z" />
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
