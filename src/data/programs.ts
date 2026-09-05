export const dyph = {
  fullName: "Discover Your Permanent Happiness",
  intro:
    "A 6-week youth certificate course held on Sundays at the temple, open to anyone above the age of 20, irrespective of background or experience.",
  eligibility: "Anyone aged 20 and above is welcome to join, regardless of background or experience.",
  format: "6 weekly sessions, held on Sundays, offline at the temple.",
  inclusion: "Prasadam / a full meal is served after every session.",
  registerLink: "https://tinyurl.com/2xqmgmuv",
  sessions: [
    { title: "Science of Happiness" },
    { title: "Healthy Relationships" },
    { title: "Work Life Balance" },
    { title: "Why Bad Things Happen to Good People" },
    { title: "Yoga for the Modern Age" },
    { title: "The Art of Self Management" },
  ],
  testimonials: [
    {
      quote:
        "The practical application of the Gita's wisdom in the DYPH course gave me clarity on my life's purpose and reduced my anxiety. It's a must for anyone seeking true fulfillment.",
      name: "Parth Mittal",
      role: "B.Tech - IIT Delhi | Product Manager",
    },
    {
      quote:
        "DYPH's practical strategies helped align my personal and professional life, improving both my productivity and relationships. A must-try for real transformation.",
      name: "Divyani Mehta",
      role: "Senior Actuarial Analyst | FII, AIAI",
    },
    {
      quote:
        "DYPH cleared my long-held confusion and gave me a new way of thinking. I feel much more relaxed and closer to God now, with many persistent doubts resolved.",
      name: "Hardik Jaiswal",
      role: "Management Consultant @Accenture Strategy | IIM Mumbai",
    },
    {
      quote:
        "The DYPH course provided a great foundation for my spiritual journey. I gained a faith backed by scriptures, a methodical practice, and guidance that has helped me tame my anger and attachment issues.",
      name: "Neha Noopur",
      role: "Regional Head @ SureWaves MediaTech",
    },
  ],
};

export interface MenuItem {
  name: string;
  price: number;
  items?: string;
}

export const govindasOnWheel = {
  intro:
    "Special, purely vegetarian food (offered to the Lord) delivered to your doorstep — a taste of Govinda's, right at home.",
  hours: "5:00 PM – 9:00 PM, daily",
  deliveryRadius: "Home delivery available up to 2 km",
  menu: {
    "South Indian": [
      { name: "Plain Dosa", price: 75 },
      { name: "Masala Dosa", price: 85 },
      { name: "Paneer Masala Dosa", price: 115 },
      { name: "Butter Masala Dosa", price: 90 },
      { name: "Idli Sambar", price: 55 },
    ] as MenuItem[],
    Chinese: [
      { name: "Veg Noodles", price: 105 },
      { name: "Manchurian", price: 130 },
      { name: "Chilli Paneer", price: 160 },
      { name: "Samosa", price: 15 },
      { name: "Fried Rice", price: 110 },
    ] as MenuItem[],
    "Special Thali": [
      {
        name: "Govinda Special Thali",
        price: 160,
        items: "Shahi Paneer, Mix Veg, Dal Makhani, Jeera Rice, Tawa Roti (4), Gulab Jamun",
      },
    ] as MenuItem[],
  },
  catering: [
    "Birthday",
    "Kuan Pujan",
    "Marriage",
    "Welcome Baby",
    "Anniversary",
  ],
};

export interface GiftCategory {
  title: string;
  description: string;
}

export const giftShopCategories: GiftCategory[] = [
  {
    title: "Spiritual Items",
    description:
      "Divine deities and photo frames, aarti essentials, and sacred lockets.",
  },
  {
    title: "Meditative Tools",
    description: "Japa beads, counters, and bead bags for chanting.",
  },
  {
    title: "Natural Products",
    description:
      "Authentic cow products, herbal teas, drinks, honey, and rose water.",
  },
  {
    title: "Ritual Items",
    description: "Ganga Jal, enchanting scents, and ritualistic conch shells.",
  },
  {
    title: "Clothing",
    description:
      "Elegant clothing, deity dresses, traditional dhotis, and stylish kurtas.",
  },
  {
    title: "Accessories",
    description: "Ethnic shoulder bags and deity jewelry.",
  },
  {
    title: "Ceremonial Objects",
    description: "Majestic peacock fans and other ceremonial articles.",
  },
];
