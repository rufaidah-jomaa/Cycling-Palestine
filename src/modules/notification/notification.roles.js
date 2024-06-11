import { roles } from "../../middleware/auth.middleware.js";

export const endPoints={
    get:[roles.User,roles.Admin]
}