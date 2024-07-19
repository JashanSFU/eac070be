import React from 'react';

const groupCallsByDate = (calls) => {
  const grouped = {};
  calls.forEach(call => {
    const date = new Date(call.date).toLocaleDateString();
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(call);
  });
  return grouped;
};

const ActivityFeed = ({ calls, onArchive, onUnarchive, archiveAll, unarchiveAll, showArchived, onSelectCall, selectedCall }) => {
  // Group calls by date
  const groupedCalls = groupCallsByDate(calls);

  return (
    <div className="activity-feed">
      {showArchived ? (
        <>
        <button class="button-archive" onClick={unarchiveAll}>
          <i class="bi bi-archive"></i>
          Unarchive All Calls
        </button>
          {/* <button onClick={unarchiveAll}>Unarchive All</button> */}
          {Object.keys(groupedCalls).map(date => (
            <div key={date}>
              <h3 className='activity-date'>{(groupedCalls[date].filter(call => call.archived).length != 0) ? date : ""}</h3>
              {groupedCalls[date].filter(call => call.archived).map(call => (
                <div key={call.id} className={(selectedCall === call) ? "selected call-item" : "call-item"} onClick={() => onSelectCall(call)}>
                  <div className='call-item-description'>
                    <p>{call.number}</p>
                    <p>Tried to call on {call.user}</p>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); onUnarchive(call.id); }}>Unarchive</button>
                </div>
              ))}
            </div>
          ))}
        </>
      ) : (
        <>
          <button class="button-archive" onClick={archiveAll}>
            <i class="bi bi-archive-fill"></i>
            Archive All Calls
          </button>
          {/* <button onClick={archiveAll}>Archive All</button> */}
          {Object.keys(groupedCalls).map(date => (
            <div key={date}>
              <h3 className='activity-date'>{(groupedCalls[date].filter(call => !call.archived) != 0) ? date : ""}</h3>
              {groupedCalls[date].filter(call => !call.archived).map(call => (
                <div key={call.id} className={(selectedCall === call) ? "selected call-item" : "call-item"} onClick={() => onSelectCall(call)}>
                  <div className='call-item-description'>
                    <p>{call.number}</p>
                    <p>Tried to call on {call.user}</p>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); onArchive(call.id); }}>Archive</button>
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
