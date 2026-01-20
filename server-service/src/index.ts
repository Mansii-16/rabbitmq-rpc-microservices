import { recvMail } from "./consumer";
import { receiveOrder } from "./orderNotificationService";

receiveOrder();

recvMail();
