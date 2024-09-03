import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { getFirestore, doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import './ParentPortal.css';

function ParentPortal() {
  const [childrenData, setChildrenData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChildrenData = async () => {
      const db = getFirestore();
      const user = auth.currentUser;

      if (user) {
        // Fetch parent data to get childIds
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const { childIds } = userDocSnap.data(); // Assume childIds is an array

          // Fetch data for all children
          const childrenQuery = query(collection(db, 'children'), where('__name__', 'in', childIds));
          const childrenSnapshot = await getDocs(childrenQuery);
          const childrenDataArray = childrenSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

          setChildrenData(childrenDataArray);
        } else {
          console.log('No such user document!');
        }
      }

      setLoading(false);
    };

    fetchChildrenData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="portal-container">
      <h2>Welcome, Parent</h2>

      {/* Display Children Data */}
      {childrenData.length > 0 ? (
        childrenData.map((childData, index) => (
          <div key={index} className="child-data">
            <h3>Student Name: {childData.name}</h3>
            <p>Grade: {childData.grade}</p>
            <p>Scores: {childData.score}</p>
            <p>Report: {childData.report}</p>

            {/* Schedule a Meeting Section */}
            <div className="meeting-section">
              <h3>Schedule a Zoom/Video Meeting for {childData.name}</h3>
              <Link 
                to="/schedule-meeting" state={{ childData }}  // Pass childData as state to the ScheduleMeeting component
                className="cta-button"
              >
                Schedule a Meeting
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p>No data available for your students.</p>
      )}
    </div>
  );
}

export default ParentPortal;

