
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.static('public')); 


app.get('/api/recipes', async (req, res) => {
  try {
    const { ingredients } = req.query;
    const url = `https://api.spoonacular.com/recipes/complexSearch?query=${ingredients}&number=12&addRecipeInformation=true&apiKey=${process.env.SPOON_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
