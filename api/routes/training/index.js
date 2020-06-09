import Router from "express";
import controllers from "../../controllers";
import authMiddleware from "../../../middleware/auth";
import { check, validationResult } from "express-validator";

const router = Router();
const trainingController = controllers.training;

router
  .get("/api/trainings", authMiddleware, trainingController.getAll)
  .post(
    "/api/training/create",
    authMiddleware,
    trainingController.createTraining
  )
  .delete(
    "/api/training/delete/:id",
    authMiddleware,
    trainingController.deleteTraining
  )
  .put(
    "/api/training/update/:id",
    authMiddleware,
    trainingController.updateTraining
  );

//   .post(authMiddleware, async (req, res) => {
//     try {
//       const { user_id, date, exercises } = req.body;
//       const training = await new TrainingModel({ user_id, date, exercises });
//       await training.save();
//       res.status(201).json({ id: training.id, user_id, date, exercises });
//     } catch (e) {
//       res.status(500).json({ errors: e });
//     }
//   })
//   .get(authMiddleware, async (req, res) => {
//     try {
//       const data = await TrainingModel.find({});
//       return res.status(201).json({ data });
//     } catch (e) {
//       res.status(500).json({ errors: e });
//     }
//   });
//
// router
//   .route("/training/:id")
//   .get(authMiddleware, async (req, res) => {
//     try {
//       const data = await TrainingModel.findOne({ _id: req.params.id });
//       return res.status(201).json({ data });
//     } catch (e) {
//       res.status(500).json({ errors: e });
//     }
//   })
//   .put(authMiddleware, async (req, res) => {
//     try {
//       const training = await TrainingModel.findOneAndUpdate(
//         { _id: req.params.id },
//         req.body
//       );
//       return res.status(201).json({ data: training });
//     } catch (e) {
//       res.status(500).json({ errors: e });
//     }
//   })
//   .delete(authMiddleware, async (req, res) => {
//     try {
//       await TrainingModel.findOneAndDelete({
//         _id: req.params.id,
//       });
//       return res
//         .status(201)
//         .json({ message: "Training is successfully deleted." });
//     } catch (e) {
//       res.status(500).json({ errors: e });
//     }
//   });

export default router;
