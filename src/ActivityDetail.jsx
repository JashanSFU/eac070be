import React from 'react';

const ActivityDetail = ({ call }) => {
  if (!call) return null;

  return (
    <div className="activity-detail">
      <h1 className='call-detail-header'>Call Detail</h1>
      <p><strong>ID:</strong> {call.id}</p>
      <p><strong>From:</strong> {call.from}</p>
      <p><strong>To:</strong> {call.to}</p>
      <p><strong>Via:</strong> {call.via}</p>
      <p><strong>Direction:</strong> {call.direction}</p>
      <p><strong>Duration:</strong> {call.duration} seconds</p>
      <p><strong>Call Type:</strong> {call.call_type}</p>
      <p><strong>Date:</strong> {new Date(call.created_at).toLocaleString()}</p>
      <p><strong>Status:</strong> {call.is_archived ? 'Archived' : 'Active'}</p>
    </div>
    //   <div class="modal" tabindex="-1" role="dialog">
    //   <div class="modal-dialog" role="document">
    //     <div class="modal-content">
    //       <div class="modal-header">
    //         <h5 class="modal-title">Call Detail</h5>
    //         <button type="button" class="close" data-dismiss="modal" aria-label="Close">
    //           <span aria-hidden="true">&times;</span>
    //         </button>
    //       </div>
    //       <div class="modal-body">
    //         <p><strong>ID:</strong> {call.id}</p>
    //         <p><strong>From:</strong> {call.from}</p>
    //         <p><strong>To:</strong> {call.to}</p>
    //         <p><strong>Via:</strong> {call.via}</p>
    //         <p><strong>Direction:</strong> {call.direction}</p>
    //         <p><strong>Duration:</strong> {call.duration} seconds</p>
    //         <p><strong>Call Type:</strong> {call.call_type}</p>
    //         <p><strong>Date:</strong> {new Date(call.created_at).toLocaleString()}</p>
    //         <p><strong>Status:</strong> {call.is_archived ? 'Archived' : 'Active'}</p>
    //       </div>
    //       <div class="modal-footer">
    //         <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default ActivityDetail;
