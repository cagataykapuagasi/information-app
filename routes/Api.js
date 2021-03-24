const router = require("express").Router();
const { Question, User } = require("../db/db");

router.get("/questions", getQuestions);
router.post("/user", setUser);
router.post("/questions/new", setQuestion);

async function getQuestions(req, res, next) {
  try {
    Question.findAll().then((questions) => {
      res.send({ data: questions });
    });
  } catch (error) {
    res.status(500).send(error);
  }
}

async function setUser(req, res, next) {
  const { body } = req;

  try {
    const user = new User(body);
    await user.save();

    res.send({ message: "User was successfully saved.", data: user });
  } catch (error) {
    res.status(400).send(error);
  }
}

async function setQuestion(req, res, next) {
  const { body } = req;

  try {
    const question = await Question.create(body);
    res.send({ message: "Question was successfully saved.", data: question });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
}

module.exports = router;
