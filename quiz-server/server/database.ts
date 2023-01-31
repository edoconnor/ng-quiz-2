import * as mongodb from "mongodb";
import { Capital } from "./capital";

export const collections: {
  capitals?: mongodb.Collection<Capital>;
} = {};

export async function connectToDatabase(uri: string) {
  const client = new mongodb.MongoClient(uri);
  await client.connect();

  const db = client.db("test");
  await applySchemaValidation(db);

  const capitalsCollection = db.collection<Capital>("capitals");
  collections.capitals = capitalsCollection;
}

async function applySchemaValidation(db: mongodb.Db) {
  const jsonSchema = {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "choice1", "choice2", "choice3", "choice4", "answer"],
      additionalProperties: false,
      properties: {
        _id: {},
        name: {
          bsonType: "string",
          description: "'name' is required and is a string",
        },
        choice1: {
          bsonType: "string",
          description: "'choice1' is required and is a string",
        },
        choice2: {
          bsonType: "string",
          description: "'choice2' is required and is a string",
        },
        choice3: {
          bsonType: "string",
          description: "'choice3' is required and is a string",
        },
        choice4: {
          bsonType: "string",
          description: "'choice4' is required and is a string",
        },
        answer: {
          bsonType: "string",
          description: "'answer' is required and is a number",
        },
      },
    },
  };

  await db
    .command({
      collMod: "states",
      validator: jsonSchema,
    })
    .catch(async (error: mongodb.MongoServerError) => {
      if (error.codeName === "NamespaceNotFound") {
        await db.createCollection("states", { validator: jsonSchema });
      }
    });
}
