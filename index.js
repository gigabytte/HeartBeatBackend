require('dotenv').config();
const port = process.env.PORT || 3000;
const express = require('express');
const app = express();
const pino = require('express-pino-logger')();
const schemas = require('./schema');
const jwt = require('jsonwebtoken');

app.use(pino)
app.use(express.json())

app.get('/api/hello', authenticateToken, (_, res) => {
  res.send('Hello World!');
});

app.get('/api/token', (req, res) => {
    const joi_result = schemas.secrete_schema.validate(req.body)
    if (joi_result.error){
        res.status(400).send(joi_result.error.details[0].message);
        return;
    }
    if (req.body.secrete != process.env.USER_SECRETE){
        res.status(401).send('Bad Secrete provided')
        return;
    }
    const token = generateAccessToken({ secrete: req.body.secrete });
    res.json(token);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


function authenticateToken(req, res, next) {
  const token = req.headers.authorization.split(' ')[1];

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    req.log.info(err);

    if (err) return res.sendStatus(403)

    req.user = user

    next()
  })
}

function generateAccessToken(secrete) {
    return jwt.sign(secrete, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
  }