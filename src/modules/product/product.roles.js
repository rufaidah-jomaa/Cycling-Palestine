import { roles } from "../../middleware/auth.middleware.js";

export const endPoints={
    createProduct:[roles.Admin],
    getStatus:[roles.Admin],
    update: [roles.Admin],
    changeStatus:[roles.Admin],
    destroy:[roles.Admin]
}