import { roles } from "../../middleware/auth.middleware.js";

export const endPoints={
    createPost:[roles.Admin],
    updatePost:[roles.Admin],
    deletePost:[roles.Admin],
    likePost:[roles.Admin,roles.User],
    comment:[roles.Admin,roles.User],
    deleteComment:[roles.Admin,roles.User]
}