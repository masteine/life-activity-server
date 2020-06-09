import Router from "express";
import controllers from "../../controllers";
import authMiddleware from "../../../middleware/auth";
import { check, validationResult } from "express-validator";

const router = Router();
const authController = controllers.auth;

router
  .post(
    "/api/auth/register",
    [
      check("email", "Email incorrect").isEmail(),
      check("password", "Minimum password length 8").isLength({ min: 8 }),
    ],
    authController.register
  )
  .post(
    "/api/auth/login",
    [
      check("email", "Email incorrect").normalizeEmail().isEmail(),
      check("password", "Minimum password length 8")
        .isLength({ min: 8 })
        .exists(),
    ],
    authController.login
  )
  .delete(
    "/api/auth/user/delete/:id",
    authMiddleware,
    authController.userDelete
  );

export default router;

//
// router.post(
//   "/register",
//   [
//     check("email", "Email incorrect").isEmail(),
//     check("password", "Minimum password length 6").isLength({ min: 6 }),
//   ],
//   async (req, res) => {
//     try {
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({
//           errors: errors.array(),
//           message: "Incorrect registration data",
//         });
//       }
//
//       const { email, password } = req.body;
//       const candidate = await UserModel.findOne({ email });
//       if (candidate) {
//         return res
//           .status(400)
//           .json({ errors: "User already has been exists." });
//       }
//       const hashedPassword = await bcrypt.hash(password, 12);
//       const user = new UserModel({
//         email,
//         password: hashedPassword,
//       });
//       await user.save();
//       res.status(201).json({ message: "User has been created!" });
//     } catch (e) {
//       res
//         .status(500)
//         .json({ errors: "Something going wrong. Please, try again later!" });
//     }
//   }
// );
//
// router.post(
//   "/login",
//   [
//     check("email", "Email incorrect").normalizeEmail().isEmail(),
//     check("password", "Minimum password length 8")
//       .isLength({ min: 8 })
//       .exists(),
//   ],
//   async (req, res) => {
//     try {
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({
//           errors: errors.array(),
//           message: "Incorrect login data",
//         });
//       }
//
//       const { email, password } = req.body;
//       const user = await UserModel.findOne({ email });
//
//       if (!user) {
//         return res.status(400).json({ errors: "Email or password wrong" });
//       }
//
//       const isMatch = await bcrypt.compare(password, user.password);
//
//       if (!isMatch) {
//         return res.status(400).json({ errors: "Email or password wrong" });
//       }
//
//       const { username, firstName, lastName, params } = user;
//
//       const token = await jwt.sign(
//         { userId: user.id },
//         config.get("jwtSecret"),
//         {
//           expiresIn: "24h",
//         }
//       );
//       return res.json({
//         data: { token, userId: user.id, username, firstName, lastName, params },
//       });
//     } catch (e) {
//       res
//         .status(500)
//         .json({ errors: "Something going wrong. Please, try again later!" });
//     }
//   }
// );
//
// router.get("/logout", authMiddleware, async (req, res) => {
//   // Log user out of the application
//   try {
//     await res.json({ message: "Logout success" });
//   } catch (e) {
//     res
//       .status(500)
//       .json({ errors: "Something going wrong. Please, try again later!" });
//   }
// });
//
// router.put(
//   "/password",
//   [
//     authMiddleware,
//     check("password", "Minimum password length 8").exists(),
//     check("newPassword", "Minimum new password length 8").exists(),
//   ],
//   async (req, res) => {
//     try {
//       const { password, newPassword, confirmPassword } = req.body;
//       let user = await UserModel.findOne({ _id: req.user.userId });
//
//       const isMatch = await bcrypt.compare(password, user.password);
//
//       if (!isMatch) {
//         return res.status(400).json({ errors: "Old password is wrong" });
//       }
//
//       if (newPassword !== confirmPassword) {
//         return res.status(400).json({ errors: "New password not match" });
//       }
//       let hashedPassword = await bcrypt.hash(newPassword, 12);
//       user.password = hashedPassword;
//       user.save();
//
//       return res.json({ message: "Password is successful changed" });
//     } catch (e) {
//       res
//         .status(500)
//         .json({ errors: "Something going wrong. Please, try again later!" });
//     }
//   }
// );
//
// router
//   .route("/me")
//   .get(authMiddleware, async (req, res) => {
//     try {
//       const user = await UserModel.findOne({ _id: req.user.userId });
//       const { email, username, firstName, lastName, condition } = user;
//
//       return res.json({
//         data: { email, username, firstName, lastName, condition },
//       });
//     } catch (e) {
//       res
//         .status(500)
//         .json({ errors: "Something going wrong. Please, try again later!" });
//     }
//   })
//   .patch(
//     [
//       authMiddleware,
//       check("email", "Email incorrect").optional().normalizeEmail().isEmail(),
//     ],
//     async (req, res) => {
//       try {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//           return res.status(400).json({
//             errors: errors.array(),
//             message: "Incorrect email format",
//           });
//         }
//
//         await UserModel.findOneAndUpdate({ _id: req.user.userId }, req.body);
//         const {
//           email,
//           username,
//           firstName,
//           lastName,
//           condition,
//         } = await UserModel.findOne({ _id: req.user.userId });
//         return res.json({
//           data: { email, username, firstName, lastName, condition },
//         });
//       } catch (e) {
//         res
//           .status(500)
//           .json({ errors: "Something going wrong. Please, try again later!" });
//       }
//     }
//   );
//
// export default router;
