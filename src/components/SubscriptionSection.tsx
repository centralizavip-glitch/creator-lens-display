import { useEffect, useMemo, useState, useRef } from "react";
import { useCheckout } from "@/hooks/useCheckout";
import { ChevronRightIcon } from "./icons/MetricIcons";

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
  const [isCollapsed, setIsCollapsed] = useState(false);

  const offerEnabled = true;
  const offerDurationSeconds = 47 * 60 * 60; // 1 dia e 23 horas (47h)
  const offerInitialSpots = 32;
  const offerStorageKey = "offerState";
  const offerCycleStorageKey = "offerCycle";
  const offerTimerStorageKey = "offer_timer_state";
  const offerTimerDefaultSeconds = 2 * 60 * 60 + 33 * 60 + 37; // 2h 33m 37s
  const offerTimerFallbackMinSeconds = 1 * 60 * 60 + 40 * 60; // 1h 40m 00s
  const offerTimerFallbackMaxSeconds = 1 * 60 * 60 + 59 * 60 + 59; // 1h 59m 59s
  const offerDayMs = 24 * 60 * 60 * 1000;
  const offerFirstDayIntervalMs = 6 * 60 * 60 * 1000; // 4 quedas no primeiro dia
  const offerDurationMs = offerDurationSeconds * 1000;

  const plans: Plan[] = useMemo(
    () => [
      { id: "p3", label: t("plan_life"), price: lang === "pt" ? 49.99 : 10.00, originalPrice: lang === "pt" ? 294.06 : 58.82 },
      { id: "p2", label: t("plan_1y"), price: lang === "pt" ? 31.99 : 6.40 },
      { id: "p1", label: t("plan_1m"), price: lang === "pt" ? 18.99 : 4.00 },
    ],
    [t, lang]
  );

  const promotedPlan = plans[0];

  const badgeConfig = {
    offsetX: +13, // Controla posição horizontal (negativo = esquerda, positivo = direita)
    offsetY: -13, // Controla posição vertical (negativo = cima, positivo = baixo)
    scale: 0.8,   // Controla o tamanho (ex: 1.1 aumenta 10%, 0.9 diminui 10%)
  };

  const formatFixedPrice = (value: number) => {
    if (lang === "pt") {
      return `R$ ${value.toFixed(2).replace(".", ",")}`;
    }
    return `$ ${value.toFixed(2)}`;
  };

  const [remainingSeconds, setRemainingSeconds] =
    useState(offerTimerDefaultSeconds);
  const [remainingSpots, setRemainingSpots] = useState(offerInitialSpots);
  const [isOfferVisible, setIsOfferVisible] = useState(offerEnabled);
  const offerStateRef = useRef<{
    firstSeenAt: number;
    offerEndAt: number;
    spotsCurrent: number;
    lastDropAt: number;
    rngState: number;
  } | null>(null);
  const offerCycleRef = useRef<{ cycleDate: string; cycleEndAt: number } | null>(null);
  const offerTimerRef = useRef<{ startedAt: number; remainingSeconds: number; source: "default" | "fallback" } | null>(
    null,
  );
  const countdownIntervalRef = useRef<number | null>(null);
  const spotIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!offerEnabled) return;
    if (typeof window === "undefined") return;

    const safeNumber = (value: unknown) =>
      typeof value === "number" && Number.isFinite(value) ? value : null;

    const clampSpots = (value: number) =>
      Math.max(1, Math.min(offerInitialSpots, Math.floor(value)));

    const toUint32 = (value: number) => (value >>> 0);

    const createSeed = () => {
      try {
        const arr = new Uint32Array(1);
        window.crypto.getRandomValues(arr);
        return arr[0]!;
      } catch {
        return toUint32(Math.floor(Math.random() * 0xffffffff));
      }
    };

    const nextRng = (state: number) => {
      let x = toUint32(state);
      x ^= x << 13;
      x = toUint32(x);
      x ^= x >>> 17;
      x = toUint32(x);
      x ^= x << 5;
      x = toUint32(x);
      return x;
    };

    const rngFloat01 = (state: number) => {
      const next = nextRng(state);
      return { next, value: next / 0xffffffff };
    };

    const getLocalDateKeyFromTs = (ts: number) => {
      const d = new Date(ts);
      const pad2 = (n: number) => String(n).padStart(2, "0");
      return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
    };

    const startOfLocalDayMs = (ts: number) => {
      const d = new Date(ts);
      d.setHours(0, 0, 0, 0);
      return d.getTime();
    };

    const loadOfferState = () => {
      try {
        const raw = window.localStorage.getItem(offerStorageKey);
        if (!raw) return null;
        const parsed = JSON.parse(raw) as Record<string, unknown>;
        const firstSeenAt = safeNumber(parsed.firstSeenAt);
        const offerEndAt = safeNumber(parsed.offerEndAt);
        const spotsCurrent = safeNumber(parsed.spotsCurrent ?? parsed.currentSpots);
        const lastDropAt = safeNumber(parsed.lastDropAt ?? parsed.lastSpotDropAt);
        const rngState = safeNumber(parsed.rngState ?? parsed.rngSeed);
        if (
          firstSeenAt === null ||
          offerEndAt === null ||
          spotsCurrent === null ||
          lastDropAt === null ||
          rngState === null
        ) {
          return null;
        }
        if (offerEndAt < firstSeenAt) return null;

        return {
          firstSeenAt,
          offerEndAt,
          spotsCurrent: clampSpots(spotsCurrent),
          lastDropAt,
          rngState: toUint32(rngState),
        };
      } catch {
        return null;
      }
    };

    const saveOfferState = (state: {
      firstSeenAt: number;
      offerEndAt: number;
      spotsCurrent: number;
      lastDropAt: number;
      rngState: number;
    }) => {
      try {
        window.localStorage.setItem(offerStorageKey, JSON.stringify(state));
      } catch {
        // ignore
      }
    };

    const now = Date.now();
    const existing = loadOfferState();
    const initialState =
      existing ??
      (() => {
        const firstSeenAt = now;
        const offerEndAt = firstSeenAt + offerDurationMs;
        const seed = createSeed();
        const state = {
          firstSeenAt,
          offerEndAt,
          spotsCurrent: offerInitialSpots,
          lastDropAt: firstSeenAt,
          rngState: seed,
        };
        saveOfferState(state);
        return state;
      })();

    offerStateRef.current = initialState;
    setRemainingSpots(initialState.spotsCurrent);

    const loadTimerState = () => {
      try {
        const raw = window.localStorage.getItem(offerTimerStorageKey);
        if (!raw) return { ok: true as const, state: null };
        const parsed = JSON.parse(raw) as Record<string, unknown>;
        const startedAt = safeNumber(parsed.startedAt);
        const remainingSeconds = safeNumber(parsed.remainingSeconds);
        const source =
          parsed.source === "default" || parsed.source === "fallback"
            ? (parsed.source as "default" | "fallback")
            : null;
        if (startedAt === null || remainingSeconds === null || source === null) {
          return { ok: true as const, state: null };
        }
        if (startedAt > now + 10_000) return { ok: true as const, state: null };
        if (remainingSeconds < 0) return { ok: true as const, state: null };
        return { ok: true as const, state: { startedAt, remainingSeconds, source } };
      } catch {
        return { ok: false as const, state: null };
      }
    };

    const saveTimerState = (state: {
      startedAt: number;
      remainingSeconds: number;
      source: "default" | "fallback";
    }) => {
      try {
        window.localStorage.setItem(offerTimerStorageKey, JSON.stringify(state));
      } catch {
        // ignore
      }
    };

    const pickFallbackSeconds = () => {
      const min = offerTimerFallbackMinSeconds;
      const max = offerTimerFallbackMaxSeconds;
      const range = max - min + 1;
      try {
        const buf = new Uint32Array(1);
        window.crypto.getRandomValues(buf);
        return min + (buf[0]! % range);
      } catch {
        return min + Math.floor(Math.random() * range);
      }
    };

    const loadedTimer = loadTimerState();
    const initialTimer =
      loadedTimer.ok && loadedTimer.state
        ? loadedTimer.state
        : {
            startedAt: now,
            remainingSeconds: loadedTimer.ok ? offerTimerDefaultSeconds : pickFallbackSeconds(),
            source: loadedTimer.ok ? ("default" as const) : ("fallback" as const),
          };
    offerTimerRef.current = initialTimer;
    if (!loadedTimer.state) saveTimerState(initialTimer);

    const getTimerRemaining = () => {
      const timer = offerTimerRef.current;
      if (!timer) return 0;
      const elapsedSeconds = Math.max(0, Math.floor((Date.now() - timer.startedAt) / 1000));
      return Math.max(0, Math.floor(timer.remainingSeconds - elapsedSeconds));
    };

    setRemainingSeconds(getTimerRemaining());

    const tickCountdown = () => {
      const remaining = getTimerRemaining();
      setRemainingSeconds(remaining);

      if (remaining <= 0 && countdownIntervalRef.current !== null) {
        window.clearInterval(countdownIntervalRef.current);
        countdownIntervalRef.current = null;
      }
    };

    const tickSpots = () => {
      const state = offerStateRef.current;
      if (!state) return;
      const currentTime = Date.now();
      if (state.spotsCurrent <= 1) return;

      const giveawayRaw = window.localStorage.getItem("giveawayDate");
      const giveawayTs = giveawayRaw ? Number(giveawayRaw) : NaN;
      const hasGiveaway = Number.isFinite(giveawayTs) && giveawayTs > 0;

      if (hasGiveaway) {
        const todayStart = startOfLocalDayMs(currentTime);
        const targetStart = startOfLocalDayMs(giveawayTs);
        if (todayStart >= targetStart) {
          const lockedState = {
            ...state,
            spotsCurrent: 1,
            lastDropAt: currentTime,
          };
          offerStateRef.current = lockedState;
          setRemainingSpots(1);
          saveOfferState(lockedState);
          return;
        }
      }

      const daysToTarget = hasGiveaway
        ? Math.max(
            0,
            Math.ceil(
              (startOfLocalDayMs(giveawayTs) - startOfLocalDayMs(currentTime)) / offerDayMs,
            ),
          )
        : 999;

      const pickDropAmount = (spots: number, rngValue: number) => {
        if (daysToTarget <= 1) return 1;
        if (spots <= 6) return 1;
        if (spots <= 12) return rngValue < 0.8 ? 1 : 2;
        if (rngValue < 0.45) return 1;
        if (rngValue < 0.9) return 2;
        return 3;
      };

      const pickDelayMs = (spots: number, rngValue: number) => {
        if (daysToTarget <= 1) return offerDayMs;
        if (daysToTarget === 2) {
          const min = 20 * 60 * 1000;
          const max = 60 * 60 * 1000;
          return Math.floor(min + (max - min) * rngValue);
        }
        if (daysToTarget === 3) {
          const min = 6 * 60 * 1000;
          const max = 18 * 60 * 1000;
          return Math.floor(min + (max - min) * rngValue);
        }
        if (spots > 20) {
          const min = 45 * 1000;
          const max = 3 * 60 * 1000;
          return Math.floor(min + (max - min) * rngValue);
        }
        if (spots > 12) {
          const min = 2 * 60 * 1000;
          const max = 8 * 60 * 1000;
          return Math.floor(min + (max - min) * rngValue);
        }
        const min = 5 * 60 * 1000;
        const max = 20 * 60 * 1000;
        return Math.floor(min + (max - min) * rngValue);
      };

      let spots = state.spotsCurrent;
      let lastDropAt = state.lastDropAt;
      let rngState = state.rngState;

      let safety = 0;
      while (spots > 1 && safety < 50) {
        const rDelay = rngFloat01(rngState);
        rngState = rDelay.next;
        const delayMs = pickDelayMs(spots, rDelay.value);

        if (currentTime < lastDropAt + delayMs) break;

        const rDrop = rngFloat01(rngState);
        rngState = rDrop.next;
        const amount = pickDropAmount(spots, rDrop.value);

        spots = Math.max(1, spots - amount);
        lastDropAt = lastDropAt + delayMs;

        if (hasGiveaway && daysToTarget <= 1) break;
        safety += 1;
      }

      if (spots !== state.spotsCurrent || lastDropAt !== state.lastDropAt || rngState !== state.rngState) {
        const nextState = {
          ...state,
          spotsCurrent: clampSpots(spots),
          lastDropAt,
          rngState,
        };
        offerStateRef.current = nextState;
        setRemainingSpots(nextState.spotsCurrent);
        saveOfferState(nextState);
      }
    };

    if (countdownIntervalRef.current !== null) {
      window.clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
    if (spotIntervalRef.current !== null) {
      window.clearInterval(spotIntervalRef.current);
      spotIntervalRef.current = null;
    }

    tickCountdown();
    tickSpots();
    countdownIntervalRef.current = window.setInterval(tickCountdown, 1000);
    spotIntervalRef.current = window.setInterval(tickSpots, 15_000);

    return () => {
      if (countdownIntervalRef.current !== null) {
        window.clearInterval(countdownIntervalRef.current);
        countdownIntervalRef.current = null;
      }
      if (spotIntervalRef.current !== null) {
        window.clearInterval(spotIntervalRef.current);
        spotIntervalRef.current = null;
      }
    };
  }, [
    offerEnabled,
    isOfferVisible,
    offerDurationMs,
    offerDurationSeconds,
    offerInitialSpots,
    offerStorageKey,
    offerCycleStorageKey,
    offerTimerStorageKey,
    offerTimerDefaultSeconds,
    offerTimerFallbackMinSeconds,
    offerTimerFallbackMaxSeconds,
    offerDayMs,
    offerFirstDayIntervalMs,
  ]);

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
            <div className="bg-white rounded-lg px-[13px] py-[7px] flex-1">
              <p className="text-[11px] font-semibold text-black opacity-70">
                {scarcityText}
              </p>
            </div>
          </div>

          <div className={`relative ${pulsing ? "animate-glow-light rounded-full" : ""}`}>
            <div
              className="absolute z-10"
              style={{
                top: `${badgeConfig.offsetY}px`,
                left: `${badgeConfig.offsetX}px`,
                transform: `scale(${badgeConfig.scale})`,
              }}
            >
              <span className="text-[11px] font-bold font-medium text-[#34C759] bg-[#ecfdf5] px-2 py-0.5 rounded-full shadow-sm">
                {t("save_badge")}
              </span>
            </div>

            <button
              onClick={() => startCheckout(promotedPlan.id)}
              className="gradient-orange-btn w-full flex items-center justify-between px-5 py-3.5 rounded-full text-foreground font-medium text-sm hover:brightness-105 active:scale-[0.98] transition-all"
            >
              <span>{promotedPlan.label}</span>
              <span>{formatFixedPrice(promotedPlan.price)}</span>
            </button>
          </div>

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

      <div 
        className="flex items-center justify-between mb-4 cursor-pointer select-none"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <h2 className="text-base font-semibold text-foreground">
          {t("subscriptions")}
        </h2>
        {isCollapsed ? (
          <svg width="24" height="24" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M4.18179 6.18181C4.35753 6.00608 4.64245 6.00608 4.81819 6.18181L7.49999 8.86362L10.1818 6.18181C10.3575 6.00608 10.6424 6.00608 10.8182 6.18181C10.9939 6.35755 10.9939 6.64247 10.8182 6.81821L7.81819 9.81821C7.73379 9.9026 7.61934 9.95001 7.49999 9.95001C7.38064 9.95001 7.26618 9.9026 7.18179 9.81821L4.18179 6.81821C4.00605 6.64247 4.00605 6.35755 4.18179 6.18181Z"
              fill="#000000"
            />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M4.18179 8.81819C4.00605 8.64245 4.00605 8.35753 4.18179 8.18179L7.18179 5.18179C7.26618 5.0974 7.38064 5.04999 7.49999 5.04999C7.61933 5.04999 7.73379 5.0974 7.81819 5.18179L10.8182 8.18179C10.9939 8.35753 10.9939 8.64245 10.8182 8.81819C10.6424 8.99392 10.3575 8.99392 10.1818 8.81819L7.49999 6.13638L4.81819 8.81819C4.64245 8.99392 4.35753 8.99392 4.18179 8.81819Z"
              fill="#000000"
            />
          </svg>
        )}
      </div>

      <div className={`flex flex-col gap-3 transition-all duration-300 ${isCollapsed ? 'hidden' : 'flex'}`}>
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
            <div key={plan.id} className={pulsing ? "animate-glow-light rounded-full" : ""}>
              <button
                onClick={() => startCheckout(plan.id)}
                className="gradient-orange-btn w-full flex items-center justify-between px-5 py-3.5 rounded-full text-foreground font-medium text-sm hover:brightness-105 active:scale-[0.98] transition-all"
              >
                <span>{plan.label}</span>
                <span>{formatFixedPrice(plan.price)}</span>
              </button>
            </div>
          ))}
      </div>

    </div>
  );
}
