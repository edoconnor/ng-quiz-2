import express from "express";
import mongodb from "mongodb";
import { collections } from "./database";

export const capitalRouter = express.Router();
capitalRouter.use(express.json());

capitalRouter.get("/", async (req, res) => {
  try {
    const capitals = await collections.capitals.find({}).toArray();
    res.status(200).send(capitals);
  } catch (error) {
    res.status(500).send(error);
  }
});

capitalRouter.get("/:id", async (req, res) => {
  try {
    const id = req?.params?.id;
    const query = { _id: new mongodb.ObjectId(id) };
    const capital = await collections.capitals.findOne(query);

    if (capital) {
      res.status(200).send(capital);
    } else {
      res.status(404).send(`Failed to find a capital: ID ${id}`);
    }
  } catch (error) {
    res.status(404).send(`Failed to find a capital: ID ${req?.params?.id}`);
  }
});
