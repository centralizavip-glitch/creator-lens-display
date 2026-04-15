import { useCheckout } from "@/hooks/useCheckout";

interface Plan {
  id: string;
  label: string;
  price: string;
}

interface SubscriptionSectionProps {
  t: (key: string) => string;
  pulsing: boolean;
}

export default function SubscriptionSection({ t, pulsing }: SubscriptionSectionProps) {
  const { startCheckout } = useCheckout();

  const plans: Plan[] = [
    { id: "plan_1month", label: t("plan_1m"), price: "R$ 18,99" },
    { id: "plan_1year", label: t("plan_1y"), price: "R$ 31,99" },
    { id: "plan_lifetime", label: t("plan_life"), price: "R$ 49,99" },
  ];

  return (
    <div id="subscriptions" className="bg-card rounded-3xl p-5 shadow-sm">
      <h2 className="text-base font-semibold text-foreground mb-4">{t("subscriptions")}</h2>
      <div className="flex flex-col gap-3">
        {plans.map((plan) => (
          <button
            key={plan.id}
            onClick={() => startCheckout(plan.id)}
            className={`gradient-orange-btn flex items-center justify-between px-5 py-3.5 rounded-full text-primary-foreground font-medium text-sm hover:brightness-105 active:scale-[0.98] transition-all ${
              pulsing ? "animate-pulse-scale" : ""
            }`}
          >
            <span>{plan.label}</span>
            <span>{plan.price}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
