const express = require("express");
const Router = express.Router();
const admin = require("firebase-admin");

const db = admin.firestore();

Router.route("/")
.post(async (req, res) => {

    const { verify } = req.body
    const snapshot = await db.collection("users").get();

    const isUser = snapshot.docs.find((doc) => {
        const user = doc.data();
            if(user.uuid === verify){
                return doc;
            }
    });
    
    if(isUser) {
        const docId = isUser.id;

        const verified = await db.collection('users').doc(docId).update({
            verify: true
        })
    
        res.status(200).json({ data: { verify: true }})
    }

    else {
        res.status(400).json({ error: {
            status: 400,
            message: 'You have to create an account and verify on your mailbox',
        }})
    }
})

module.exports = Router;