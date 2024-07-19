import React from 'react';

const ActivityDetail = ({ call }) => {
  if (!call) return null;

  return (
    <div className="activity-detail">
      <h1 className='call-detail-header'>Call Detail</h1>
      <p><strong>ID:{call.id}</strong> </p>
      <p><strong>From:</strong> {call.from}</p>
      <p><strong>To:</strong> {call.to}</p>
      <p><strong>Via:</strong> {call.via}</p>
      <p><strong>Direction:</strong> {call.direction}</p>
      <p><strong>Duration:</strong> {call.duration} seconds</p>
      <p><strong>Call Type:</strong> {call.call_type}</p>
      <p><strong>Date:</strong> {new Date(call.created_at).toLocaleString()}</p>
      <p><strong>Status:</strong> {call.is_archived ? 'Archived' : 'Active'}</p>
    </div>
  );
};

export default ActivityDetail;
