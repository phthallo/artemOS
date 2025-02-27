'use client'
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import Window from "./components/Window";
import { createRef, useState } from "react";
import { CommandLineIcon, ClockIcon, NumberedListIcon, QuestionMarkCircleIcon, MusicalNoteIcon} from "@heroicons/react/24/outline";
import { fetcher } from "./utils";
import useSWR from "swr";

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
  console.log(hourCompletion, projectCompletion)
  return hourCompletion + projectCompletion >= 2 ? 100 : (hourCompletion + projectCompletion)/2 * 100
}

export default function Home() {
    const ref = createRef<HTMLDivElement>()
    const session = useSession();
    const [ isOpen, setIsOpen ] = useState(['Dashboard', 'Music'])
    const { data, error, isLoading } = useSWR('/api/user', fetcher)
    if (isLoading){
      return (
        <div className = "h-screen w-screen bg-terminal font-monospace p-10 text-white">Loading...</div>
      )
    }
    return (
      <>
      { session.status !== "loading" ? 
      <div className = "h-screen w-screen overflow-hidden bg-[url(/bg.png)] bg-cover">
        <div className = "absolute z-2 w-screen h-screen backdrop-sepia-[.55]"/>
        <div className = "relative h-screen w-screen">
          <Window id="Dashboard" ref={ref} closeable={true} position={{x: 50, y: 50}} openState={{isOpen, setIsOpen}}>

              { session.status === "authenticated" ? 
                <div className = "w-[400px] p-5 bg-terminal rounded-b-lg">
                    <Image alt="Artemos (ASCII)" draggable={false} src = "/artemos.png"/>
                    <pre className = "flex flex-col gap-10 font-monospace whitespace-pre-wrap text-center">
                       <p>Your interplanetary dashboard for the Athena program! 🚀</p>
                      <p>Signed in as <span className = "text-polarblue">{session.data.user.name}</span></p>
                    </pre>
                </div>
                : 
                <div className = "w-[450px] p-5 font-monospace bg-terminal rounded-b-lg">
                  <span className = "bold text-polarblue">user@artermOS:~$</span>
                  <p className = "my-3"><span className="underline decoration-wavy py-2">We couldn't load your data</span> - you're not signed in with Slack!</p>
                  <button className = "text-white p-3 bg-darkblue" onClick={()=> signIn(undefined, {callbackUrl: '/'})}>Click me to sign in</button>
                </div> 
              }
          </Window>

          <Window id="WakaTime" ref={ref} closeable={true} position={{x: 50, y: 375}} openState={{isOpen, setIsOpen}}>
            <div className = "w-[400px] h-48 p-5 font-monospace bg-slate-600 rounded-b-lg text-center">
              { session.status === "authenticated" ? <span>{(data as any).wakatime.human_readable_total} spent programming this year. Wow!</span> : null }
            </div>
          </Window> 

          <Window id="2025_Projects" ref={ref} closeable={true} position={{x: 480, y: 280}} openState={{isOpen, setIsOpen}}>
            <div className = "min-w-[500px] max-h-[290px] overflow-scroll p-5 font-monospace bg-slate-600 rounded-b-lg">
            {session.status === "authenticated" ?
            <>
              <span className = "text-polarblue"> {((data as any)?.projects).length} projects completed this year.</span>
                <div className = "grid grid-cols-2 gap-6">

                    {(data as any)?.projects.map((project: any, index: number) => 
                    <div key={index} className = "flex flex-col">
                      <span>{(project["fields"]["YSWS"])} - <a className = "bold" href= {project["fields"]["Playable URL"]}>Project</a></span>
                      <a href = {project["fields"]["Code URL"]}>Repository</a>
                    </div>
                  )}

                </div>
                </>
                : null }
            </div>
          </Window>

          <Window id="???" ref={ref} closeable={true} position={{x: 480, y: 50}} openState={{isOpen, setIsOpen}}>
            <div className = "min-w-[500px] max-h-[300px] overflow-scroll p-5 font-monospace text-center text-white bg-terminal rounded-b-lg">
              { session.status === "authenticated" ? 
              <>
              <div className = "h-20 rounded-md bg-darkblue">
                <div className = "h-20 rounded-md bg-polarblue" style={{ width: calculateCompletion((data as any).projects.length, (data as any).wakatime["total_seconds"]) + "%"}}/>
              </div>
              
              <span className = "">#̷̨̖͔̪̠͋̔̐̈́̏̓̀̎̆̄̔̚̚͝E̴̫͉͚̩͓̹̥̖̠͂̇͐̆̈́̉̉̇͂͜r̵̛̞͕̬̈̓̈́̍͑͑̂́̌̽̈́͝ṙ̷̨̦̪͓̝̘̬͓̘̬̥͖̪̘̍̅̃̎͠͝o̵͕̗͚̯͍͈̙̟̗͆͝͠͝r̵̠̻̳̜̹͉͝[̸̬̻̞̯̖͔̈́̑́̔̈́̌͛̔̇C̶̪̮̯͇̲̤̃̇̀͗̀̈̔̾͜ő̵̖͚̯̑͋̓͘͜ȑ̸̮̜̰̲͔̻͓̲̰͇͈̘͂̎̾̇̇͋͝ͅŗ̶̧̡̫̣͎͇͂̿̿̄̈́u̸͕͂́̒͗̋͛̾̌̍̚͘̚p̴̛̩͔͉͕͍̗̯̰̹̫̈́̆͗̂͘͜ͅt̶̢̢͕̯̦̺̹̠̖̿̏͒̇̀ě̷̹͔̣͔̦͔͔͙̎̏̂d̴̡̡̝͇͔͙̳̭͇͍͖̆͝ͅͅ]̸̤̠̺͔̳͕̈́͋͜͝ is {calculateCompletion((data as any).projects.length, (data as any).wakatime["total_seconds"])}% loaded... </span>

              <p>{ calculateCompletion((data as any).projects.length, (data as any).wakatime["total_seconds"]) >= 100 ? "Stay tuned for more." : "Error: Missing requirements"}</p>
              </>
              : null }
            </div>
          </Window>



          <Window id = "Music" ref={ref} closeable={true} position = {{x: 1010, y: 50}} openState={{isOpen, setIsOpen}}>
            <div className = "w-1/4 rounded-b-lg">
              <iframe className = "rounded-b-lg" width="410" height="300" src="https://www.youtube.com/embed/xMiv10KdaNU?si=PwS0ULo46hEJvlOc" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            </div>
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
  