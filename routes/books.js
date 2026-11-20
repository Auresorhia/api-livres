const express = require('express');
const router = express.Router();
const Book = require('../models/books');

// GET - Récupérer tous les livres
router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET - Récupérer un livre par son id
router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findOne({ id: Number(req.params.id) });
        if (!book) return res.status(404).json({ message: 'Livre non trouvé' });
        res.json(book);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// POST - Ajouter un nouveau livre
router.post('/', async (req, res) => {
    try {
        const newBook = new Book(req.body);
        const savedBook = await newBook.save();
        res.status(201).json(savedBook);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// PUT - Modifier un livre par son id
router.put('/:id', async (req, res) => {
    try {
        const updatedBook = await Book.findOneAndUpdate(
            { id: Number(req.params.id) },
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedBook) return res.status(404).json({ message: 'Livre non trouvé' });
        res.json(updatedBook);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE - Supprimer un livre par son id
router.delete('/:id', async (req, res) => {
    try {
        const deletedBook = await Book.findOneAndDelete({ id: Number(req.params.id) });
        if (!deletedBook) return res.status(404).json({ message: 'Livre non trouvé' });
        res.json({ message: 'Livre supprimé avec succès' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;