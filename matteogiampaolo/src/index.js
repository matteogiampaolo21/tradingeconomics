

const te = require('tradingeconomics')
const express = require("express");
const app = express();
app.set('view engine', 'ejs');

const port = 3000;
app.use(express.static(__dirname + '/public'));

require("dotenv").config();

te.login(process.env.TRADE_KEY);

app.get("/", async (req, res) => {
    const data1 = await te.getNews(start="0", limit="4");
    res.render("news",{fourArticles : data1, titlePage :  "Latest" });
});

app.get("/news/:country", async (req, res) => {
    const reqCountry = req.params.country
    const data1 = await te.getNews(country = reqCountry);
    res.render("news",{fourArticles : data1, titlePage :  data1[0].country});
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
