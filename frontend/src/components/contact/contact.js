import React, { useState } from 'react';
import './contact.css'

function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:8000/send-email/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            if (response.ok) {
                setSubmitted(true);
            } else {
                console.error('Failed to send email');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    if (submitted) {
        return (
            <div className="thank-you">
                <h2>Thank you for reaching out!</h2>
                <p>I have received your message and will get back to you shortly.</p>
                <button onClick={() => setSubmitted(false)}>Submit Another Message</button>
            </div>
        );
    }

    return (
        <div className="contact-page">
            <h1>Contact me</h1>
            <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your Email"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="message">Message:</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Your Message"
                        rows="5"
                        required
                    />
                </div>
                <button type="submit">Send Message</button>
            </form>
        </div>
    );
}

export default ContactPage;
