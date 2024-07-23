"use client";

import { useEffect, useState } from "react";

const MqttStream: React.FC = () => {
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const url = new URL("/api/mqtt", window.location.origin);
    url.searchParams.append("brokerUrl", "mqtt://172.16.113.4:1883");
    url.searchParams.append("topic", "RUG/HV1/SD/PD/1637/liveStream");

    const eventSource = new EventSource(url.toString());

    eventSource.onmessage = (event) => {
      setMessage(event.data);
    };

    eventSource.onerror = (error) => {
      console.error("EventSource error:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div>
      <h1>MQTT Messages</h1>
      <p>{message}</p>
    </div>
  );
};

export default MqttStream;
