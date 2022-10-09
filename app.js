//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Welocme to Dialy Journal "
const aboutContent = "This is a Blog site where every person can write down their thoughts and feelings to understand them more clearly";
const contactContent = {
                  name : "©️ Douluri Venkatesh",
                  email: "doulurivenkatesh@gmail.com",
                  phone: "7989524134"
                };

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/",function(req,res)
{
  res.render("home",{
    StartingContent: homeStartingContent ,
    posts: posts
    });
});


app.get("/about",function(req,res)
{
  res.render("about",{aboutContent: aboutContent });
});

app.get("/contact",function(req,res)
{
  res.render("contact",{contactContent: contactContent });
});

app.get("/compose",function(req,res)
{
  var today= new Date();
  var options = { weekday: "long", month: "long", day: "numeric" };
  var day = today.toLocaleDateString("en-US", options);
     res.render("compose",{ todaydate:day});
   });

app.post("/compose",function(req,res)
{
    const post={
      title:req.body.postTitle,
      content:req.body.postBody,
    };
      posts.push(post);

      res.redirect("/");
});

app.get("/posts/:postName",function(req,res)
{
    const requestedTitle = _.lowerCase(req.params.postName);

    posts.forEach(function(post)
    {
    const storedTitle = _.lowerCase(post.title);

    if(storedTitle === requestedTitle)
    {
        res.render("post",{
          title: post.title,
          content: post.content,
        });
    }
  });

});



app.listen(process.env.PORT|| 3000, () =>{
    console.log("Express server listening on port" );
  });
