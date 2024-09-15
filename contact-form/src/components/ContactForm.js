import React, { useState } from 'react';
import './ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectDetails: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Email sent successfully!');
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage('Failed to send email. Try again later.');
    }

    setFormData({
      name: '',
      email: '',
      projectDetails: ''
    });
  };

  return (
    <div className="contact-form-container">
      <h2>Contact Me</h2>
      <p>
        Let me know if you want to talk about a potential collaboration. I'm available for freelance work.
      </p>
      <form onSubmit={handleSubmit} className="contact-form">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="What's your name?"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your email"
          required
        />
        <textarea
          name="projectDetails"
          value={formData.projectDetails}
          onChange={handleChange}
          placeholder="Tell me about your project"
          required
        ></textarea>
        <button type="submit">Get a Quote</button>
      </form>
      {message && <p>{message}</p>}
      <footer>
        <h3>Let’s be Friends</h3>
        <div className="social-icons">
          <a href="#"><i className="fab fa-instagram"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
        </div>
      </footer>
    </div>
  );
};

export default ContactForm;