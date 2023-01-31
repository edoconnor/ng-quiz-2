import mongodb from "mongodb";

export interface Capital {
  name: String;
  choice1: String;
  choice2: String;
  choice3: String;
  choice4: String;
  answer: Number;
  _id?: mongodb.ObjectId;
}