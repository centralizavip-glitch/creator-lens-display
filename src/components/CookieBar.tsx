import { useState, useEffect } from "react";

interface CookieBarProps {
  t: (key: string) => string;
}

export default function CookieBar({ t }: CookieBarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("cookies_accepted")) {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border px-4 py-3">
      <div className="max-w-profile mx-auto flex items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground flex-1">{t("cookie_text")}</p>
        <button
          onClick={() => {
            localStorage.setItem("cookies_accepted", "true");
            setVisible(false);
          }}
          className="gradient-orange-btn px-5 py-2 rounded-full text-sm font-medium text-primary-foreground whitespace-nowrap hover:brightness-105 transition-all"
        >
          {t("accept")}
        </button>
      </div>
    </div>
  );
}
