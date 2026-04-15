interface ContentTabsProps {
  activeTab: "posts" | "media";
  onTabChange: (tab: "posts" | "media") => void;
  t: (key: string) => string;
}

export default function ContentTabs({ activeTab, onTabChange, t }: ContentTabsProps) {
  return (
    <div className="flex border-b border-border">
      <button
        onClick={() => onTabChange("posts")}
        className={`flex-1 py-3 text-sm font-medium text-center transition-colors relative ${
          activeTab === "posts"
            ? "text-primary"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        60 {t("posts")}
        {activeTab === "posts" && (
          <div className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-primary rounded-full" />
        )}
      </button>
      <button
        onClick={() => onTabChange("media")}
        className={`flex-1 py-3 text-sm font-medium text-center transition-colors relative ${
          activeTab === "media"
            ? "text-primary"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        68 {t("media")}
        {activeTab === "media" && (
          <div className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-primary rounded-full" />
        )}
      </button>
    </div>
  );
}
