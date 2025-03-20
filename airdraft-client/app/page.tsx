"use client";
import Image from "next/image";
import { Button, HeroUIProvider } from "@heroui/react";
import ButtonComponent from "@/components/ButtonComponent";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ButtonComponent text="Summarize" hexBg="#89CFF0" />
    </main>
  );
}
