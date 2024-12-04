const express = require('express')
const app = express()
const path = require('path')

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`)
})

app.listen(8080, () => {
    console.log(`${"server listen on PORT 8080 link: http://127.0.0.1:8080/" }`)
})