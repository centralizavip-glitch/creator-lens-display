import { useCallback } from "react";

export function useCheckout() {
  const startCheckout = useCallback(async (id: string) => {
    try {
      const res = await fetch(`/.netlify/functions/get-checkout?id=${id}`);
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      throw new Error("No URL");
    } catch {
      alert("Checkout unavailable");
      console.log("Checkout failed for plan:", id);
    }
  }, []);

  return { startCheckout };
}
