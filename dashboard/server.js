const express = require('express');
const passport = require('passport');

const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.get('/', (req, res) => res.render('index', {
    subtitle : "Dashboard",
    something: "test"
}));
app.get('/commands', (req, res) => res.render('commands', {
    subtitle : "Commands",
    categoryNames : ['Fun', 'Infos', 'Moderation', 'Bot Infos']
}));


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('-----------------------------');
    console.log(`Server is live on port ${port}`);
    console.log('-----------------------------');
})