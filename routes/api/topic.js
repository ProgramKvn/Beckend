const { json } = require("express");
const express = require("express");
const router = express.Router();
//topics Model
const Topics = require("../../models/topics");

//@routers GET api/topics
//@desc  Get all TOPIC
router.get("/", async (req, res) => {
  try {
    const topics = await Topics.find();
    if (!topics) throw Error("No items");
    res.status(200).json(topics);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

//@routers GET api/topics/:id
//@desc  Get an POST
router.get("/:id", async (req, res) => {
  try {
    const topic = await Topics.findById(req.params.id);
    if (!topic) throw Error("Item no find");
    res.status(200).json(topic);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

//@routers POST api/topics
//@desc  Create an TOPIC

router.post("/", async (req, res) => {
  const newTopic = new Topics(req.body);
  try {
    const topic = await newTopic.save();
    if (!topic) throw Error("UPS! ALGO PASÓ AL GUARDAR EL TEMA");
    res.status(200).json(topic);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

//@routers DELETE api/topics/:id
//@desc  delete an TOPIC
router.delete("/:id", async (req, res) => {
  try {
    const topic = await Topics.findByIdAndDelete(req.params.id);
    if (!topic) throw Error("UPS! Tema no encontrado");
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

//@routers UPDATE api/topics/:id
//@desc  update an TOPIC

router.patch("/:id", async (req, res) => {
  try {
    const topic = await Topics.findByIdAndUpdate(req.params.id, req.body);
    if (!topic) throw Error("UPS! algo paso mientas se actualizaba el tema");
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

module.exports = router;
