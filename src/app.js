const express=require("express");
const app=express();
const path=require("path");
const hbs=require("hbs");
//public static path..........

//console.log(path.join(__dirname, "../public"));
const staticPath=path.join(__dirname, "../public");
const template_path=path.join(__dirname, "../templates/views");
const partials_path=path.join(__dirname,"../templates/partials");

//use hbs
app.set("view engine","hbs");
app.set('views',template_path);
hbs.registerPartials(partials_path);
app.use(express.static(staticPath));


const port = process.env.PORT || 8000;


// routing........
app.get("/",(req,res)=>{
 res.render('index');
});
app.get("/about",(req,res)=>{
    res.render('about');
});
app.get("/weather",(req,res)=>{
    res.render("weather");
});
app.get("*",(req,res)=>{
    res.render('404error',{
        errormsg:'Opps! Page Not Found',
    });
});
app.listen(port,()=>{
    console.log(`listing  to the port no ${port}`);
});