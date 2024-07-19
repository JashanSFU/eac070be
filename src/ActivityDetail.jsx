import React from 'react';

const ActivityDetail = ({ call }) => {
  if (!call) return null;

  return (
    <div className="activity-detail">
      <h1 className='call-detail-header'>Call Detail</h1>
      <p></p>
      <p>Number: {call.number}</p>
      <p>User: {call.user}</p>
      <p>Date: {new Date(call.date).toLocaleString()}</p>
      <p>Status: {call.archived ? 'Archived' : 'Active'}</p>
    </div>
  );
};

export default ActivityDetail;
