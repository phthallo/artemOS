import Airtable from "airtable";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

const airtable = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY
}).base(process.env.AIRTABLE_BASE_ID!)

export async function GET() {
    const session = await auth();
    if (session){
        const projects = JSON.parse(JSON.stringify(await airtable("YSWS Projects").select(
            {filterByFormula: `AND({Email} = "${session?.user.email}", IF({Created} > DATETIME_PARSE('2025-01-01', 'YYYY-MM-DD'), TRUE(), FALSE()))`,
        fields: ["Playable URL", "Code URL", "Screenshot", "YSWS"]}
        ).all()))
        const sortedProjects =  projects.map((project) => {
            return  { 
                "Playable URL": project["fields"]["Playable URL"] ? project["fields"]["Playable URL"] : null ,
                "Code URL": project["fields"]["Code URL"] ? project["fields"]["Code URL"] : null,
                "Screenshot": project["fields"]["Screenshot"] ? project["fields"]["Screenshot"][0]["url"] : null,
                "YSWS": project["fields"]["YSWS"] ? project["fields"]["YSWS"] : null
            }
        })
        const wakaTime = (await fetch(`https://waka.hackclub.com/api/compat/wakatime/v1/users/${session?.slack_id}/stats/year?category=coding`))
        if (wakaTime.status === 200){
            const wakaTimeBody = await (wakaTime).json()
            const response = {
                projects: sortedProjects, 
                wakatime: {
                    total_seconds: (wakaTimeBody)["data"]["total_seconds"], 
                    human_readable_total: (wakaTimeBody)["data"]["human_readable_total"]}}

            return NextResponse.json(response)
        } else if (wakaTime.status === 403) { // no wakatime data on hand
            const response = {
                projects: sortedProjects, 
                wakatime: {
                    total_seconds: 0, 
                    human_readable_total: "0 hrs 0 mins"
                }
            }
            return NextResponse.json(response)    
        } {
            return NextResponse.json({error: "Something went wrong", status: 400})
        }
    } else {
        return NextResponse.json({error: "Not authed", status: 403})
    }
}