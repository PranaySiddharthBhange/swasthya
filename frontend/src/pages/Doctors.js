import React from 'react';
import doctorsData from './DoctorsData'; // Import the doctor data
import './Doctors.css'; // Import CSS for styling


function Doctors() {
  return (
    <div className="doctors">
      <h1>Our Doctors</h1>
      <div className="doctor-list">
        {doctorsData.map((doctor) => (
          <div className="doctor-card" key={doctor.id}>
            <img
              src={process.env.PUBLIC_URL + `/images/${doctor.image}`}
              alt={doctor.name}
            />
            <h2>{doctor.name}</h2>
            <p>{doctor.specialization}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Doctors;
