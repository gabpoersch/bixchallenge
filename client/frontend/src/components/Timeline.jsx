import React, { useState, useEffect } from 'react';
import '../styles/Timeline.css';

const Timeline = ({ employeeId }) => {
  const [timelines, setTimelines] = useState([]);

  const access = localStorage.getItem('access')

  useEffect(() => {
    const fetchTimelines = async () => {
      let url = 'http://127.0.0.1:8000/timeline/';
      if (employeeId) {
        url += `${employeeId}/`;
      }

      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access}`
        }
      });
      const data = await response.json();
      setTimelines(Array.isArray(data) ? data : [data]);
    };

    fetchTimelines();
  }, [employeeId]);

  const formatDate = (dateString) => {
    if (!dateString) return 'Present';
    const date = new Date(dateString + 'T00:00:00');
    date.setTime(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
    return date.toLocaleDateString();
  };

  return (
    <div className="main-timeline-container">
      {timelines.map((timeline) => (
        <div key={timeline.id} className="timeline-entry-container">
          <div className="timeline-entry">
            <h2>{timeline.name}</h2>
            <p>Start Date: {formatDate(timeline.start_date)}</p>
            <div className="vacations">
              {timeline.vacations.map((vacation) => (
                <div key={vacation.id} className="vacation-entry">
                  <p>Vacation Start: {formatDate(vacation.vacation_start_date)}</p>
                  <p>Vacation End: {formatDate(vacation.vacation_end_date)}</p>
                </div>
              ))}
            </div>
            <p>End Date: {formatDate(timeline.end_date)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
