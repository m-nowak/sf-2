// import mqtt from 'mqtt';
// import { v4 as uuidv4 } from 'uuid';

// class MQTTService {
//   constructor() {
//     this.client = null;
//   }

//   connect(brokerUrl, options = {}) {
//     const clientId = `mqtt_${uuidv4()}`;
//     options.clientId = clientId;

//     this.client = mqtt.connect(brokerUrl, {
//       ...options,
//       protocol: 'mqtt',
//     });

//     this.client.on('connect', () => {
//       console.log(`Connected to MQTT broker with clientId: ${clientId}`);
//     });

//     this.client.on('error', (err) => {
//       console.error('Connection error: ', err);
//       this.client.end();
//     });

//     this.client.on('offline', () => {
//       console.error('Client went offline');
//     });

//     this.client.on('reconnect', () => {
//       console.log('Attempting to reconnect');
//     });
//   }

//   subscribe(topic, onMessageCallback) {
//     if (this.client) {
//       this.client.subscribe(topic, (err) => {
//         if (err) {
//           console.error('Subscription error: ', err);
//         } else {
//           console.log(`Subscribed to topic: ${topic}`);
//         }
//       });

//       this.client.on('message', (receivedTopic, message) => {
//         if (receivedTopic === topic) {
//           onMessageCallback(message.toString());
//         }
//       });
//     }
//   }

//   publish(topic, message) {
//     if (this.client) {
//       this.client.publish(topic, message, (err) => {
//         if (err) {
//           console.error('Publish error: ', err);
//         } else {
//           console.log(`Message: ${message} published to topic: ${topic}`);
//         }
//       });
//     }
//   }
// }

// const mqttService = new MQTTService();
// export default mqttService;
