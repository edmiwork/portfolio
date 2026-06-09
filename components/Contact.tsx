"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/lib/site";
import { Reveal } from "./Reveal";

type Status = "idle" | "sending" | "success" | "error";

function forceEnglishValidity(
  e: { currentTarget: HTMLInputElement | HTMLTextAreaElement }
) {
  const el = e.currentTarget;
  if (el.validity.valueMissing) {
    el.setCustomValidity("Please fill out this field.");
  } else if (el.validity.typeMismatch) {
    el.setCustomValidity("Please enter a valid email address.");
  } else {
    el.setCustomValidity("");
  }
}

function clearValidity(e: {
  currentTarget: HTMLInputElement | HTMLTextAreaElement;
}) {
  e.currentTarget.setCustomValidity("");
}

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // No backend key configured → graceful mailto fallback.
    if (!site.web3formsKey) {
      const name = String(data.get("name") || "");
      const subject = String(data.get("subject") || "New project inquiry");
      const message = String(data.get("message") || "");
      const body = encodeURIComponent(`${message}\n\n— ${name}`);
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
        subject
      )}&body=${body}`;
      return;
    }

    setStatus("sending");
    setError("");
    data.append("access_key", site.web3formsKey);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      if (json.success) {
        setStatus("success");
        form.reset();
      } else {
        throw new Error(json.message || "Something went wrong.");
      }
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <section id="contact" className="px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          {/* Left: pitch + socials */}
          <div>
            <Reveal>
              <p className="font-neutrek mb-3 text-xs uppercase tracking-[0.35em] text-[var(--muted)] opacity-70">
                Contact
              </p>
              <h2 className="font-foun uppercase text-[clamp(2rem,5.5vw,4rem)] leading-[1] tracking-[0.02em]">
                Let&apos;s build <span className="grad-text">something great.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-lg text-[var(--muted)]">
                Available for freelance projects, full-time roles and creative
                collaborations. Tell me about your idea.
              </p>
              <p className="mt-2 max-w-md text-lg text-[var(--muted)]">
                I reply within 48 hours.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <a
                href={`mailto:${site.email}`}
                className="mt-8 inline-block text-xl font-semibold underline-offset-4 transition-colors hover:text-[var(--color-ember)] hover:underline sm:text-2xl"
              >
                {site.email}
              </a>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-wrap gap-3">
                {site.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline !px-4 !py-2 text-sm"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right: form */}
          <Reveal delay={0.1}>
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-[var(--border)] p-6 sm:p-8"
              style={{ background: "var(--bg-elev)" }}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name" name="name" required />
                <Field label="Email" name="email" type="email" required />
              </div>
              <div className="mt-5">
                <Field label="Subject" name="subject" />
              </div>
              <div className="mt-5">
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  onInvalid={forceEnglishValidity}
                  onInput={clearValidity}
                  placeholder="Tell me about your project…"
                  className="w-full resize-none rounded-2xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-[var(--text)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--color-ember)]"
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="btn btn-grad grad-bg mt-6 w-full disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : "Send message"}
              </button>

              {status === "success" && (
                <p className="mt-4 text-center text-sm text-[var(--color-ember)]">
                  Message sent — I&apos;ll be in touch within 48 hours.
                </p>
              )}
              {status === "error" && (
                <p className="mt-4 text-center text-sm text-[var(--color-flame)]">
                  {error}
                </p>
              )}
              {!site.web3formsKey && (
                <p className="mt-4 text-center text-xs text-[var(--muted)]">
                  Opens your email app. Add a Web3Forms key in lib/site.ts for
                  in-page sending.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-medium">
        {label}
        {required && <span className="text-[var(--color-flame)]"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        onInvalid={forceEnglishValidity}
        onInput={clearValidity}
        className="w-full rounded-2xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-[var(--text)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--color-ember)]"
      />
    </div>
  );
}
