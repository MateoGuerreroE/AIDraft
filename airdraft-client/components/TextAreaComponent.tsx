import { Textarea } from "@heroui/react";
import React from "react";

export default function TextAreaComponent() {
  return (
    <Textarea
      variant="bordered"
      className="text-white w-full h-full font-outfit font-light"
      size="lg"
      maxRows={30}
      classNames={{
        base: ["border-none"],
        inputWrapper: "border-none",
      }}
    />
  );
}
