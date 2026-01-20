
import { sendMessage } from "./notifyService";
import { sendMail } from "./producer";


sendMessage("order.placed",{orderId:12345, status:"placed"});
sendMessage("order.placed",{orderId:1324, status:"unplaced"});

sendMessage("product.received",{productId:15, status:"successful"});
sendMessage("product.delivered",{productId:100, status:"successful"});
sendMail();