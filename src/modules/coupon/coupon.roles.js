import { roles } from "../../middleware/auth.middleware.js";

export const endPoints={
    create:[roles.Admin]
}