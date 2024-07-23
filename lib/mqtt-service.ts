// lib/mqttService.ts
import mqtt, { MqttClient } from "mqtt";

class MQTTService {
  private client: MqttClient | null = null;

  connect(brokerUrl: string, options?: mqtt.IClientOptions) {
    if (this.client) {
      console.warn("Already connected to an MQTT broker");
      return;
    }

    this.client = mqtt.connect(brokerUrl, options);

    this.client.on("connect", () => {
      console.log("Connected to MQTT broker");
    });

    this.client.on("error", (error) => {
      console.error("Connection error:", error);
    });

    this.client.on("reconnect", () => {
      console.log("Reconnecting to MQTT broker");
    });

    this.client.on("close", () => {
      console.log("MQTT connection closed");
    });
  }

  subscribe(topic: string, callback: (message: string) => void) {
    if (!this.client) {
      throw new Error("MQTT client is not connected");
    }

    this.client.subscribe(topic, (error) => {
      if (error) {
        console.error("Subscribe error:", error);
        return;
      }
      console.log(`Subscribed to topic: ${topic}`);
    });

    this.client.on("message", (topic, message) => {
      callback(message.toString());
    });
  }

  disconnect() {
    if (this.client) {
      this.client.end();
    }
  }
}

const mqttService = new MQTTService();
export default mqttService;
