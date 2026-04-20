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
    <div className="min-h-screen bg-[#f3eee7] pb-20">
      <Header onLangChange={setLang} currentLang={lang} />
      
      {/* 
          A SOLUÇÃO:
          - pt-[80px]: Ajusta a distância do topo (espaço entre Header e Banner). 
            Aumente para [100px] ou [120px] para descer mais.
          - gap-4: Mantém o espaçamento entre os cards.
      */}
      <main className="max-w-profile mx-auto px-4 flex flex-col gap-4 pt-[61px]">
        
        {/* 
            BLOCO PRINCIPAL:
            - Removi o mt-20 daqui para evitar conflitos.
            - rounded-t-[30px]: Sincronizado com o ProfileHero.
        */}
        <div className="bg-white rounded-t-[30px] rounded-b-[28px] overflow-hidden shadow-sm">
          <ProfileHero t={t} onLockedClick={handleLockedClick} />
          <SubscriptionSection t={t} pulsing={pulsing} lang={lang} />
        </div>

        {/* BLOCO DE TABS */}
        <div className="bg-card rounded-[20px] overflow-hidden">
          <ContentTabs activeTab={activeTab} onTabChange={setActiveTab} t={t} />
        </div>

        {/* BLOCO DE CONTEÚDO */}
        {activeTab === "posts" ? (
          <div className="bg-card rounded-[20px] overflow-hidden">
            <PostCard onLockedClick={handleLockedClick} />
          </div>
        ) : (
          <div className="bg-card rounded-[20px] overflow-hidden">
            <MediaGrid t={t} onLockedClick={handleLockedClick} />
          </div>
        )}
      </main>
      
      <CookieBar t={t} />
    </div>
  );
}
