import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (_req, res) => {
    res.send("Ok");
});

app.listen(PORT, () => {
    console.log(`Now listening on localhost:${PORT}`);
});
