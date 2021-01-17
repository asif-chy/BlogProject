//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const _ = require('lodash');
const PORT = process.env.PORT || 3000;

mongoose.connect("mongodb+srv://Asiful_01:Mongo1234@cluster0.9hlzt.mongodb.net/postDB?retryWrites=true&w=majority", {useNewUrlParser: true});

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutStartingContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactStartingContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const postSchema = {
  title: String,
  post: String
}

const Post = mongoose.model("Post",postSchema);

app.get("/",function(request,response){

  Post.find(function(err,postItems){
    if(!err){
      if(postItems.length === 0){
        const postList = [];
        response.render("home",{homeContent:homeStartingContent, blogItems:postList});
      }else{
        response.render("home",{homeContent:homeStartingContent, blogItems:postItems});
      }
    }
  })

})

app.get("/about",function(request,response){
  response.render("about",{aboutContent:aboutStartingContent});
})

app.get("/contact",function(request,response){
  response.render("contact",{contactContent:contactStartingContent});
})

app.get("/compose",function(request,response){
  response.render("compose");
})

app.get("/posts/:id",function(request,response){

  let paramId = request.params.id;
  
  Post.findById(paramId,function(err, post){
    if(!err && null !== post){
      response.render("post", {blogObject:post})
    }else{
      response.redirect("/");
    }
  })

  // postList.forEach(function(listItem){
  //   let postTitle = _.lowerCase(listItem.title)
  //   if(postTitle === paramTitle){
  //     response.render("post", {blogObject:listItem} )
  //   }
  // })
  // response.redirect("/");
})

app.post("/compose",function(request,response){

  const newTitle = request.body.postTitle;
  const newPost = request.body.postText;

  const newBlogPost = new Post({
    title: newTitle,
    post: newPost
  })

  newBlogPost.save();
  response.redirect("/");
})

app.listen(3000,function(){
  console.log("Server listening to port 3000");
})
