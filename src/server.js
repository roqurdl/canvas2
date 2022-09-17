import express from "express";

const app = express();

const port = 4000;

app.set(`view engine`, `pug`);
app.set(`views`, __dirname + `/views`);
app.use("/", express.static(__dirname + `/views`));
app.get(`/`, (req, res) => {
  res.render(`home`);
});
app.use(express.static("public"));

app.listen(port, (req, res) => {
  console.log(`http://localhost:${port}`);
});
