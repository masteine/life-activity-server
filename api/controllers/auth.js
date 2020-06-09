import db from "../../models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import responseSchema from "../utils/responseSchema";
import Sequelize from "sequelize";
import dotenv from "dotenv";
const env = dotenv.config({ path: "./.env" }).parsed;
import { uuid } from 'uuidv4';

/**
 * Users controller
 * params: email, password
 */

export default {
  async register(req, res) {
    try {
      const { email, password } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json(responseSchema("error", null, errors.array()[0].msg));
      }
      const emailExist = await db.sequelize.query(
        `SELECT * FROM "Users" WHERE email='${email}'`,
        {
          type: Sequelize.QueryTypes.SELECT,
        }
      );
      if (Array.isArray(emailExist) && emailExist.length === 0) {
        const hashedPassword = await bcrypt.hash(password, 12);
        let newUser = await db.sequelize.query(
          `INSERT INTO "Users" ("id", "email", "password") VALUES ('${uuid()}', '${email}', '${hashedPassword}')  RETURNING *`,
          {
            type: Sequelize.QueryTypes.SELECT,
          }
        );
        if(Array.isArray(newUser)) {
          newUser = newUser[0]
        }
        return res
          .status(201)
          .json(responseSchema("success", {id: newUser.id, email: newUser.email}, "New user is registered"));
      } else {
        return res
          .status(201)
          .json(
            responseSchema("error", null, "User with the current email exists")
          );
      }
    } catch (e) {
      res.status(400).send(responseSchema("error", null, e.message));
    }
  },
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const userData = await db.sequelize.query(
        `SELECT id, password FROM "Users" WHERE email='${email}'`,
        {
          type: Sequelize.QueryTypes.SELECT,
        }
      );
      if (Array.isArray(userData) && userData.length === 0) {
        return res
          .status(400)
          .json(responseSchema("error", null, "Email or password is wrong"));
      }
      const isMatch = await bcrypt.compare(password, userData[0].password);

      if (!isMatch) {
        return res
          .status(400)
          .json(responseSchema("error", null, "Email or password is wrong"));
      }

      const token = await jwt.sign(
        { userId: userData[0].id },
        env.AUTH_SECRET_KEY,
        {
          // expiresIn: "24h",
          expiresIn: "48h",
        }
      );

      return res
        .status(201)
        .json(
          responseSchema(
            "success",
            { id: userData[0].id, token },
            "Login is successful"
          )
        );
    } catch (e) {
      res.status(500).send(responseSchema("error", null, e.message));
    }
  },
  async userDelete(req, res) {
    const { email, password } = req.body;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json(responseSchema("error", null, errors.array()[0].msg));
      }
    } catch (e) {
      res.status(400).send(responseSchema("error", null, e.message));
    }
  },
};
