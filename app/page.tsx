'use client'
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import Window from "./components/Window";
import { createRef, useState, useEffect } from "react";
import { CommandLineIcon, ClockIcon, NumberedListIcon, QuestionMarkCircleIcon, MusicalNoteIcon} from "@heroicons/react/24/outline";
import { fetcher } from "./utils";
import useSWR from "swr";
import { safeData } from "@/types";

type fetchResponse = {
  projects: [],
  wakatime: {
    total_seconds: number
    human_readable_total: string
  }
}

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
  },
  { window: "???",
    icon: <QuestionMarkCircleIcon className="size-10"/>,
    showUnauthed: false,
  },
  {
    window: "Music",
    icon: <MusicalNoteIcon className="size-10"/>,
    showUnauthed: true
  }
]

function calculateCompletion(projects: number, wakaSeconds: number){
  const hourCompletion = (wakaSeconds / 3600) >= 30 ? 1 : (wakaSeconds / 3600) / 30 
  const projectCompletion = (projects / 3) >= 1 ? 1 : projects / 3
  return hourCompletion + projectCompletion >= 2 ? 100 : (hourCompletion + projectCompletion)/2 * 100
}

export default function Home() {
    const ref = createRef<HTMLDivElement>()
    const session = useSession();
    const [ isOpen, setIsOpen ] = useState(['Dashboard', 'Music', '???', "WakaTime", "2025_Projects"])
    const [ localState, setLocalState ] = useState({
        projects: [],
        wakatime: {
          total_seconds: 0,
          human_readable_total: ""
        }
      }
    )

      const {  error, data, isLoading } = useSWR('/api/user', fetcher, {
        keepPreviousData: true,
        onSuccess: (data) => {
            setLocalState(data as fetchResponse)
        }
        })
    
    useEffect(() => {
      if (data){
        setLocalState(data as fetchResponse)
      }
    }, [localState])

  

    return (
      <>
      { session.status !== "loading" ? 
      <div className = "h-screen w-screen overflow-hidden bg-[url(/bg.png)] bg-cover">
        <div className = "absolute z-2 w-screen h-screen backdrop-sepia-[.55]"/>
        <div className = "relative h-screen w-screen" id="desktop">

        {/* Screens that only show if you're logged in */}
        { session.status === "authenticated" ? 
          <>
          <Window id="Dashboard" ref={ref} closeable={true} position={{x: 50, y: 50}} openState={{isOpen, setIsOpen}}>
                <div className = "w-[400px] p-5 bg-terminal rounded-b-lg">
                    <Image alt="Artemos (ASCII)" draggable={false} src = "/artemos.png" width={0} height={0} sizes={"100vw"} style={{width: "100%", height: "auto"}}/>
                    <pre className = "flex flex-col gap-3 font-monospace whitespace-pre-wrap text-center">
                       <p>Your interplanetary dashboard for the Athena program! 🚀</p>
                      <p>Signed in as <span className = "text-polarblue">{session.data.user.name}</span></p>
                    </pre>
                </div>
          </Window>

          <Window id="WakaTime" ref={ref} closeable={true} position={{x: 50, y: 375}} openState={{isOpen, setIsOpen}}>
            <div className = "w-[400px] flex items-center justify-center h-48 p-5 font-monospace bg-slate-600 rounded-b-lg text-center">
              <span>{(localState).wakatime.human_readable_total} spent programming this year. Wow!</span>
            </div>
          </Window> 

          <Window id="2025_Projects" ref={ref} closeable={true} position={{x: 480, y: 280}} openState={{isOpen, setIsOpen}}>
            <div className = "min-w-[500px] max-h-[290px] overflow-scroll p-5 font-monospace bg-slate-600 rounded-b-lg">
              <span className = "text-polarblue"> {((localState)?.projects).length} projects completed this year.</span>
                <div className = "grid grid-cols-2 gap-6">
                    {(localState)?.projects.map((project: safeData, index: number) => 
                    <div key={index} className = "flex flex-col gap-2 py-3">
                      <div className = "w-full h-24 relative">
                        {project["Screenshot"] ? <Image alt ="alt" objectFit="cover" fill={true} src = {project["Screenshot"]}/> : <Image alt = "No picture" fill={true} objectFit="contain" src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/f557c087e406a0015ea1aa00bb9fc5ee8ab73f6a_image.png"/> }
                      </div>
                      <span className = "text-polarblue">{(project["YSWS"])} - <a className = "bold" href= {project["Playable URL"]}>Project</a></span>
                      <a href = {project["Code URL"]}>Repository</a>
                    </div>
                  )}
                </div>
            </div>
          </Window>

          <Window id="???" ref={ref} closeable={true} position={{x: 480, y: 50}} openState={{isOpen, setIsOpen}}>
            <div className = "min-w-[500px] max-h-[300px] overflow-scroll p-5 font-monospace text-center text-white bg-terminal rounded-b-lg">
              <div className = "h-20 rounded-md bg-darkblue">
                <div className = "h-20 rounded-md bg-polarblue" style={{ width: calculateCompletion((localState).projects.length, (localState).wakatime["total_seconds"]) + "%"}}/>
              </div>
              
              <span className = "">#̷̨̖͔̪̠͋̔̐̈́̏̓̀̎̆̄̔̚̚͝E̴̫͉͚̩͓̹̥̖̠͂̇͐̆̈́̉̉̇͂͜r̵̛̞͕̬̈̓̈́̍͑͑̂́̌̽̈́͝ṙ̷̨̦̪͓̝̘̬͓̘̬̥͖̪̘̍̅̃̎͠͝o̵͕̗͚̯͍͈̙̟̗͆͝͠͝r̵̠̻̳̜̹͉͝[̸̬̻̞̯̖͔̈́̑́̔̈́̌͛̔̇C̶̪̮̯͇̲̤̃̇̀͗̀̈̔̾͜ő̵̖͚̯̑͋̓͘͜ȑ̸̮̜̰̲͔̻͓̲̰͇͈̘͂̎̾̇̇͋͝ͅŗ̶̧̡̫̣͎͇͂̿̿̄̈́u̸͕͂́̒͗̋͛̾̌̍̚͘̚p̴̛̩͔͉͕͍̗̯̰̹̫̈́̆͗̂͘͜ͅt̶̢̢͕̯̦̺̹̠̖̿̏͒̇̀ě̷̹͔̣͔̦͔͔͙̎̏̂d̴̡̡̝͇͔͙̳̭͇͍͖̆͝ͅͅ]̸̤̠̺͔̳͕̈́͋͜͝ is {calculateCompletion((localState).projects.length, (localState).wakatime["total_seconds"])}% loaded... </span>

              <p>{ calculateCompletion((localState).projects.length, (localState).wakatime["total_seconds"]) >= 100 ? "Stay tuned for more." : "Error: Missing requirements"}</p>
            </div>
          </Window>
          </>
            :
            /* Alternate versions of screens to show when unauthed */
                <Window id="Dashboard" ref={ref} closeable={true} position={{x: 50, y: 50}} openState={{isOpen, setIsOpen}}>
                  <div className = "w-[450px] p-5 font-monospace bg-terminal rounded-b-lg">
                    <span className = "bold text-polarblue">user@artemOS:~$</span>
                    <p className = "my-3"><span className="underline decoration-wavy py-2">We couldn&apos;t load your data</span> - you&apos;re not signed in with Slack!</p>
                    <button className = "text-white p-3 bg-darkblue" onClick={()=> signIn(undefined, {callbackUrl: '/'})}>Click me to sign in</button>
                  </div> 
                  </Window>
            }
            {/* Screens which are open regardless of auth status*/}
            <div className = "relative h-screen w-screen">
              <Window id = "Music" ref={ref} closeable={true} position = {{x: 1010, y: 50}} openState={{isOpen, setIsOpen}}>
                  <div className = "w-1/4 rounded-b-lg">
                    <iframe className = "rounded-b-lg" width="410" height="300" src="https://www.youtube.com/embed/xMiv10KdaNU?si=PwS0ULo46hEJvlOc" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
              </Window>
              </div>
          </div>

          <div className = "absolute bottom-0 w-screen h-16 flex items-center flex-row justify-center bg-opacity-75 bg-gray-200 border border-t-white">
              { apps.map((app, index) => 
                <button key={index} className = {`${session.status !== "authenticated" && !app.showUnauthed ? "hidden": null} mx-1 align-middle p-1 text-darkblue hover:text-darkblue/75 bg-white rounded-lg border active:border-black`}
                  onDoubleClick={() => setIsOpen((window: string[]) => [...window, app.window])}>
                  {app.icon} {/* */}
                </button>
              )}
          </div>
        </div>
      : <div className = "h-screen w-screen bg-terminal p-10 text-white">Loading...</div>
      }
      </>
    );
}
  