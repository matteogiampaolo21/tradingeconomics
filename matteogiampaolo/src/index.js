

const te = require('tradingeconomics')
const express = require("express");
const app = express();
app.set('view engine', 'ejs');

const port = 3000;
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded());

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
    console.log(data1.length)
    res.render("latestNews",{fourArticles : data1, titlePage :  "Latest" , firstPage : firstPageBoolean, pageNumber : parseInt(numParam)});
});

app.get("/news", async (req, res) => {
    res.render("countryForm");
});

app.get("/", async (req,res) => {
    res.render("home")
})


app.post("/getArticles", async (req,res) => {
    
    const firstDate = req.body.startDate;
    const secondDate = req.body.endDate;
    const reqCountry = req.body.country;
    const data = await te.getNews(country = reqCountry.toLowerCase(),start_date = firstDate, end_date = secondDate);
        
    res.render("countryNews",{fourArticles : data, titlePage :  reqCountry,});
})


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
