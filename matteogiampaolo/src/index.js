

const te = require('tradingeconomics')
const express = require("express");
const app = express();
app.set('view engine', 'ejs');

const port = 3000;
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));

require("dotenv").config();

te.login(process.env.TRADE_KEY);

app.get("/", async (req,res) => {
    res.redirect("/news/page/1")
})

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


app.get("/breaking-news", async (req,res) => {
    const date1 = new Date().getMonth()+1;
    const date2 = new Date().getDate();
    const date3 = new Date().getFullYear();

    var days = 14
    var date = new Date();
    var last = new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));
    var day =last.getDate();
    var month=last.getMonth()+1;
    var year=last.getFullYear();

    const first_date = `${date1}-${date2}-${date3}`
    const second_date = `${month}-${day}-${year}`


    let data = await te.getNews(start_date = second_date, end_date = first_date)
    data = data.filter(obj => obj.importance > 2);
    res.render("breaking",{articles:data, titlePage: "Breaking"})
})


app.get("/news", async (req, res) => {
    res.render("countryForm");
});

app.post("/getArticles", async (req,res) => {
    
    const firstDate = req.body.startDate;
    const secondDate = req.body.endDate;
    const reqCountry = req.body.country;
    const data = await te.getNews(country = reqCountry.toLowerCase(),start_date = firstDate, end_date = secondDate);
        
    res.render("countryNews",{fourArticles : data, titlePage :  reqCountry,});
})


app.get('*', function(req, res){
    res.status(404).send('Page could not be found.');
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
