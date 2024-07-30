import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export const GET = (req: any, res: NextResponse) =>{
  return new NextResponse(JSON.stringify({ message: "Hello, world!" }));
}
