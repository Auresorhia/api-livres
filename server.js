const express = require('express');
const mongoose = require('mongoose');
const booksRoutes = require('./routes/books');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/livresdb';

app.use(express.json());

mongoose.connect(MONGO_URI)
    .then(() => console.log('Connecté à MongoDB'))
    .catch((err) => console.error('Erreur de connexion MongoDB :', err));

app.get('/', (req, res) => {
    res.json({ message: 'Bienvenue sur l’API Livres' });
});

app.use('/api/books', booksRoutes);

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});