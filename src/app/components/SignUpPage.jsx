"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { NextResponse } from "next/server";
import { useRouter } from "next/navigation";
import { z } from "zod";
import ErrorFragment from "./ErrorFragment";
// END OF IMPORTS
const userSchema = z.object({
  email: z.string().email(),
  name: z.string().min(3).max(32),
});
export default function SignUpPage() {
  const [user, setUser] = useState({
    email: "",
    name: "",
  });
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const [errorList, setErrorList] = useState([]);
  const router = useRouter();
  useEffect(() => {
    if (user.email.length > 0 && user.name.length > 0) {
      setIsBtnDisabled(false);
    }
  }, [user]);

  async function EnterRoom(e) {
    try {
      e.preventDefault();
      userSchema.parse(user);
      router.push(`/chat?name=${user.name}&email=${user.email}`);
    } catch (error) {
      const msgData = JSON.parse(error.message);
      let msg = [];
      for (let x of msgData) {
        msg.push(x.path + ": " + x.message);
      }
      if (msgData) {
        //@ts-ignore
        setErrorList(msg);
        const timeId = setTimeout(() => {
          setErrorList([]);
        }, 9000);
        return () => clearTimeout(timeId);
      }

      return;
    }
  }
  return (
    <div className="flex min-h-screen justify-center items-center flex-col">
      <h2 className="text-3xl font-bold my-2">Enter Your Details</h2>
      <form className="flex flex-col space-y-2 [&>*]:flex [&>*]:flex-col md:w-[40vw]  [&>label]:[&>div]:font-bold  [&>input]:[&>div]:rounded-md md:[&>label]:[&>div]:text-center md:space-y-4 [&>input]:[&>div]:text-black  [&>input]:[&>div]:px-4  [&>input]:[&>div]:p-2  [&>input]:[&>div]:outline-none">
        <div className=" rounded-2xl grid grid-cols-1 [&>*]:px-6  [&>*]:py-1  ">
          {errorList?.map((err, index) => (
            <ErrorFragment key={"" + index + err} error={err} />
          ))}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={user.email}
            placeholder="Ex: mymail@abc.com"
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
          ></input>
        </div>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={user.name}
            placeholder="Ex: Rajesh"
            onChange={(e) => {
              setUser({ ...user, name: e.target.value });
            }}
          ></input>
        </div>

        <button
          className={`bg-blue-700 p-2 px-4 rounded-md disabled ${
            isBtnDisabled ? "opacity-40" : ""
          }`}
          onClick={EnterRoom}
          disabled={isBtnDisabled}
        >
          Enter Chat Room
        </button>
      </form>
    </div>
  );
}
