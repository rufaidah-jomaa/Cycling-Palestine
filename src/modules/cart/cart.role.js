import { roles } from "../../middleware/auth.middleware.js";

export const endPoints={
    getFromCart:[roles.User],
    create:[roles.User],
    remove:[roles.User],
    clear:[roles.User],
    quantity:[roles.User]
}