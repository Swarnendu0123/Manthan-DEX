const express = require("express");
const app = express();
const port = 7000;
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let posts = [
  {
    id: "1a",
    username: "swarnendu",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, voluptatem repellat, dolorum fuga odio sint asperiores inventore deserunt soluta, sit error neque voluptas voluptatum officiis maxime quasi quaerat molestiae. Est, sunt doloribus. Aspernatur eaque provident voluptatum in voluptate necessitatibus itaque libero magni? Accusamus molestias eos, unde aut quidem odio praesentium?",
  },
  {
    id: "2b",
    username: "iit_kgp",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illo voluptas beatae ex, nemo, id, ratione quia dolorem aliquid accusamus dolore laborum minus? Maxime cum qui quisquam, tenetur corrupti ratione.",
  },
  {
    id: "3c",
    username: "MIT",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illo voluptas beatae ex, nemo, id, ratione quia dolorem aliquid accusamus dolore laborum minus? Maxime cum qui quisquam, tenetur corrupti ratione.",
  },
];

app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/posts", (req, res) => {
  console.log(req.body);
  posts.push(req.body);
  res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id == p.id);
  if (post) {
    res.render("post.ejs", { post });
  } else {
    console.log(post)
    res.render("error.ejs");
  }
});

app.listen(port, () => {
  console.log("Server Started");
});
