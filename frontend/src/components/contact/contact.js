import React, { useState } from 'react';
import axios from 'axios';
import './contact.css';

function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',   // Add subject here
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
            const response = await axios.post('http://127.0.0.1:8000/contact/', formData, {
                headers: {
                    'object': 'formobject',
                },
            });

            if (response.status === 201) {
                setSubmitted(true);
            } else {
                console.error('Failed to send message:', response);
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

    const handleReset = () => {
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: '',
        });
        setSubmitted(false); // Reset the submitted state if they want to send another message
    };

    if (submitted) {
        return (
            <div className="thank-you">
                <h2>Thank you for reaching out!</h2>
                <p>I have received your message and will get back to you shortly.</p>
                <button onClick={handleReset}>Submit Another Message</button>
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
                    <label htmlFor="subject">Subject:</label>   {/* Added Subject Field */}
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Subject"
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

// TODO: clear previous message from form on frontend, so when clicks send another message, they receive a blank form
// TODO: develop functionality to delete sent emails in django backend http://127.0.0.1:8000/contact/
