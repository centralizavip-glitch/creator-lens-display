import { PostIcon, ClapperboardIcon } from "./icons/MetricIcons";

interface ContentTabsProps {
  activeTab: "posts" | "media";
  onTabChange: (tab: "posts" | "media") => void;
  t: (key: string) => string;
}

export default function ContentTabs({ activeTab, onTabChange, t }: ContentTabsProps) {
  return (
    <div className="flex border-b border-border/50">
      <button
        onClick={() => onTabChange("posts")}
        className={`flex-1 py-3 text-sm font-medium text-center transition-colors relative flex items-center justify-center gap-1.5 ${
          activeTab === "posts"
            ? "text-primary"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <PostIcon size={15} />
        86 {t("posts")}
        {activeTab === "posts" && (
          <div className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-primary rounded-full" />
        )}
      </button>
      <button
        onClick={() => onTabChange("media")}
        className={`flex-1 py-3 text-sm font-medium text-center transition-colors relative flex items-center justify-center gap-1.5 ${
          activeTab === "media"
            ? "text-primary"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <ClapperboardIcon size={15} />
        481 {t("media")}
        {activeTab === "media" && (
          <div className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-primary rounded-full" />
        )}
      </button>
    </div>
  );
}
