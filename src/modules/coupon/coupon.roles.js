import { roles } from "../../middleware/auth.middleware.js";

export const endPoints={
    create:[roles.Admin],
    getAll:[roles.Admin],
    update:[roles.Admin],
    delete:[roles.Admin]
}