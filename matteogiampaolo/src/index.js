

const te = require('tradingeconomics')
const express = require("express");
const app = express();
app.set('view engine', 'ejs');

const port = 3000;
app.use(express.static(__dirname + '/public'));

require("dotenv").config();

te.login(process.env.TRADE_KEY);

app.get("/news/page/:number", async (req, res) => {
    const numParam = req.params.number
    const startNum = (parseInt(numParam)- 1)*8
    const data1 = await te.getNews(start=`${startNum}`, limit="8");
    let firstPageBoolean = false
    if (numParam === "1"){
        firstPageBoolean = true;
    }
    res.render("latestNews",{fourArticles : data1, titlePage :  "Latest" , firstPage : firstPageBoolean, pageNumber : parseInt(numParam)});
});

app.get("/news/:country", async (req, res) => {
    const reqCountry = req.params.country
    const data1 = await te.getNews(country = reqCountry);
    console.log(data1.length)
    res.render("latestNews",{fourArticles : data1, titlePage :  data1[0].country});
});

app.get("/test", async (req, res) => {
    const data1 = await te.getNews(country = "mexico", start="10");
    console.log(data1)
    res.render("latestNews",{fourArticles : data1, titlePage :  data1[0].country});
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
