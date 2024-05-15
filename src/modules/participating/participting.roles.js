import { roles } from "../../middleware/auth.middleware.js";

export const endPoints={
    participate:[roles.Admin,roles.User],
    cancel:[roles.Admin,roles.User]
}