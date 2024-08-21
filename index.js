import express from "express";
import bodyParser from "body-parser";
import {fileURLToPath} from "url";
import {dirname} from "path";
const __dirname = dirname(fileURLToPath(import.meta.url));
const port = 3000;
const app = express();



app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}))



let blogs = {};
var count = 0;

app.get("/",(req,res) => {
    
    res.render("index.ejs");

});

app.get("/blog-post",(req,res) => {
    res.render("blog.ejs");
});

app.get("/view-blog",(req,res) => {
    var blog_key = req.query.id;
    res.render("view_blog.ejs",{content:blogs[blog_key]["content"],title:blogs[blog_key]["title"],id:blog_key});

});

app.get("/list-blogs",(req,res) => {
    res.render("list_blogs.ejs",{blogs:blogs});

})


app.post("/create-blog",(req,res) => {
    var details = {};
    details["objValue"] = count;
    details["content"] = req.body["content"];
    details["title"] = req.body["title"];
    //pushing these details object as an value and key as a number
    blogs[count] = details;

    //overwriting the object
    details = {};
    count++;

    // console.log(blogs);
    res.redirect("/list-blogs");
});

app.post("/update-blog",(req,res) => {
    let id = req.body["blog_id"];
    blogs[id].content = req.body["content"];
    blogs[id].update = true;
    res.redirect("/list-blogs");
});

app.get("/delete-blog",(req,res) => {
    var delete_blog_id =  req.query.id;
    delete blogs[delete_blog_id];
    res.redirect("/list-blogs/?status=deleted");
});


app.listen(port,() => {
    console.log(`Listining Port ${port}..`)
});