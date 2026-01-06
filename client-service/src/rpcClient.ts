import * as amqp from "amqplib";

async function client() {
    
  const connection = await amqp.connect("amqp://rabbitmq");
  const channel = await connection.createChannel();

  const replyQueue = await channel.assertQueue("", { exclusive: true });

  console.log("Client: Sending message");

  channel.consume(replyQueue.queue, (msg) => {
    if (msg) {
      console.log("Client: Received reply ->", msg.content.toString());
      connection.close();
    }
  }, { noAck: true });

  channel.sendToQueue(
    "rpc_queue",
    Buffer.from("Hello Server"),
    { replyTo: replyQueue.queue }
  );
}

client();
