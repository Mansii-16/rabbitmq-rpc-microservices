const amqp = require("amqplib");

export const sendMessage = async (
  routingkey: string,
  message: Record<string, any>
) => {
  try {
    const connection = await amqp.connect("amqp://rabbitmq");
    const channel = await connection.createChannel();

    const exchange = "notification_exchange_updated";
    const exchangeType = "topic";

    await channel.assertExchange(exchange, exchangeType, { durable: true });

    channel.publish(
      exchange,
      routingkey,
      Buffer.from(JSON.stringify(message)),
      { persistent: true }
    );

    console.log(
      `Message sent! routingKey=${routingkey}, content=${JSON.stringify(message)}`
    );

    
  } catch (error) {
    console.error("Error:", error);
  }
};
