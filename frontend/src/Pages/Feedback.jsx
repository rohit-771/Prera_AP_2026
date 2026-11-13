
import { useState } from 'react';
import '../CSS/Feedback.css';

export default function Feedback() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    rating: 5,
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse('');

    try {
      const res = await fetch('http://localhost:5001/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...form,
          rating: Number(form.rating)
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setResponse('Thank you! Your feedback has been submitted successfully.');

      setForm({
        name: '',
        email: '',
        rating: 5,
        message: ''
      });

    } catch (error) {
      setResponse(error.message || 'Unable to submit feedback. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="feedback-page">
      <div className="feedback-container">

        <div className="feedback-heading">
          <p>YOUR VOICE MATTERS</p>
          <h1>SHARE YOUR <span>FEEDBACK</span></h1>
          <div className="feedback-line"></div>
          <p className="feedback-description">
            Your thoughts help us improve and create better experiences.
            Let us know what you think about PRERA.
          </p>
        </div>

        <form className="feedback-form" onSubmit={handleSubmit}>

          <label>FULL NAME</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={form.name}
            onChange={handleChange}
            minLength="2"
            maxLength="100"
            required
          />

          <label>EMAIL ADDRESS</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email address"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label>YOUR RATING</label>
          <select
            name="rating"
            value={form.rating}
            onChange={handleChange}
            required
          >
            <option value="5">★★★★★ - Excellent</option>
            <option value="4">★★★★ - Very Good</option>
            <option value="3">★★★ - Good</option>
            <option value="2">★★ - Average</option>
            <option value="1">★ - Needs Improvement</option>
          </select>

          <label>YOUR MESSAGE</label>
          <textarea
            name="message"
            placeholder="Share your experience with us..."
            value={form.message}
            onChange={handleChange}
            minLength="5"
            maxLength="2000"
            rows="5"
            required
          />

          {response && (
            <p className="feedback-response">{response}</p>
          )}

          <button type="submit" disabled={loading}>
            {loading ? 'SUBMITTING...' : 'SUBMIT FEEDBACK →'}
          </button>

        </form>
      </div>
    </section>
  );
}

