import { baseURL, fetchFromTMDB } from "@/lib/utils";
import { NextResponse } from "next/server";
type PropsType = {
  params: { id: string };
};
export async function GET(request: Request, { params }: PropsType) {
  let url = new URL(`${baseURL}/movie/${params.id}`);
  const response = await fetchFromTMDB(url, false);
  return NextResponse.json(response);
}
