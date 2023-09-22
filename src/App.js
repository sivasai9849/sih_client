
import Dashboard from './components/Dashboard';
import React, { useState } from 'react';
 

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Dropzone from './components/Dropzone';
import ChatbotComponent from './components/ChatBot';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* The root route should only match the exact path */}
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/chatbot" element={<ChatbotComponent />} />
          {/* The Dropzone component should be rendered when the URL path is /dropzone */}
          <Route path="/dropzone" element={<Dropzone />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;