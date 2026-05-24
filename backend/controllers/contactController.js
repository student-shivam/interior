const nodemailer = require('nodemailer');
const Contact = require('../models/Contact');

const sendContactEmail = async ({ name, email, phone, message, city, service }) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const serviceText = service ? `Service: ${service}\n` : '';
  const cityText = city ? `City / Area: ${city}\n` : '';
  const serviceHtml = service ? `<p><strong>Service:</strong> ${service}</p>` : '';
  const cityHtml = city ? `<p><strong>City / Area:</strong> ${city}</p>` : '';

  const mailOptions = {
    from: `Interior Contact <${process.env.SMTP_EMAIL}>`,
    to: process.env.CONTACT_RECEIVER || process.env.SMTP_EMAIL,
    subject: 'New Interior Design Website Inquiry',
    text: `You have received a new inquiry from your website:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\n${cityText}${serviceText}Message: ${message}\n\nPlease follow up with the prospective client as soon as possible.`,
    html: `
      <h2>New Interior Design Inquiry</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      ${cityHtml}
      ${serviceHtml}
      <p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>
      <p>Received at: ${new Date().toLocaleString()}</p>
    `,
  };

  return transporter.sendMail(mailOptions);
};

exports.submitContact = async (req, res) => {
  const { name, email, phone, message, city, service } = req.body || {};

  if (!name || !email || !phone || !message) {
    return res.status(400).json({
      success: false,
      error: 'Please provide name, email, phone, and message.',
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      error: 'Please provide a valid email address.',
    });
  }

  try {
    const contact = new Contact({ name, email, phone, message });
    const savedContact = await contact.save();

    const emailResult = await sendContactEmail({ name, email, phone, message, city, service });

    return res.status(201).json({
      success: true,
      message: 'Inquiry saved successfully and email notification sent.',
      data: savedContact,
      email: {
        accepted: emailResult.accepted,
        rejected: emailResult.rejected,
        messageId: emailResult.messageId,
      },
    });
  } catch (error) {
    console.error('Contact submit error:', error);

    return res.status(500).json({
      success: false,
      error: 'Unable to process the contact inquiry. Please try again later.',
    });
  }
};
