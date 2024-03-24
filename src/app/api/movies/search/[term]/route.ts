import { baseURL, fetchFromTMDB } from "@/lib/utils";
import { NextResponse } from "next/server";
type PropsType = {
  params: { term: string };
};
export async function GET(request: Request, { params }: PropsType) {
  let url = new URL(`${baseURL}/search/movie`);
  url.searchParams.set("query", params.term);
  const response = await fetchFromTMDB(url, true);
  return NextResponse.json(response);
}
