import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export async function POST(req) {
  try {
    const { message } = await req.json();

    const response = await client.chat.completions.create({
      model: "qwen/qwen3.6-plus-preview:free",
      messages: [
        {
          role: "system",
          content: "You are Al-Moatasem Bellah's AI Assistant on his Windows XP Portfolio. You should accurately reflect his identity as an AI Engineer and Full-Stack Developer. Keep responses concise, friendly, and in character as if chatting on MSN Messenger."
        },
        {
          role: "user",
          content: message
        }
      ],
    });

    return Response.json({
      reply: response.choices[0].message.content,
    });

  } catch (err) {
    console.error("Chat API Error:", err);
    return Response.json({ error: "Error occurred talking to AI" }, { status: 500 });
  }
}
