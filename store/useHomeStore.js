import { create } from "zustand";

export const useHomeStore = create((set) => ({
  homeData: null,
  loading: true,
  error: null,
  fetchHomeData: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/front/data`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      set({ homeData: data, loading: false });
    } catch (err) {
      console.error("Error fetching home data:", err);
      set({ error: "حدث خطأ أثناء جلب البيانات", loading: false });
    }
  },
}));
