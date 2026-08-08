import { images } from "./images";

export interface Leader {
  name: string;
  title: string;
  image: string;
}

export const founder: Leader = {
  name: "His Divine Grace A.C. Bhaktivedanta Swami Srila Prabhupada",
  title: "Founder Acharya, ISKCON",
  image: images.prabhupada,
};

export const leadership: Leader[] = [
  {
    name: "HH Gopal Krishna Goswami",
    title: "ISKCON GBC & BBT Trustee",
    image: images.gopalKrishnaGoswami,
  },
  {
    name: "HH Guru Prasad Swami",
    title: "ISKCON GBC",
    image: images.guruPrasadSwami,
  },
];

export const iskconHistory = [
  {
    heading: "His Journey from Devotion to Establishing ISKCON",
    body: "Srila Prabhupada founded the International Society for Krishna Consciousness (ISKCON) in 1966 with just two rooms in a storefront in New York City. From that modest beginning, the movement he began has grown to over 700 centers around the world, distributing more than 560 million books and pieces of literature — including the Bhagavad Gita and other sacred Vedic texts — to seekers across the globe.",
  },
  {
    heading: "A Global Movement Rooted in Vedic Culture",
    body: "Srila Prabhupada made Bhakti — the science of loving devotion to the Supreme Lord Sri Krishna — accessible to people of every background. Today the ISKCON movement runs over 65 eco-farms and 110 vegetarian restaurants worldwide, each committed to locally-sourced, organic ingredients and a lifestyle in harmony with Vedic principles.",
  },
  {
    heading: "Glorious Srila Prabhupada",
    body: "A saint was born into the world to disseminate the message of the Supreme Lord Sri Krishna and to spread the knowledge of Sanatan Dharma to every corner of the earth. His life's work continues today through temples, festivals, books, and communities of devotees dedicated to Krishna consciousness.",
  },
];

export const philosophy = {
  heading: "Our Philosophy",
  body: "ISKCON Gurugram, Sector 45 carries forward Srila Prabhupada's mission — preserving and sharing the timeless wisdom of Vedic culture and Sanatan Dharma, and guiding every visitor, of any background, toward a life of devotion, peace, and purpose through the practice of Bhakti Yoga.",
};

export interface Pillar {
  title: string;
  body: string;
}

export const pillars: Pillar[] = [
  {
    title: "We Educate",
    body: "Running schools and educational programs that root children and families in Hindu culture and Vedic values.",
  },
  {
    title: "We Feed",
    body: "Serving sanctified prasadam to the community and promoting Krishna consciousness through daily seva.",
  },
  {
    title: "We Help",
    body: "Building a genuine sense of community through charitable support, counselling, and outreach.",
  },
  {
    title: "We Celebrate",
    body: "Bringing the neighbourhood together through festivals and celebrations throughout the Vaishnava calendar year.",
  },
];
