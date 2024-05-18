import { roles } from "../../middleware/auth.middleware.js";

export const endPoints={
    create:[roles.User],
    remove:[roles.User],
    clear:[roles.User],
    quantity:[roles.User]
}