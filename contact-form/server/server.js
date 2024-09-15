const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'email@gmail.com',
    pass: 'email-password'
  }
});

app.post('/send', (req, res) => {
  const { name, email, projectDetails } = req.body;

  const mailOptions = {
    from: email,
    to: 'email@gmail.com',
    subject: `New Message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nProject Details: ${projectDetails}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ error: 'Failed to send email' });
    }
    res.status(200).json({ message: 'Email sent successfully' });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});