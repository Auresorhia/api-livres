const express = require('express');
const mongoose = require('mongoose');
const Book = require('./models/Book');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/livresdb';

// Middleware pour lire le JSON dans le corps des requêtes
app.use(express.json());

// Connexion à MongoDB
mongoose.connect(MONGO_URI)
    .then(() => console.log('Connecté à MongoDB'))
    .catch((err) => console.error('Erreur de connexion MongoDB :', err));

// Route de test
app.get('/', (req, res) => {
    res.json({ message: 'Bienvenue sur l’API Livres' });
});

// GET - Récupérer tous les livres
app.get('/api/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET - Récupérer un livre par son ID
app.get('/api/books/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: 'Livre non trouvé' });
        res.json(book);
    } catch (err) {
        res.status(400).json({ error: 'ID invalide' });
    }
});

// POST - Ajouter un nouveau livre
app.post('/api/books', async (req, res) => {
    try {
        const newBook = new Book(req.body);
        const savedBook = await newBook.save();
        res.status(201).json(savedBook);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// PUT - Modifier un livre par son ID
app.put('/api/books/:id', async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedBook) return res.status(404).json({ message: 'Livre non trouvé' });
        res.json(updatedBook);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE - Supprimer un livre par son ID
app.delete('/api/books/:id', async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) return res.status(404).json({ message: 'Livre non trouvé' });
        res.json({ message: 'Livre supprimé avec succès' });
    } catch (err) {
        res.status(400).json({ error: 'ID invalide' });
    }
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});