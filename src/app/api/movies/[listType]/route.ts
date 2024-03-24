import { baseURL, fetchFromTMDB } from "@/lib/utils";
import { NextResponse } from "next/server";

type PropsType = {
  params: { listType: string };
};
export async function GET(request: Request, { params }: PropsType) {
  let url = new URL(`${baseURL}/movie/${params.listType}`);
  const response = await fetchFromTMDB(url, true);
  return NextResponse.json(response);
}
