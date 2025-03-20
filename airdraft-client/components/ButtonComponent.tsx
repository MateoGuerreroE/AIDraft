import { Button } from "@heroui/react";
import React from "react";

type Props = {
  text: string;
  hexBg?: string;
  action?: (...args: string[]) => unknown;
};

export default function ButtonComponent({
  text,
  hexBg = "#ffffff",
  action,
}: Props) {
  return (
    <Button
      className="font-semibold text-lg p-7 font-outfit"
      radius="full"
      fullWidth
      style={{ backgroundColor: `${hexBg}` }}
      onPress={() =>
        action ? action() : console.log("No action defined for this button")
      }
    >
      {text}
    </Button>
  );
}
