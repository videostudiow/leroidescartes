"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";
import { useLocale } from "./LocaleProvider";
import { localizeHref } from "@/lib/i18n/href";

type Props = Omit<ComponentProps<typeof NextLink>, "href"> & { href: string };

// Link qui préfixe automatiquement la locale courante (/fr, /en).
// Les liens externes (http) et ancres (#) ne sont pas touchés.
export default function Link({ href, ...props }: Props) {
  const locale = useLocale();
  return <NextLink href={localizeHref(href, locale)} {...props} />;
}
