"use client";
import React from "react";
import { useGlobalStore } from "./store";
import {
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import InputComponent from "@/components/InputComponent";
import ButtonComponent from "@/components/ButtonComponent";

export default function AuthModal() {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const { user } = useGlobalStore();

  return (
    <>
      <Modal
        isOpen={!user}
        onOpenChange={onOpenChange}
        hideCloseButton={true}
        isDismissable={false}
        backdrop="blur"
        size="4xl"
        className="dark"
      >
        <ModalContent className="text-white font-outfit p-5 h-[600px]">
          <ModalHeader className="pb-7">
            <h2 className="text-3xl text-center w-full">Login or Register</h2>
          </ModalHeader>
          <ModalBody className="flex flex-row">
            <div className=" flex flex-col w-1/2 justify-center">
              <h5 className="font-semibold text-center">Already an user?</h5>
              <Divider className="h-0 bg-transparent py-2" />
              <label>Email</label>
              <InputComponent defaultValue="" parentPersistence={() => {}} />
              <Divider className="h-0 bg-transparent py-2" />
              <label>Password</label>
              <InputComponent defaultValue="" parentPersistence={() => {}} />
              <Divider className="h-0 bg-transparent py-2" />
              <ButtonComponent text="Login" hexBg="#50C878" />
            </div>
            <Divider orientation="vertical" className="dark h-full mx-7" />
            <div className=" flex flex-col w-1/2 justify-center">
              <h5 className="font-semibold text-center">Create an account</h5>
              <Divider className="h-0 bg-transparent py-2" />
              <label>First Name</label>
              <InputComponent defaultValue="" parentPersistence={() => {}} />
              <Divider className="h-0 bg-transparent py-2" />
              <label>Last Name</label>
              <InputComponent defaultValue="" parentPersistence={() => {}} />
              <Divider className="h-0 bg-transparent py-4" />
              <label>Email</label>
              <InputComponent defaultValue="" parentPersistence={() => {}} />
              <Divider className="h-0 bg-transparent py-2" />
              <label>Password</label>
              <InputComponent defaultValue="" parentPersistence={() => {}} />
              <Divider className="h-0 bg-transparent py-2" />
              <ButtonComponent text="Register" hexBg="#50C878" />
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
