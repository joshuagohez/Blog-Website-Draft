//jshint esversion:6

const express = require("express");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Minimalistic template website for blogging activities built on node.js backend and supported by the following libraries {express.js, EJS, lodash} and styled with bootstrap. Head to the navigation bar and click on WRITE to begin composing your blog entries.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

let posts = [];

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  let today = new Date();
  let options = {
    weekday: "long",
    month: "long",
    day: "numeric"
  };
  let day = today.toLocaleDateString("en-US", options);

  res.render("home", {homeStartingContent: homeStartingContent, posts: posts, _:_, day: day});
});

app.get("/about", function(req, res) {
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res) {
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res) {
  res.render("compose");
});

app.get("/posts/:postName", function(req, res) {

  let reqTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post) {
    let storedTitle = _.lowerCase([string=post.title]);

    if (storedTitle === reqTitle) {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    } else {
      console.log("Not a Match");
    }
  });
});

app.post("/compose", function(req, res) {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };

  posts.push(post);

  res.redirect("/");

});








app.listen(3000, function() {
  console.log("Server started on port 3000");
});
