const { Blog } = require("../models/blog.model")

const blogIndex = (req, res) => {
    Blog.find()
        .then(blogs => {
            console.log(blogs);
            res.render('blog/index', { blogs })
        })
        .catch(err => {
            console.log(err)
            res.status(500).send("Server Error")
        })
}

const blogCreateGet=(req, res)=>{
    res.render('blog/new')
}

const blogCreatePost=async (req,res)=>{
const {title,body}=req.body;
if(title && body){
    const blog = new Blog({body, title})  
    // blog.title += "_" //any modification can be done 

    try {
       await blog.save();
       res.redirect("/blog");
    } catch (error) {
        console.error(error);
    }
   
}
}


const blogDetails=(req,res)=>{
const {id}=req.params;
// const id=req.params.id; //same as above
Blog.findById(id)
.then(blog => {
    res.render("blog/detail", {blog});
})
.catch((err)=>console.error(err))
}

const blogEditGet=(req,res)=>{
const {id}=req.params;
Blog.findById(id)
.then(blog => {
    res.render("blog/edit", {blog});
})
.catch((err)=>console.error(err))
}


const blogEditPut=(req,res)=>{
const {id} =req.params;
const {body, title} = req.body;
if(body && title){
    Blog.findByIdAndUpdate(id, {body, title})
    .then((_)=>res.redirect(`/blog/${id}`))
    .catch(err=> console.error(err))
}
}

const blogDelete=(req,res)=>{
    const {id}=req.params;
        Blog.findByIdAndDelete(id)
       .then((_)=>res.redirect("/blog"))
       .catch(err=>console.error(err))
}
module.exports = {
    blogIndex,
    blogCreateGet,
    blogCreatePost,
    blogDetails,
    blogEditGet,
    blogEditPut,
    blogDelete
    
}