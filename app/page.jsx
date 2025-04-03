"use client";
import { assets } from "@/assets/assets";
import Sidebar from "../components/Sidebar";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Promptbox from "@/components/PromptBox";
import Message from "@/components/Message";
import { useAppContext } from "@/context/AppContext";

export default function Home() {
  const [expand, setExpand] = useState(false);
  const [messeges, setMesseges] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { selectedChat } = useAppContext();
  const containerRef = useRef(null);

  useEffect(() => {
    if (selectedChat) {
      setMesseges(selectedChat.messeges);
    }
  }, [selectedChat]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messeges]);

  return (
    <div>
      <div className="flex h-screen">
        <Sidebar expand={expand} setExpand={setExpand} />
        <div className="flex flex-1 flex-col items-center justify-center px-4 pb-8 bg-[#292a2d] text-white relative">
          <div className="md:hidden absolute px-4 top-6 flex items-center justify-between w-full">
            <Image
              onClick={() => (expand ? setExpand(false) : setExpand(true))}
              className="rotate-180"
              src={assets.menu_icon}
              alt=""
            />
            <Image className="opacity-70" src={assets.chat_icon} alt="" />
          </div>
          {messeges.length === 0 ? (
            <>
              <div
                className="flex items-center gap-3
              "
              >
                <Image src={assets.logo_icon} alt="" className="h-16" />
                <p className="text-2xl font-medium">Hi, i am DeepSeek</p>
              </div>
              <p className="text-sm mt-2">How can i help you today?</p>
            </>
          ) : (
            <div
              className="relative flex flex-col items-center justify-start w-full mt-20 max-h-screen overflow-y-auto"
              ref={containerRef}
            >
              <p className="fixed top-8 border border-transparent hover:border-gray-500/50 py-1 px-2 rounded-lg font-semibold mb-6">
                {selectedChat.name}
              </p>
              {messeges.map((msg, index) => (
                <Message key={index} role={msg.role} content={msg.content} />
              ))}
              {isLoading && (
                <div className="flex gap-4 max-w-3xl w-full py-3">
                  <Image
                    className="h-9 w-9 p-1 border border-white/15 rounded-full"
                    src={assets.logo_icon}
                    alt="Logo"
                  />
                  <div className="loader flex justify-center items-center gap-1 ">
                    <div className="w-1 h-1 rounded-full bg-white animate-bounce"></div>
                    <div className="w-1 h-1 rounded-full bg-white animate-bounce"></div>
                    <div className="w-1 h-1 rounded-full bg-white animate-bounce"></div>
                  </div>
                </div>
              )}
            </div>
          )}
          <Promptbox isLoading={isLoading} setIsLoading={setIsLoading} />
          <p className="text-xs absolute bottom-1 text-gray-500">
            AI generated, for reference only
          </p>
        </div>
      </div>
    </div>
  );
}
