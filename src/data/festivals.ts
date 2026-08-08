import type { SevaTier } from "./donations";
import { images } from "./images";

export interface ScheduleItem {
  time: string;
  activity: string;
}

export interface Festival {
  slug: string;
  name: string;
  heading: string;
  tagline: string;
  bannerImage?: string;
  /** CSS background-position for the homepage hero crop, e.g. "center 20%". Defaults to "center". */
  bannerPosition?: string;
  /** Show this festival in the homepage hero carousel. Reserved for wide-format banners
   * (consistent aspect ratio) — square/portrait banners look inconsistent stacked there. */
  showInHomeHero?: boolean;
  /** YouTube video ID (not a full URL). When set, plays muted/looping as the page's hero background instead of the static banner. */
  videoId?: string;
  /** Photo URLs — when set (and no videoId), auto-advances as a crossfading hero background instead of the static banner. */
  heroImages?: string[];
  /** ISO date-time string, e.g. "2026-09-04T00:00:00" — only set when a real, confirmed date is known. */
  date?: string;
  /** Set for multi-day festivals — countdown still targets `date`, but the label shows the full range. */
  endDate?: string;
  timeLabel?: string;
  verse?: string;
  verseRef?: string;
  /** A short paragraph on the festival's origin/significance. */
  significance?: string;
  /** Common ways the day is observed (traditional/general, not a fixed hour-by-hour program). */
  howCelebrated?: { title: string; body: string }[];
  /** Fasting (vrat) guidance, as a list of short points. */
  vratVidhi?: string[];
  /** Factual date/panchang details (tithi, nakshatra, muhurat) — label/value pairs. */
  muhurat?: { label: string; value: string }[];
  faqs?: { question: string; answer: string }[];
  schedule?: ScheduleItem[];
  sevaTiers?: SevaTier[];
  extraTiers?: { heading: string; tiers: SevaTier[] }[];
  notes?: string[];
}

