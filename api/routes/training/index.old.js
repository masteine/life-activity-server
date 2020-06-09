import Router from "express";
import TrainingModel from "../../models/training";
import authMiddleware from "../../../middleware/auth";

const router = Router();

router
  .route("/training")
  .post(authMiddleware, async (req, res) => {
    try {
      const { user_id, date, exercises } = req.body;
      const training = await new TrainingModel({ user_id, date, exercises });
      await training.save();
      res.status(201).json({ id: training.id, user_id, date, exercises });
    } catch (e) {
      res.status(500).json({ errors: e });
    }
  })
  .get(authMiddleware, async (req, res) => {
    try {
      const data = await TrainingModel.find({});
      return res.status(201).json({ data });
    } catch (e) {
      res.status(500).json({ errors: e });
    }
  });

router
  .route("/training/:id")
  .get(authMiddleware, async (req, res) => {
    try {
      const data = await TrainingModel.findOne({ _id: req.params.id });
      return res.status(201).json({ data });
    } catch (e) {
      res.status(500).json({ errors: e });
    }
  })
  .put(authMiddleware, async (req, res) => {
    try {
      const training = await TrainingModel.findOneAndUpdate(
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
      await TrainingModel.findOneAndDelete({
        _id: req.params.id,
      });
      return res
        .status(201)
        .json({ message: "Training is successfully deleted." });
    } catch (e) {
      res.status(500).json({ errors: e });
    }
  });

export default router;
