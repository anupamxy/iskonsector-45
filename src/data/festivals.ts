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
  /** A pre-designed poster/graphic (own baked-in text) — when set, the festival detail page
   * shows it clean at the top with no overlay, and moves the title/date/CTA content to a
   * plain section below it instead of overlaying it on the hero. */
  posterImage?: string;
  /** Show this festival in the homepage hero carousel. Reserved for wide-format banners
   * (consistent aspect ratio) — square/portrait banners look inconsistent stacked there. */
  showInHomeHero?: boolean;
  /** YouTube video ID (not a full URL). When set, plays muted/looping as the page's hero background instead of the static banner. */
  videoId?: string;
  /** Photos — when set (and no videoId), auto-advances as a crossfading hero background instead of the static banner. */
  heroImages?: { src: string; position?: string; fit?: "cover" | "contain" }[];
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
    showInHomeHero: true,
    heroImages: images.jhulanYatraCarousel,
    date: "2026-08-23T19:30:00",
    endDate: "2026-08-28T21:00:00",
    timeLabel: "7:30 PM – 9:00 PM",
    significance:
      "Jhulan Yatra, also known as Hindola Utsav, celebrates one of the sweetest of Radha and Krishna's pastimes — swinging together beneath flowering vines in the rain-washed forests of Vrindavan during the monsoon month of Shravana. The festival begins on Shravana Shukla Ekadashi and continues for five days, climaxing on Shravana Purnima, the same day Lord Balarama's appearance is celebrated. In accordance with Srila Prabhupada's instruction, ISKCON temples observe all five days, decorating a swing with flowers and greenery each evening for Sri Sri Radha Gopinath. What makes the festival especially cherished is Jhulan Seva — every visitor is welcomed to personally swing the deities, a simple and joyful act of devotional service.",
    muhurat: [
      { label: "Festival", value: "Jhulan Yatra (Hindola Utsav)" },
      { label: "Dates", value: "Sunday, 23 August – Friday, 28 August 2026" },
      { label: "Tithi Span", value: "Shravana, Shukla Paksha — Ekadashi to Purnima" },
      { label: "Daily Seva Time", value: "7:30 PM – 9:00 PM" },
      { label: "Culminates With", value: "Balarama Purnima (28 August)" },
    ],
    howCelebrated: [
      {
        title: "Decorating the Swing",
        body: "Each evening, a swing is lovingly decorated with flowers, vines, and lights for Sri Sri Radha Gopinath, recreating the monsoon bowers of Vrindavan.",
      },
      {
        title: "Jhulan Seva",
        body: "Every devotee present is given the opportunity to personally swing the deities — an intimate, hands-on act of devotional service.",
      },
      {
        title: "Kirtan & Bhajans",
        body: "The five evenings are filled with kirtan and songs glorifying Radha and Krishna's swinging pastimes together.",
      },
      {
        title: "Five Days, Per Tradition",
        body: "ISKCON temples observe the festival across all five days from Ekadashi to Purnima, following Srila Prabhupada's own instruction.",
      },
      {
        title: "Leading into Balarama Purnima",
        body: "The final evening of Jhulan Yatra falls on the same day as Lord Balarama's appearance, making it a doubly festive close.",
      },
    ],
    faqs: [
      {
        question: "Do I really get to swing the deities myself?",
        answer:
          "Yes — this is what makes Jhulan Yatra special. Every visitor who comes during the seva window is welcomed to gently swing Sri Sri Radha Gopinath as an act of devotion.",
      },
      {
        question: "Do I need to fast during Jhulan Yatra?",
        answer:
          "No, Jhulan Yatra isn't a fasting occasion — it's a joyous celebration. Just come by any evening during the five days.",
      },
      {
        question: "What time should I come?",
        answer:
          "The swing seva and kirtan run from 7:30 PM to 9:00 PM each evening, 23 through 28 August.",
      },
      {
        question: "Can I sponsor flowers or decoration for the swing?",
        answer:
          "Yes — reach out to us on WhatsApp or in person at the temple and we'll be glad to arrange it on your behalf.",
      },
    ],
  },
  {
    slug: "balrama-purnima",
    name: "Balarama Purnima",
    heading: "Sri Balarama Purnima",
    tagline: "Celebrating the appearance of Lord Balarama, the first expansion of Sri Krishna and the original spiritual master.",
    bannerImage: images.balramaPurnimaBanner,
    showInHomeHero: true,
    heroImages: images.balramaPurnimaCarousel,
    date: "2026-08-28T18:00:00",
    timeLabel: "6:00 PM – 9:00 PM",
    significance:
      "Lord Balarama is Sri Krishna's elder brother and His first bodily expansion — Baladeva, or Sankarshana — revered in the Vaishnava tradition as the original spiritual master, the very source from which the entire disciplic succession of gurus descends. He embodies bala, spiritual strength, and stands as Krishna's constant companion and protector through the pastimes of Vrindavan and Dwaraka. Balarama Purnima, observed on the full-moon day of Shravana, marks His divine appearance and falls on the very evening the five-day Jhulan Yatra festival concludes — doubling the day's celebration. Devotees pray to Him for the steadiness and strength needed to remain fixed in spiritual life.",
    muhurat: [
      { label: "Festival", value: "Balarama Purnima" },
      { label: "Date", value: "Friday, 28 August 2026" },
      { label: "Tithi", value: "Purnima, Shukla Paksha, Shravana" },
      { label: "Tithi Window", value: "Begins 9:08 AM, 27 Aug — Ends 9:48 AM, 28 Aug" },
      { label: "Evening Celebration", value: "6:00 PM – 9:00 PM" },
      { label: "Coincides With", value: "Culmination of Jhulan Yatra" },
    ],
    howCelebrated: [
      {
        title: "Fasting Till Noon",
        body: "Devotees observe a fast, partial or full as per capacity, until midday, breaking it after the day's worship.",
      },
      {
        title: "Abhishekam",
        body: "The deities are ceremonially bathed in honor of Lord Balarama's appearance.",
      },
      {
        title: "Kirtan & Sankirtan",
        body: "Congregational chanting and kirtan mark the evening celebration, glorifying Balarama's strength and service to Krishna.",
      },
      {
        title: "Offering White Flowers & Dairy",
        body: "White flowers and milk-based sweets, especially dear to Balarama, are offered to the deities.",
      },
      {
        title: "Prayers for Strength",
        body: "Devotees pray to Him for the bala — the spiritual strength — needed to remain steady and fixed in devotional life.",
      },
    ],
    vratVidhi: [
      "The fast is typically kept until noon, or as per one's capacity.",
      "Grains and beans are usually avoided; fruits, milk, and nuts are commonly taken.",
      "The fast is broken after the day's worship concludes, ahead of the evening celebration.",
      "The emphasis is on remembering Balarama's strength, service, and protection, more than on strict austerity.",
    ],
    faqs: [
      {
        question: "Who is Lord Balarama?",
        answer:
          "He is Sri Krishna's elder brother and first expansion, worshipped as the original spiritual master and the source of the entire guru-disciple succession in Vaishnava tradition.",
      },
      {
        question: "Why does this fall on the same day Jhulan Yatra ends?",
        answer:
          "Both are tied to the same tithi — Shravana Purnima, the full-moon day. Jhulan Yatra's five days conclude on this Purnima, which is also Balarama's appearance day.",
      },
      {
        question: "Do I need to fast?",
        answer:
          "Fasting until noon is a common and encouraged tradition, but it isn't mandatory to visit or take part in the celebrations.",
      },
      {
        question: "What time should I come?",
        answer:
          "The main celebration runs from 6:00 PM to 9:00 PM on 28 August. Please call or WhatsApp us closer to the day to confirm timing.",
      },
      {
        question: "Can I sponsor a seva if I can't attend in person?",
        answer:
          "Yes — reach out to us on WhatsApp or in person at the temple and we'll be glad to offer a seva on your behalf.",
      },
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
    posterImage: images.janmashtami.banner,
    showInHomeHero: true,
    heroImages: images.janmashtami.carousel,
    date: "2026-09-04T00:00:00",
    schedule: [
      { time: "4:30 AM", activity: "Mangala Aarti" },
      { time: "7:30 AM", activity: "Special Sringar Darshan" },
      { time: "8:00 AM", activity: "Krishna Katha" },
      { time: "Entire Day", activity: "Kirtan & Bhajans" },
      { time: "11:00 PM", activity: "Maha Abhishek" },
      { time: "12:00 AM", activity: "56 Bhoga Offerings" },
      { time: "12:30 AM", activity: "Maha Aarti" },
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
      { label: "Aarti Thali", amount: 5100, image: images.janmashtami.aartiThali, link: "https://rzp.io/l/n4Ditv9" },
      { label: "Bronze Kalash Seva", amount: 11000, image: images.janmashtami.bronzeKalash, link: "https://rzp.io/l/1REi3xQfPv" },
      { label: "Silver Kalash Seva", amount: 21000, image: images.janmashtami.silverKalash, link: "https://rzp.io/l/wWdjIjyJ" },
      { label: "Gold Kalash Seva", amount: 31000, image: images.janmashtami.goldKalash, link: "https://rzp.io/l/bo7gfN8fY" },
      { label: "Platinum Kalash Seva", amount: 41000, image: images.janmashtami.platinumKalash, link: "https://rzp.io/l/Au18t1dP" },
    ],
    extraTiers: [
      {
        heading: "Offer Your Love",
        tiers: [
          { label: "Flower Seva", amount: 1100, image: images.janmashtami.flowerSeva, link: "https://rzp.io/l/pVYC12BtTf" },
          { label: "Garland Seva", amount: 5000, image: images.janmashtami.garlandSeva, link: "https://rzp.io/l/hGMTVCiWc" },
          { label: "Fruits Basket", amount: 3100, image: images.janmashtami.fruitsBasket, link: "https://pages.razorpay.com/pl_HgnHr7Eynf0eqn/view" },
          { label: "Cake (25 kg)", amount: 31000, image: images.janmashtami.cakeSeva, link: "https://pages.razorpay.com/pl_Hgnai8ksOFVS4Z/view" },
          { label: "Makhan Misri Seva", amount: 51000, image: images.janmashtami.makhanMisri, link: "https://pages.razorpay.com/pl_HgyDtwfSqLzdIm/view" },
          { label: "Deities Dress", amount: 300000, image: images.janmashtami.deitiesDress, link: "https://pages.razorpay.com/pl_HgnPfEr3dzGCv4/view" },
          { label: "Maha Abhishekam", amount: 111000, image: images.janmashtami.mahaAbhishekam, link: "https://pages.razorpay.com/pl_HoeIuXSpAEUolb/view" },
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
    showInHomeHero: true,
    heroImages: images.prabhupadaAppearanceCarousel,
    date: "2026-09-05T10:00:00",
    timeLabel: "10:00 AM – 1:00 PM",
    verse: "नमो ॐ विष्णुपादाय कृष्णप्रेष्ठाय भूतले। श्रीमते भक्तिवेदान्तस्वामिन् इति नामिने॥",
    verseRef: "Pranam mantra offered to Srila Prabhupada",
    significance:
      "His Divine Grace A.C. Bhaktivedanta Swami Prabhupada, Founder-Acharya of ISKCON, appeared in this world on 1 September 1896 in Calcutta. By the Vedic calendar his birth falls on Krishna Paksha Navami of Bhadrapada — the tithi of Nandotsava, the day after Janmashtami, when Nanda Maharaja celebrated the birth of his son Krishna. At age 69, carrying little more than a few rupees, a set of Srimad Bhagavatam volumes, and faith in his own spiritual master's order, he sailed alone to America in 1965 and founded ISKCON the following year. In the twelve years that remained to him, he circled the globe fourteen times, wrote more than eighty books, and established a worldwide movement of temples carrying the teachings of Krishna consciousness that continues to grow today. Disciples mark his appearance day as Vyasa-puja — an offering of gratitude and glorification to the spiritual master as the representative of Srila Vyasadeva, compiler of the Vedic scriptures. This year's observance, on 5 September 2026, marks his 130th appearance anniversary.",
    muhurat: [
      { label: "Festival", value: "Srila Prabhupada's Appearance Day (Vyasa-puja)" },
      { label: "Date", value: "Saturday, 5 September 2026" },
      { label: "Anniversary", value: "130th Appearance Day" },
      { label: "Tithi", value: "Navami, Krishna Paksha, Bhadrapada" },
      { label: "Falls On", value: "The day after Janmashtami's Nandotsav" },
      { label: "Celebration Time", value: "10:00 AM – 1:00 PM" },
    ],
    howCelebrated: [
      {
        title: "Fasting Till Noon",
        body: "Devotees observe a fast until the late-morning worship and offering conclude.",
      },
      {
        title: "Kirtan & Glorification",
        body: "The temple resounds with kirtan and talks on Srila Prabhupada's life, teachings, and mission.",
      },
      {
        title: "Vyasa-puja Offering",
        body: "A formal ceremony offers worship, flowers, and homages to the spiritual master, in the tradition of honoring one's guru as Vyasadeva's representative.",
      },
      {
        title: "Written Homages",
        body: "Devotees around the world submit written homages, compiled into that year's Vyasa-puja offering.",
      },
      {
        title: "Prasadam Feast",
        body: "The celebration concludes with devotees honoring sanctified prasadam together in gratitude.",
      },
    ],
    vratVidhi: [
      "Devotees typically fast until the late-morning offering and worship conclude.",
      "The day centers on remembrance and gratitude for Srila Prabhupada's life and mission, more than on strict austerity.",
      "Those unable to keep a full fast are welcome to observe a simpler version, or none at all — participation matters more than austerity.",
    ],
    faqs: [
      {
        question: "Why is it called Vyasa-puja?",
        answer:
          "Vyasa-puja is the traditional offering of worship to one's spiritual master, honored as the living representative of Srila Vyasadeva, the compiler of the Vedic scriptures. It's observed on the appearance day of a guru in the disciplic succession.",
      },
      {
        question: "Who was Srila Prabhupada?",
        answer:
          "His Divine Grace A.C. Bhaktivedanta Swami Prabhupada founded ISKCON in New York in 1966, at age 69, after sailing from Calcutta the year before. He spent the rest of his life establishing temples and translating Vedic scripture worldwide.",
      },
      {
        question: "Do I need to fast on this day?",
        answer:
          "Fasting until the late-morning worship is a common tradition, but it isn't mandatory to visit or take part in the celebrations.",
      },
      {
        question: "What time should I come for the celebration?",
        answer:
          "The main program runs from 10:00 AM to 1:00 PM on 5 September. Please call or WhatsApp us closer to the day to confirm timing.",
      },
      {
        question: "Can I submit a homage or sponsor a seva?",
        answer:
          "Yes — reach out to us on WhatsApp or in person at the temple, and we'll be glad to include your homage or arrange a seva on your behalf.",
      },
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
    date: "2026-09-19T04:30:00",
    timeLabel: "4:30 AM – 8:30 PM",
    schedule: [
      { time: "4:30 AM", activity: "Mangala Aarti" },
      { time: "7:30 AM", activity: "Special Darshan" },
      { time: "5:00 PM", activity: "Kirtan" },
      { time: "6:00 PM", activity: "Maha Abhishek" },
      { time: "7:00 PM", activity: "Radha Katha" },
      { time: "8:00 PM", activity: "Maha Aarti" },
      { time: "8:30 PM", activity: "Prasadam" },
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
    slug: "kartik-damodar-month",
    name: "Kartik Damodar Month",
    heading: "Kartik — The Month Most Dear to Radha and Krishna",
    tagline: "A month-long opportunity for lamp offerings, Damodarashtakam, and deepened devotion to Sri Sri Radha Gopinath.",
    bannerImage: images.kartikMonthBanner,
    showInHomeHero: true,
    heroImages: images.kartikMonthCarousel,
    date: "2026-10-25T00:00:00",
    endDate: "2026-11-24T23:59:00",
    timeLabel: "Daily Damodarashtakam & Lamp Offering — 7:00 PM",
    verse:
      "नमामीश्वरं सच्चिदानन्दरूपं लसत्कुण्डलं गोकुले भ्राजमानम्। यशोदाभियोलूखलाद्धावमानं परामृष्टमत्यन्ततो द्रुत्य गोप्या॥",
    verseRef: "Damodarashtakam, Verse 1",
    significance:
      "Kartik, also called Damodar month or Urja-vrata, is regarded in the Vaishnava calendar as the month most dear to Srimati Radharani and Sri Krishna — a full month in which even a little devotional service is said to bear boundless fruit. It commemorates the Damodar-lila: young Krishna, caught red-handed stealing butter, was bound around the belly with a rope by His mother Yashoda — an act of loving discipline that could never actually bind the unlimited Supreme Lord, except through the ropes of pure love. Throughout Kartik, devotees offer a ghee lamp to Sri Sri Radha Gopinath each evening while reciting the eight verses of Damodarashtakam, composed by Sage Satyavrata Muni as spoken by Sage Shaunaka, glorifying this pastime and praying for unflinching devotion. The month also intensifies worship of Tulsi Devi, dearest to Krishna, and closes on Kartik Purnima — the anniversary of the Rasa-lila and a night of especially radiant lamp offerings.",
    muhurat: [
      { label: "Observance", value: "Kartik (Damodar / Urja) Vrata" },
      { label: "Dates", value: "Sunday, 25 October – Tuesday, 24 November 2026" },
      { label: "Concludes On", value: "Kartik Purnima, 24 November 2026" },
      { label: "Daily Offering", value: "Damodarashtakam & Ghee Lamp, 7:00 PM" },
    ],
    howCelebrated: [
      {
        title: "Daily Deep-Daan (Lamp Offering)",
        body: "A ghee or oil lamp is lovingly offered to Sri Sri Radha Gopinath every evening throughout the month.",
      },
      {
        title: "Damodarashtakam Recitation",
        body: "The eight verses glorifying Krishna's binding by Mother Yashoda are sung nightly alongside the lamp offering.",
      },
      {
        title: "Tulsi Puja",
        body: "Worship and circumambulation of Tulsi Devi is especially encouraged, as this month is dear to her as well.",
      },
      {
        title: "Increased Japa & Bhagavatam Study",
        body: "Many devotees increase their daily chanting of the Hare Krishna maha-mantra and read from the Tenth Canto of Srimad Bhagavatam.",
      },
      {
        title: "Kartik Purnima Finale",
        body: "The month closes with a special full-moon celebration and lamp offerings on Kartik Purnima, also observed as Dev Deepavali.",
      },
    ],
    vratVidhi: [
      "Many devotees observe the Kartik Vrata by avoiding urad dal (black gram) and a few other specific foods through the month.",
      "Devotees endeavor to increase their chanting rounds and attend the evening lamp offering whenever possible.",
      "The emphasis of this vrata is heightened remembrance and loving service to Radha-Krishna, more than physical austerity alone.",
    ],
    faqs: [
      {
        question: "What is Damodar-lila?",
        answer:
          "It's the pastime of young Krishna being bound around the waist with a rope by His mother Yashoda after His butter-stealing mischief — an act possible only through her pure maternal love, since no material rope could ever bind the unlimited Lord.",
      },
      {
        question: "Do I need to fast for the whole month?",
        answer:
          "A full Kartik Vrata with dietary restrictions is a personal commitment some devotees take on, but it isn't required to take part in the month's daily lamp offering and celebrations at the temple.",
      },
      {
        question: "Can I sponsor the evening lamp offering?",
        answer:
          "Yes — you can sponsor the Damodarashtakam and lamp offering for any evening of the month, online or by visiting the temple, and we'll offer it on your behalf.",
      },
      {
        question: "What is Kartik Purnima?",
        answer:
          "It's the full-moon day that closes the month, marking the anniversary of Krishna's Rasa-lila dance with the gopis and celebrated with an especially festive lamp offering, also known as Dev Deepavali.",
      },
    ],
    sevaTiers: [
      { label: "Daily Deep-Daan Seva", amount: 501 },
      { label: "Damodarashtakam Week Seva", amount: 2100 },
      { label: "Tulsi Seva", amount: 1100 },
      { label: "Kartik Purnima Maha Aarti Seva", amount: 5100 },
    ],
  },
  {
    slug: "diwali",
    name: "Diwali",
    heading: "Diwali — The Festival of Lights",
    tagline: "Celebrating Lord Ramachandra's return to Ayodhya, and the eternal victory of light over darkness.",
    bannerImage: images.diwaliBanner,
    showInHomeHero: true,
    heroImages: images.diwaliCarousel,
    date: "2026-11-08T18:29:00",
    timeLabel: "6:29 PM – 8:29 PM (Lakshmi Puja Muhurat)",
    verse:
      "नमस्तेऽस्तु महामाये श्रीपीठे सुरपूजिते। शङ्खचक्रगदाहस्ते महालक्ष्मि नमोऽस्तु ते॥",
    verseRef: "Traditional pranam mantra to Sri Mahalakshmi",
    significance:
      "Diwali, the festival of lights, celebrates Lord Ramachandra's return to Ayodhya with Mother Sita and Lakshmana after fourteen years in exile and His victory over the demon king Ravana — the city's residents are said to have lit rows of oil lamps (deepavali) to welcome Him home, giving the festival its name. It falls on Amavasya, the darkest night of the month of Kartik, when the light of countless diyas symbolizes the victory of dharma over adharma and knowledge over ignorance. The same evening is dedicated to the worship of Goddess Lakshmi — in the Vaishnava tradition always honored together with Lord Narayana, as His eternal consort and the goddess of auspiciousness, rather than worshipped independently. For devotees of Krishna, Diwali is a joyous reminder that wherever the Supreme Lord and His pure devotees are welcomed with love, light naturally follows.",
    muhurat: [
      { label: "Festival", value: "Diwali (Deepavali) — Lakshmi Puja" },
      { label: "Date", value: "Sunday, 8 November 2026" },
      { label: "Amavasya Tithi", value: "Begins 2:17 PM, 8 Nov — Ends 12:01 PM, 9 Nov" },
      { label: "Pradosh Kaal / Lakshmi Puja Muhurat", value: "6:29 PM – 8:29 PM" },
      { label: "Followed By", value: "Govardhan Puja, 10 November 2026" },
    ],
    howCelebrated: [
      {
        title: "Temple & Deity Illumination",
        body: "The temple and Sri Sri Radha Gopinath are adorned with rows of oil lamps and lights, recreating Ayodhya's joyous welcome for Lord Rama.",
      },
      {
        title: "Lakshmi-Narayan Puja",
        body: "Goddess Lakshmi is worshipped together with Lord Narayana, in keeping with the Vaishnava understanding of her as His eternal, inseparable consort.",
      },
      {
        title: "Kirtan & Sparkling Lamps",
        body: "Devotees favor diyas and sparklers over loud firecrackers, keeping the evening centered on kirtan and quiet, joyful light rather than noise.",
      },
      {
        title: "Sharing Sweets & Prasadam",
        body: "Homes and the temple exchange sweets and sanctified prasadam, spreading the festival's spirit of generosity and gratitude.",
      },
    ],
    faqs: [
      {
        question: "Why do Vaishnavas worship Lakshmi with Narayana, not on her own?",
        answer:
          "In the Vaishnava tradition, Lakshmi is Lord Narayana's eternal consort and is worshipped alongside Him, since her auspiciousness and grace are understood to flow from her loving relationship with the Supreme Lord.",
      },
      {
        question: "Does Diwali have a Krishna connection, or is it only about Lord Rama?",
        answer:
          "Diwali principally celebrates Lord Ramachandra's return to Ayodhya, but as an incarnation of the same Supreme Personality of Godhead worshipped as Krishna, the festival's spirit of welcoming the Lord with light and joy resonates throughout Vaishnava tradition.",
      },
      {
        question: "Do I need to fast on Diwali?",
        answer: "No, Diwali isn't a fasting occasion — it's a joyous celebration open to everyone.",
      },
      {
        question: "Can I sponsor the temple's lamp decoration or a Lakshmi-Narayan seva?",
        answer:
          "Yes — reach out to us on WhatsApp or in person at the temple, or use the seva options on this page, and we'll offer it on your behalf.",
      },
    ],
    sevaTiers: [
      { label: "Deepotsav (Lamp) Seva", amount: 1100 },
      { label: "Lakshmi-Narayan Abhishek", amount: 5100 },
      { label: "Temple Illumination Seva", amount: 11000 },
    ],
  },
  {
    slug: "govardhan-puja",
    name: "Govardhan Puja",
    heading: "Govardhan Puja — Lifting the Hill of Vrindavan",
    tagline: "Celebrating Lord Krishna's lifting of Govardhan Hill, and the Annakut offering of a mountain of prasadam.",
    bannerImage: images.govardhanPujaBanner,
    bannerPosition: "center 15%",
    showInHomeHero: true,
    heroImages: images.govardhanPujaCarousel,
    date: "2026-11-10T06:40:00",
    timeLabel: "6:40 AM – 8:50 AM (Pratahkal Puja) & Evening Annakut Darshan",
    verse: "पत्रं पुष्पं फलं तोयं यो मे भक्त्या प्रयच्छति। तदहं भक्त्युपहृतमश्नामि प्रयतात्मनः॥",
    verseRef: "Bhagavad Gita 9.26",
    significance:
      "Govardhan Puja falls the day after Diwali and celebrates one of Krishna's most beloved pastimes as a cowherd boy in Vrindavan. When the residents of Vraj prepared their annual offering to Indra, the demigod of rain, young Krishna convinced them instead to worship Govardhan Hill — the land, cows, and nature that actually sustained their lives — and to set aside fear-based worship of demigods for direct, loving devotion. An enraged Indra unleashed torrential rains on Vraj, and Krishna lifted the entire Govardhan Hill on the little finger of His left hand, holding it aloft for seven days as an umbrella to shelter every resident and animal, until a humbled Indra came to offer his surrender. Devotees now build a small hill representing Govardhan — traditionally from cow dung, or from an elaborate mountain of food — and offer it a vast variety of preparations known as Annakut, or 'a mountain of grain,' reflecting the very abundance Krishna protected.",
    muhurat: [
      { label: "Festival", value: "Govardhan Puja (Annakut)" },
      { label: "Date", value: "Tuesday, 10 November 2026" },
      { label: "Pratipada Tithi", value: "Begins 12:31 PM, 9 Nov — Ends 2:00 PM, 10 Nov" },
      { label: "Pratahkal Puja Muhurat", value: "6:40 AM – 8:50 AM" },
      { label: "Falls On", value: "The day after Diwali (Lakshmi Puja)" },
    ],
    howCelebrated: [
      {
        title: "Building the Govardhan Hill",
        body: "A small hill representing Govardhan is lovingly built and decorated before the deities, recalling the very hill Krishna lifted.",
      },
      {
        title: "Annakut — The Mountain of Food",
        body: "Dozens of preparations are arranged into a symbolic mountain and offered to Krishna, celebrating the abundance He protected from Indra's wrath.",
      },
      {
        title: "Go-Puja",
        body: "Cows are bathed, decorated, and worshipped, honoring their special place in Krishna's Vrindavan pastimes.",
      },
      {
        title: "Govardhan Parikrama",
        body: "Devotees circumambulate the hill or its representation, a common way of showing respect to Govardhan itself.",
      },
      {
        title: "Distributing Prasadam",
        body: "The Annakut offering is distributed as prasadam to all visitors, extending the day's abundance to the whole community.",
      },
    ],
    faqs: [
      {
        question: "What is Annakut?",
        answer:
          "Annakut, meaning 'a mountain of grain,' is the practice of offering a large variety of food preparations arranged like a hill — echoing Govardhan Hill itself and the abundance Krishna protected on this day.",
      },
      {
        question: "Why did Krishna lift Govardhan Hill?",
        answer:
          "To shelter the residents of Vrindavan from the torrential rains sent by an angered Indra, after Krishna encouraged them to worship the hill and their own land and cows instead of performing the customary sacrifice to Indra.",
      },
      {
        question: "Do I need to fast on Govardhan Puja?",
        answer: "No — this is a feasting and celebration day, centered on the Annakut offering and prasadam, not fasting.",
      },
      {
        question: "Can I sponsor the Annakut offering or a Go-Puja seva?",
        answer:
          "Yes — every seva on this page can be sponsored online or over WhatsApp, and we'll offer it on your behalf as part of the celebration.",
      },
    ],
    sevaTiers: [
      { label: "Annakut Bhog Seva", amount: 5100 },
      { label: "Govardhan Puja Thali", amount: 2100 },
      { label: "Go-Seva (Cow Care)", amount: 1100 },
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

/** Slugs to surface in listings/nav for now — other festivals stay reachable by direct link. */
const VISIBLE_SLUGS = [
  "jhulan-yatra",
  "balrama-purnima",
  "janmashtami",
  "srila-prabhupada-appearance-day",
  "radhashtami",
  "kartik-damodar-month",
  "diwali",
  "govardhan-puja",
];

export const visibleFestivals = festivals.filter((f) => VISIBLE_SLUGS.includes(f.slug));

/** A festival stays visible through the end of its calendar day (or `endDate`'s day, for
 * multi-day festivals) — not just until its `date` timestamp, which is often just the
 * morning's opening ritual time and would otherwise make the festival vanish mid-celebration. */
function festivalEndOfDay(f: Festival): number {
  const end = new Date(f.endDate ?? f.date!);
  end.setHours(23, 59, 59, 999);
  return end.getTime();
}

/** Festivals with a confirmed date that hasn't fully elapsed yet, earliest first — used to
 * drive the homepage hero slides, the utility bar's festival highlight, and its countdown. */
export function getUpcomingHomeFestivals(): Festival[] {
  return festivals
    .filter((f) => f.showInHomeHero && f.date && festivalEndOfDay(f) > Date.now())
    .sort((a, b) => new Date(a.date!).getTime() - new Date(b.date!).getTime());
}

/** True once a festival's `date` has passed but we're still within its calendar day (or
 * `endDate`'s day, for multi-day festivals) — used to swap "Upcoming" copy for "Today". */
export function isFestivalToday(festival: Festival): boolean {
  if (!festival.date) return false;
  const now = Date.now();
  const start = new Date(festival.date).getTime();
  return now >= start && now <= festivalEndOfDay(festival);
}
