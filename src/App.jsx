import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Header from './Header.jsx';
import ActivityFeed from './ActivityFeed.jsx';
import './css/styles.css';
import NavbarComponent from './NavBar.jsx';
import Popup from './Popup.jsx';
import ActivityDetail from './ActivityDetail.jsx'

const initialCalls = [
  { id: 1, number: '+33 645135391', user: 'Xavier', date: '2017-07-27T19:58:00', archived: false },
  { id: 2, number: '+33 645135391', user: 'Xavier', date: '2017-07-21T12:34:00', archived: false },
  { id: 3, number: 'Arthur Andre', user: 'Xavier', date: '2017-07-21T08:30:00', archived: false },
  { id: 4, number: 'Arthur Andre', user: 'PrivateSportShop', date: '2017-07-05T19:03:00', archived: false },
  { id: 5, number: '+33 176440477', user: 'Xavier', date: '2017-06-23T17:57:00', archived: false }
];

const App = () => {
  const [calls, setCalls] = useState(initialCalls);
  const [selectedCall, setSelectedCall] = useState(null);
  const [showArchived, setShowArchived] = useState(false);

  const handleArchive = (id) => {
    setCalls(calls.map(call => call.id === id ? { ...call, archived: true } : call));
    setSelectedCall(null);
  };

  const handleUnarchive = (id) => {
    setCalls(calls.map(call => call.id === id ? { ...call, archived: false } : call));
    setSelectedCall(null);
  };

  const archiveAll = () => {
    setCalls(calls.map(call => ({ ...call, archived: true })));
    setSelectedCall(null);
  };

  const unarchiveAll = () => {
    setCalls(calls.map(call => ({ ...call, archived: false })));
    setSelectedCall(null);
  };

  const handleCallSelect = (call) => {
    if (selectedCall !== null && selectedCall === call) {
      setSelectedCall(null);
    } else {
      setSelectedCall(call);
    }
  };

  useEffect(() => {
    setSelectedCall(null);
  }, [showArchived]);

  return (
    <div className='container'>
      <Header />
      <NavbarComponent setShowArchived={setShowArchived} />
      <div className="container-view">
        <ActivityFeed
          calls={calls}
          onArchive={handleArchive}
          onUnarchive={handleUnarchive}
          archiveAll={archiveAll}
          unarchiveAll={unarchiveAll}
          showArchived={showArchived}
          onSelectCall={handleCallSelect}
          selectedCall={selectedCall}
        />
        {selectedCall && (
          <ActivityDetail call={selectedCall} />
        )}
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));

export default App;

