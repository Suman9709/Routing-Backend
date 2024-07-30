
let blogs = []

const { MongoClient, ObjectId } = require('mongodb');
const { MONGO_URI } = require('../env');
const { BLOG_DB, BLOGS_COL } = require('../constants');

const createBlog = async (req, res) => {
    const { body } = req;
    const { author, content } = body;

    if (!(author && content)) {
        return res.status(400).send()
    }

    const client = new MongoClient(MONGO_URI)

    try {
        const blogDb = client.db(BLOG_DB);
        const Blogs = blogDb.collection(BLOGS_COL);
        const result = await Blogs.insertOne({ author, content });
        console.log(`inserted ${{ author }, content} int to blogs, with_id ${result.insertedId}`);
        res.status(201).json({ _id: result.insertedId }).send();
    }
    catch (err) {
        console.error(err);
        res.status(500).send()
    }
    finally {
        await client.close();
    }
    // if (author && content) {
    //     blogs.push({ author, content });
    //     res.status(201).send('OK');
    //     return;
    // }
    // res.status(400).send('!OK')
}

const readAllBlog = async (req, res) => {
    const client = new MongoClient(MONGO_URI)

    try {
        const blogDb = client.db(BLOG_DB);
        const Blogs = blogDb.collection(BLOGS_COL);
        const cursor = Blogs.find({});
        const result = await cursor.toArray();

        res.status(200).json({ result }).send();
    }
    catch (err) {
        console.error(err);
        res.status(500).send()
    }
    finally {
        await client.close();
    }
    // res.json(blogs);
}

const readBlog = async (req, res) => {
    let { blogId } = req.params;
    console.log(blogId);

    const client = new MongoClient(MONGO_URI)

    try {
        blogId = new ObjectId(blogId);
        const blogDb = client.db(BLOG_DB);
        const Blogs = blogDb.collection(BLOGS_COL);
        const result = await Blogs.findOne({ _id: blogId });
        res.status(200).json({ result }).send();
    }
    catch (err) {
        console.error(err);
        res.status(500).send()
    }
    finally {
        await client.close();
    }
}

const updateBlogs = async (req, res) => {
    const { author, content } = req.body;
    let { blogId } = req.params;
    // if (blogId > 0 & blogId <= blogs.length && author && content) {
    //     blogId -= 1;
    //     blogs[blogId] = { author, content }
    //     return res.status(200).send();
    // }
    // return res.status(404).send();

    const client = new MongoClient(MONGO_URI)
    try {
        blogId = new ObjectId(blogId);
        const blogDb = client.db(BLOG_DB);
        const Blogs = blogDb.collection(BLOGS_COL);
        const result = await Blogs.findOneAndUpdate(
            { _id: blogId },
            { $set: { author, content } },
            { returnDocument: "after" }
        );
        // const result = await cursor.toArray();

        // console.log(`inserted ${{author}, content} int to blogs, with_id ${result.insertedId}`);
        res.status(200).json({ result }).send();
    }
    catch (err) {
        console.error(err);
        res.status(500).send()
    }
    finally {
        await client.close();
    }
}

const patchBlog = async (req, res) => {
    console.log(req.body);
    const { author, content } = req.body;
    let { blogId } = req.params;
    // if (blogId > 0 & blogId <= blogs.length) {
    //     blogId -= 1;
    //     if (author) blogs[blogId].author = author;
    //     if (content) blogs[blogId].content = content;
    //     return res.status(200).send();
    // }
    // return res.status(400).send();
    if (!(author || content)) {
        return res.status(400).send();
    }
    const updateDoc = {};
    if (author) updateDoc.author = author;
    if (content) updateDoc.content = content;
    const client = new MongoClient(MONGO_URI);
    try {
        blogId = new ObjectId(blogId);
        const blogDb = client.db(BLOG_DB);
        const Blogs = blogDb.collection(BLOGS_COL);
        const result = await Blogs.findOneAndUpdate(
            { _id: blogId },
            { $set: updateDoc },
            { returnDocument: "after" }
        );
        // const result = await cursor.toArray();

        // console.log(`inserted ${{author}, content} int to blogs, with_id ${result.insertedId}`);
        res.status(200).json({ result }).send();
    }
    catch (err) {
        console.error(err);
        res.status(500).send()
    }
    finally {
        await client.close();
    }

}

const deleteBlog = async (req, res) => {
    let { blogId } = req.params;

    // if (blogId > 0 && blogId <= blogs.length) {
    //     blogId -= 1;
    //     blogs.splice(blogId, 1);
    //     return res.status(200).send();
    // }
    // return res.status(404).send();

    const client = new MongoClient(MONGO_URI)

    try {
        blogId = new ObjectId(blogId);
        const blogDb = client.db(BLOG_DB);
        const Blogs = blogDb.collection(BLOGS_COL);
        const result = await Blogs.findOneAndDelete
            ({ _id: blogId });
        // const result = await cursor.toArray();

        // console.log(`inserted ${{author}, content} int to blogs, with_id ${result.insertedId}`);
        res.status(200).json({ result }).send();
    }
    catch (err) {
        console.error(err);
        res.status(500).send()
    }
    finally {
        await client.close();
    }

}

module.exports = {
    createBlog,
    readAllBlog,
    readBlog,
    updateBlogs,
    patchBlog,
    deleteBlog,

}






