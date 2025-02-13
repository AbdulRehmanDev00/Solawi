import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import flash from 'connect-flash';
import session from 'express-session';
import { MailService } from '@sendgrid/mail'; // Import SendGrid

// Create app instance
const app = express();

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), 'static'))); // Serve static files from the "static" directory
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.use(flash());

// Initialize SendGrid
const sgMail = new MailService();
sgMail.setApiKey(process.env.SENDGRID_API_KEY); // Set your SendGrid API key in environment variables

// Routes
app.get('/', (req, res) => {
    res.render('index', { messages: req.flash('info') });
});

app.post('/contact', async (req, res) => {
    const { name, email, topic, message } = req.body;

    // Create the email content
    const emailContent = `
        Name: ${name}
        Email: ${email}
        Topic: ${topic}
        Message:
        ${message}
    `;

    // Construct the SendGrid email message
    const msg = {
        to: 'botanicalstudiolab@gmail.com', // Recipient's email address
        from: 'fresh@katari.farm', // Sender's email address
        subject: `Contact Form Submission: ${topic}`,
        text: emailContent,
    };

    try {
        // Send the email
        await sgMail.send(msg);
        console.log('Email sent successfully');
        req.flash('info', 'Message sent successfully.');
    } catch (error) {
        console.error('Failed to send message. Error:', error);
        req.flash('info', `Failed to send message. Error: ${error.message}`);
    }

    res.redirect('/');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});