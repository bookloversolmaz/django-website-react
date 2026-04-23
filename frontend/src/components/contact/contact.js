import React, { useState } from 'react';
import AxiosInstance from '../../axiosinstance';
import './contact.css';

function getCSRFToken() {
  const csrfCookie = document.cookie.match(/csrftoken=([\w-]+)/);
  return csrfCookie ? csrfCookie[1] : '';
}

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await AxiosInstance.post('/contact/', formData, {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCSRFToken(),
        },
      });

      if (response.status === 201) {
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
        setSubmitted(true);
      } else {
        console.error('Failed to send message:', response.data);
      }
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <main className="contact-wrapper">
        <section className="contact-hero">
          <h1 className="page-heading">Contact</h1>
        </section>

        <div className="thank-you glass-card">
          <h2>Thank you for getting in touch</h2>
          <p>I’ve received your message and will reply as soon as I can.</p>
          <button onClick={handleReset}>Send another message</button>
        </div>
      </main>
    );
  }

  return (
    <main className="contact-wrapper page-shell">
    <section className="contact-hero page-hero">
        <h1 className="page-heading">Contact</h1>
        <p className="contact-intro page-intro">
        Whether you’d like to talk about software, collaboration, or a role, feel free to send me a message.
        </p>
    </section>

      <div className="contact-page glass-card">
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject</label>
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
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message"
              rows="6"
              required
            />
          </div>

          <button type="submit">Send message</button>
        </form>
      </div>
    </main>
  );
};

export default ContactPage;