const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = [
  'https://champagnecode3d.github.io',
  'https://jordantchampagne-sudo.github.io',
  'http://localhost:3000',
  'http://127.0.0.1:5500'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error('Not allowed by CORS'));
  }
}));
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ ok: true, message: 'Booking service is running' });
});

app.post('/api/booking', async (req, res) => {
  const { name, email, tickets, ticketNumber, submittedAt } = req.body || {};

  if (!name || !email || !tickets || !ticketNumber) {
    return res.status(400).json({ message: 'Missing required booking fields.' });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.EMAIL_TO || process.env.SMTP_USER,
      subject: `Adventure Park Booking: ${ticketNumber}`,
      text: `New booking received.\nName: ${name}\nEmail: ${email}\nTickets: ${tickets}\nTicket Number: ${ticketNumber}\nSubmitted At: ${submittedAt || 'N/A'}`
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: email,
      subject: 'Adventure Park Booking Confirmation',
      text: `Hello ${name},\n\nYour Adventure Park booking has been received.\nTicket Number: ${ticketNumber}\nTickets: ${tickets}\n\nThank you for booking with us.`
    });

    return res.status(200).json({ message: 'Booking submitted successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to send booking email.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
