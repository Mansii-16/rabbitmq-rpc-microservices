import * as amqp from "amqplib";
import { randomUUID } from "crypto";

const RABBITMQ_URL = "amqp://rabbitmq";
const RPC_QUEUE = "rpc_queue";

async function startClient() {
  const connection = await amqp.connect(RABBITMQ_URL);
  const channel = await connection.createChannel();

  const replyQueue = await channel.assertQueue("", { exclusive: true });
  const correlationId = randomUUID(); // ✅ BEST PRACTICE

  console.log("Client: Sending Hello message...");

  channel.consume(
    replyQueue.queue,
    (msg) => {
      if (msg && msg.properties.correlationId === correlationId) {
        console.log("Client: Response ->", msg.content.toString());
        setTimeout(() => {
          connection.close();
          process.exit(0);
        }, 500);
      }
    },
    { noAck: true }
  );

  channel.sendToQueue(
    RPC_QUEUE,
    Buffer.from("Hello from Client Service"),
    {
      correlationId,
      replyTo: replyQueue.queue
    }
  );
}

startClient();
