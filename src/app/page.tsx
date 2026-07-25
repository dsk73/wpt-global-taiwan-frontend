//src/app/[locale]/page.tsx
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/zh-Hant-TW");
}
