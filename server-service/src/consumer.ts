import * as amqp from "amqplib";

export async function recvMail() {
  try {
    const connection = await amqp.connect("amqp://rabbitmq");
    const channel = await connection.createChannel();

    await channel.assertQueue("mail_queue", { durable: false });

    console.log("Waiting for mail messages...");

    channel.consume(
      "mail_queue",
      (message) => {
        if (message) {
          const data = JSON.parse(message.content.toString());
          console.log("Received Message:", data);

          channel.ack(message);
        }
      },
      { noAck: false }
    );
  } catch (error) {
    console.error("Consumer error:", error);
  }
}
