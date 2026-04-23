import { useState, useEffect } from "react";

interface CookieBarProps {
  t: (key: string) => string;
}

function setHybridStorage(key: string, value: string) {
  if (typeof window === "undefined") return;
  try { window.localStorage.setItem(key, value); } catch { }
  try { document.cookie = `${key}=${value};path=/;max-age=${365 * 24 * 60 * 60}`; } catch { }
}

function getHybridStorage(key: string): string | null {
  if (typeof window === "undefined") return null;
  let val: string | null = null;
  try { val = window.localStorage.getItem(key); } catch { }
  if (!val) {
    try {
      const match = document.cookie.match(new RegExp(`(^| )${key}=([^;]+)`));
      if (match) {
        val = match[2];
        try { window.localStorage.setItem(key, val); } catch { }
      }
    } catch { }
  } else {
    try { document.cookie = `${key}=${val};path=/;max-age=${365 * 24 * 60 * 60}`; } catch { }
  }
  return val;
}

export default function CookieBar({ t }: CookieBarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!getHybridStorage("cookies_accepted")) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#f3eee7] shadow-[0_-4px_20px_rgba(0,0,0,0.1)] h-[28vh] md:h-[10vh] overflow-y-hidden px-5 py-6">
      <div className="max-w-profile mx-auto h-full flex flex-col justify-between md:flex-row md:items-center md:gap-8">

        <p className="text-[15px] text-[#2b2b2b] leading-[1.4] flex-1">
          {t("cookie_text").split(/(Política de Privacidade|Privacy Policy|Política de Privacidad)/).map((part, i) =>
            /(Política de Privacidade|Privacy Policy|Política de Privacidad)/.test(part) ? (
              <span key={i} className="text-[#fa8448]">{part}</span>
            ) : (
              part
            )
          )}
        </p>

        <div className="mt-4 md:mt-0 w-full md:w-auto flex-shrink-0">
          <button
            onClick={() => {
              setHybridStorage("cookies_accepted", "true");
              setVisible(false);
            }}
            className="w-full md:w-[200px] gradient-orange-btn py-3.5 rounded-full text-base font-bold text-white hover:brightness-105 transition-all"
          >
            {t("accept")}
          </button>
        </div>
      </div>
    </div>
  );
}