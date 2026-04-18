import { useState, useEffect } from "react";

interface CookieBarProps {
  t: (key: string) => string;
}

export default function CookieBar({ t }: CookieBarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!window.localStorage.getItem("cookies_accepted")) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border/40 px-4 py-4 h-[37vh]">
      <div className="max-w-profile mx-auto h-full flex flex-col gap-4">
        <p className="text-xs text-muted-foreground leading-relaxed">
          {t("cookie_text")}
        </p>

        <div className="mt-auto flex justify-end">
          <button
            onClick={() => {
              try {
                window.localStorage.setItem("cookies_accepted", "true");
              } catch {
                // ignore
              }
              setVisible(false);
            }}
            className="gradient-orange-btn px-10 py-3 rounded-full text-base font-medium text-foreground whitespace-nowrap hover:brightness-105 transition-all"
          >
            {t("accept")}
          </button>
        </div>
      </div>
    </div>
  );
}
