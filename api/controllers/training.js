import db from "../../models";
import responseSchema from "../utils/responseSchema";
import Sequelize from "sequelize";

/**
 * Training controller
 */

export default {
  async getAll(req, res) {
    try {
      const trainings = await db.sequelize.query(
        `SELECT * FROM "Trainings" WHERE "userId"='${req.user.userId}'`,
        {
          type: Sequelize.QueryTypes.SELECT,
        }
      );
      res
        .status(201)
        .json(responseSchema("success", trainings, "Get all trainings"));
    } catch (e) {
      res.status(500).send(responseSchema("error", null, e.message));
    }
  },
  async createTraining(req, res) {
    try {
      const { date, exercises } = req.body;
      const { userId } = req.user;
      const parseDate = new Date().toUTCString();
      const exerciseName = exercises[0].name;
      const exercisesLength = exercises.length;
      const { set, rep, weight } = exercises[0].condition[0];
      const training = await db.sequelize.query(
        `WITH 
        ins1 AS (INSERT INTO "Trainings" ("userId", "date") VALUES ('${userId}', '${parseDate}') RETURNING id), 
        ins2 AS (INSERT INTO "Exercises" ("name", "trainingId") VALUES ('${exerciseName}', (SELECT id FROM "ins1")) RETURNING id), 
        ins3 AS (INSERT INTO "Exercise_conditions" ("order", "repeat", "set", "weight", "exerciseId") VALUES (1, '${rep}', '${set}', '${weight}', (SELECT id FROM "ins2")) RETURNING *)
        SELECT * FROM ins1, ins2, ins3
      `,
        {
          type: Sequelize.QueryTypes.SELECT,
        }
      );

      res
        .status(201)
        .json(
          responseSchema(
            "success",
            training,
            "New training is created successful"
          )
        );
    } catch (e) {
      res.status(500).send(responseSchema("error", null, e.message));
    }
  },
  async deleteTraining(req, res) {
    try {
      await db.sequelize.query(
        `DELETE FROM "Trainings" WHERE "id"='${req.params.id}' AND "userId"='${req.user.userId}'`,
        {
          type: Sequelize.QueryTypes.SELECT,
        }
      );
      res
        .status(201)
        .json(responseSchema("success", null, "Training delete is successful"));
    } catch (e) {
      res.status(500).send(responseSchema("error", null, e.message));
    }
  },
  async updateTraining(req, res) {
    try {
      const trainings = await db.sequelize.query(
        `DELETE FROM "Trainings" WHERE "id"='${req.params.id}' AND "userId"='${req.user.userId}' RETURNING *`,
        {
          type: Sequelize.QueryTypes.SELECT,
        }
      );
      res
        .status(201)
        .json(
          responseSchema("success", trainings, "Training updated is successful")
        );
    } catch (e) {
      res.status(500).send(responseSchema("error", null, e.message));
    }
  },
};
