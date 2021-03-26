const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
const helmet = require('helmet')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const config = dotenv.config({
  path: './.env'
});

const app = express();

//// Routes
const register = require('./routes/register.js');
const authenticate = require('./routes/authenticate.js');
const verify = require('./routes/verify.js');
const posts = require('./routes/posts.js');
const apply = require('./routes/apply.js');

////Middlewares
const verifyToken = require('./middlewares/verifyToken.js');
const rateLimiter = require('./middlewares/rateLimiter.js');

app.use(express.static('../dist'));
app.use(helmet());
app.use(bodyParser.json())

app.use('/api/register', register);
app.use('/api/verify', verify);
app.use('/api/authenticate', rateLimiter, authenticate);

app.use('/api/posts', posts);
app.use('/api/apply', verifyToken, apply)


const listen = app.listen(process.env.PORT);


