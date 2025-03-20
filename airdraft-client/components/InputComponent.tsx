"use client";
import { Input } from "@heroui/react";
import React, { useState } from "react";

type Props = {
  defaultValue: string;
  parentPersistence: (val: string) => void;
};

export default function InputComponent({
  defaultValue,
  parentPersistence,
}: Props) {
  const [inputValue, setInputValue] = useState<string>(defaultValue);
  return (
    <Input
      variant="underlined"
      onValueChange={(val) => {
        setInputValue(val);
        parentPersistence(val);
      }}
      size="lg"
      className="dark"
      classNames={{ innerWrapper: ["font-outfit", "text-3xl", "text-white"] }}
      value={inputValue}
    />
  );
}
