const { Router } = require('express');
const blogController = require("../controllers/blog.controller")

const blogRouter = Router();

blogRouter.get('/', blogController.blogIndex);
blogRouter.get('/new', blogController.blogCreateGet);
blogRouter.post('/', blogController.blogCreatePost);
blogRouter.get('/:id', blogController.blogDetails);
blogRouter.get('/:id/edit', blogController.blogEditGet);


blogRouter.put('/:id', blogController.blogEditPut);
blogRouter.delete('/:id', blogController.blogDelete);


module.exports = {
    blogRouter,
}