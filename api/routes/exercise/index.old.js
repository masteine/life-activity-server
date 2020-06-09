import Router from "express";
import ExerciseModel from "../../models/training";
import authMiddleware from "../../../middleware/auth";

const router = Router();

router
  .route("/exercise")
  .post(authMiddleware, async (req, res) => {
    try {
      const { user_id, date, exercises } = req.body;
      const training = await new ExerciseModel({ user_id, date, exercises });
      await training.save();
      res.status(201).json({ id: training.id, user_id, date, exercises });
    } catch (e) {
      res.status(500).json({ errors: e });
    }
  })
  .get(authMiddleware, async (req, res) => {
    try {
      const data = await ExerciseModel.find({});
      return res.status(201).json({ data });
    } catch (e) {
      res.status(500).json({ errors: e });
    }
  });

router
  .route("/exercise/:id")
  .get(authMiddleware, async (req, res) => {
    try {
      const data = await ExerciseModel.findOne({ _id: req.params.id });
      return res.status(201).json({ data });
    } catch (e) {
      res.status(500).json({ errors: e });
    }
  })
  .put(authMiddleware, async (req, res) => {
    try {
      const training = await ExerciseModel.findOneAndUpdate(
        { _id: req.params.id },
        req.body
      );
      return res.status(201).json({ data: training });
    } catch (e) {
      res.status(500).json({ errors: e });
    }
  })
  .delete(authMiddleware, async (req, res) => {
    try {
      await ExerciseModel.findOneAndDelete({
        _id: req.params.id,
      });
      return res
        .status(201)
        .json({ message: "Exercise is successfully deleted." });
    } catch (e) {
      res.status(500).json({ errors: e });
    }
  });

export default router;
