const express = require("express");
var bodyParser = require("body-parser");
var app = express();

var port = 5002; // The port of the webserver
var links = { "17a76043": "https://www.youtube.com/watch?v=dQw4w9WgXcQ" }; // The links are stored here
var shortOwners = { "17a760431": "1107"}

app.use("/site", express.static("site/index.html"));     //
app.use("/style.css", express.static("site/style.css")); // Static site
app.use("/script.js", express.static("site/script.js")); //
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function validateLink(link) {
    // Does the Link really look like a valid link?

    // Does the Link already start with "http://" or "https://"?
    // If not then append it
    if (!link.startsWith("http://") && !link.startsWith("https://")) {
        link = `http://${link}`;
    }

    // Does the Link contain a dot?
    // If not then return false
    return link.includes(".") ? link : false; 
}

app.post("/create", (req, res) => {
    // Create a new shortcut
    
    // Does the parameter "link" exist?
    try {
        var link = req.body.link;
    } catch {
        res.writeHead(400);
        res.send("Parameter 'link' missing.");
        return;
    }

    // Check and correct the Link
    link = validateLink(link);
    if (link === false) {
        res.writeHead(400);
        res.send({ short: null });
    } else if (Object.values(links).includes(link)) {
        let url = Object.keys(links).find((k) => links[k] === link);
        res.send({ short: url });
    } else {
        let name = Math.random().toString(16).substr(2, 8);
        while (Object.keys(links).includes(name)) {
            name = Math.random().toString(16).substr(2, 8);
        }
        links[name] = link;
        res.send({ short: name });
    }
});

app.get("/create", (req, res) => {
    // Redirect on wrong method
    res.writeHead(301, { Location: "/site?info" });
    res.send();
});

app.get("/links", (req, res) => {
    // Return the links object
    res.send(links);
});

app.get("/*", (req, res) => {
    // Use a shortcut
    let url = req.url;
    if (url == "/") {
        res.writeHead(301, { Location: "/site" });
        res.send();
    } else if (Object.keys(links).includes(url.slice(1))) {
        res.writeHead(301, { Location: links[url.slice(1)] });
        res.send();
    } else {
        res.send("URL does not exist");
    }
});

app.listen(port, () => {
    console.log(`Now listening on http://localhost:${port}`);
});
