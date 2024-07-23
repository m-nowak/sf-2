"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const Home: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const brokerUrl = "mqtt://172.";
    const topic = "RUG/HV1/SD/PD/1637/liveStream";

    const eventSource = new EventSource(
      `/api/mqtt/subscribe?brokerUrl=${brokerUrl}&topic=${topic}`
    );

    eventSource.onmessage = (event: MessageEvent) => {
      setMessages([event.data]);
    };

    eventSource.onerror = (error) => {
      console.error("EventSource failed: ", error);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const handlePublish = async (): Promise<void> => {
    const brokerUrl = "mqtt://your-broker-ip";
    const topic = "test/topic";
    const message = "Hello MQTT";

    await axios.post("/api/mqtt/publish", { brokerUrl, topic, message });
  };

  return (
    <div>
      <h1>MQTT with Next.js</h1>
      <button onClick={handlePublish}>Publish Message</button>
      <h2>Received Messages</h2>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
