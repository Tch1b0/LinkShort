import express from "express";
import { LinkerCollection } from "./LinkerCollection";
import { Linker } from "./Linker";
import { getParamFromReq, sendError, validateLink } from "./utility";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 3000;
const lc = new LinkerCollection(
    process.env.USE_DB === "true" || false,
    Number(process.env.DB_PORT) || 6379,
    process.env.DB_HOSTNAME || "localhost"
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
lc.load();

app.get("/", (_req, res) => {
    res.status(200).send("OK");
});

app.post("/create", (req, res) => {
    let short = getParamFromReq(req, "short");
    let destination = getParamFromReq(req, "link");

    if (destination !== undefined) {
        destination = validateLink(destination);
    } else {
        sendError(res, 400);
        return;
    }

    res.status(200);

    let otherLinker = lc.findByDestination(destination);
    if (otherLinker !== undefined) {
        res.send({
            short: otherLinker.short,
        });
    } else {
        let linker = new Linker(destination);
        if (short === undefined) {
            linker.generateShort();
        } else {
            linker.short = short;
        }

        linker.generateToken();

        lc.add(linker);

        res.send({
            short: linker.short,
            token: linker.token,
        });
    }
});

app.get("/links", (_req, res) => {
    res.status(200).send(lc.safeCollection());
});

app.get("/:short", (req, res) => {
    let short = req.params.short;

    let linker = lc.findByShort(short);
    if (linker !== undefined) {
        res.redirect(301, linker.destination);
    } else {
        sendError(res, 404);
    }
});

app.put("/:short", (req, res) => {
    let short = req.params.short;
    let token = getParamFromReq(req, "token");
    let link = getParamFromReq(req, "link");

    if (token === undefined) {
        sendError(res, 401);
        return;
    }

    let linker = lc.findByShort(short);
    if (linker === undefined) {
        sendError(res, 400);
        return;
    }

    link = validateLink(link);
    if (link === false) {
        sendError(res, 400);
        return;
    }

    let new_linker = new Linker(link, short, token);
    lc.add(new_linker);

    res.status(200).send();
});

app.delete("/:short", (req, res) => {
    let short = req.params.short;
    let token = getParamFromReq(req, "token");

    if (token === undefined) {
        sendError(res, 401);
        return;
    }

    let linker = lc.findByShort(short);
    if (linker === undefined) {
        sendError(res, 400);
    }

    lc.removeByShort(short);

    res.status(200).send();
});

// prettier-ignore
app.get("/:short/json", (req, res) => {
    let short = req.params.short;

    let linker = lc.findByShort(short)
    if (linker === undefined) {
        sendError(res, 404);
        return;
    }

    res.send({
        short: short,
        destination: linker.destination
    });
});

app.listen(PORT, () => {
    console.log(`Now listening on http://localhost:${PORT}`);
});

module.exports = app;
