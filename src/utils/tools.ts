import type { MaybeRef } from "@vueuse/core";

const urlRegex = new RegExp(
  "((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)"
);
export const isValidUrl = (url: MaybeRef<string>) => {
  return urlRegex.exec(unref(url));
};
