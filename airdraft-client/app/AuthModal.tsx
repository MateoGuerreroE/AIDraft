"use client";
import React, { useState } from "react";
import { useGlobalStore } from "./store";
import {
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Spinner,
  useDisclosure,
} from "@heroui/react";
import InputComponent from "@/components/InputComponent";
import ButtonComponent from "@/components/ButtonComponent";
import app from "./firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import axios from "axios";

export default function AuthModal() {
  const auth = getAuth(app);
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const { user, setUser } = useGlobalStore();
  const [loading, isLoading] = useState<boolean>(false);
  const [loginData, setLoginData] = useState<ILoginForm>({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      const firebaseUser = await signInWithEmailAndPassword(
        auth,
        loginData.email,
        loginData.password
      );
      const token = await firebaseUser.user.getIdToken();
      const userInfo = await axios.post;
    } catch (e) {
      window.alert(e);
    }
  };

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
        <ModalContent className="text-white font-outfit h-[650px]">
          {loading && (
            <div className="absolute w-full flex items-center justify-center bg-black/60 h-full z-10">
              <Spinner />
            </div>
          )}
          <ModalHeader className="pb-7 p-5">
            <h2 className="text-3xl text-center w-full">Login or Register</h2>
          </ModalHeader>
          <ModalBody className="flex flex-row p-10  ">
            <div className=" flex flex-col w-1/2 justify-center">
              <h5 className="font-semibold text-center">Already an user?</h5>
              <Divider className="h-0 bg-transparent py-2" />
              <form>
                <label>Email</label>
                <InputComponent
                  defaultValue=""
                  parentPersistence={(email: string) =>
                    setLoginData({ ...loginData, email })
                  }
                />
                <Divider className="h-0 bg-transparent py-2" />
                <label>Password</label>
                <InputComponent
                  defaultValue=""
                  parentPersistence={(password: string) =>
                    setLoginData({ ...loginData, password })
                  }
                />
                <Divider className="h-0 bg-transparent py-2" />
                <ButtonComponent text="Login" hexBg="#50C878" />
              </form>
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
