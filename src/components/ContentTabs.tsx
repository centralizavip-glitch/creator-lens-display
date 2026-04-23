import { PostIcon, ClapperboardIcon } from "./icons/MetricIcons";

interface ContentTabsProps {
  activeTab: "posts" | "media";
  onTabChange: (tab: "posts" | "media") => void;
  t: (key: string) => string;
}

// INICIO AJUSTE - Lógica e visual do bloco de abas movidos para o index.css
export default function ContentTabs({ activeTab, onTabChange, t }: ContentTabsProps) {
  return (
    <div className="aba-wrapper">


      <div className="tabs">
        <div className={`curva ${activeTab === "posts" ? "esquerda" : "direita"}`} id="curvaAba" />

        <button
          onClick={() => onTabChange("posts")}
          className={`tab flex items-center gap-[5px] font-['Poppins'] text-[16px] font-[500] transition-all duration-300 ${activeTab === "posts" ? "active" : ""
            }`}
        >
          <PostIcon size={21} />
          <span className="relative top-[-0.5px]">86 {t("posts")}</span>
        </button>

        <button
          onClick={() => onTabChange("media")}
          className={`tab flex items-center gap-[5px] font-['Poppins'] text-[16px] font-[500] transition-all duration-300 ${activeTab === "media" ? "active" : ""
            }`}
        >



          <ClapperboardIcon size={21} />
          <span className="texto-midias">471 {t("media")}</span>
        </button>
      </div>
    </div>
  );
}