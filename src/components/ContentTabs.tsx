import { PostIcon, ClapperboardIcon } from "./icons/MetricIcons";

interface ContentTabsProps {
  activeTab: "posts" | "media";
  onTabChange: (tab: "posts" | "media") => void;
  t: (key: string) => string;
}

export default function ContentTabs({ activeTab, onTabChange, t }: ContentTabsProps) {
  return (
    <div className="flex border-b border-border/50 bg-card">
      <button
        onClick={() => onTabChange("posts")}
        className={`flex-1 py-4 text-sm font-semibold text-center transition-colors relative flex items-center justify-center gap-1.5 ${
          activeTab === "posts"
            ? "text-primary"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <PostIcon size={16} />
        86 {t("posts")}
        {activeTab === "posts" && (
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary" />
        )}
      </button>
      <button
        onClick={() => onTabChange("media")}
        className={`flex-1 py-4 text-sm font-semibold text-center transition-colors relative flex items-center justify-center gap-1.5 ${
          activeTab === "media"
            ? "text-primary"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <ClapperboardIcon size={16} />
        471 {t("media")}
        {activeTab === "media" && (
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary" />
        )}
      </button>
    </div>
  );
}