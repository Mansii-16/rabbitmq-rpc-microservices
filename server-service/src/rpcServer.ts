import * as amqp from "amqplib";

const RABBITMQ_URL = process.env.RABBITMQ_URL ?? "amqp://rabbitmq";
const RPC_QUEUE = "rpc_queue";

async function startServer() {
  const connection = await amqp.connect(RABBITMQ_URL);
  const channel = await connection.createChannel();

  await channel.assertQueue(RPC_QUEUE, { durable: false });

  // Process only one message at a time (RPC best practice)
  channel.prefetch(1);

  console.log("Server: Waiting for RPC requests...");

  channel.consume(RPC_QUEUE, (msg) => {
    if (!msg) return;

    const request = msg.content.toString();
    console.log("Server: Received ->", request);

    // 🔥 Optimized: reuse correlationId from client
    const response = `Hello received by Server: ${request}`;

    channel.sendToQueue(
      msg.properties.replyTo,
      Buffer.from(response),
      {
        correlationId: msg.properties.correlationId
      }
    );

    channel.ack(msg);
  });
}

startServer();
