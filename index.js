import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import flash from 'connect-flash';
import session from 'express-session';

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

// Routes
app.get('/', (req, res) => {
    res.render('index', { messages: req.flash('info') });
});

app.post('/contact', (req, res) => {
    const { name, email, topic, message } = req.body;
    // Process the form data (e.g., save to database, send email, etc.)
    console.log(`Name: ${name}, Email: ${email}, Topic: ${topic}, Message: ${message}`);

    // Flash a message
    req.flash('info', 'Your message has been sent successfully!');
    res.redirect('/');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
