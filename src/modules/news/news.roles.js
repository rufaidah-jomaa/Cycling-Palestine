import { roles } from "../../middleware/auth.middleware.js";

export const endPoints={
    add:[roles.Admin],
    get:[roles.Admin,roles.User],
    update:[roles.Admin],
    delete:[roles.Admin]
}