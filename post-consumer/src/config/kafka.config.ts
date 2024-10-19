import { Consumer, Kafka, logLevel } from "kafkajs";

class KafkaConfig {
  private kafka: Kafka;
  private consumer: Consumer;

  private brokers: string;

  constructor() {
    this.brokers = process.env.KAFKA_BROKERS || "192.168.1.112:9092";
    this.kafka = new Kafka({
      clientId: "post-producer",
      brokers: [this.brokers],
      logLevel: logLevel.ERROR,
    });
    this.consumer = this.kafka.consumer({
      groupId: "post-consumer",
    });
  }

  async connect(): Promise<void> {
    try {
      await this.consumer.connect();
      console.log("Kafka connected");
    } catch (error) {
      console.error("Error connecting to Kafka:", error);
    }
  }

  async subscribeTopic(topic: string): Promise<void> {
    try {
      await this.consumer.subscribe({
        topic,
        fromBeginning: true,
      });
      console.log("Subscribe to topic:", topic);
    } catch (error) {
      console.error("Error subscribing to topic:", error);
    }
  }

  async consume(callback: (message: any) => void): Promise<void> {
    try {
      await this.consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          callback(JSON.parse(message?.value?.toString()!));
        },
      });
    } catch (error) {
      console.error("Error consuming the message:", error);
    }
  }

  async disconnect(): Promise<void> {
    try {
      await this.consumer.disconnect();
      console.log("Kafka disconnected");
    } catch (error) {
      console.error("Error disconnecting from Kafka:", error);
    }
  }
}

export default new KafkaConfig();
