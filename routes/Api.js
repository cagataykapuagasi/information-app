const router = require("express").Router();
const { Bus } = require("../db/db");

router.get("/bus", getBuses);
router.post("/bus/save", saveBus);
router.post("/bus/update", updateBusLocation);
router.delete("/bus", deleteBus);

async function saveBus(req, res, next) {
  const {
    body: { name, no, location },
  } = req;

  try {
    const bus = new Bus({ name, no, location });
    await bus.save();

    res.send({ message: "Bus was successfully saved.", data: bus });
  } catch (error) {
    res.status(400).send(error);
  }
}

async function getBuses(req, res, next) {
  try {
    const buses = await Bus.find();

    res.send({ data: buses });
  } catch (error) {
    res.status(500).send(error);
  }
}

async function updateBusLocation(req, res, next) {
  const {
    body: { location, id },
  } = req;

  try {
    const bus = await Bus.findById(id);
    if (!bus) {
      res.status(404).send({ message: "Not Found" });
    }

    bus.location = location;
    await bus.save();

    res.send({ message: "Bus was successfully updated.", data: bus });
  } catch (error) {
    res.status(500).send(error);
  }
}

async function deleteBus(req, res, next) {
  try {
    Bus.findByIdAndDelete(req.body.id)
      .then(() => res.send({ message: "Bus was deleted." }))
      .catch((e) => res.status(404).send(e));
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = router;
