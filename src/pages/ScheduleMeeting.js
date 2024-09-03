import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { getFirestore, collection, addDoc, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { useLocation } from 'react-router-dom';
import './ScheduleMeeting.css';
import emailjs from 'emailjs-com';

const ScheduleMeeting = () => {
    const [user] = useAuthState(auth);
    const location = useLocation();
    const { childData } = location.state; // Access childData passed from ParentPortal
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [message, setMessage] = useState('');
    const [availableTimes, setAvailableTimes] = useState([]);
    const db = getFirestore();

  // Function to generate available time slots
  const generateTimeSlots = () => {
    const slots = [];
    const startHour = 18; // 6 PM
    const endHour = 21; // 9 PM
    for (let hour = startHour; hour < endHour; hour++) {
      slots.push(`${hour}:00`);
      slots.push(`${hour}:30`);
    }
    return slots;
  };

  useEffect(() => {
    const slots = generateTimeSlots();
    setAvailableTimes(slots);
  }, []);

  const isValidDay = (dateString) => {
    const date = new Date(dateString + 'T00:00:00'); // Adding a time to ensure proper parsing
    const day = date.getUTCDay(); // Using getUTCDay to ensure correct day in UTC
    return day === 2 || day === 4; // 2 is Tuesday, 4 is Thursday
  };
  

  const handleSchedule = async (e) => {
    e.preventDefault();
    if (!isValidDay(date)) {
      setMessage('Please select a Tuesday or Thursday.');
      return;
    }
  
    // Check if the time slot is already blocked
    const q = query(
      collection(db, 'meetings'),
      where('date', '==', date),
      where('time', '==', time),
      where('blockUntil', '>', Timestamp.now())
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      setMessage('This time slot is currently unavailable. Please choose another time.');
      return;
    }
  
    try {
      // Block the selected time slot for 24 hours
      const blockTime = new Date();
      blockTime.setHours(time.split(':')[0]);
      blockTime.setMinutes(time.split(':')[1]);
  
      await addDoc(collection(db, 'meetings'), {
        user: user.email,
        studentName: childData.name, // Use the student's name from childData
        date,
        time,
        status: 'pending', // Status to indicate the meeting is pending confirmation
        blockUntil: Timestamp.fromDate(new Date(blockTime.getTime() + 24 * 60 * 60 * 1000)), // Block for 24 hours
      });
  
      setMessage('Meeting requested. Please wait for confirmation.');
      sendEmailNotification(user.email, childData.name, date, time); // Pass studentName
    } catch (error) {
      setMessage('Error scheduling the meeting. Please try again.');
    }
  };

  // Function to send email notification to the teacher
  const sendEmailNotification = (email, studentName, date, time) => {
    const templateParams = {
      to_name: 'Mr. Jeff', // Replace with your name
      from_name: email, // Parent's email
      student_name: studentName, // Student's name
      date: date,
      time: time,
    };
  
    emailjs
      .send('service_5t4ajmi', 'template_ldmeboi', templateParams, 'ZY0Q1CJN6eNAdFWoY')
      .then(
        (response) => {
          console.log('Email successfully sent!', response.status, response.text);
        },
        (error) => {
          console.error('Failed to send email.', error);
        }
      );
  };

  return (
    <div className="schedule-container">
      <h2>Schedule a Meeting for {childData.name}</h2>
      <form onSubmit={handleSchedule}>
        <div className="form-group">
          <label>Date:</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Time:</label>
          <select value={time} onChange={(e) => setTime(e.target.value)} required>
            <option value="">Select a time</option>
            {availableTimes.map((slot, index) => (
              <option key={index} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="cta-button">Request Meeting</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ScheduleMeeting;