export const festivals: Festival[] = [
  {
    slug: "jhulan-yatra",
    name: "Jhulan Yatra",
    heading: "Jhulan Yatra — The Swing Festival",
    tagline: "Come and get the chance to swing the divine couple, Sri Sri Radha Gopinath.",
    bannerImage: images.jhulanYatraBanner,
    date: "2026-08-23T19:30:00",
    endDate: "2026-08-28T21:00:00",
    timeLabel: "7:30 PM – 9:00 PM",
    notes: [
      "During Jhulan Yatra, Sri Sri Radha Gopinath are lovingly placed on a decorated swing each evening, and devotees take turns swinging Them.",
      "The festival is celebrated over five days leading up to Balarama Purnima, a joyful tradition observed across ISKCON temples worldwide.",
    ],
  },
  {
    slug: "balrama-purnima",
    name: "Balarama Purnima",
    heading: "Sri Balarama Purnima",
    tagline: "Celebrating the appearance of Lord Balarama, the first expansion of Sri Krishna and the original spiritual master.",
    bannerImage: images.balramaPurnimaBanner,
    date: "2026-08-28T17:00:00",
    timeLabel: "5:00 PM – 9:00 PM",
    notes: [
      "Lord Balarama is Krishna's elder brother and first expansion, the source of all spiritual masters and the strength behind Krishna's pastimes.",
      "The day is celebrated with kirtan, abhishekam, and prasadam, marking the close of the Jhulan Yatra festivities.",
    ],
  },
  {
    slug: "janmashtami",
    name: "Janmashtami",
    heading: "Sri Krishna Janmashtami",
    tagline:
      "Celebrate the divine appearance of Lord Krishna with kirtans, abhishekam, and blessings.",
    bannerImage: images.janmashtami.banner,
    bannerPosition: "center top",
    showInHomeHero: true,
    heroImages: images.janmashtami.carousel,
    date: "2026-09-04T00:00:00",
    schedule: [
      { time: "Sunrise", activity: "Fast begins" },
      { time: "Evening", activity: "Kirtan & Bhajans" },
      { time: "11:57 PM – 12:43 AM", activity: "Nishita Kaal — Midnight Abhishek" },
      { time: "12:43 AM", activity: "Deity Decoration & Maha Aarti" },
      { time: "After Aarti", activity: "Prasadam & Fast-Breaking" },
      { time: "After 6:01 AM (5 Sep)", activity: "Nandotsav" },
    ],
    verse: "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत। अभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम्॥",
    verseRef: "Bhagavad Gita 4.7",
    significance:
      "Janmashtami celebrates the appearance of Lord Sri Krishna, worshipped as the Supreme Personality of Godhead, over 5,000 years ago in Mathura. Born at midnight to Devaki and Vasudeva, He was carried across the Yamuna to Vrindavan to be raised by Nanda Maharaja and Yashoda, safe from the tyrant king Kamsa. In the Bhagavad Gita, Krishna explains that He appears in this world whenever dharma declines — Janmashtami is the celebration of that descent, and of a life of pastimes that continues to inspire devotion, wisdom, and joy for millions around the world. The exact minute of His appearance is calculated each year from the Vedic calendar as the Nishita Kaal — the middle of the night when the Ashtami tithi meets the Rohini nakshatra — and it's this moment that devotees stay awake to witness with abhishek and arati.",
    muhurat: [
      { label: "Festival", value: "Krishna Janmashtami (Gokulashtami)" },
      { label: "Date", value: "Friday, 4 September 2026" },
      { label: "Nishita Kaal (Midnight) Puja Muhurat", value: "11:57 PM – 12:43 AM (into 5 Sep)" },
      { label: "Vrat Parana (Fast-Breaking Time)", value: "After 6:01 AM, 5 September" },
      { label: "Tithi", value: "Ashtami, Krishna Paksha, Bhadrapada" },
      { label: "Nakshatra", value: "Rohini" },
    ],
    howCelebrated: [
      {
        title: "Fasting Through the Day",
        body: "Devotees observe a fast from sunrise, many taking only fruits, milk, and nuts, as an act of austerity and remembrance leading up to the midnight celebration.",
      },
      {
        title: "Kirtan & Bhajans",
        body: "The temple resounds with continuous chanting of the Hare Krishna maha-mantra and devotional songs glorifying Krishna's pastimes through the day and evening.",
      },
      {
        title: "Midnight Abhishek",
        body: "At the Nishita Kaal — the believed hour of Krishna's appearance — Sri Sri Radha Gopinath are ceremonially bathed with milk, yogurt, honey, ghee, and other sacred offerings.",
      },
      {
        title: "Deity Decoration",
        body: "The deities are dressed in new outfits and adorned with flowers and jewels especially for the occasion, reflecting the joy of the celebration.",
      },
      {
        title: "Breaking the Fast",
        body: "Following the midnight aarti, devotees honor sanctified prasadam together, breaking the day's fast in a spirit of community and gratitude.",
      },
      {
        title: "Nandotsav, the Next Morning",
        body: "Many ISKCON temples continue the celebration into the following morning with Nandotsav — commemorating the joy in Nanda Maharaja's household on Krishna's birth — with kirtan and a festive prasadam feast.",
      },
    ],
    vratVidhi: [
      "The fast is typically observed from sunrise until the Nishita Kaal (midnight), when Krishna's appearance is commemorated.",
      "Grains and beans are usually avoided; fruits, milk, and nuts are commonly taken through the day.",
      "Those unable to keep a full fast are welcome to observe a simpler version, such as eating once in the evening.",
      "The fast is properly broken (parana) only after both the Ashtami tithi and Rohini nakshatra have concluded — typically after sunrise the next morning.",
      "The emphasis is less on physical austerity and more on remembering and glorifying Krishna throughout the day.",
    ],
    faqs: [
      {
        question: "When exactly does Krishna appear, and why does the celebration go past midnight?",
        answer:
          "Krishna's appearance is marked at the Nishita Kaal — this year falling around 11:57 PM to 12:43 AM — the precise moment the Ashtami tithi and Rohini nakshatra align. That's why the main abhishek and aarti happen at midnight rather than earlier in the evening.",
      },
      {
        question: "Do I need to fast on Janmashtami?",
        answer:
          "Fasting is a common and encouraged tradition, but it isn't mandatory to visit or take part in the celebrations. Devotees are welcome regardless of whether they fast.",
      },
      {
        question: "What time should I come for the celebration?",
        answer:
          "Celebrations run through the evening into midnight. Please call or WhatsApp us closer to the day for our exact program timing at the temple.",
      },
      {
        question: "Can I sponsor a seva if I can't attend in person?",
        answer:
          "Yes — every seva on this page can be sponsored online or over WhatsApp, and we'll offer it on your behalf as part of the celebration.",
      },
      {
        question: "Is prasadam served to everyone?",
        answer:
          "Yes, sanctified prasadam is offered to all visitors after the midnight aarti, regardless of whether a seva was sponsored.",
      },
    ],
    sevaTiers: [
      { label: "Arti Thali", amount: 3100, image: images.janmashtami.aartiThali },
      { label: "Bronze Kalash", amount: 7100, image: images.janmashtami.bronzeKalash },
      { label: "Silver Kalash", amount: 11000, image: images.janmashtami.silverKalash },
      { label: "Gold Kalash", amount: 21000, image: images.janmashtami.goldKalash },
      { label: "Platinum Kalash", amount: 31000, image: images.janmashtami.platinumKalash },
    ],
    extraTiers: [
      {
        heading: "Online Abhishek Services",
        tiers: [
          { label: "Flower Seva", amount: 11000, image: images.janmashtami.abhishekam },
          { label: "Garland Seva", amount: 11000, image: images.janmashtami.garlandSeva },
          { label: "Fruits Basket", amount: 2100, image: images.janmashtami.fruitsBasket },
          { label: "Cake (25 kg)", amount: 25000, image: images.govindas.cateringBirthday },
          { label: "Makhan Misri Seva", amount: 31000 },
          { label: "Sadhu Seva", amount: 51000 },
          { label: "Deities Dress", amount: 51000 },
          { label: "Maha Abhishekam", amount: 111000 },
        ],
      },
    ],
  },
  {
    slug: "srila-prabhupada-appearance-day",
    name: "Srila Prabhupada Appearance Day",
    heading: "Celebrating the Divine Arrival of Our Eternal Guide",
    tagline: "Srila Prabhupada Appearance Day — honouring the Founder Acharya of ISKCON with kirtan, offerings, and gratitude.",
    bannerImage: images.prabhupadaAppearanceBanner,
    date: "2026-09-05T10:00:00",
    timeLabel: "10:00 AM – 1:00 PM",
    notes: [
      "His Divine Grace A.C. Bhaktivedanta Swami Srila Prabhupada founded ISKCON in 1966, carrying the teachings of the Bhagavad Gita to the entire world.",
      "Devotees mark this day with kirtan, offerings, and remembrance of his life and teachings, expressing gratitude for his mission of spreading Krishna consciousness.",
    ],
  },
  {
    slug: "radhashtami",
    name: "Radhashtami",
    heading: "Radhashtami — Appearance Day of Srimati Radharani",
    tagline: "She is Love. She is Grace. She is Radharani. Celebrate Her divine appearance with love and devotion.",
    bannerImage: images.radhashtamiBanner,
    showInHomeHero: true,
    heroImages: images.radhashtamiCarousel,
    date: "2026-09-19T17:00:00",
    timeLabel: "5:00 PM – 8:00 PM",
    schedule: [
      { time: "Morning", activity: "Fast begins" },
      { time: "11:01 AM – 1:28 PM", activity: "Madhyahna Kaal — Radha-Krishna Abhishek" },
      { time: "1:28 PM", activity: "Deity Decoration & Maha Aarti" },
      { time: "After Aarti", activity: "Prasadam & Fast-Breaking" },
      { time: "Evening", activity: "Kirtan & Community Celebration" },
    ],
    verse:
      "तप्त-काञ्चन-गौराङ्गी राधे वृन्दावनेश्वरी। वृषभानु-सुते देवी प्रणमामि हरि-प्रिये॥",
    verseRef: "Traditional pranam mantra to Srimati Radharani",
    significance:
      "Radhashtami celebrates the appearance of Srimati Radharani, the eternal consort of Sri Krishna and the embodiment of pure, selfless devotional love (prema). She appeared in Barsana to King Vrishabhanu and Queen Kirtida, and is worshipped as Krishna's closest associate — inseparable from Him, as the moon is from moonlight. The festival falls on Ashtami of Shukla Paksha in the month of Bhadrapada, just over a week after Janmashtami. Unlike Krishna's midnight appearance, Radharani's is celebrated at Madhyahna Kaal — the middle of the day — reflecting Her role as the gentle, embracing energy who leads every soul toward Krishna. Devotees hold that approaching Krishna through Radharani's mercy is the most complete path of devotion, making this day especially dear to Vaishnavas.",
    muhurat: [
      { label: "Festival", value: "Radhashtami (Radha Ashtami)" },
      { label: "Date", value: "Saturday, 19 September 2026" },
      { label: "Madhyahna Kaal Puja Muhurat", value: "11:01 AM – 1:28 PM" },
      { label: "Vrat Parana (Fast-Breaking Time)", value: "After 1:28 PM" },
      { label: "Tithi", value: "Ashtami, Shukla Paksha, Bhadrapada" },
    ],
    howCelebrated: [
      {
        title: "Fasting Until Noon",
        body: "Devotees observe a fast — partial or full, as per capacity — from the morning until the Madhyahna Kaal worship concludes.",
      },
      {
        title: "Kirtan & Bhajans",
        body: "The temple resounds with kirtan and bhajans glorifying Srimati Radharani's boundless love and grace throughout the day.",
      },
      {
        title: "Radha-Krishna Abhishek",
        body: "At Madhyahna Kaal — the midday hour of Her appearance — Sri Sri Radha Gopinath are ceremonially bathed with panchamrit and other sacred offerings.",
      },
      {
        title: "Deity Decoration",
        body: "The deities are adorned in fresh flowers and new outfits befitting Radharani as the Queen of Vrindavan.",
      },
      {
        title: "Breaking the Fast",
        body: "Following the midday aarti, devotees honor sanctified prasadam together, breaking the fast in a spirit of gratitude.",
      },
      {
        title: "Evening Celebration",
        body: "Many devotees join the temple again in the evening for community kirtan and celebration, continuing the day's festive spirit.",
      },
    ],
    vratVidhi: [
      "Devotees may observe a Nirjala (waterless), Phalahar (fruits, milk, and nuts), or Satvik (simple vegetarian) fast, according to their capacity.",
      "Tamasic foods — onion, garlic, alcohol, and non-vegetarian items — are avoided through the day.",
      "Worship centers on Madhyahna Kaal (midday), not midnight, reflecting Radharani's own gentle and embracing nature.",
      "The fast is properly broken (parana) only after the midday abhishek and aarti have concluded.",
      "As with Janmashtami, the emphasis is less on austerity and more on remembering and glorifying Radharani throughout the day.",
    ],
    faqs: [
      {
        question: "Why is Radhashtami celebrated at noon instead of midnight like Janmashtami?",
        answer:
          "Krishna's appearance is marked at midnight (Nishita Kaal), while Radharani's is marked at Madhyahna Kaal — midday. This year that window falls around 11:01 AM to 1:28 PM, which is when the main abhishek and aarti take place.",
      },
      {
        question: "Do I need to fast on Radhashtami?",
        answer:
          "Fasting is a common and encouraged tradition, but it isn't mandatory to visit or take part in the celebrations. Devotees are welcome regardless of whether they fast.",
      },
      {
        question: "What time should I come for the celebration?",
        answer:
          "The main puja is at midday, and the temple also holds an evening community celebration from around 5:00 PM. Please call or WhatsApp us closer to the day for our exact program timing.",
      },
      {
        question: "Can I sponsor a seva if I can't attend in person?",
        answer:
          "Yes — every seva on this page can be sponsored online or over WhatsApp, and we'll offer it on your behalf as part of the celebration.",
      },
      {
        question: "Is prasadam served to everyone?",
        answer:
          "Yes, sanctified prasadam is offered to all visitors after the midday aarti, regardless of whether a seva was sponsored.",
      },
    ],
  },
  {
    slug: "ram-navami",
    name: "Ram Navami",
    heading: "Ram Navami Celebrations",
    tagline: "Celebrating the divine appearance of Lord Sri Rama.",
    bannerImage: images.ramNavamiBanner,
    verse:
      "रामाय रामभद्राय रामचन्द्राय वेधसे। रघुनाथाय नाथाय सीतायाः पतये नमः॥",
    verseRef: "Traditional invocation to Sri Rama",
    schedule: [
      { time: "5:00 PM", activity: "Kirtan" },
      { time: "6:00 PM", activity: "Abhishekam" },
      { time: "7:00 PM", activity: "Ram Katha by HG Sundar Gopal Prabhuji" },
      { time: "8:00 PM", activity: "Maha Aarti" },
      { time: "8:30 PM", activity: "Sumptuous Feast Prasadam" },
    ],
    sevaTiers: [
      { label: "Maha-Bhandara", amount: 41000 },
      { label: "Flower Decoration", amount: 15000 },
      { label: "Maha-Abhishekam", amount: 5100 },
      { label: "56 Bhoga", amount: 7100 },
      { label: "Juice for Visitors", amount: 5100 },
      { label: "Fruits Seva", amount: 3100 },
      { label: "Juice Seva", amount: 2100 },
      { label: "Garland Seva", amount: 1100 },
    ],
  },
  {
    slug: "rath-yatra",
    name: "Rath Yatra",
    heading: "Sri Sri Jagannath Rath Yatra",
    tagline:
      "The chariot festival of Lord Jagannath, Baladeva, and Subhadra Devi, celebrated annually in Gurugram Sector 45.",
    bannerImage: images.rathYatra.banner,
    notes: [
      "The three deities — Jagannath, Baladeva, and Subhadra — parade through the streets, symbolising Their return to Vrindavan.",
      "Witnessing the Rath Yatra is described in scripture as leading the soul toward Vaikuntha, the abode of Vishnu.",
      "Bhagavad Gita 2.40 speaks to the protective benefit of sincere service and effort.",
      "Srimad Bhagavatam 10.11.11 illustrates the miraculous multiplication of gifts offered in devotion.",
      "Srimad Bhagavatam 10.22.35 calls devotees to perform welfare activities for the benefit of others.",
      "Exact dates are announced closer to the festival each year — contact the temple or follow our social channels for this year's schedule.",
    ],
  },
];

export function getFestival(slug: string) {
  return festivals.find((f) => f.slug === slug);
}
