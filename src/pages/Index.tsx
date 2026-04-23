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
          INICIO AJUSTE - Espaçamentos do layout principal
          - pt-[Xpx]: Distância entre o cabeçalho fixo e o bloco de perfil.
            Valor atual: 85px (ajustado para o novo cabeçalho de 75px). Aumente para descer, reduza para aproximar.
          - tabsGapTop (mt-[Xpx] abaixo): Distância FIXA entre o bloco perfil/assinaturas
            e o bloco de abas Postagens/Mídias. Valor atual: 12px.
            Altere APENAS o número em mt-[Xpx] na div de abas abaixo.
      */}
      <main className="max-w-profile mx-auto px-4 flex flex-col pt-[79px]">

        {/* 
            BLOCO PRINCIPAL:
            - Removi o mt-20 daqui para evitar conflitos.
            - rounded-t-[30px]: Sincronizado com o ProfileHero.
        */}
        <div className="bg-white rounded-t-[30px] rounded-b-[28px] overflow-hidden shadow-sm">
          <ProfileHero t={t} onLockedClick={handleLockedClick} />
          <SubscriptionSection t={t} pulsing={pulsing} lang={lang} />
        </div>

        {/* 
            INICIO AJUSTE - Distância entre perfil/assinaturas e as abas
            - mt-[Xpx]: controla o espaço fixo entre os dois blocos.
              Valor atual: 12px. Mude só o número.
        */}
        <div className="w-full flex justify-center mt-[12px]">
          <ContentTabs activeTab={activeTab} onTabChange={setActiveTab} t={t} />
        </div>
        {/* FIM AJUSTE */}

        {/* 
            INICIO AJUSTE - Distância entre as abas e o bloco de conteúdo
            - mt-[Xpx]: espaço entre as abas e o card de posts/mídias.
              Valor atual: 12px. (mesmo valor do gap acima das abas)
        */}
        <div className="mt-[12px]">
          {activeTab === "posts" ? (
            <div className="bg-card rounded-[20px] overflow-hidden">
              <PostCard onLockedClick={handleLockedClick} />
            </div>
          ) : (
            <div className="bg-card rounded-[20px] overflow-hidden">
              <MediaGrid t={t} onLockedClick={handleLockedClick} />
            </div>
          )}
        </div>
        {/* FIM AJUSTE */}
      </main>

      <CookieBar t={t} />
    </div >
  );
}
