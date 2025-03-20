"use client";
import { Divider } from "@heroui/react";
import { useGlobalStore } from "./store";
import NotesEditor from "./NotesEditor";
import AuthModal from "./AuthModal";

export default function Home() {
  return (
    <main className="flex h-screen flex-row items-center justify-between p-10 bg-black">
      <AuthModal />
      <div className="h-full w-1/2 flex flex-col p-5 items-center justify-center">
        <NotesEditor noteId={"sample"} />
      </div>
      <Divider orientation="vertical" className="dark" />
      <div className="h-full w-1/2"></div>
    </main>
  );
}
