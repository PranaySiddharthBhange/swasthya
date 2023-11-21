// doctorsData.js
import React from 'react';
import './Gallery.css'; // Import your CSS file

const hospitals = [
    {
        id: 1,
        name: 'Hospital Name 1',
        location: 'City 1',
        contact: 'Contact Information 1',
        image: 'hospital1.jpg', // Replace with the actual image URL or path
    },
    {
        id: 2,
        name: 'Hospital Name 2',
        location: 'City 2',
        contact: 'Contact Information 2',
        image: 'hospital2.jpg', // Replace with the actual image URL or path
    },
    // Add more hospital objects for additional cards
];

const Gallery = () => {
    return (
        <div className="gallery">
            {hospitals.map((hospital) => (
                <div className="gallery-card" key={hospital.id}>
                    <img src={hospital.image} alt={hospital.name} />
                    <h2>{hospital.name}</h2>
                    <p>Location: {hospital.location}</p>
                    <p>Contact: {hospital.contact}</p>
                </div>
            ))}
        </div>
    );
};

export default Gallery;
