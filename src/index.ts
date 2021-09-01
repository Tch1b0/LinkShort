import express from "express";
import { LinkerCollection } from "./LinkerCollection";
import { Linker } from "./Linker";
import { getParamFromReq, sendError, validateLink } from "./utility";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 3000;
const lc = new LinkerCollection();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
lc.load();

app.get("/", (_req, res) => {
    res.writeHead(200);
    res.send("Ok");
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

    res.writeHead(200);

    let otherLinker = lc.findByDestination(destination);
    if (otherLinker !== undefined) {
        res.send({
            short: otherLinker.short,
        });
    } else {
        let linker = new Linker(destination);
        if (short === undefined) linker.generateShort();
        linker.generateToken();

        lc.add(linker);

        res.send({
            short: linker.short,
            token: linker.token,
        });
    }
});

app.listen(PORT, () => {
    console.log(`Now listening on http://localhost:${PORT}`);
});
