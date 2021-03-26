const express = require('express');
const validator = require('email-validator');
const jwt = require('jsonwebtoken');
const admin = require('firebase-admin');
const bcrypt = require('bcrypt');

const Router = express.Router();

const db = admin.firestore();

Router.route('/')
.post(async(req, res) => {
    const { email, password } = req.body

    if(email.length === 0 && password.length === 0){
        res.status(401).json({ error: {
            status: 401,
            message: 'Thie fields cannot be empty. Please try to complete all fields',
            data: ['*The field email is required', '*The field password is required']
        }})
    }

    else if(email.length === 0){
        res.status(401).json({ error: {
            status: 401,
            message: 'The field email cannot be empty. Please try to complete field',
            data: ['*The field email is required', '']
        }})
    }

    else if(password.length === 0){
        res.status(401).json({ error: {
            status: 401,
            message: 'The field password cannot be empty. Please try to complete field',
            data: ['', '*The field password is required']
        }})
    }

    else if (!validator.validate(email)){
        res.status(401).json({ error: {
            status: 401,
            message: 'The field email is incorrect. Please check characters like @ or .',
            data: ['*The field email is incorrect', '']
        }})
    }

    else {
        const users = await db.collection('users').get();

        const isUser = users.docs.find((doc) => {
            const docUser = doc.data();
            return docUser.email === email;
        })

        if(isUser){
            const encryptedPassword = await bcrypt.compare(password, isUser.data().password);
   
            if(encryptedPassword && isUser.data().verify){

                const accessToken = jwt.sign({ id: isUser.data().id }, process.env.ACCESS_TOKEN_SECRET)
                const refreshToken = jwt.sign({ id: isUser.data().id }, process.env.REFRESH_TOKEN_SECRET)

                return res.status(200).json({ data: { tokens: { accessToken, refreshToken }}})
            }

            else {
                res.status(401).json({ error: {
                    status: 401,
                    message: 'Check if you have entered the correct password and that your account has been verified',
                    data: ['', 'Authenticate failed']
                }})
            }
        }

        else {
            res.status(401).json({ error: {
                status: 401,
                message: 'Check if you have entered the correct password and that your account has been verified',
                data: ['', 'Authenticate failed']
            }})
        }
            
    }
})

module.exports = Router;