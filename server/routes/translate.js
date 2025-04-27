const express = require("express");
const { Translate } = require('@google-cloud/translate').v2;
const path = require('path');

const router = express.Router();

const translator = new Translate({
    projectId: 'csce331project3-458102',       
    keyFilename: path.join(__dirname, '../credentials/translate-key.json'),  
  });


  router.post('/translate', async (req, res) => {
    const { text, target } = req.body;

    try {
        const [translation] = await translator.translate(text, target);
        res.json({ translatedText: translation });
    } catch (error) {
        console.error('Translation error:', error);
        res.status(500).json({ error: 'Failed to translate text' });
    }
});

module.exports = router;