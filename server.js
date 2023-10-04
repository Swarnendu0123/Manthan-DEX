const express = require("express");
const app = express();
const port = 7000;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

let posts = [
  {
    id: uuidv4(),
    username: "Prakhar",
    content:
      "Bulbasaur is known as the Seed Pokémon. It resembles a small, quadrupedal dinosaur that has blue-green skin with darker blue-green spots. Its most notable feature is the plant bulb on its back. The bulb is planted there at birth and grows with this Pokémon. Bulbasaur is often seen basking in the sun, using the nutrients from the bulb to grow. If the bulb on its back is healthy, it will grow into a large plant.",
    img: "/poke_dex/bulbasaur.png",
    price: 199,
    betting: [
      { name: "Swarnendu", price: 599 },
      { name: "Rishabh", price: 999 },
    ],
  },
  {
    id: uuidv4(),
    username: "Sameer",
    content:
      "Pikachu is a small, yellow, rodent-like creature with long ears and a lightning bolt-shaped tail. Its cheeks are plump and can generate electricity. Pikachu uses its tail to channel this electricity when it releases electrical discharges. In the Pokémon world, Pikachu is known for its quickness, agility, and its ability to generate electrical power. Pikachu evolves from Pichu when leveled up with high friendship and evolves into Raichu when exposed to a Thunder Stone. It is one of the most recognizable and iconic Pokémon species.",
    img: "/poke_dex/pikachu.png",
    price: 249,
    betting: [
      { name: "Swarnendu", price: 599 },
      { name: "Rishabh", price: 999 },
    ],
  },
  {
    id: uuidv4(),
    username: "Nissim",
    content:
      "Charmander is a small, dinosaur-like Pokémon. It is primarily orange with a cream underside from the chest down and on the soles of its feet. It has two small fangs visible in its upper jaw and blue eyes. Its most distinctive feature is the flame on its tail, which burns brightly and indicates Charmander's life force. If the flame goes out, it is said that Charmander will die. However, this does not harm the Pokémon, as it can reignite the flame with a little fire and the willingness to survive.",
    img: "/poke_dex/charmander.png",
    price: 99,
    betting: [
      { name: "Swarnendu", price: 599 },
      { name: "Rishabh", price: 999 },
    ],
  },
];

app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/posts", (req, res) => {
  let post = req.body;
  (post.id = uuidv4()), posts.push(post);
  post.betting = [];
  console.log(post);
  res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id == p.id);
  if (post) {
    res.render("post.ejs", { post });
  } else {
    res.render("error.ejs");
  }
});

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => p.id == id);
  if (post) {
    post.content = req.body.content;
    post.img = req.body.img;
    post.price = req.body.price;
    res.redirect("/posts");
  } else {
    res.render("error.ejs");
  }
});

app.post("/posts/bet/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => p.id == id);
  if (post) {
    post.betting.push({ name: req.body.name, price: req.body.price });
    console.log(post.betting);
    console.log({ name: req.body.name, price: req.body.price });
    res.redirect("/posts/" + id);
  } else {
    res.render("error.ejs");
  }
});

app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => p.id == id);
  if (post) {
    res.render("edit.ejs", { post });
  } else {
    res.render("error.ejs");
  }
});

app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => p.id == id);
  if (post) {
    let index = posts.indexOf(post);
    if (index > -1) {
      posts.splice(index, 1);
    }

    res.redirect("/posts");
  } else {
    res.render("error.ejs");
  }
});

app.listen(port, () => {
  console.log("Server live at http://localhost:7000/posts");
});
