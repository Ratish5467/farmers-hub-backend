import { Router } from "express";
import {registeruser, loginuser, logoutuser,refreshAccesToken,changeCurrentPassword,getCurrentUser,updateAccountDetails} from "../controllers/usercontroller.js";
import { verifyJwt } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router=Router();

router.post("/register", upload.none(), registeruser);

router.route("/login").post(upload.none(), loginuser);

router.route("/logout").post(verifyJwt, logoutuser);

router.route("/refresh-token").post(refreshAccesToken);

router.route("/change-password").post(upload.none(), verifyJwt, changeCurrentPassword);

router.route("/getcurrentuser").get(verifyJwt,getCurrentUser);


router.route("/updateaccountdetails").patch(verifyJwt,updateAccountDetails);


export default router;

