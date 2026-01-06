import * as amqp from "amqplib";

async function server() {
  const connection = await amqp.connect("amqp://rabbitmq");
  const channel = await connection.createChannel();

  await channel.assertQueue("rpc_queue");

  console.log("Server: Waiting for message");

  channel.consume("rpc_queue", (msg) => {
    if (!msg) return;

    console.log("Server: Received ->", msg.content.toString());

    channel.sendToQueue(
      msg.properties.replyTo,
      Buffer.from("Hello Client")
    );

    channel.ack(msg);
  });
}

server();
