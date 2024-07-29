
const blogs=[]
const createBlog = (req, res) => {
    // console.log((req.body));
    const { body } = req;
    const { author, content } = body;
    if (author && content) {
        blogs.push({ author, content });
        res.status(201).send('OK');
        return;
    }
    res.status(400).send('!OK')
}

const readAllBlog =  (req, res) => {
    res.json(blogs);
}

const readBlog= (req, res) => {
    let { blogId } = req.params;
    console.log(blogId);

    if (blogId > 0 && blogId <= blogs.length) {
        blogId -= 1;
        const blogToReturn = blogs[blogId];
        return res.status(200).json(blogToReturn).send();
    }
    res.status(404).send();
  
}

const updateBlogs=(req,res)=>{
    const  {author ,content} = req.body;
    let { blogId } = req.params;
    if(blogId>0 & blogId <= blogs.length && author && content){
        blogId -=1;
        blogs[blogId]={author,content}
        return res.status(200).send();
    } 
    return res.status(404).send();
}

const patchBlog=(req,res)=>{
    const  {author ,content} = req.body;
    let { blogId } = req.params;
    if(blogId>0 & blogId <= blogs.length){
        blogId -=1;
       if(author) blogs[blogId].author = author;
       if(content) blogs[blogId].content = content;
        return res.status(200).send();
    } 
    return res.status(400).send();
}

const deleteBlog=(req,res)=>{
    let {blogId} = req.params;

    if(blogId > 0 && blogId <= blogs.length){
        blogId -=1;
        blogs.splice(blogId,1);
        return res.status(200).send();
    }
    return res.status(404).send();
}

module.exports = {
    createBlog,
    readAllBlog,
    readBlog,
    updateBlogs,
    patchBlog,
    deleteBlog,
 
}





