import { ImageResponse } from "@vercel/og";
import type { NextRequest } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

export default function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // ?title=<title>
    const hasTitle = searchParams.has("title");
    const title = hasTitle
      ? searchParams.get("title")?.slice(0, 100)
      : "My default title";

    return new ImageResponse(
      (
        <div
          style={{
            backgroundColor: "black",
            backgroundSize: "150px 150px",
            height: "100%",
            width: "100%",
            display: "flex",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            flexWrap: "nowrap",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              justifyItems: "center",
            }}
          >
            <img
              alt="zaki-yama"
              width="256"
              height="256"
              src="https://github.com/zaki-yama.png"
              style={{
                borderRadius: 128,
              }}
            />
          </div>
          <div
            style={{
              fontSize: 60,
              fontStyle: "normal",
              letterSpacing: "-0.025em",
              color: "white",
              marginTop: 30,
              padding: "0 120px",
              lineHeight: 1.4,
              whiteSpace: "pre-wrap",
            }}
          >
            {title}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
