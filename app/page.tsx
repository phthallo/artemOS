'use client'
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import Window from "./components/Window";
import { createRef, useState } from "react";
import { CommandLineIcon, ClockIcon, NumberedListIcon } from "@heroicons/react/24/outline";

const apps = [
  {
    window: "Dashboard",
    icon: <CommandLineIcon className="size-10"/>,
    showUnauthed: true, 
  },
  { window: "WakaTime",
    icon: <ClockIcon className="size-10"/>,
    showUnauthed: false,
  },
  { window: "2025_Projects",
    icon: <NumberedListIcon className="size-10"/>,
    showUnauthed: false,
  }
]



export default function Home() {
    const ref = createRef<HTMLDivElement>()
    const session = useSession();
    const [ isOpen, setIsOpen ] = useState(['Dashboard'])

    return (
      <>
      { session.status !== "loading" ? 
      <div className = "h-screen w-screen overflow-hidden bg-[url(/bg.png)] bg-cover">
        <div className = "absolute z-2 w-screen h-screen backdrop-sepia-[.55]"/>
        <div className = "relative h-screen w-screen">
          
          <Window id="Dashboard" ref={ref} closeable={true} position={{x: 100, y: 100}} openState={{isOpen, setIsOpen}}>
              { session.status === "authenticated" ? 
                <div className = "w-[450px] h-96 p-5 text-mono">
                    <img draggable={false} src = "/artemos.png"/>
                    <pre className = "whitespace-pre-wrap text-center">
                Your inteplanetary dashboard for the Athena Awards! 🚀
                    </pre>
                </div>
                : 
                <div className = "w-[450px] h-96 p-5 text-mono">
                  <span className = "bold text-polarblue">user@artermOS:~$</span>
                  <p className = "my-3"><span className="underline decoration-wavy p-2">Something went wrong</span> - you're not signed in with Slack!</p>
                  <button className = "text-white p-3 bg-darkblue" onClick={()=> signIn(undefined, {callbackUrl: '/'})}>Click me to sign in</button>
                </div> 
              }
          </Window>

          <div className = "absolute bottom-0 w-screen h-16 flex items-center flex-row justify-center bg-opacity-75 bg-gray-200 border border-t-white">
              { apps.map((app, index) => 
                <button key={index} className = {`${session.status !== "authenticated" && !app.showUnauthed ? "hidden": null} mx-1 align-middle p-1 text-darkblue hover:text-darkblue/75 bg-white rounded-lg active:border active:border-black`}
                  onDoubleClick={() => setIsOpen((window: string[]) => [...window, app.window])}>
                  {app.icon} {/* */}
                </button>
              )}
          </div>
          
        </div>
      </div>
      : <div className = "h-screen w-screen bg-terminal p-10 text-white">Loading...</div>
      }
      </>
    );
}
  