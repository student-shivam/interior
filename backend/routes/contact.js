const express = require('express');
const router = express.Router();
const { submitContact } = require('../controllers/contactController');

// GET /api/contact - useful health check / browser test
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Contact endpoint is live. Use POST /api/contact to submit the form.',
  });
});

// POST /api/contact
router.post('/', submitContact);

module.exports = router;
