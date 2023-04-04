

const te = require('tradingeconomics')
const express = require("express");
const app = express();
app.set('view engine', 'ejs');

const port = 3000;
app.use(express.static(__dirname + '/public'));

require("dotenv").config();

// te.login(process.env.TRADE_KEY);

app.get("/", async (req, res) => {
    // const data1 = await te.getNews(country = 'mexico', start_date = '2022-12-12', end_date = '2023-04-04');
    // console.log(data1)
    console.log(__dirname)
    res.render("home");
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
