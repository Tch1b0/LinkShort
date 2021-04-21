const express = require('express');
const request = require("request");
var app = express();

var port = 5002;
var links = {"test": "https://johannespour.de"};


app.use("/site", express.static("site/index.html"));
app.use("/style.css", express.static("site/style.css"))
app.use("/script.js", express.static("site/script.js"))

function validateLink(link) {
    if (!link.startsWith("http://") && !link.startsWith("https://")){
        link = `http://${link}`;
    }
    request(link, (err, res, body) => {
        try {
            if(res.statusCode == 200 && !err){
                return link;
            } else {
                return false;
            }
        } catch {
            return false;
        }
    });
}

app.get("/create", (req, res) => {
    let link = req.query.link;
    link = validateLink(link);
    console.log(link);
    if (typeof(link) != String) {
        res.send({"short": null});
    }
    else if(Object.values(links).includes(link)) {
        let url = Object.keys(links).find(k=>links[k]===link);
        res.send({"short": url});
    }
    else {
        let name = Math.random().toString(16).substr(2, 8);
        links[name] = link;
        res.send({"short": name});
    }
});

app.get("/links", (req, res) => {
    res.send(links);
});

app.get("/*", (req, res) => {
    let url = req.url.slice(1);
    if(Object.keys(links).includes(url)) {
        res.writeHead(301, {Location: links[url]});
        res.send();
    } else {
        res.send("URL does not exist");
    }
});

app.listen(port, () => {
    console.log(`Now listening on http://localhost:${port}`)
});