"use client";
import Image from "next/image";
import { Button, Divider, HeroUIProvider } from "@heroui/react";
import ButtonComponent from "@/components/ButtonComponent";
import TextAreaComponent from "@/components/TextAreaComponent";
import InputComponent from "@/components/InputComponent";
import { useState } from "react";

export default function Home() {
  const [noteContent, setNoteContent] = useState<string>("");
  console.log(noteContent);
  return (
    <main className="flex h-screen flex-row items-center justify-between p-10 bg-black">
      <div className="h-full w-1/2 flex flex-col p-5 items-center justify-center">
        <InputComponent
          parentPersistence={setNoteContent}
          defaultValue="New Note"
        />
        <TextAreaComponent />
        <div className="w-1/3">
          <ButtonComponent text="Summarize" hexBg="#50C878" />
        </div>
      </div>
      <Divider orientation="vertical" className="dark" />
      <div className="h-full w-1/2"></div>
    </main>
  );
}
