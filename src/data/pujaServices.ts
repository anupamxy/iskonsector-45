import { images } from "./images";

export interface PujaOffering {
  label: string;
  amount: number;
}

export type PujaCategoryIcon = "garland" | "tulsi" | "dryFruits" | "sweets" | "attar" | "deepdan" | "fruits";

export interface PujaOfferingCategory {
  category: string;
  icon: PujaCategoryIcon;
  /** Real seva photography, when we have it — falls back to the icon badge alone otherwise. */
  image?: string;
  items: PujaOffering[];
}

export const pujaServiceInfo = {
  heading: "Sri Sri Radha Gopinath — Puja & Offering Seva",
  intro:
    "Have a puja performed in your name before Sri Sri Radha Gopinath by our temple priests, and add garlands, tulsi leaves, sweets, fruits, or deepdan as a personal offering to the Divine Couple.",
  trustPoints: [
    { title: "Performed by Temple Priests", description: "Every puja and offering is personally performed by our initiated pujaris." },
    { title: "Sankalpa in Your Name", description: "Your name and gotra are announced during the sankalpa before the deities." },
    { title: "Prasadam Blessed for You", description: "Sanctified prasadam from your offering is set aside and can be collected or shared with you." },
    { title: "Confirmation & Updates", description: "You'll receive a WhatsApp or email update once your puja has been performed." },
  ],
  note: "Puja requests submitted before 12:00 PM (IST) are performed the same day. Requests submitted after 12:00 PM are scheduled for the next day's Mangala Arati.",
};

export const pujaOfferingCategories: PujaOfferingCategory[] = [
  {
    category: "Offering of Divine Garland",
    icon: "garland",
    image: images.janmashtami.garlandSeva,
    items: [
      { label: "Marigold Garland", amount: 201 },
      { label: "Tulsi Garland", amount: 251 },
      { label: "Lotus Garland", amount: 401 },
      { label: "Makhana Garland", amount: 501 },
      { label: "Orchid Garland", amount: 501 },
    ],
  },
  {
    category: "Sacred Offering of Tulsi Leaves",
    icon: "tulsi",
    items: [
      { label: "21 Leaves", amount: 101 },
      { label: "51 Leaves", amount: 151 },
      { label: "108 Leaves", amount: 201 },
      { label: "151 Leaves", amount: 301 },
      { label: "251 Leaves", amount: 501 },
    ],
  },
  {
    category: "Divine Dry Fruits Seva",
    icon: "dryFruits",
    items: [
      { label: "Raisins", amount: 201 },
      { label: "Almond", amount: 201 },
      { label: "Cashew", amount: 201 },
      { label: "Walnut", amount: 201 },
      { label: "Pistachio", amount: 251 },
    ],
  },
  {
    category: "Madhur Samarpan — Offering of Special Sweets",
    icon: "sweets",
    image: images.home.sevaMangalaBhoga,
    items: [
      { label: "Brijwasi Peda", amount: 251 },
      { label: "Besan Laddu", amount: 251 },
      { label: "Soan Papdi", amount: 301 },
      { label: "Honey", amount: 301 },
      { label: "Kaju Kesar Barfi", amount: 501 },
    ],
  },
  {
    category: "Divine Fragrance — Attar Seva",
    icon: "attar",
    items: [
      { label: "Rose Attar", amount: 501 },
      { label: "Chandan Attar", amount: 501 },
      { label: "Khus Attar", amount: 501 },
      { label: "Jasmine Attar", amount: 501 },
      { label: "Mogra Attar", amount: 501 },
      { label: "Lavender Attar", amount: 501 },
    ],
  },
  {
    category: "Special Deepdan — Light of Devotion",
    icon: "deepdan",
    items: [
      { label: "3 Deepdan", amount: 151 },
      { label: "5 Deepdan", amount: 251 },
      { label: "7 Deepdan", amount: 351 },
      { label: "9 Deepdan", amount: 451 },
      { label: "11 Deepdan", amount: 551 },
    ],
  },
  {
    category: "Fruits Seva",
    icon: "fruits",
    image: images.janmashtami.fruitsBasket,
    items: [
      { label: "Banana", amount: 151 },
      { label: "Papaya", amount: 201 },
      { label: "Coconut Water", amount: 251 },
      { label: "Nashpati (Pear)", amount: 301 },
      { label: "Kiwi", amount: 301 },
      { label: "Pineapple", amount: 301 },
      { label: "Avacado", amount: 351 },
    ],
  },
];

export const pujaFaqs = [
  {
    question: "How is the puja performed?",
    answer:
      "Your chosen offerings are presented to Sri Sri Radha Gopinath by our temple priests, along with a sankalpa spoken in your name (and gotra, if provided) for the purpose you've mentioned.",
  },
  {
    question: "Do I need to know my gotra?",
    answer:
      "It's helpful but not required. If you don't know your gotra, you can leave it blank or write \"unknown\" — the sankalpa will still be offered in your name.",
  },
  {
    question: "When will my puja be performed?",
    answer:
      "Requests submitted before 12:00 PM (IST) are performed the same day; requests after 12:00 PM are performed the next day, generally around the morning Mangala or Rajbhoga Arati.",
  },
  {
    question: "How do I pay for my offering?",
    answer:
      "After submitting your request, you'll see bank transfer, UPI, and WhatsApp options to complete payment. Our seva desk will confirm your booking once payment is received.",
  },
  {
    question: "Can I book more than one offering at a time?",
    answer:
      "Yes — select as many garlands, sweets, fruits, or deepdan offerings as you'd like. Your total updates automatically as you add items.",
  },
];
