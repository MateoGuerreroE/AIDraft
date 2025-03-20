"use client";
import { Button, Spinner } from "@heroui/react";
import React, { useState } from "react";

type Props = {
  text: string;
  hexBg?: string;
  action?: (...args: string[]) => unknown | Promise<unknown>;
};

export default function ButtonComponent({
  text,
  hexBg = "#ffffff",
  action,
}: Props) {
  const [loading, isLoading] = useState<boolean>(false);
  const handleAction = async () => {
    if (action) {
      isLoading(true);
      try {
        await action();
      } catch {
        window.alert("ERROR");
      } finally {
        isLoading(false);
      }
    }
  };
  return (
    <Button
      className="font-semibold text-lg p-7 font-outfit"
      radius="full"
      fullWidth
      style={{ backgroundColor: `${hexBg}` }}
      onPress={() => handleAction()}
    >
      {loading ? <Spinner /> : text}
    </Button>
  );
}
