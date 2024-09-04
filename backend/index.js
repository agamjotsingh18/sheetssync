const express = require('express');
const { syncData } = require('./controllers/syncController');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use('/sync', async (req, res) => {
  try {
    await syncData();
    res.send('Synchronization complete');
  } catch (error) {
    console.error('Synchronization failed:', error);
    res.status(500).send('Synchronization failed');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});