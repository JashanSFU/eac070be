import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const PopupWithDetail = ({ call }) => (
  <Popup trigger={<button>Trigger</button>} position="right center">
    {close => (
      <div className="activity-detail">
        <h1 className='call-detail-header'>Call Detail</h1>
        <p></p>
        <p>Number: {call.number}</p>
        <p>User: {call.user}</p>
        <p>Date: {new Date(call.date).toLocaleString()}</p>
        <p>Status: {call.archived ? 'Archived' : 'Active'}</p>
        <button onClick={close}>Close</button>
      </div>
    )}
  </Popup>
);

export default PopupWithDetail;
