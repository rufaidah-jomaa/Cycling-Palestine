import { roles } from "../../middleware/auth.middleware.js";

export const endPoints={
    getProfile:[roles.Admin,roles.User],
    updateProfile:[roles.Admin,roles.User],
}