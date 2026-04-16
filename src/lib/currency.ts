export type Lang = "pt" | "en" | "es";

const USD_FALLBACK_RATE = 4.98;

export async function getUsdRateFromBrl(): Promise<number> {
  try {
    const response = await fetch(
      "https://api.frankfurter.dev/v2/latest?base=BRL&symbols=USD"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch exchange rate");
    }

    const data = await response.json();

    const rate = data?.rates?.USD;
    if (typeof rate !== "number" || Number.isNaN(rate)) {
      throw new Error("Invalid USD rate");
    }

    return rate;
  } catch (error) {
    console.error("Using fallback USD rate:", error);
    return USD_FALLBACK_RATE;
  }
}

export function convertBrlToUsd(brlValue: number, usdRate: number): number {
  return brlValue * usdRate;
}

export function formatPrice(
  brlValue: number,
  lang: Lang,
  usdRate: number
): string {
  if (lang === "pt") {
    return `R$ ${brlValue.toFixed(2).replace(".", ",")}`;
  }

  const usdValue = convertBrlToUsd(brlValue, usdRate);

  return `$ ${usdValue.toFixed(2)}`;
}