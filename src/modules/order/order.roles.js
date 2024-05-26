import { roles } from "../../middleware/auth.middleware.js";

export const endPoints={
    create:[roles.User],
    getOrders:[roles.Admin],
    myOrders:[roles.User]
}