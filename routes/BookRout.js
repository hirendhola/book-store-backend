// import express from 'express';
// import { Book } from '../models/book.model.js';

// const router = express.Router();

// router.post('/', async (req, res) => {
//     try {
//         const newBook = {
//             title: req.body.title,
//             author: req.body.author,
//             categories: req.body.categories,
//             published: req.body.published,
//             publishDate: undefined
//         };

//         if (!newBook.title || !newBook.author || !newBook.categories || newBook.published === undefined) {
//             return res.status(400).json({ message: "Please enter all required fields!" });
//         }

//         if ('publishDate' in req.body) {
//             newBook.publishDate = req.body.publishDate;
//         }

//         const book = await Book.create(newBook);
//         res.status(200).json({ message: "Book created successfully", data: book });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ msg: "Can't complete request" });
//     }
// });


// router.get('/', async (req, res) => {
//     try {
//         const books = await Book.find({});
//         res.status(200).json({
//             count: books.length,
//             data: books
//         });
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).json({
//             msg: "Server error"
//         });
//     }
// });

// router.get('/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const book = await Book.findById(id);
//         if (!book) {
//             return res.status(404).json({ msg: "Book not found" });
//         }
//         res.status(200).json(book);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).json({ msg: "Server error" });
//     }
// });

// router.put('/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const updatedBook = {
//             title: req.body.title,
//             author: req.body.author,
//             categories: req.body.categories,
//             published: req.body.published,
//             publishDate: undefined
//         };

//         if (!updatedBook.title || !updatedBook.author || !updatedBook.categories || updatedBook.published === undefined) {
//             return res.status(400).json({ message: "Please enter all fields!" });
//         }

//         // Only include publishDate if it exists in the request body
//         if (req.body.publishDate) {
//             updatedBook.publishDate = req.body.publishDate;
//         }

//         const result = await Book.findByIdAndUpdate(id, updatedBook, { new: true });

//         if (!result) {
//             return res.status(404).json({ error: "Can't find book" });
//         }

//         res.status(200).json({ message: "Book updated successfully", data: result });
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).json({ msg: "Can't complete request" });
//     }
// });



// router.delete('/:id', async (req, res) => {
//     try {
//         const { id } = req.params;

//         const deleted = await Book.findByIdAndDelete(id);
//         if (!deleted) {
//             return res.status(404).json({ error: "Can't delete book" });
//         }
//         res.status(200).json({ message: "Book deleted successfully", data: deleted });
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).json({ msg: "Can't complete request" });
//     }
// });


// export default router;



import express from 'express';
import { Book } from '../models/book.model.js';

const router = express.Router();

// Create a new book
router.post('/', async (req, res) => {
  try {
    const { title, author, categories, published, publishDate } = req.body;

    if (!title || !author || !categories || (published && !publishDate)) {
      return res.status(400).json({ message: "Please provide all required fields!" });
    }

    const newBook = {
      title,
      author,
      categories,
      published,
      publishDate: published ? publishDate : undefined,
    };

    const book = await Book.create(newBook);
    res.status(201).json({ message: "Book created successfully", data: book });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Unable to complete the request" });
  }
});

// Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).json({
      count: books.length,
      data: books
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// Get a specific book by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ msg: "Book not found" });
    }

    res.status(200).json(book);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// Update a book by ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, categories, published, publishDate } = req.body;

    if (!title || !author || !categories || (published && !publishDate)) {
      return res.status(400).json({ message: "Please provide all required fields!" });
    }

    const updatedBook = {
      title,
      author,
      categories,
      published,
      publishDate: published ? publishDate : undefined,
    };

    const result = await Book.findByIdAndUpdate(id, updatedBook, { new: true });

    if (!result) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json({ message: "Book updated successfully", data: result });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Unable to complete the request" });
  }
});

// Delete a book by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Book.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted successfully", data: deleted });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Unable to complete the request" });
  }
});

export default router;
