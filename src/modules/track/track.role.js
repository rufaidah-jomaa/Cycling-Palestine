import { roles } from "../../middleware/auth.middleware.js"

export const endPoints = {
    add:[roles.Admin],
    update:[roles.Admin],
    getAll:[roles.Admin, roles.User],
    getbydate:[roles.Admin, roles.User],
    getbyname:[roles.Admin, roles.User],
    delete:[roles.Admin],
    like:[roles.Admin, roles.User],
    comment:[roles.Admin, roles.User]
}
