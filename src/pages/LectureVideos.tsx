import { useState } from "react";
import { createPortal } from "react-dom";
import { BookOpen, Music, PartyPopper, Play, X, Loader2, VideoOff } from "lucide-react";
import PageHero from "../components/ui/PageHero";
import SectionHeading from "../components/ui/SectionHeading";
import Reveal from "../components/ui/Reveal";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { YoutubeIcon } from "../components/ui/SocialIcons";
import { siteInfo } from "../data/site";
import { images } from "../data/images";
import { useYoutubeChannelVideos } from "../lib/useYoutubeChannelVideos";

const topics = [
  { icon: BookOpen, title: "Bhagavad Gita Classes", body: "Explaining the Gita's teachings for everyday life." },
  { icon: Music, title: "Kirtan & Bhajans", body: "Recorded chanting sessions from the temple." },
  { icon: PartyPopper, title: "Festival Recordings", body: "Highlights from Janmashtami, Ram Navami, and more." },
];

function formatVideoDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default function LectureVideos() {
  const { videos, loading, loadingMore, error, hasMore, loadMore } = useYoutubeChannelVideos(
    siteInfo.social.youtubeChannelId,
  );
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  return (
    <div>
      <PageHero
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Lecture Videos" }]}
        eyebrow="Wisdom & Kirtan"
        title="Lecture Videos"
        subtitle="Our full video library lives on YouTube — Bhagavad Gita classes, kirtans, and festival recordings, updated regularly."
        images={[{ src: images.pageHero.lectureVideos, position: "center 15%" }]}
      />

      <section className="section-pad">
        <div className="container-page">
          <SectionHeading eyebrow="Watch & Listen" title="Our Lecture Videos" />

          {loading && (
            <div className="flex flex-col items-center gap-3 py-16 text-muted">
              <Loader2 size={28} className="animate-spin text-primary" />
              <p className="text-sm">Loading videos from our YouTube channel…</p>
            </div>
          )}

          {!loading && error && (
            <div className="mx-auto flex max-w-md flex-col items-center gap-3 rounded-[var(--radius-card)] border-2 border-dashed border-hairline py-16 text-center text-muted">
              <VideoOff size={28} />
              <p className="text-sm">Couldn't load videos right now — watch them directly on our channel instead.</p>
              <Button href={siteInfo.social.youtube} target="_blank" rel="noopener noreferrer" variant="outline">
                <YoutubeIcon size={18} /> Visit Our YouTube Channel
              </Button>
            </div>
          )}

          {!loading && !error && (
            <>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {videos.map((video, i) => (
                  <Reveal key={video.id} delay={Math.min(i, 10) * 70} className="h-full">
                    <button
                      type="button"
                      onClick={() => setActiveVideoId(video.id)}
                      className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] bg-white text-left shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]"
                    >
                      <div className="relative aspect-video w-full overflow-hidden bg-cream-alt">
                        <img
                          src={video.thumbnail}
                          alt=""
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                        />
                        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-primary">
                            <Play size={20} fill="currentColor" />
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        <h4 className="line-clamp-2 text-sm font-semibold text-ink">{video.title}</h4>
                        <p className="mt-auto pt-3 text-xs text-muted">{formatVideoDate(video.publishedAt)}</p>
                      </div>
                    </button>
                  </Reveal>
                ))}
              </div>

              {hasMore && (
                <div className="mt-10 text-center">
                  <Button onClick={loadMore} disabled={loadingMore} variant="outline">
                    {loadingMore ? (
                      <>
                        <Loader2 size={16} className="animate-spin" /> Loading…
                      </>
                    ) : (
                      "Load More Videos"
                    )}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <section className="section-pad bg-cream-alt">
        <div className="container-page">
          <SectionHeading eyebrow="What You'll Find" title="Explore Our Video Library" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {topics.map(({ icon: Icon, title, body }) => (
              <Card key={title} className="p-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon size={22} />
                </span>
                <h4 className="mt-4 text-lg text-ink">{title}</h4>
                <p className="mt-2 text-sm text-muted">{body}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-gradient-to-br from-ink to-ink-deep text-center text-white">
        <div className="container-page">
          <h2 className="text-[clamp(1.9rem,3.4vw,2.7rem)] text-white">Watch on YouTube</h2>
          <p className="mx-auto mt-3 max-w-md text-white/70">
            Subscribe to our channel for new lectures, kirtans, and live darshan.
          </p>
          <div className="mt-8">
            <Button href={siteInfo.social.youtube} target="_blank" rel="noopener noreferrer" size="lg">
              <YoutubeIcon size={18} /> Visit Our YouTube Channel
            </Button>
          </div>
        </div>
      </section>

      {activeVideoId &&
        createPortal(
          <div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-ink-deep/90 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            onClick={() => setActiveVideoId(null)}
          >
            <button
              type="button"
              onClick={() => setActiveVideoId(null)}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <X size={20} />
            </button>
            <div
              className="aspect-video w-full max-w-3xl overflow-hidden rounded-[var(--radius-card)] bg-black shadow-[0_30px_80px_-20px_rgba(0,0,0,0.65)]"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
