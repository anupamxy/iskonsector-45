import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";

import Home from "./pages/Home";
import About from "./pages/About";
import Temple from "./pages/Temple";
import FoodForLife from "./pages/FoodForLife";
import GovindasOnWheel from "./pages/GovindasOnWheel";
import LifePatron from "./pages/LifePatron";
import Dyph from "./pages/Dyph";
import GitaDaan from "./pages/GitaDaan";
import Festivals from "./pages/Festivals";
import FestivalDetail from "./pages/FestivalDetail";
import GiftShop from "./pages/GiftShop";
import LectureVideos from "./pages/LectureVideos";
import Donate from "./pages/Donate";
import Contact from "./pages/Contact";
import Faq from "./pages/Faq";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import CookiePolicy from "./pages/CookiePolicy";
import RefundPolicy from "./pages/RefundPolicy";
import NotFound from "./pages/NotFound";

// Lazy-loaded: pulls in the Firebase SDK, so it's only fetched when someone
// actually visits these pages instead of adding weight to every page.
const DailyDarshan = lazy(() => import("./pages/DailyDarshan"));
const AdminGallery = lazy(() => import("./pages/AdminGallery"));

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/temple" element={<Temple />} />
        <Route path="/food-for-life" element={<FoodForLife />} />
        <Route path="/govindas-on-wheel" element={<GovindasOnWheel />} />
        <Route path="/life-patron" element={<LifePatron />} />
        <Route path="/dyph" element={<Dyph />} />
        <Route path="/gita-daan" element={<GitaDaan />} />
        <Route path="/festivals" element={<Festivals />} />
        <Route path="/festivals/:slug" element={<FestivalDetail />} />
        <Route path="/gift-shop" element={<GiftShop />} />
        <Route path="/lecture-videos" element={<LectureVideos />} />
        <Route path="/daily-darshan" element={<Suspense fallback={null}><DailyDarshan /></Suspense>} />
        <Route path="/admin/gallery" element={<Suspense fallback={null}><AdminGallery /></Suspense>} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
