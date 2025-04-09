import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const messages = body.messages;

  // 🔗 Your n8n webhook URL
  const n8nWebhookUrl = "https://your-n8n-domain.com/webhook/chatbot";

  try {
    const res = await fetch(n8nWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages }),
    });

    const data = await res.json();

    return NextResponse.json({
      data: {
        message: data.message || "⚠️ No message received from n8n.",
      },
    });
  } catch (error) {
    console.error("n8n error:", error);
    return NextResponse.json({
      data: {
        message: "⚠️ Failed to contact backend.",
      },
    });
  }
}

