export const images = {
  logo: "/images/logo/logo.png",
  prabhupada: "/images/leadership/prabhupada.png",
  prabhupadaTeaching: "/images/leadership/prabhupada-teaching.jpg",
  gopalKrishnaGoswami: "/images/leadership/guru.jpg",
  guruPrasadSwami: "/images/leadership/guru-prasad-swami.jpg",
  krishnaArt: "/images/decorative/krishna-deity.jpg",
  krishna1: "/images/decorative/krishna1.jpg",
  paymentQr: "/images/donation/payment-qr.jpg",
  home: {
    heroVideo: "/videos/home-hero.mp4",
    hero: [
      "/images/home/hero-01.jpg",
      "/images/home/hero-02.jpg",
      "/images/home/hero-03.jpg",
      "/videos/home-hero.mp4",
    ],
    sevaMangalaArti: "/images/home/seva-mangala-arti.jpg",
    sevaRajbhogaArti: "/images/home/seva-rajbhoga-arti.jpg",
    sevaMangalaBhoga: "/images/home/seva-mangala-bhoga.jpg",
    sevaRajbhoga: "/images/home/seva-rajbhoga.jpg",
  },
  contactIcons: {
    visit: "/images/contact/icon-visit.png",
    phone: "/images/contact/icon-phone.png",
    email: "/images/contact/icon-email.png",
    location: "/images/contact/icon-location.png",
  },
  foodForLife: {
    banner: "/images/food-for-life/banner.jpg",
    annaDaanBanner: "/images/food-for-life/anna-daan-banner.jpg",
    meals50: "/images/food-for-life/50-meals.png",
    meals100: "/images/food-for-life/100-meals.png",
    meals500: "/images/food-for-life/500-meals.png",
    meals1000: "/images/food-for-life/1000-meals.png",
    custom: "/images/food-for-life/custom.png",
    sudamaFeast: "/images/food-for-life/sudama-feast.png",
    pandavFeast: "/images/food-for-life/pandav-feast.png",
    vrindavanFeast: "/images/food-for-life/vrindavan-feast.png",
    icon: "/images/icons/food-for-life-icon.png",
  },
  iyfIcon: "/images/icons/iyf-icon.png",
  lifeMembershipIcon: "/images/icons/life-membership-icon.png",
  radhashtamiBanner: "/images/radhashtami/banner.jpg",
  radhashtamiCarousel: [
    { src: "/images/radhashtami/carousel-1.jpg", position: "50% 20%" },
    { src: "/images/radhashtami/carousel-2.jpg", position: "50% 25%" },
    { src: "/images/radhashtami/carousel-3.jpg", position: "50% 50%" },
    { src: "/images/radhashtami/carousel-4.jpg", position: "50% 15%" },
  ],
  jhulanYatraBanner: "/images/jhulan-yatra/banner.jpg",
  // Public-domain devotional paintings (The Met Open Access, CC0) — evoking the monsoon
  // garden setting of the swing pastime until real event photography is available.
  jhulanYatraCarousel: [
    { src: "/images/jhulan-yatra/hero-1.jpg", position: "50% 68%" },
    { src: "/images/jhulan-yatra/hero-2.jpg", position: "45% 38%" },
  ],
  balramaPurnimaBanner: "/images/balrama-purnima/banner.jpg",
  // Public-domain Krishna-and-Balarama paintings (The Met Open Access, CC0).
  balramaPurnimaCarousel: [
    { src: "/images/balrama-purnima/hero-1.jpg", position: "35% 55%" },
    { src: "/images/balrama-purnima/hero-2.jpg", position: "30% 32%" },
    { src: "/images/balrama-purnima/hero-3.jpg", position: "70% 55%" },
  ],
  prabhupadaAppearanceBanner: "/images/prabhupada-appearance/banner.jpg",
  // Clean photo crops taken from the festival banner's own artwork — the same
  // photos, just cropped clear of its baked-in title/date text. Both are narrow
  // portrait crops (270x470, 320x460): too tall and narrow for a full-width hero
  // band to cover-crop without slicing through the face, so they keep `fit:
  // "contain"` (shown whole, on a blurred backdrop) instead of full-bleed cropping.
  prabhupadaAppearanceCarousel: [
    { src: "/images/prabhupada-appearance/hero-1.jpg", position: "center 30%", fit: "contain" as const },
    { src: "/images/prabhupada-appearance/hero-2.jpg", position: "center 25%", fit: "contain" as const },
  ],
  janmashtami: {
    banner: "/images/janmashtami/banner.jpg",
    poster: "/images/janmashtami/poster.jpg",
    bronzeKalash: "/images/janmashtami/bronze-kalash.jpg",
    goldKalash: "/images/janmashtami/gold-kalash.jpg",
    silverKalash: "/images/janmashtami/silver-kalash.jpg",
    platinumKalash: "/images/janmashtami/platinum-kalash.jpg",
    garlandSeva: "/images/janmashtami/garland-seva.jpg",
    fruitsBasket: "/images/janmashtami/fruits-basket.jpg",
    aartiThali: "/images/janmashtami/aarti-thali.jpg",
    flowerSeva: "/images/janmashtami/flower-seva.jpg",
    cakeSeva: "/images/janmashtami/cake-seva.jpg",
    makhanMisri: "/images/janmashtami/makhan-misri.jpg",
    sadhuSeva: "/images/janmashtami/sadhu-seva.jpg",
    deitiesDress: "/images/janmashtami/deities-dress.jpg",
    mahaAbhishekam: "/images/janmashtami/maha-abhishekam.jpg",
    // carousel-2 omitted here: its subjects sit too close to the frame edge to
    // survive a full-width crop without one of them getting cut off.
    carousel: [
      { src: "/images/janmashtami/carousel-1.jpg", position: "50% 30%" },
      { src: "/images/janmashtami/carousel-3.jpg", position: "50% 55%" },
      { src: "/images/janmashtami/carousel-4.jpg", position: "50% 45%" },
    ],
  },
  ramNavamiBanner: "/images/ramnavami/banner.jpg",
  rathYatra: {
    banner: "/images/rath-yatra/banner.png",
    donateImage: "/images/rath-yatra/donate-image.jpg",
  },
  lifePatronBanner: "/images/life-patron/banner.jpg",
  govindas: {
    specialThali: "/images/govindas/banner.png",
    dosa: "/images/govindas/dosa.png",
    idli: "/images/govindas/idli.png",
    noodles: "/images/govindas/noodles.png",
    chilliPaneer: "/images/govindas/chilli-paneer.png",
    friedRice: "/images/govindas/fried-rice.png",
    cateringBirthday: "/images/govindas/catering-birthday.jpg",
    cateringMarriage: "/images/govindas/catering-marriage.jpg",
    cateringWelcomeBaby: "/images/govindas/catering-welcome-baby.jpg",
    cateringAnniversary: "/images/govindas/catering-anniversary.jpg",
    cateringKuanPujan: "/images/govindas/catering-kuan-pujan.jpg",
  },
  galleryTemple: Array.from(
    { length: 10 },
    (_, i) => `/images/gallery/temple-${String(i + 1).padStart(2, "0")}.jpg`,
  ),
  galleryJanmashtami: ["06", "07", "08"].map((n) => `/images/gallery/janmashtami-${n}.jpeg`),
  galleryCommunity: Array.from(
    { length: 7 },
    (_, i) => `/images/gallery/community-${String(i + 1).padStart(2, "0")}.jpg`,
  ),
  // Real temple photography reused as page-top hero banners, for a consistent look
  // across pages that don't have a dedicated banner of their own.
  pageHero: {
    about: "/images/leadership/prabhupada-teaching.jpg",
    contact: "/images/gallery/community-06.jpg",
    donate: "/images/decorative/krishna-deity.jpg",
    dyph: "/images/gallery/community-07.jpg",
    faq: "/images/gallery/temple-09.jpg",
    festivals: "/images/gallery/temple-03.jpg",
    foodForLife: "/images/gallery/community-04.jpg",
    gallery: "/images/gallery/temple-06.jpg",
    giftShop: "/images/gallery/temple-10.jpg",
    gitaDaan: "/images/leadership/prabhupada.png",
    govindasOnWheel: "/images/gallery/temple-07.jpg",
    lifePatron: "/images/gallery/community-05.jpg",
    lectureVideos: "/images/leadership/guru.jpg",
    temple: "/images/gallery/temple-08.jpg",
    legal: "/images/leadership/guru-prasad-swami.jpg",
  },
};
