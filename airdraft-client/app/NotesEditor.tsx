"use client";
import ButtonComponent from "@/components/ButtonComponent";
import InputComponent from "@/components/InputComponent";
import TextAreaComponent from "@/components/TextAreaComponent";
import { IServerResponse } from "@/types/responses";
import axios from "axios";
import React, { useEffect, useState } from "react";

type Props = {
  noteId: string;
};

export default function NotesEditor({ noteId }: Props) {
  const [noteContent, setNoteContent] = useState<string>("");
  const [successMessage, setMessage] = useState<string>("");

  useEffect(() => {
    if (successMessage.length) {
      setTimeout(() => {
        setMessage("");
      }, 5000);
    }
  }, [successMessage]);

  const handleSaveNote = async () => {
    const { data: response } = await axios.post<IServerResponse<string>>(
      "http://localhost:3000",
      {
        noteId,
        content: noteContent,
      }
    );
    if (response.data) {
      setMessage("Note content saved!");
    }
  };
  return (
    <div className="flex flex-col w-full h-full items-center">
      <InputComponent
        parentPersistence={setNoteContent}
        defaultValue="New Note"
      />
      <TextAreaComponent />
      <div className="w-1/3">
        <ButtonComponent
          text="Save"
          hexBg="#50C878"
          action={() => handleSaveNote()}
        />
        <p>{successMessage}</p>
      </div>
    </div>
  );
}
