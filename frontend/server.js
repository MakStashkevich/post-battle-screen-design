const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV === "production") {
    app.use(express.static("build"));
    app.use('/static/css', express.static("build/static/css"));
    app.use('/static/js', express.static("build/static/js"));
    app.use(/\/\w+/, express.static("build"));
}

app.use(express.json());
app.use(cors({
    "origin": "*",
    "methods": "GET",
    "preflightContinue": false,
}));

app.listen(PORT, () => console.log(`Frontend running on ${PORT}`));