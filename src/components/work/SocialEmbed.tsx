"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface SocialEmbedProps {
  platform: "instagram" | "youtube" | "tiktok";
  url: string;
  embedId?: string;
}

function detectPlatform(url: string): "instagram" | "youtube" | "tiktok" | null {
  if (url.includes("instagram.com")) return "instagram";
  if (url.includes("youtube.com") || url.includes("youtu.be")) return "youtube";
  if (url.includes("tiktok.com")) return "tiktok";
  return null;
}

function getYouTubeId(url: string): string {
  const patterns = [
    /youtu\.be\/([^?&]+)/,
    /youtube\.com\/watch\?v=([^&]+)/,
    /youtube\.com\/embed\/([^?&]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return "";
}

function PlatformIcon({ platform }: { platform: string }) {
  if (platform === "youtube") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M23.5 6.5a3 3 0 0 0-2.1-2.1C19.6 4 12 4 12 4s-7.6 0-9.4.4A3 3 0 0 0 .5 6.5 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.5A3 3 0 0 0 2.6 19.6C4.4 20 12 20 12 20s7.6 0 9.4-.4a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.5zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/>
      </svg>
    );
  }
  if (platform === "instagram") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
      </svg>
    );
  }
  // TikTok
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52v-3.4a4.85 4.85 0 0 1-1.01-.12z"/>
    </svg>
  );
}

export default function SocialEmbed({ platform, url, embedId }: SocialEmbedProps) {
  const [showEmbed, setShowEmbed] = useState(false);

  const platformName = platform.charAt(0).toUpperCase() + platform.slice(1);

  const renderEmbed = () => {
    if (platform === "youtube") {
      const videoId = embedId || getYouTubeId(url);
      if (!videoId) return null;
      return (
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
            title={`YouTube video — ${videoId}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0"
          />
        </div>
      );
    }

    if (platform === "tiktok") {
      return (
        <div className="flex flex-col items-center gap-3 py-6">
          <PlatformIcon platform="tiktok" />
          <p className="text-sm text-[var(--text-secondary)]">
            View this video on TikTok
          </p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[var(--accent)] hover:underline underline-offset-2"
          >
            Open TikTok →
          </a>
        </div>
      );
    }

    // Instagram — show link (embed requires login)
    if (platform === "instagram") {
      return (
        <div className="flex flex-col items-center gap-3 py-6">
          <PlatformIcon platform="instagram" />
          <p className="text-sm text-[var(--text-secondary)]">
            View this post on Instagram
          </p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[var(--accent)] hover:underline underline-offset-2"
          >
            Open Instagram →
          </a>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="border border-[var(--border-subtle)] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-2 text-[var(--text-secondary)]">
          <PlatformIcon platform={platform} />
          <span className="text-sm">{platformName}</span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="label text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            Open original ↗
          </a>
          {platform === "youtube" && (
            <button
              onClick={() => setShowEmbed(!showEmbed)}
              className="label text-[var(--accent)] hover:underline underline-offset-2"
              aria-label={showEmbed ? "Hide embed" : "Show embed"}
            >
              {showEmbed ? "Hide" : "Show preview"}
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="bg-[var(--bg-surface)]">
        {platform === "youtube" && showEmbed && renderEmbed()}
        {platform !== "youtube" && renderEmbed()}
      </div>
    </div>
  );
}
