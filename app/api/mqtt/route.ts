// app/api/mqtt/route.ts

import mqttService from "@/lib/mqtt-service";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const brokerUrl = searchParams.get("brokerUrl");
  const topic = searchParams.get("topic");

  if (!brokerUrl || !topic) {
    return new Response(
      JSON.stringify({ message: "Broker URL and topic are required" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  const options = {
    keepalive: 60,
    clean: true,
    reconnectPeriod: 1000,
    connectTimeout: 30 * 1000,
  };

  mqttService.connect(brokerUrl, options);

  const readableStream = new ReadableStream({
    start(controller) {
      mqttService.subscribe(topic, (message) => {
        const data = `data: ${message}\n\n`;
        controller.enqueue(new TextEncoder().encode(data));
      });
    },
    cancel() {
      console.log("SSE connection closed");
      mqttService.disconnect(); // Disconnect when the stream is closed
    },
  });

  return new Response(readableStream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
