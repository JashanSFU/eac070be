import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ActivityDetail from './ActivityDetail.jsx';

const API_BASE_URL = 'https://aircall-backend.onrender.com';

const groupCallsByDate = (calls) => {
  const grouped = {};
  calls.forEach(call => {
    const date = new Date(call.created_at).toLocaleDateString();
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(call);
  });
  return grouped;
};

const ActivityFeed = ({
  calls,
  onArchive,
  onUnarchive,
  archiveAll,
  unarchiveAll,
  showArchived,
  onSelectCall,
  selectedCall }) => {
  const [groupedCalls, setGroupedCalls] = useState(groupCallsByDate(calls));
  
  useEffect(() => {
    console.log("changed calls");
    setGroupedCalls(groupCallsByDate(calls));
  }, [calls]);

  return (
    <div className="activity-feed">
      {showArchived ? (
        <>
          <button className="button-archive" onClick={unarchiveAll}>
            <i className="bi bi-archive"></i>
            Unarchive All Calls
          </button>
          {Object.keys(groupedCalls).map(date => (
            <div key={date}>
              {groupedCalls[date].some(call => call.is_archived) && (
                <strong><h3 className='activity-date'>{date}</h3></strong>
              )}
              {groupedCalls[date].filter(call => call.is_archived).map(call => (
                <div>
                  <div
                    key={call.id}
                    className={(selectedCall === call) ? "selected call-item" : "call-item"}
                    onClick={() => onSelectCall(call)}
                  > 
                    <div className='call-item-description'>
                      <p><strong>{call.from}</strong></p>
                      <p>tried to Call on {(call.direction === 'incoming') ? call.to : call.from}</p>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); onUnarchive(call.id); }}>Unarchive</button>
                  </div>
                  {selectedCall && call.id === selectedCall.id &&  <ActivityDetail className='activity-box' call={selectedCall} />}
                </div>
              ))}
            </div>
          ))}
        </>
      ) : (
        <>
          <button className="button-archive" onClick={archiveAll}>
            <i className="bi bi-archive"></i>
            Archive All Calls
          </button>
          {Object.keys(groupedCalls).map(date => (
            <div key={date}>
              {groupedCalls[date].some(call => !call.is_archived) && (
                <strong><h3 className='activity-date'>{date}</h3></strong>
              )}
              {groupedCalls[date].filter(call => !call.is_archived).map(call => (
                <div>
                  <div
                    key={call.id}
                    className={(selectedCall === call) ? "selected call-item" : "call-item"}
                    onClick={() => onSelectCall(call)}
                  > 
                    <div className='call-item-description'>
                      <p><strong>{call.from}</strong></p>
                      <p>tried to Call on {(call.direction === 'incoming') ? call.to : call.from}</p>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); onArchive(call.id); }}>archive</button>
                    </div>
                  {selectedCall && call.id === selectedCall.id &&  <ActivityDetail className='activity-box' call={selectedCall} />}
                </div>
              ))}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ActivityFeed;
