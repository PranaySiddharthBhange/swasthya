import React, { useState } from 'react';

function AppointmentForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    appointmentDate: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here (e.g., send data to backend)
    console.log(formData);
    // Reset form fields after submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      appointmentDate: '',
      message: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h3>Make an Appointment</h3>
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        required
        style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={handleChange}
        required
        style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
      />
      <input
        type="tel"
        name="phone"
        placeholder="Your Phone"
        value={formData.phone}
        onChange={handleChange}
        required
        style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
      />
      <input
        type="date"
        name="appointmentDate"
        value={formData.appointmentDate}
        onChange={handleChange}
        required
        style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
      />
      <textarea
        name="message"
        placeholder="Message (Optional)"
        value={formData.message}
        onChange={handleChange}
        style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
      ></textarea>
      <button type="submit" style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>Submit</button>
    </form>
  );
}

function HomePage() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
      <header style={{ marginBottom: '40px' }}>
        <h1>Welcome to Our Hospital</h1>
        <p style={{ fontSize: '18px', color: '#555' }}>Providing compassionate care for all</p>
      </header>
      <main>
        <section style={{ marginBottom: '40px' }}>
          <h2>Our Services</h2>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
            <div style={{ margin: '0 10px', marginBottom: '20px', maxWidth: '300px' }}>
              <img src="https://picsum.photos/200" alt="Emergency Services" style={{ width: '100%', borderRadius: '10px' }} />
              <h3>Emergency Care</h3>
              <p>Available 24/7 for immediate medical assistance.</p>
            </div>
            <div style={{ margin: '0 10px', marginBottom: '20px', maxWidth: '300px' }}>
              <img src="https://picsum.photos/200" alt="Consultation" style={{ width: '100%', borderRadius: '10px' }} />
              <h3>Consultation</h3>
              <p>Expert consultation with our healthcare professionals.</p>
            </div>
            <div style={{ margin: '0 10px', marginBottom: '20px', maxWidth: '300px' }}>
              <img src="https://picsum.photos/200" alt="Surgical Services" style={{ width: '100%', borderRadius: '10px' }} />
              <h3>Surgical Services</h3>
              <p>State-of-the-art surgical facilities and experienced surgeons.</p>
            </div>
          </div>
        </section>
        <section style={{ marginBottom: '40px' }}>
          <h2>About Us</h2>
          <p style={{ fontSize: '16px', maxWidth: '600px', margin: '0 auto' }}>We are dedicated to providing high-quality medical care to our community. Learn more about our mission, vision, and values.</p>
          <button style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '20px' }}>Learn More</button>
        </section>
        <section style={{ marginBottom: '40px' }}>
          <h2>Contact Us</h2>
          <p style={{ fontSize: '16px', maxWidth: '600px', margin: '0 auto' }}>Have questions or need assistance? Reach out to us.</p>
          <button style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '20px' }}>Contact</button>
        </section>
        <section>
          <AppointmentForm />
        </section>
      </main>
      <footer style={{ marginTop: '40px', borderTop: '1px solid #ccc', paddingTop: '20px' }}>
        <p style={{ fontSize: '14px', color: '#777' }}>&copy; 2024 Our Hospital. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;
