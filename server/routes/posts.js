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
.get(async(req, res) => {
  const posts = await db.collection('posts').get();
  const getPosts = posts.docs.map(doc => doc.data())

  if(req.query.filter){
    if(req.query.filter === 'all') {
      res.status(200).json(getPosts)
    }

    else {
      res.status(200).json(getPosts.filter(post => post.tags.find(tag => tag.name === req.query.filter)))
    }
  }

  else if (req.query.search){
    res.status(200).json(getPosts.filter(post => post.job.includes(req.query.search)))
  }

  else if(req.query.city){
    if(req.query.city === 'All cities'){
      res.status(200).json(getPosts)
    }
    else {
      res.status(200).json(getPosts.filter(post => post.location === req.query.city))
    }
  }

  else if (req.query.currency && req.query.workplace){
    const APIcurrency = req.query.currency.split(',');
    const APIworkplace = req.query.workplace.split(',');

    if(APIcurrency.length === 1 && APIworkplace.length === 1){
      res.status(200).json(getPosts.filter(post => post.currency.find(cur => cur.active && cur.name === APIcurrency[0]) && post.workPlace.find(place => place.active && place.name === APIworkplace[0])))
    }

    else if(APIcurrency.length === 2 && APIworkplace.length === 1){
      res.status(200).json(getPosts.filter(post => post.currency.every((cur, i) => cur.name === APIcurrency[i]) && post.workPlace.find(place => place.active && place.name === APIworkplace[0])))
    }  

    else if(APIcurrency.length === 1 && APIworkplace.length === 2){
      res.status(200).json(getPosts.filter(post => post.currency.find(cur => cur.active && cur.name === APIcurrency[0]) && post.workPlace.every((place, i) => place.name === APIworkplace[i])))
    }

    else if(APIcurrency.length === 2 && APIworkplace.length === 2){
      res.status(200).json(getPosts.filter(post => post.currency.every((cur, i) => cur.name === APIcurrency[i]) && post.workPlace.every((place, i) => place.name === APIworkplace[i])))
    }
  }

  else {
    res.status(200).json(getPosts)
  }

})

Router.route('/:id')
.get(async(req, res) => {
  const posts = await db.collection('posts').get();
  const getPosts = posts.docs.map(doc => doc.data())

  res.status(200).json(posts.docs.map(doc => doc.data()).find(post => post.id === Number(req.params.id)))
})

module.exports = Router;
