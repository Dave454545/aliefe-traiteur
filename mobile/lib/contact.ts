import { Linking } from "react-native";
import { brand } from "@/lib/content";

function digitsOnly(value: string) {
  return value.replace(/[^\d+]/g, "");
}

export function callPhone() {
  Linking.openURL(`tel:${digitsOnly(brand.phoneDial)}`).catch(() => {});
}

export function openWhatsapp(message: string) {
  const number = digitsOnly(brand.whatsapp).replace("+", "");
  const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  Linking.openURL(url).catch(() => {});
}

export function openEmail() {
  Linking.openURL(`mailto:${brand.email}`).catch(() => {});
}

export function openInstagram() {
  Linking.openURL(brand.instagram.url).catch(() => {});
}

export function openFacebook() {
  Linking.openURL(brand.facebook.url).catch(() => {});
}
