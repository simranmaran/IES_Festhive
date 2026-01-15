import express from "express";

import { signup ,
    login,

    userReset,
    userUpdate,
    userDelete,
    userCheck,
} from "../controllers/user.controller.js"
import { confirmUser, userLog } from "../middleware/auth.middleware.js";
import { logout } from "../controllers/user.controller.js";

const router = express.Router();


router.post("/signup",userLog,signup);
router.post("/login",userLog,login);
router.post("/logout",logout);
router.post("/reset",userLog,confirmUser,userReset);
router.post("/update",userLog,confirmUser,userUpdate);
router.post("/delete",userLog,confirmUser,userDelete);
router.post("/check",userLog,confirmUser,userCheck);

export default router;