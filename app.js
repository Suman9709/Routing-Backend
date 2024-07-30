const express = require('express');
const { blogRouter } = require('./routes/blogroute');
const { healthRoute } = require('./routes/healthroute')



const PORT = 8080;

const app = express();


// const blogs = [];

app.use(express.json());
app.use("/health", healthRoute);
app.use("/blog", blogRouter)

// app.get('/health', (req, res) => {
//     res.send('ok')
// })
// app.post('/blog', (req, res) => {
//     // console.log((req.body));
//     const { body } = req;
//     const { author, content } = body;
//     if (author && content) {
//         blogs.push({ author, content });
//         res.status(201).send('OK');
//         return;
//     }
//     res.status(400).send('!OK')
// })

// // read all blogs

// app.get('/blog', (req, res) => {
//     res.json(blogs);
// })
// app.get('/blog/:blogId', (req, res) => {
//     let { blogId } = req.params;
//     console.log(blogId);

//     if (blogId > 0 && blogId < blogs.length) {
//         blogId -= 1;
//         const blogToReturn = blogs[blogId];
//         return res.status(200).json(blogToReturn).send();
//     }
//     res.status(404).send();

// })

// app.put("/blog/:blogId",(req,res)=>{
//     const  {author ,content} = req.body;
//     let { blogId } = req.params;
//     if(blogId>0 & blogId <= blogs.length && author && content){
//         blogId -=1;
//         blogs[blogId]={author,content}
//         return res.status(200).send();
//     } 
//     return res.status(404).send();
// })


// app.patch("/blog/:blogId",(req,res)=>{
//     const  {author ,content} = req.body;
//     let { blogId } = req.params;
//     if(blogId>0 & blogId <= blogs.length){
//         blogId -=1;
//        if(author) blogs[blogId].author = author;
//        if(content) blogs[blogId].content = content;
//         return res.status(200).send();
//     } 
//     return res.status(400).send();
// })

// app.delete("/blog/:blogId",(req,res)=>{
//     let {blogId} = req.params;

//     if(blogId > 0 && blogId <= blogs.length){
//         blogId -=1;
//         blogs.splice(blogId,1);
//         return res.status(200).send();
//     }
//     return res.status(404).send();
// })

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});