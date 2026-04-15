import { useState, useCallback } from "react";
import Header from "@/components/Header";
import ProfileHero from "@/components/ProfileHero";
import SubscriptionSection from "@/components/SubscriptionSection";
import ContentTabs from "@/components/ContentTabs";
import PostCard from "@/components/PostCard";
import MediaGrid from "@/components/MediaGrid";
import CookieBar from "@/components/CookieBar";
import { useTranslation } from "@/hooks/useTranslation";

export default function Index() {
  const { lang, setLang, t } = useTranslation();
  const [activeTab, setActiveTab] = useState<"posts" | "media">("posts");
  const [pulsing, setPulsing] = useState(false);

  const handleLockedClick = useCallback(() => {
    const el = document.getElementById("subscriptions");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    setPulsing(true);
    setTimeout(() => setPulsing(false), 800);
  }, []);

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header onLangChange={setLang} currentLang={lang} />

      <main className="max-w-profile mx-auto px-4 flex flex-col gap-4">
        <ProfileHero t={t} />
        <SubscriptionSection t={t} pulsing={pulsing} />

        <div className="bg-card rounded-3xl shadow-sm overflow-hidden">
          <ContentTabs activeTab={activeTab} onTabChange={setActiveTab} t={t} />

          {activeTab === "posts" ? (
            <div className="p-4">
              <PostCard onLockedClick={handleLockedClick} />
            </div>
          ) : (
            <MediaGrid t={t} onLockedClick={handleLockedClick} />
          )}
        </div>
      </main>

      <CookieBar t={t} />
    </div>
  );
}
