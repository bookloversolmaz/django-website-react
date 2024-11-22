import React, { useState } from 'react';
import axios from 'axios';
import './contact.css';

// State initialisation: formData holds the data entered by the user in the below fields. setFormData updates the fields with the user's input
function ContactPage() {
    const [formData, setFormData] = useState({
        name: '', // The value in the useState here is the initial value. It is blank here as the user has not yet submitted their info.
        email: '',
        subject: '',
        message: '',
    });

    // Boolean state, tracks whether the form was submitted or not. Initially set to false, meaning that the form has not been submitted
    const [submitted, setSubmitted] = useState(false);
    
    // Triggered when user types into field. The e.target refers to the input field that was changed.
    // name is the name of the form field (e.g., "name", "email", "subject", etc.), and value is the new value entered by the user.
    // The setFormData updates the formData state to reflect the new value of the field that was changed. This is done by spreading 
    // the existing formData and updating the specific field based on its name.
    const handleChange = (event) => { // event represents all of the actions taken by the user
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Called when user clicks submit
    // e.preventDefault() is used to prevent the default form submission behavior, so the page doesn’t reload.
    // Sends to bakcned via axios
    // formData is the data that the user has entered in the form, and it’s sent as the body of the POST request
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/contact/', formData, {
                headers: {
                    'object': 'formobject',
                },
            });
            
            // Waits for response from axios
            // If the response status is 201 (created, meaning the email was successfully sent and saved), the form fields are reset using setFormData (all fields are cleared)
            // After resetting the form, setSubmitted(true) sets the submitted state to true, which will display the "Thank you" message.
            // If the request fails, it logs the error to the console.
            if (response.status === 201) {
                // Reset the form immediately after the successful submission
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: '',
                });
                setSubmitted(true);
            } else {
                console.error('Failed to send message:', response);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // handleReset is called when the user clicks the "Submit Another Message" button after the form is successfully submitted.
    // This function resets the form data back to its initial empty values and also sets submitted back to false so the form will be shown again (not the "Thank you" message).
    const handleReset = () => {
        // Reset form data and submitted state if they want to submit another message
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: '',
        });
        setSubmitted(false);
    };

    // The button is hooked to handleReset, which clears the form and allows the user to send a new message.
    if (submitted) {
        return (
            <div className="thank-you">
                <h2>Thank you for reaching out!</h2>
                <p>I have received your message and will get back to you shortly.</p>
                <button onClick={handleReset}>Submit Another Message</button>
            </div>
        );
    }

    // If submitted is false, this renders the contact form.
    // value={formData.name} binds the form fields to the corresponding values in formData.
    // onChange={handleChange} ensures that when a user types in the field, formData gets updated.
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
                    <label htmlFor="subject">Subject:</label>
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
// Overall:
// The forms is initiliased with blank fields
// The user enters their data into the form fields.
// When the form is submitted, the setFormData is updated with the values from the formData
// The data is sent to the backend (Django) via axios.
// If the form is successfully submitted (i.e., the response status is 201), the form is cleared, and the "Thank you" message is displayed.
// The user can click "Submit Another Message" to reset the form to its initial empty state, and they can send another message.