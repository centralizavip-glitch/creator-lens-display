import { useEffect, useMemo, useState } from "react";
import { useCheckout } from "@/hooks/useCheckout";
import { ChevronRightIcon } from "./icons/MetricIcons";
import { getUsdRateFromBrl, formatPrice, Lang } from "@/lib/currency";

interface Plan {
  id: string;
  label: string;
  price: number; // Alterado para number para facilitar conversão
  originalPrice?: number;
}

interface SubscriptionSectionProps {
  t: (key: string) => string;
  pulsing: boolean;
  lang: string;
}

export default function SubscriptionSection({
  t,
  pulsing,
  lang,
}: SubscriptionSectionProps) {
  const { startCheckout } = useCheckout();
  const [usdRate, setUsdRate] = useState<number>(4.98);

  useEffect(() => {
    getUsdRateFromBrl().then(setUsdRate);
  }, []);

  const offerEnabled = true;
  const offerDurationSeconds = 2 * 60 * 60;
  const offerInitialSpots = 19;

  const plans: Plan[] = useMemo(
    () => [
      { id: "p3", label: t("plan_life"), price: lang === "pt" ? 49.99 : 10.00, originalPrice: lang === "pt" ? 114 : 22 },
      { id: "p2", label: t("plan_1y"), price: lang === "pt" ? 31.99 : 6.40 },
      { id: "p1", label: t("plan_1m"), price: lang === "pt" ? 18.99 : 4.00 },
    ],
    [t, lang]
  );

  const promotedPlan = plans[0];

  const badgeConfig = {
    offsetX: 0,
    offsetY: 0,
    scale: 1,
  };

  const formatFixedPrice = (value: number) => {
    if (lang === "pt") {
      return `R$ ${value.toFixed(2).replace(".", ",")}`;
    }
    return `$ ${value.toFixed(2)}`;
  };

  const [remainingSeconds, setRemainingSeconds] =
    useState(offerDurationSeconds);
  const [remainingSpots, setRemainingSpots] = useState(offerInitialSpots);
  const [isOfferVisible, setIsOfferVisible] = useState(offerEnabled);

  useEffect(() => {
    if (!offerEnabled || !isOfferVisible) return;
    const intervalId = window.setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          setIsOfferVisible(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [offerEnabled, isOfferVisible]);

  useEffect(() => {
    if (!offerEnabled || !isOfferVisible) return;
    const intervalId = window.setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          setIsOfferVisible(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [offerEnabled, isOfferVisible]);

  useEffect(() => {
    if (
      !offerEnabled ||
      !isOfferVisible ||
      remainingSpots <= 2 ||
      remainingSeconds <= 0
    )
      return;

    const getDelay = () => {
      const current = remainingSpots;
      if (current > 15) return 1500 + Math.floor(Math.random() * 2000);
      if (current > 10) return 8000 + Math.floor(Math.random() * 6000);
      if (current > 5) return 15000 + Math.floor(Math.random() * 10000);
      return 45000 + Math.floor(Math.random() * 30000);
    };

    const timeoutId = window.setTimeout(() => {
      setRemainingSpots((prev) => Math.max(prev - 1, 2));
    }, getDelay());

    return () => window.clearTimeout(timeoutId);
  }, [offerEnabled, isOfferVisible, remainingSpots, remainingSeconds]);

  const offerValidDate = useMemo(() => {
    const currentDate = new Date();
    const formatted = currentDate.toLocaleDateString(
      lang === "pt" ? "pt-BR" : lang === "es" ? "es-ES" : "en-US",
      {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );
    return t("offer_valid").replace("{d}", formatted);
  }, [lang, t]);

  const countdownText = useMemo(() => {
    const hours = Math.floor(remainingSeconds / 3600);
    const minutes = Math.floor((remainingSeconds % 3600) / 60);
    const seconds = remainingSeconds % 60;
    const timeStr = `${hours}h ${minutes}m ${seconds}s`;
    return t("offer_ends").replace("{t}", timeStr);
  }, [remainingSeconds, t]);

  const scarcityText = useMemo(() => {
    return t("offer_scarcity").replace("{n}", remainingSpots.toString());
  }, [remainingSpots, t]);

  const showSubscriptionSection = plans.length > 0;

  if (!showSubscriptionSection) return null;

  return (
    <div
      id="subscriptions"
      className="bg-card rounded-[28px] md:rounded-[28px] p-5"
    >
      <h2 className="text-base font-semibold text-foreground mb-4">
        {t("subscriptions")}
      </h2>

      {offerEnabled && isOfferVisible && promotedPlan && (
        <div className="mb-4 rounded-2xl bg-[#f3eee7] p-4">
          <div className="flex items-center gap-2 text-sm font-bold text-foreground mb-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width="22"
              height="22"
              style={{ transform: "scaleX(-1)" }}
            >
              <path
                fill="#f08143"
                d="M327.5 85.2c-4.5 1.7-7.5 6-7.5 10.8s3 9.1 7.5 10.8L384 128l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L448 128l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L448 64l-21.2-56.5c-1.7-4.5-6-7.5-10.8-7.5s-9.1 3-10.8 7.5L384 64l-56.5 21.2zM205.1 73.3c-2.6-5.7-8.3-9.3-14.5-9.3s-11.9 3.6-14.5 9.3L123.3 187.3 9.3 240c-12.4 5.7-12.4 23.3 0 29l114.1 52.7L176 435.8c2.6 5.7 8.3 9.3 14.5 9.3s11.9-3.6 14.5-9.3l52.7-114.1 114.1-52.7c12.4-5.7 12.4-23.3 0-29l-114.1-52.7-52.7-114.1zM384 384l-56.5 21.2c-4.5 1.7-7.5 6-7.5 10.8s3 9.1 7.5 10.8l56.5 21.2 21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L448 448l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L448 384l-21.2-56.5c-1.7-4.5-6-7.5-10.8-7.5s-9.1 3-10.8 7.5L384 384z"
              />
            </svg>
            <span className="truncate">{t("offer_title")}</span>
          </div>

          <div className="mb-4 px-1">
            <p className="text-[10px] text-muted-foreground/80">
              {offerValidDate}
            </p>
            <p className="text-[10px] text-muted-foreground/80 font-medium">
              {countdownText}
            </p>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-muted flex-shrink-0">
              <img
                src="/assets/perfil.png"
                alt="Nayara Assunção"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-white rounded-xl px-3 py-1.5 flex-1">
              <p className="text-[11px] font-semibold text-[#f08143]">
                {scarcityText}
              </p>
            </div>
          </div>

          <div
            className="mb-2 px-1 flex items-center gap-2"
            style={{
              transform: `translate(${badgeConfig.offsetX}px, ${badgeConfig.offsetY}px) scale(${badgeConfig.scale})`,
            }}
          >
            <span className="text-[11px] font-bold text-[#10b981] bg-[#ecfdf5] px-2 py-0.5 rounded-full">
              {t("save_badge")}
            </span>
          </div>

          <button
            onClick={() => startCheckout(promotedPlan.id)}
            className={`gradient-orange-btn w-full flex items-center justify-between px-5 py-3.5 rounded-full text-foreground font-medium text-sm hover:brightness-105 active:scale-[0.98] transition-all ${
              pulsing ? "animate-pulse-scale" : ""
            }`}
          >
            <span>{promotedPlan.label}</span>
            <span>{formatFixedPrice(promotedPlan.price)}</span>
          </button>

          <div className="mt-2 text-right px-1">
            <span className="text-muted-foreground text-[10px] mr-1">
              {t("original_price_label").replace("{p}", "")}
              <span className="line-through text-gray-500">
                {formatFixedPrice(promotedPlan.originalPrice || 0)}
              </span>
            </span>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {plans
          .filter(
            (plan) =>
              !(
                offerEnabled &&
                isOfferVisible &&
                promotedPlan &&
                plan.id === promotedPlan.id
              )
          )
          .map((plan) => (
            <button
              key={plan.id}
              onClick={() => startCheckout(plan.id)}
              className={`gradient-orange-btn flex items-center justify-between px-5 py-3.5 rounded-full text-foreground font-medium text-sm hover:brightness-105 active:scale-[0.98] transition-all ${
                pulsing ? "animate-pulse-scale" : ""
              }`}
            >
              <span>{plan.label}</span>
              <span>{formatFixedPrice(plan.price)}</span>
            </button>
          ))}
      </div>

      {/* Promotions */}
      <button className="w-full flex items-center justify-between mt-4 px-1 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <span className="font-medium">{t("promotions")}</span>
        <ChevronRightIcon size={16} />
      </button>
    </div>
  );
}