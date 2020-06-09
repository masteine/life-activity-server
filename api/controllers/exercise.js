import db from "../../models";
import responseSchema from "../utils/responseSchema";
import Sequelize from "sequelize";

/**
 * Exercise controller
 */

export default {
  async getAll(req, res) {
    try {
      const exercises = await db.sequelize.query(
        `
			SELECT e.* FROM "Exercises" e left JOIN "Trainings" t on e."trainingId" = t.id
			`,
        {
          type: Sequelize.QueryTypes.SELECT,
        }
      );

      res
        .status(201)
        .json(
          responseSchema("success", exercises, "Get all exercises success")
        );
    } catch (e) {
      res.status(500).send(responseSchema("error", null, e.message));
    }
  },
  async createExercise(req, res) {
    try {
    } catch (e) {
      res.status(500).send(responseSchema("error", null, e.message));
    }
  },
  async deleteExercise(req, res) {},
  async updateExercise(req, res) {},
};
