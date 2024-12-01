const mongodb = require("../db/database");
const ObjectId = require("mongodb").ObjectId;

const getAllPlayers = async (req, res) => {
  try {
    const result = await mongodb.getData().db().collection("Project-03").find();
    result.toArray().then((players) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(players);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

const getPlayer = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getData()
      .db()
      .collection("Project-03")
      .find({ _id: userId });
    result.toArray().then((player) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(player);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

const createPlayer = async (req, res) => {
  try {
    const player = {
      name: req.body.name,
      gender: req.body.gender,
      position: req.body.position,
      clubPlayed: req.body.clubPlayed,
      nationality: req.body.nationality,
      birthday: req.body.birthday,
      height: req.body.height,
    };

    const result = await mongodb
      .getData()
      .db()
      .collection("Project-03")
      .insertOne(player);

    if (result.acknowledged > 0) {
      res.status(201).send();
    } else {
      res
        .status(500)
        .json(result.error || "an error occurred while creating player");
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const updatePlayer = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);

    const player = {
      name: req.body.name,
      gender: req.body.gender,
      position: req.body.position,
      clubPlayed: req.body.clubPlayed,
      nationality: req.body.nationality,
      birthday: req.body.birthday,
      height: req.body.height,
    };

    const result = await mongodb
      .getData()
      .db()
      .collection("Project-03")
      .updateOne({ _id: userId }, { $set: player });

    if (result.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(result.error || "an error occurred while updating user");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

const deletePlayer = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getData()
      .db()
      .collection("Project-03")
      .deleteOne({ _id: userId });

    if (result.deletedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(result.error || "an error occurred while deleting a player");
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

module.exports = {
  getAllPlayers,
  getPlayer,
  createPlayer,
  updatePlayer,
  deletePlayer,
};
