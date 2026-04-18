'use client';

import dynamic from "next/dynamic";
import AboutSection from "@/components/AboutSection";
import ShopSection from "@/components/ShopSection";
import ContactSection from "@/components/ContactSection";

const ScrollytellingCanvas = dynamic(
  () => import("@/components/ScrollytellingCanvas"),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <ScrollytellingCanvas />
      <AboutSection />
      <ShopSection />
      <ContactSection />
    </main>
  );
}
