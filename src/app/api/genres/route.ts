import { baseURL, fetchFromTMDB } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET() {
  let url = new URL(`${baseURL}/genre/movie/list?language=en`);
  const response = await fetchFromTMDB(url, false);
  return NextResponse.json(response);
}
