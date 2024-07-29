const {Router} = require('express');
const { createBlog, readAllBlog, readBlog, updateBlogs, patchBlog, deleteBlog } = require('../handlers/blog');

const blogRouter=Router();
blogRouter.post("", createBlog)
blogRouter.get("", readAllBlog);
blogRouter.get("/:blogId",readBlog)
blogRouter.put("/:blogId", updateBlogs)
blogRouter.patch("/:blogId", patchBlog)
blogRouter.delete("/:blogId", deleteBlog)


module.exports={
    blogRouter,
}