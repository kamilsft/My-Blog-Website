//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Welcome to My Blog Website where I will be sharing my Full Stack and Blockchain Development!";
const aboutContent = "I'm on a journey to become a proficient Full Stack Developer with a focus on Blockchain technology. My adventure began with mastering HTML and CSS to create visually appealing static web pages. I've since moved on to backend development, where I work with databases and server-side logic. I'm also diving deep into the world of blockchain, learning about smart contracts, decentralized applications (dApps), and the fundamentals of Ethereum. I'm exploring frameworks like React for building dynamic user interfaces and Remix IDE for Solidity development. This blog is where I document my progress, challenges, and achievements in both Full Stack and Blockchain Development.";
const contactContent = "Feel free to reach out if you have any questions about Full Stack or Blockchain Development, or if you're interested in collaborating on a project. I'm always eager to learn more and engage with others in the tech community. You can contact me via email or connect with me on LinkedIn.";

const app = express();


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let Posts = [];

app.get("/", function(req, res){
  res.render("home", {
    Title: "Home",
    Paragraph: homeStartingContent,
    PostItems: Posts
  });
  //console.log(Posts)
});

app.get("/about", function(req, res){
  res.render("about", {
    AboutTitle: "About",
    AboutText: aboutContent
  });
});

app.get("/contact", function(req, res){
  res.render("contact", {
    Contact: "Contact",
    ContactParagraph: contactContent
  });
});

app.get("/compose", function(req, res){
  res.render("compose", {
    Compose: "Compose"
  })
})

app.post("/compose", function(req, res){
  let post = {
    title: req.body.titleLine,
    NewPost: req.body.NewPost
  };
  Posts.push(post);
  res.redirect("/");
  //console.log(post);
});

// Express Routing Parameters

app.get("/posts/:topicOfPost", function(req, res){
  const requestedTitleParam = _.lowerCase(req.params.topicOfPost);
  //console.log(_.lowerCase(requestedTitleParam));

// creating a for loop because we do not have an access to a post object
// our Posts array is global
// our post is local
  Posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);
    if (requestedTitleParam === storedTitle){
      res.redirect("/post");
    }
  });
});

app.get("/post", function(req, res){
  res.render("post", {
    postTitle: "Posts that Matter to You!",
    PostItems: Posts
  });
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
