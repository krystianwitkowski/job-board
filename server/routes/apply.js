const express = require("express");
const Router = express.Router();
const admin = require("firebase-admin");

const db = admin.firestore();

Router.route("/")
.post(async (req, res) => {
  const {
    job,
    tags,
    location,
    minSalary,
    maxSalary,
    textarea,
    workPlace,
    currency,
    businessPlan
  } = req.body;

  const activeTags = tags.filter(tag => tag.active);
  
  if (
    job.length === 0 &&
    activeTags.length <= 0 &&
    location.length === 0 &&
    minSalary.length === 0 &&
    maxSalary.length === 0 &&
    textarea.length === 0
  ) {
    return res.status(400).json({
      error: {
        status: 400,
        message: "All fields must be complete",
        data: [
          "*The field is required",
          "*The field is required",
          "*The field is required",
          "*The field is required",
          "*The field is required",
          "*The field is required"
        ],
      },
    });
  } else if (job.length === 0) {
    return res.status(400).json({
      error: {
        status: 400,
        message: "The field job must be complete. Please complete this field",
        data: ["*The field is required", "", "", "", "", ""],
      },
    });
  }

  else if (activeTags.length <= 0) {
    return res.status(400).json({
      error: {
        status: 400,
        message: "The field technologies must be complete. Please complete this field",
        data: ["", "*The field is required", "", "", "", ""],
      },
    });
  }
  else if (activeTags.length > 4) {
    return res.status(400).json({
      error: {
        status: 400,
        message: "You can select max 4 technologies",
        data: ["", "*You can select max 4 technologies", "", "", "", ""],
      },
    });
  }
  else if (location.length === 0) {
    return res.status(400).json({
      error: {
        status: 400,
        message: "The field location must be complete. Please complete this field",
        data: ["", "", "*The field is required", "", "", ""],
      },
    });
  }

else if (minSalary.length === 0) {
    return res.status(400).json({
        error: {
        status: 400,
        message: "The field min salary must be complete. Please complete this field",
        data: ["", "", "", "*The field is required", "", ""],
        },
    });
}

else if (maxSalary.length === 0) {
    return res.status(400).json({
        error: {
        status: 400,
        message: "The field max salary must be complete. Please complete this field",
        data: ["","","","","*The field is required",""],
        },
    });
}

else if (textarea.length === 0) {
    return res.status(400).json({
        error: {
        status: 400,
        message: "The field textarea must be complete. Please complete this field",
        data: ["","","","","","*The field is required"],
        },
    });
}

else {
    const posts = db.collection("posts");

    ////Get user name company
    const getUsers = await db.collection('users').get();

    const getUser = getUsers.docs.find((doc) => {
        const docUser = doc.data();
        return docUser.id === req.decoded.id;
    })
    
    ///Set current post id
    const getPosts = await db.collection("posts").get();
    const getLengthItems = getPosts.docs.length;

    const data = {
        id: getLengthItems,
        userID: req.decoded.id,
        job,
        tags: activeTags,
        location,
        minSalary,
        maxSalary,
        currency,
        workPlace,
        businessPlan,
        textarea,
        company: getUser.data().nameCompany
    };

    const createPost = await posts.add(data);
    
    res.status(201).json({ data: { ...data }});

}
})

module.exports = Router;