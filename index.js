const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const Gift = require("./model/gift");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/Sanika")
  .then(() => {
    console.log("Connected to the mongoose");
  })
  .catch((err) => {
    console.log("Connection Error!!!");
  });

app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/gifts", async (req, res) => {
  const gifts = await Gift.find({});
  res.render("gifts/allgifts", { gifts });
});

app.get("/gifts/new", (req, res) => {
  res.render("gifts/new");
});

app.post("/gifts", (req, res) => {
  const newGift = new Gift(req.body);
  newGift.save();
  res.redirect(`/gifts/${newGift._id}`);
});

app.get("/gifts/:id/edit", async (req, res) => {
  const { id } = req.params;
  const gift = await Gift.findById(id);
  res.render("gifts/edit", { gift });
});

app.put("/gifts/:id", async (req, res) => {
  const { id } = req.params;
  const editGift = await Gift.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.redirect(`/gifts/${editGift._id}`);
});

app.delete("/gifts/:id", async (req, res) => {
  const { id } = req.params;
  const gift = await Gift.findByIdAndDelete(id);
  res.redirect("/gifts");
});

app.get("/gifts/:id", async (req, res) => {
  const { id } = req.params;
  const gifts = await Gift.findById(id);
  res.render("gifts/show", { gifts });
});

app.listen(3000, (req, res) => {
  console.log("Connecting to the port 3000");
});
