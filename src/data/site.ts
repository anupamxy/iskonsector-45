import { visibleFestivals } from "./festivals";

export const siteInfo = {
  name: "ISKCON Gurugram, Sector 45",
  templeName: "Sri Sri Radha Gopinath Mandir",
  welcomeMessage: "Sri Sri Radha Gopinath Temple Welcomes You",
  darshanTimings: "4:30 AM – 9:00 PM",
  /** Actual open windows, including the midday break — drives the live "Open Now" /
   * "Closed Now" status. Keep in sync with DailySchedule's morning/evening timings. */
  darshanWindows: [
    { open: "4:30 AM", close: "1:00 PM" },
    { open: "4:15 PM", close: "9:00 PM" },
  ],
  tagline:
    "A serene temple dedicated to Lord Krishna and spiritual awakening — join us for kirtans, abhishekam, and blessings.",
  description:
    "ISKCON Gurugram, Sector 45 is a spiritual sanctuary dedicated to spreading the timeless wisdom of the Bhagavad Gita, nurturing devotion through seva, festivals, and kirtan, and guiding souls toward Krishna consciousness.",
  address: {
    line1: "Plot No 0, near Delhi Public School",
    line2: "Sector 45, Block C, Uday Nagar",
    city: "Gurugram",
    state: "Haryana",
    pincode: "122003",
    full: "Plot No 0, near Delhi Public School, Sector 45, Block C, Uday Nagar, Sector 45, Gurugram, Haryana 122003",
  },
  phones: {
    primary: "+91 93117 67088",
    primaryTel: "+919311767088",
    secondary: "+91 78887 85681",
    secondaryTel: "+917888785681",
  },
  sevaDesk: {
    phone: "+91 98186 34115",
    phoneTel: "+919818634115",
    hours: "Monday–Saturday, 9:00 AM–6:00 PM",
    note: "Seva & donations desk",
  },
  whatsapp: {
    number: "+91 78887 85681",
    tel: "917888785681",
    link: "https://wa.me/917888785681",
    groupLink: "https://chat.whatsapp.com/D5hnoFh9srMAuzJwtHMTzz",
  },
  donateLink: "https://rzp.io/rzp/6KR43FFN",
  email: "iskcongurugram.sec45@gmail.com",
  mapsUrl: "https://maps.app.goo.gl/9aW5jhTP4fCjeLJQ8",
  mapsEmbedQuery: "ISKCON Sector 45 Gurugram",
  social: {
    facebook: "https://www.facebook.com/share/1Ch1jsKxdX/?mibextid=wwXIfr",
    instagram: "https://www.instagram.com/iskcongurugram45",
    youtube: "https://www.youtube.com/channel/UCT0Bz5LmtYHp0LjtNyYBcjQ",
  },
  bank: {
    accountHolder: "ISKCON",
    bankName: "HDFC Bank Ltd",
    accountNumber: "50100058031762",
    ifsc: "HDFC0000090",
  },
  taxExemption: {
    section: "80-G",
    refNo: "AAATI0017PF20219",
    note: "Tax exemption available under the Income Tax Act, 1961.",
  },
  copyright: `© ${new Date().getFullYear()} ISKCON Gurugram, Sector 45. All rights reserved.`,
} as const;

export interface NavChild {
  label: string;
  to: string;
}

export interface NavItem {
  label: string;
  to?: string;
  children?: NavChild[];
}

export const primaryNav: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Daily Darshan", to: "/daily-darshan" },
  {
    label: "Temple & Seva",
    to: "/temple",
    children: [
      { label: "Food For Life", to: "/food-for-life" },
      // { label: "Govinda's On Wheel", to: "/govindas-on-wheel" },
      { label: "Life Patron", to: "/life-patron" },
      { label: "DYPH", to: "/dyph" },
      { label: "Gita Daan", to: "/gita-daan" },
    ],
  },
  {
    label: "Festivals",
    to: "/festivals",
    children: visibleFestivals.map((festival) => ({
      label: festival.name,
      to: `/festivals/${festival.slug}`,
    })),
  },
  {
    label: "Explore",
    children: [
      { label: "Gift Shop", to: "/gift-shop" },
      { label: "Lecture Videos", to: "/lecture-videos" },
      { label: "FAQ", to: "/faq" },
    ],
  },
  { label: "Contact", to: "/contact" },
];

export const footerNav = {
  explore: [
    { label: "About Us", to: "/about" },
    { label: "Temple & Seva", to: "/temple" },
    { label: "Festivals", to: "/festivals" },
    { label: "Lecture Videos", to: "/lecture-videos" },
    { label: "FAQ", to: "/faq" },
  ],
  involved: [
    { label: "Donate", to: siteInfo.donateLink },
    { label: "Life Patron", to: "/life-patron" },
    { label: "Gita Daan", to: "/gita-daan" },
    { label: "DYPH", to: "/dyph" },
    { label: "Gift Shop", to: "/gift-shop" },
  ],
  legal: [
    { label: "Privacy Policy", to: "/privacy-policy" },
    { label: "Terms & Conditions", to: "/terms-and-conditions" },
    { label: "Cookie Policy", to: "/cookie-policy" },
    { label: "Refund Policy", to: "/refund-policy" },
  ],
};

export const mobileAppBar = [
  { label: "Home", to: "/", icon: "home" },
  { label: "Temple", to: "/temple", icon: "temple" },
  { label: "Donate", to: "/donate", icon: "donate" },
  { label: "Festivals", to: "/festivals", icon: "festival" },
  { label: "Contact", to: "/contact", icon: "contact" },
] as const;
