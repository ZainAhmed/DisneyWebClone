import { baseURL, fetchFromTMDB } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET() {
  let url = new URL(`${baseURL}/discover/movie`);
  const response = await fetchFromTMDB(url, true);
  return NextResponse.json(response);
}
