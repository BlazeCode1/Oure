const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://admin:12341234@webproject.jkt7ebw.mongodb.net/?retryWrites=true&w=majority&appName=WEBPROJECT"; // Replace with your MongoDB connection string
let client;

const connectToDb = async () => {
    if (!client) {
        client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log('connected');
    }
    
    return client.db('cinema').collection('films');
};

// Search films by title, genre, type, and rating
exports.searchFilms = async (req, res) => {
    try {
        const { title, genre, type, minRating, maxRating } = req.query;
        const query = {};

        if (title) {
            query.title = new RegExp(title, 'i'); // Case insensitive search
        }

        if (genre) {
            query.genre = genre;
        }

        if (type) {
            query.type = type;
        }

        if (minRating || maxRating) {
            query.rating = {};
            if (minRating) query.rating.$gte = parseFloat(minRating);
            if (maxRating) query.rating.$lte = parseFloat(maxRating);
        }

        const collection = await connectToDb();
        const films = await collection.find(query).toArray();
        res.json(films);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
