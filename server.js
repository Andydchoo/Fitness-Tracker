const mongoose = require('mongoose');
const express = require('express');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:/workout", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
});

app.get('/exercise', (req, res) => {
    res.sendFile(__dirname + "/public/exercise.html");
});

app.get('/stats', (req, res) => {
    res.sendFile(__dirname + "/public/stats.html");
});

app.use(require("./routes/api.js"));

app.listen(PORT, () => {
    console.log(`App running at http://localhost:${PORT}`);
});