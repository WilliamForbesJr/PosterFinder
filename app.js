const express = require("express");
const app = express();
const request = require("request");

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("search");
});

app.get("/results", (req, res) => {

    const query = req.query.search;
    const url = "http://www.omdbapi.com/?s=" + query + "&apikey=thewdb";

   request(url, (error,response,body) => {

       if(!error && response.statusCode == 200){
           const data = JSON.parse(body);
           res.render("results", {data: data});
        }
   });
});

app.listen(process.env.PORT, process.env.IP, () => {
    console.log("Movie App has started!");
});