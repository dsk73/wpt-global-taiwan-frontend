// src/features/teaching-center-detail/components/TeachingGuideMedia.tsx

import Image from "next/image";

import { getMediaUrl } from "@/lib/media";

import type {
  TeachingGuide,
  TeachingGuideMediaSection,
} from "@/types/teaching-guide";

interface TeachingGuideMediaProps {
  guide: TeachingGuide;
}

export default function TeachingGuideMedia({ guide }: TeachingGuideMediaProps) {
  const mediaSections = guide.MediaSection?.filter(
    (section) => section.Media?.url,
  );

  if (!mediaSections?.length) {
    return null;
  }

  return (
    <section className="space-y-16 py-8">
      {mediaSections.map((section, index) => (
        <TeachingGuideMediaItem
          key={section.id ?? `${section.Title ?? "media"}-${index}`}
          section={section}
        />
      ))}
    </section>
  );
}

/* ============================================================
 * Media Item
 * ========================================================== */

interface TeachingGuideMediaItemProps {
  section: TeachingGuideMediaSection;
}

function TeachingGuideMediaItem({ section }: TeachingGuideMediaItemProps) {
  const media = section.Media;

  if (!media?.url) {
    return null;
  }

  const mediaUrl = getMediaUrl(media.url);

  if (!mediaUrl) {
    return null;
  }

  const isVideo = media.mime?.startsWith("video/");

  return (
    <div>
      {/* -------------------------------------------------------
       * Media Title
       * ----------------------------------------------------- */}

      {section.Title && (
        <div className="mb-10">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            {section.Title}
          </h2>

          <div className="mt-4 h-1 w-16 rounded-full bg-(--primary)" />
        </div>
      )}

      {/* -------------------------------------------------------
       * Media
       * ----------------------------------------------------- */}

      <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black/20">
        {isVideo ? (
          <video
            src={mediaUrl}
            controls
            playsInline
            preload="metadata"
            className="h-full w-full object-cover"
          >
            Your browser does not support the video tag.
          </video>
        ) : (
          <Image
            src={mediaUrl}
            alt={media.alternativeText || section.Title || "Teaching guide"}
            fill
            sizes="
              (max-width: 639px) 100vw,
              (max-width: 1279px) 100vw,
              1200px
            "
            className="object-cover"
          />
        )}
      </div>
    </div>
  );
}
