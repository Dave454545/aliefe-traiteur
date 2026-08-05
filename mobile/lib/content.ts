import menuData from "@/data/menu.json";
import evenementsData from "@/data/evenements.json";
import galerieData from "@/data/galerie.json";
import brandData from "@/data/brand.json";
import type { Dish, DishCategory, EventPackage, GalleryPhoto, Brand } from "@/lib/types";

export const dishes = menuData as Dish[];
export const events = evenementsData as EventPackage[];
export const gallery = galerieData as GalleryPhoto[];
export const brand = brandData as Brand;

export const dishCategories: DishCategory[] = ["entrees", "plats", "boissons", "desserts"];

export function getDishesByCategory(category: DishCategory): Dish[] {
  return dishes.filter((d) => d.category === category);
}

export function getSignatureDishes(): Dish[] {
  return dishes.filter((d) => d.signature);
}

export function getDishById(id: string): Dish | undefined {
  return dishes.find((d) => d.id === id);
}

export function getEventById(id: string): EventPackage | undefined {
  return events.find((e) => e.id === id);
}

export function searchDishes(query: string, locale: "fr" | "en"): Dish[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return dishes.filter(
    (d) => d.name[locale].toLowerCase().includes(q) || d.description[locale].toLowerCase().includes(q)
  );
}
