const router = require("express").Router();
const { Question, User } = require("../db/db");

router.get("/questions", getQuestions);
router.post("/user", setUser);
router.post("/questions/new", setQuestion);
router.post("/questions/delete", deleteQuestion);

async function getQuestions(req, res, next) {
  try {
    Question.findAll().then((questions) => {
      res.send(questions);
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

async function deleteQuestion(req, res, next) {
  try {
    const {
      body: { id },
    } = req;

    const question = await Question.findOne({ where: { id: parseInt(id) } });
    question.destroy();
    res.send({ message: "Question was successfully deleted.", data: question });
  } catch (error) {
    res.status(404).send({ message: "Not found" });
  }
}

module.exports = router;
