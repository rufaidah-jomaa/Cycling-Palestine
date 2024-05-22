import { roles } from "../../middleware/auth.middleware.js";

export const endPoints={
    getAll:[roles.Admin],
    getProfile:[roles.Admin,roles.User],
    uploadPic:[roles.Admin,roles.User],
    deleteImage:[roles.Admin,roles.User],
    updateProfile:[roles.Admin,roles.User],
    deletAccount:[roles.Admin,roles.User],
    blockUser:[roles.Admin],
    unBlockUser:[roles.Admin],
    addAdmin:[roles.Admin],
    removeAdmin:[roles.Admin]
}