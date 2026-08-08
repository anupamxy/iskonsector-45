import { images } from "./images";

export interface GalleryCategory {
  title: string;
  description: string;
  images: string[];
}

export const galleryCategories: GalleryCategory[] = [
  {
    title: "Janmashtami Highlights",
    description: "Kirtans, abhishekam, and midnight celebrations for Lord Krishna's appearance day.",
    images: images.galleryJanmashtami,
  },
  {
    title: "Deity Darshan & Temple Life",
    description: "Sri Sri Radha Gopinath and everyday life at the temple.",
    images: images.galleryTemple.slice(0, 4),
  },
  {
    title: "Festival Celebrations",
    description: "Community gatherings and celebrations through the year.",
    images: images.galleryTemple.slice(4, 8),
  },
  {
    title: "Kirtan & Community",
    description: "Devotees coming together in chanting, seva, and prasadam.",
    images: images.galleryTemple.slice(8, 10),
  },
];

export const videoHighlights = {
  heading: "Festival Video Highlights",
  body: "Watch highlights from our festivals and kirtans on our YouTube channel.",
};
