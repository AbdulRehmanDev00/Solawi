import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (to, subject, text) => {
    const msg = {
        to,
        from: process.env.EMAIL_FROM, // Your verified sender email
        subject,
        text,
    };

    try {
        await sgMail.send(msg);
        console.log('Email sent successfully to:', to);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

export { sendEmail };
