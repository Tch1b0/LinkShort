// const express = require("express");
import express from "express";

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (_req, res) => {
    res.send("Ok");
});

app.listen(port);
