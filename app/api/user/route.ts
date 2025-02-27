import Airtable from "airtable";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

const airtable = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY
}).base(process.env.AIRTABLE_BASE_ID!)

export async function GET() {
    const session = await auth();
    const projects = JSON.parse(JSON.stringify(await airtable("YSWS Projects").select(
        {filterByFormula: `AND({Email} = "${session?.user.email}", IF({Created} > DATETIME_PARSE('2025-01-01', 'YYYY-MM-DD'), TRUE(), FALSE()))`,
    fields: ["Playable URL", "Code URL", "Screenshot", "YSWS"]}
    ).all()))
    const wakaTime = (await fetch(`https://waka.hackclub.com/api/compat/wakatime/v1/users/${session?.slack_id}/stats/year?category=coding`)).json()
    const response = {
        projects: projects, 
        wakatime: {
            total_seconds: (await wakaTime)["data"]["total_seconds"], 
            human_readable_total: (await wakaTime)["data"]["human_readable_total"]}}

    return NextResponse.json(response)
}