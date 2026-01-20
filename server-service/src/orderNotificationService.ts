import * as amqp from "amqplib";
import { ConsumeMessage } from "amqplib";

export const receiveOrder = async () => {
  try {
    const connection = await amqp.connect("amqp://rabbitmq");
    const channel = await connection.createChannel();

    const exchange = "notification_exchange_updated";
    const queue = "order_queue";

    await channel.assertExchange(exchange, "topic", { durable: true });
    await channel.assertQueue(queue, { durable: true });

    //  IMPORTANT: bind queue to exchange
    await channel.bindQueue(queue, exchange, "order.*");

    console.log("Waiting for messages...");

    channel.consume(
      queue,
      (msg: ConsumeMessage | null) => {
        if (!msg) return;

        console.log(
          `[Order Notification] Message received
Routing Key: ${msg.fields.routingKey}
Content: ${msg.content.toString()}`
        );

        channel.ack(msg);
      },
      { noAck: false }
    );
  } catch (error) {
    console.log("Error:", error);
  }
};
