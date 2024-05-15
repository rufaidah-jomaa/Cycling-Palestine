import { roles } from "../../middleware/auth.middleware.js";

export const endPoints={
    createProduct:[roles.Admin],
    getAll : [roles.Admin],
    update: [roles.Admin],
    destroy:[roles.Admin]
}