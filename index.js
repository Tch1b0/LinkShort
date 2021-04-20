var express = require('express');
var app = express();

var port = 5002;
var links = {"test": "johannespour.de"};

app.get("/create", (req, res) => {
    let link = req.query.link.replace("http://", "").replace("https://", "");
    if(Object.values(links).includes(link)) {
        let url = Object.keys(links).find(k=>links[k]===link);
        res.send(`This shorty already exists with the code ${url}`);
    }
    else {
        let name = Math.random().toString(16).substr(2, 8);
        links[name] = link;
        res.send(name);
    }
});

app.get("/*", (req, res) => {
    let url = req.url.slice(1);
    if(url.length == 0){
        res.send("Please enter a valid URL");
    }
    else if(Object.keys(links).includes(url)) {
        res.writeHead(301, {Location: `http://${links[url]}`});
        res.send();
    } else {
        res.send("URL does not exist");
    }
});

app.listen(port, () => {
    console.log(`Now listening on http://localhost:${port}`)
});