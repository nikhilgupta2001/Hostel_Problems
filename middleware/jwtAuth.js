require('dotenv').config()
const express = require('express');
const jwt = require('jsonwebtoken');

const posts = [
    {
        email: 'john@gmail.com',
        id: '123'
    },
    {
        email: 'ann@gmail.com',
        id: '124'
    }
]

const app = express();
app.use(express.json());


app.get('/post', authenticateToken, (req, res) => {
    res.json(posts.filter(post => post.email === req.user.email))
})

app.post('/login', (req, res) => {
    const email = req.body.email;
    const user = { email: email };
    const acessToken = generateAcessToken(user);
    res.json({ acessToken: acessToken })
})


function generateAcessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403)
        }
        req.user = user
        next()
    })
}

app.listen(3000);


