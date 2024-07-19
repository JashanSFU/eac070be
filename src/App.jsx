import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Header from './Header.jsx';
import ActivityFeed from './ActivityFeed.jsx';
import Popup from './Popup.jsx';
import NavbarComponent from './NavBar.jsx';
import axios from 'axios';
import './css/styles.css';
import ActivityDetail from './ActivityDetail.jsx';

const API_BASE_URL = 'https://aircall-backend.onrender.com';

const App = () => {
  const [calls, setCalls] = useState([]);
  const [selectedCall, setSelectedCall] = useState(null);
  const [showArchived, setShowArchived] = useState(false);

  useEffect(() => {
    // Fetch calls again if showArchived changes
    axios.get(`${API_BASE_URL}/activities`)
      .then(response => {
        setCalls(response.data);
      })
      .catch(error => {
        console.error('Error fetching calls:', error);
      });
      console.log("const");
      console.log(calls);
  }, [showArchived]);

  const handleArchive = (id) => {
    axios.patch(`${API_BASE_URL}/activities/${id}`, { is_archived: true })
      .then(() => {
        setCalls(calls.map(call => call.id === id ? { ...call, is_archived: true } : call));
        setSelectedCall(null);
      })
      .catch(error => {
        console.error('Error archiving call:', error);
      });
      setSelectedCall(null);
  };

  const handleUnarchive = (id) => {
    axios.patch(`${API_BASE_URL}/activities/${id}`, { is_archived: false })
      .then(() => {
        setCalls(calls.map(call => call.id === id ? { ...call, is_archived: false } : call));
        setSelectedCall(null);
      })
      .catch(error => {
        console.error('Error unarchiving call:', error);
      });
      setSelectedCall(null);
  };

  const archiveAll = () => {
    calls.map(call =>axios.patch(`${API_BASE_URL}/activities/${call.id}`, { is_archived: true }));
    const archivedCalls = setCalls(calls.map(call => ({ ...call, is_archived: true })));
    setSelectedCall(null);
  };

  const unarchiveAll = () => {
    const unarchivedCalls = calls.map(call => ({ ...call, is_archived: false }));
    axios.patch(`${API_BASE_URL}/reset`, unarchivedCalls)
      .then(() => {
        setCalls(unarchivedCalls);
        setSelectedCall(null);
      })
      .catch(error => {
        console.error('Error unarchiving all calls:', error);
      });
      setSelectedCall(null);
  };

  const handleCallSelect = (call) => {
    if (selectedCall !== null && selectedCall === call) {
      setSelectedCall(null);
    } else {
      setSelectedCall(call);
    }
  };

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
        {selectedCall && <ActivityDetail call={selectedCall} />}
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));

export default App;