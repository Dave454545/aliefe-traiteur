export type LocalizedText = { fr: string; en: string };

export type DishCategory = "entrees" | "plats" | "boissons" | "desserts";

export type Dish = {
  id: string;
  category: DishCategory;
  image: string;
  signature: boolean;
  tags: string[];
  name: LocalizedText;
  description: LocalizedText;
};

export type EventPackage = {
  id: string;
  image: string;
  highlight: boolean;
  name: LocalizedText;
  description: LocalizedText;
  features: { fr: string[]; en: string[] };
};

export type GalleryPhoto = {
  id: string;
  image: string;
};

export type Brand = {
  name: string;
  slogan: string;
  secondaryTagline: string;
  city: string;
  country: string;
  phone: string;
  phoneDial: string;
  whatsapp: string;
  email: string;
  instagram: { handle: string; url: string };
  facebook: { handle: string; url: string };
};
