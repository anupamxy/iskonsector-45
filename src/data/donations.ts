export interface SevaTier {
  label: string;
  amount: number;
  description?: string;
  image?: string;
  link?: string;
}

export const deitySeva: SevaTier[] = [
  { label: "Mangala Arti", amount: 501 },
  { label: "Rajbhoga Arti", amount: 501 },
  { label: "Mangala Bhoga", amount: 2001 },
  { label: "Rajbhoga", amount: 5001 },
];

export const foodForLife = {
  tagline:
    "On the most auspicious occasions, serve the Lord and receive His unlimited blessings, prasadam, and a special gift.",
  verse: "यज्ञशिष्टाशिनः सन्तो मुच्यन्ते सर्वकिल्बिषैः",
  verseRef: "Bhagavad Gita 3.13",
  verseTranslation:
    "The devotees of the Lord are released from all kinds of sins because they eat food which is offered first for sacrifice.",
  mealPackages: [
    { label: "50 meals", amount: 2550, link: "https://pages.razorpay.com/pl_OfdMGvDUu4hQLo/view?amount=50" },
    { label: "100 meals", amount: 5100, link: "https://pages.razorpay.com/pl_OfdMGvDUu4hQLo/view?amount=100" },
    { label: "500 meals", amount: 25500, link: "https://pages.razorpay.com/pl_OfdMGvDUu4hQLo/view?amount=500" },
    { label: "1000 meals", amount: 51000, link: "https://pages.razorpay.com/pl_OfdMGvDUu4hQLo/view?amount=1000" },
  ] satisfies SevaTier[],
  customMinimum: 3100,
  feastTypes: [
    { name: "Sudama Feast", items: "Rice, Rajma / Chole" },
    { name: "Pandav Feast", items: "Rice, Rajma / Chole, Sweets, Snacks" },
    {
      name: "Vrindavan Feast",
      items: "Rice, Dal, Paneer Sabji, Chapati & Sweet",
    },
  ],
};

export const lifePatron = {
  heading: "Become a Life Member",
  intro:
    "Life Patron membership is for householders who wish to support Krishna consciousness while continuing their family and professional lives, rather than becoming full-time temple residents.",
  cost: 35555,
  costNote:
    "A one-time donation towards the corpus of the trust, tax-exempt under Section 80-G of the Income Tax Act, 1961.",
  paymentMethods: [
    "Cash",
    "Cheque",
    "Bank Transfer",
    "Internet Payments",
    "Credit & Debit Cards",
  ],
  benefits: [
    "A set of Srimad Bhagavatam Purana books (18 volumes), in English or Hindi",
    "Special invitation to ISKCON festivals like Janmashtami, Ram Navami, and more",
    "A Japa Mala and bead bag for chanting",
    "Income tax exemption under Section 80-G",
    "Free accommodation for three days a year in ISKCON centers worldwide",
    "A personalised hologram card with your photo and patron number",
    "Access to the global directory of ISKCON centers",
  ],
};

export const gitaDaan = {
  heading: "Gita Daan — Give the Gift of Wisdom",
  intro:
    "Help distribute the Bhagavad Gita across schools, colleges, jails, villages, and hospitals — sharing this sacred text is described as one of the highest forms of service in the Gita itself.",
  verseRef: "Bhagavad Gita 18.68",
  pricePerCopy: 230,
  tiers: [
    { label: "5 Bhagavad Gita", amount: 1150 },
    { label: "10 Bhagavad Gita", amount: 2300 },
    { label: "15 Bhagavad Gita", amount: 3450 },
    { label: "32 Bhagavad Gita (1 Box)", amount: 7360 },
    { label: "64 Bhagavad Gita (2 Boxes)", amount: 14720 },
    { label: "96 Bhagavad Gita (3 Boxes)", amount: 22080 },
    { label: "160 Bhagavad Gita (5 Boxes)", amount: 36800 },
    { label: "320 Bhagavad Gita (10 Boxes)", amount: 73600 },
    { label: "800 Bhagavad Gita (25 Boxes)", amount: 184000 },
    { label: "1600 Bhagavad Gita (50 Boxes)", amount: 368000 },
  ] satisfies SevaTier[],
};
