"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import emailjs from "@emailjs/browser";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

type FormData = z.infer<typeof schema>;

type Status = "idle" | "sending" | "success" | "error";

const socials = [
  { label: "Instagram", href: "https://instagram.com/yourhandle", id: "contact-instagram" },
  { label: "YouTube", href: "https://youtube.com/@yourhandle", id: "contact-youtube" },
  { label: "TikTok", href: "https://tiktok.com/@yourhandle", id: "contact-tiktok" },
];

export default function ContactClient() {
  const [status, setStatus] = useState<Status>("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setStatus("sending");
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID",
        {
          from_name: data.name,
          from_email: data.email,
          subject: data.subject,
          message: data.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY"
      );
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
      {/* Left: info */}
      <div className="md:col-span-4">
        <p className="text-body-md text-[var(--text-secondary)] leading-relaxed mb-8">
          Whether you have a project in mind, want to collaborate, or just want
          to say hello — my inbox is open.
        </p>

        <div className="flex flex-col gap-4 mb-10">
          <div>
            <p className="label text-[var(--text-secondary)] mb-1">Email</p>
            <a
              id="contact-email-link"
              href="mailto:your@email.com"
              className="text-sm text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors duration-200"
            >
              your@email.com
            </a>
          </div>
          <div>
            <p className="label text-[var(--text-secondary)] mb-2">Social</p>
            <div className="flex flex-col gap-2">
              {socials.map((s) => (
                <a
                  key={s.id}
                  id={s.id}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200"
                >
                  {s.label} ↗
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-[var(--border-subtle)] pt-6">
          <p className="text-sm text-[var(--text-secondary)]">
            Response time is usually within{" "}
            <span className="text-[var(--text-primary)]">24 hours</span>.
          </p>
        </div>
      </div>

      {/* Right: form */}
      <div className="md:col-span-8">
        {status === "success" ? (
          <div className="border border-[var(--border-subtle)] p-8 text-center">
            <p className="text-display-md font-light text-[var(--text-primary)] mb-3">
              Message sent.
            </p>
            <p className="text-body-md text-[var(--text-secondary)] mb-6">
              Thanks for reaching out — I'll get back to you soon.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="text-sm text-[var(--accent)] hover:underline underline-offset-2"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form
            id="contact-form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="flex flex-col gap-6"
          >
            {/* Name + Email row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="contact-name"
                  className="label text-[var(--text-secondary)]"
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your name"
                  {...register("name")}
                  className={cn(
                    "w-full bg-[var(--bg-surface)] border px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/50 focus:outline-none focus:border-[var(--accent)] transition-colors duration-200",
                    errors.name
                      ? "border-red-500/50"
                      : "border-[var(--border-subtle)]"
                  )}
                />
                {errors.name && (
                  <p className="text-xs text-red-400">{errors.name.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="contact-email"
                  className="label text-[var(--text-secondary)]"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  autoComplete="email"
                  placeholder="your@email.com"
                  {...register("email")}
                  className={cn(
                    "w-full bg-[var(--bg-surface)] border px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/50 focus:outline-none focus:border-[var(--accent)] transition-colors duration-200",
                    errors.email
                      ? "border-red-500/50"
                      : "border-[var(--border-subtle)]"
                  )}
                />
                {errors.email && (
                  <p className="text-xs text-red-400">{errors.email.message}</p>
                )}
              </div>
            </div>

            {/* Subject */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="contact-subject"
                className="label text-[var(--text-secondary)]"
              >
                Subject
              </label>
              <input
                id="contact-subject"
                type="text"
                placeholder="What's this about?"
                {...register("subject")}
                className={cn(
                  "w-full bg-[var(--bg-surface)] border px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/50 focus:outline-none focus:border-[var(--accent)] transition-colors duration-200",
                  errors.subject
                    ? "border-red-500/50"
                    : "border-[var(--border-subtle)]"
                )}
              />
              {errors.subject && (
                <p className="text-xs text-red-400">{errors.subject.message}</p>
              )}
            </div>

            {/* Message */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="contact-message"
                className="label text-[var(--text-secondary)]"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                rows={6}
                placeholder="Tell me about your project, timeline, or anything else relevant."
                {...register("message")}
                className={cn(
                  "w-full bg-[var(--bg-surface)] border px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/50 focus:outline-none focus:border-[var(--accent)] transition-colors duration-200 resize-none",
                  errors.message
                    ? "border-red-500/50"
                    : "border-[var(--border-subtle)]"
                )}
              />
              {errors.message && (
                <p className="text-xs text-red-400">
                  {errors.message.message}
                </p>
              )}
            </div>

            {/* Error message */}
            {status === "error" && (
              <p className="text-sm text-red-400">
                Something went wrong. Please try again or email me directly.
              </p>
            )}

            {/* Submit */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <p className="text-xs text-[var(--text-secondary)]">
                All fields are required.
              </p>
              <button
                id="contact-submit"
                type="submit"
                disabled={status === "sending"}
                className="text-sm text-[var(--text-primary)] border border-[var(--border)] px-8 py-3 hover:border-[var(--accent)] hover:text-[var(--accent)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {status === "sending" ? "Sending..." : "Send message"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
