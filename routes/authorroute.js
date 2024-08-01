const { Router } = require('express');
const { createAuthor,readAllAuthors, readAuthors, updateAuthors,patchAuthor } = require('../handlers/author'); 

const authorRouter = Router();

authorRouter.post('', createAuthor);
authorRouter.get('', readAllAuthors)
authorRouter.get('/:authorId',readAuthors)
authorRouter.put('/:authorId',updateAuthors)
authorRouter.patch('/:authorId',patchAuthor)


module.exports = {
  authorRouter,

};