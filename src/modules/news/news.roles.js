import { roles } from "../../middleware/auth.middleware.js";

export const endPoints={
    add:[roles.Admin],
    update:[roles.Admin],
    delete:[roles.Admin]
}