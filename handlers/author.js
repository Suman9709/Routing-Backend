// const { MongoClient,ObjectId } = require('mongodb');
// const { MONGO_URI } = require('../env');
// const { BLOG_DB, AUTHOR_COL } = require('../constants');

// const createAuthor = async (req, res) => {
//   const { author, dob } = req.body; 

//   if (!author || !dob) {
//     return res.status(400).send();
//   }

//   const client = new MongoClient(MONGO_URI);

//   try {
//     await client.connect();
//     const blogDb = client.db(BLOG_DB);
//     const Authors = blogDb.collection(AUTHOR_COL);
//     const result = await Authors.insertOne({ author, dob });
//     console.log(`Inserted ${author} with dob ${dob} into Authors, with _id ${result.insertedId}`);
//     res.status(201).json({ _id: result.insertedId });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send();
//   } finally {
//     await client.close();
//   }
// };

// const readAllAuthors = async (req, res) => {
//     const client = new MongoClient(MONGO_URI)

//     try {
//         const blogDb = client.db(BLOG_DB);
//         const Authors = blogDb.collection(AUTHOR_COL);
//         const cursor = Authors.find({});
//         const result = await cursor.toArray();

//         res.status(200).json({ result }).send();
//     }
//     catch (err) {
//         console.error(err);
//         res.status(500).send()
//     }
//     finally {
//         await client.close();
//     }
// }


// const readAuthors = async (req, res) => {
//     let { authorId } = req.params;
//     console.log(authorId);

//     const client = new MongoClient(MONGO_URI)

//     try {
//         authorId = new ObjectId(authorId);
//         const blogDb = client.db(BLOG_DB);
//         const Authors = blogDb.collection(AUTHOR_COL);
//         const result = await Authors.findOne({ _id: authorId });
//         res.status(200).json({ result }).send();
//     }
//     catch (err) {
//         console.error(err);
//         res.status(500).send()
//     }
//     finally {
//         await client.close();
//     }
// }


// const updateAuthors = async (req, res) => {
//     const { author, dob } = req.body;
//     let { authorId } = req.params;

//     const client = new MongoClient(MONGO_URI)
//     try {
//         authorId = new ObjectId(authorId);
//         const blogDb = client.db(BLOG_DB);
//         const Authors = blogDb.collection(AUTHOR_COL);
//         const result = await Authors.findOneAndUpdate(
//             { _id: authorId },
//             { $set: { author, dob } },
//             { returnDocument: "after" }
//         );
//         res.status(200).json({ result }).send();
//     }
//     catch (err) {
//         console.error(err);
//         res.status(500).send()
//     }
//     finally {
//         await client.close();
//     }
// }

// const patchAuthor = async (req, res) => {
//     console.log(req.body);
//     const { author, dob } = req.body;
//     let { authorId } = req.params;
//     if (!(author || dob)) {
//         return res.status(400).send();
//     }
//     const updateDoc = {};
//     if (author) updateDoc.author = author;
//     if (dob) updateDoc.dob = dob;
//     const client = new MongoClient(MONGO_URI);
//     try {
//         authorId = new ObjectId(authorId);
//         const blogDb = client.db(BLOG_DB);
//         const Authors = blogDb.collection(AUTHOR_COL);
//         const result = await Authors.findOneAndUpdate(
//             { _id: authorId },
//             { $set: updateDoc },
//             { returnDocument: "after" }
//         );
  
//         res.status(200).json({ result }).send();
//     }
//     catch (err) {
//         console.error(err);
//         res.status(500).send()
//     }
//     finally {
//         await client.close();
//     }

// }

// module.exports = { 
//     createAuthor,
//     readAllAuthors,
//     readAuthors,
//     updateAuthors,
//     patchAuthor,

//  };
