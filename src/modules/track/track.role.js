import { roles } from "../../middleware/auth.middleware.js"

export const endPoints = {
   // add:[roles.Admin],
    //getAll:[roles.Admin, roles.User],
    getbydate:[roles.Admin, roles.User],
    getbyname:[roles.Admin, roles.User],
    like:[roles.Admin, roles.User],
    comment:[roles.Admin, roles.User]
}
