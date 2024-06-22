import { roles } from "../../middleware/auth.middleware.js";

export const endPoints={
    create:[roles.Admin],
    getAll:[roles.Admin,roles.User],
    update:[roles.Admin],
    delete:[roles.Admin]
}