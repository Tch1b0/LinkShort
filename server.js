const express = require("express");
var bodyParser = require("body-parser");
const { invalidParameter, validateLink } = require("./src/utils");
const Linker = require("./src/Linker");
const LinkerCollection = require("./src/LinkerCollection");
var app = express();

var port = 5002; // The port of the webserver

const lc = new LinkerCollection();
// /Append initially

let linker = new Linker();
linker.destination = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
linker.generateShort();
linker.generateToken();

lc.add(linker);
console.log(lc.collection);

// Append initially\

app.use("/site", express.static("site/index.html")); //
app.use("/style.css", express.static("site/style.css")); // Static site
app.use("/script.js", express.static("site/script.js")); //
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.put("/:short?*", (req, res) => {
    // The variable 'short' is set to the shortcut entered in the URI
    let short = req.params["short"];

    // Get the token from the json body
    let token = req.body.token;
    // Check if token is set
    if (invalidParameter(token, res)) return;

    if (short == undefined) {
        // If the short wasn't entered in the URI it may be in the body of the request
        short = req.body.short;
        if (invalidParameter(short, res)) return;
    }

    if (lc.findByToken(token) != undefined) {
        let link = req.body.link; // Get the link from the body
        if (invalidParameter(link, res)) return;
        link = validateLink(link); // Link gets validated
        if (!link && invalidParameter(undefined, res)) return;

        lc.findByToken(token).short = short; // Link is added to the 'links' object
        res.send({ short: short }); // send the short
    } else {
        res.writeHead(405);
        res.send(/*"Permission denied."*/);
    }
});

app.delete("/:short?*", (req, res) => {
    // The variable 'short' is set to the shortcut entered in the URI
    let short = req.params["short"];

    // Get the token from the json body
    let token = req.body.token;
    // Check if token is set
    if (invalidParameter(token, res)) return;

    if (short == undefined) {
        // If the short wasn't entered in the URI it may be in the body of the request
        short = req.body.short;
        if (invalidParameter(short, res)) return;
    }

    if (lc.findByToken(token) != undefined) {
        // Remove the linker object
        lc.removeByToken(token);

        res.send("Successful"); // Let the User know it was Successfull
    } else {
        res.writeHead(405);
        res.send();
    }
});

app.post("/create", (req, res) => {
    // Create a new shortcut

    // Does the parameter "link" exist?
    var link = req.body.link;

    if (invalidParameter(link, res)) return;

    // Check and correct the Link
    link = validateLink(link);
    if (link === false) {
        res.send({ short: null });
    } else if (lc.findByDestination(link) != undefined) {
        // If shortcut already exists, send it
        let url = lc.findByDestination(link).short;
        res.send({ short: url });
    } else {
        let short = req.body.short;
        let token;
        let linker = new Linker();
        linker.destination = link;
        if (short != undefined) {
            linker.short = short;
        }

        // Generate a new shortcut name while there is already one existing with the same name
        while (
            lc.findByShort(short) == undefined ||
            lc.findByShort(short).destination != link
        ) {
            short = linker.generateShort();
        }
        // Generate a new token while the same token already exists
        while (
            lc.findByToken(token) == undefined ||
            lc.findByShort(short).destination != link
        ) {
            token = linker.generateToken();
        }

        // Set token, link and shortcut
        res.send({ short: linker.short, token: linker.token });
    }
});

app.get("/create", (req, res) => {
    // Redirect on wrong method
    res.writeHead(301, { Location: "/site?info" });
    res.send();
});

app.get("/links", (req, res) => {
    // Return the links object
    res.send(lc.safeCollection());
});

app.get("/", (req, res) => {
    res.writeHead(301, { Location: "/site" });
    res.send();
});

app.get("/:short", (req, res) => {
    // Use a shortcut
    let short = req.params["short"];

    let linker = lc.findByShort(short);
    console.log(linker);

    if (linker !== undefined) {
        res.writeHead(301, { Location: linker.short });
        res.send();
    } else {
        res.send("URL does not exist");
    }
});

app.listen(port, () => {
    console.log(`Now listening on http://localhost:${port}`);
});
