const express = require("express");
const validator = require("email-validator");
const admin = require("firebase-admin");
const Router = express.Router();
const bcrypt = require("bcrypt");
const sendMail = require("../utilities/sendMail.js");
const { v4: uuidv4 } = require('uuid');

const db = admin.firestore();
let userID = 0;

Router.route("/").post(async (req, res) => {
  const { nameCompany, email, password, repeatPassword } = req.body;

  if (
    nameCompany.length === 0 &&
    email.length === 0 &&
    password.length === 0 &&
    repeatPassword.length === 0
  ) {
    res.status(400).json({
      error: {
        status: 400,
        message:
          "The fields cannot be empty. Please try to complete all fields",
        data: [
          "*The field name is required",
          "*The field email is required",
          "*The field password is required",
          "*The field repeat password is required",
        ],
      },
    });
  } else if (!validator.validate(email)) {
    res.status(400).json({
      error: {
        status: 400,
        message:
          "The field email is incorrect. Please check this field to see if it has signs like @ or .",
        data: ["", "*The field email is incorrect", "", ""],
      },
    });
  } else if (password.length === 0 && password.length === 0) {
    res.status(400).json({
      error: {
        status: 400,
        message:
          "The fields passwords cannot be empty. Please check this fields to see if it have characters.",
        data: [
          "",
          "",
          "*The field password is required",
          "*The field repeat password is required",
        ],
      },
    });
  } else if (password !== repeatPassword) {
    res.status(400).json({
      error: {
        status: 400,
        message:
          "The fields passwords are not the same. Please check this fields to see if it have the same characters.",
        data: [
          "",
          "",
          "*The fields passwords must be the same",
          "*The fields passwords must be the same",
        ],
      },
    });
  } else {
    const snapshot = await db.collection("users").get();

    const isUser = snapshot.docs.find((doc) => {
      const user = doc.data();
      return user.nameCompany === nameCompany || user.email === email;
    });

    if (!isUser) {
      const users = db.collection("users");

      const saltRounds = 10;
      const hashPassword = await bcrypt.hash(password, saltRounds);
      const hashRepeatPassword = await bcrypt.hash(repeatPassword, saltRounds);

      const data = {
        id: userID,
        uuid: uuidv4(),
        nameCompany,
        email,
        password: hashPassword,
        repeatPassword: hashRepeatPassword,
        verify: false,
      };

      const newUser = users.add(data);
      const connectMail = await sendMail(data);

      userID++;

      res.status(201).json({ data: { ...data } });
    } else {
      res.status(400).json({
        error: {
          status: 400,
          message: "Such user already exists.",
          data: ["", "", "", "*Such user already exists"],
        },
      });
    }
  }
});

module.exports = Router;
