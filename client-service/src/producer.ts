const amqp = require( "amqplib")

export async function sendMail() {
    try{
    const connection = await amqp.connect("amqp://rabbitmq");
    const channel = await connection.createChannel()
    const exchange="mail_exchange";
    const routingkey ="send_mail"   

const message ={
    to:"mansiinvocreto@gmail.com",
    from:"aniketinvocreto@gmail.com",
    subject:"hello sample mail",
    body:"Hello Mansi !! I hope u are doing well "
}
    await channel.assertExchange(exchange,"direct",{durable:false});
    await channel.assertQueue("mail_queue",{durable:false});
    await channel.bindQueue("mail_queue",exchange,routingkey);

    channel.publish(exchange,routingkey,Buffer.from(JSON.stringify(message)))

    console.log("Mail data was send",message);
    setTimeout(()=>{
        connection.close();
    },500);
} 
    catch(error){
        console.log(error)
    }    
    
}