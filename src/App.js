
import Dashboard from './components/Dashboard';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dropzone from './components/Dropzone';
import TextTranslate from './components/TextTranslate';
import History from './components/History';
function App() {
  return (
    <div className="App">
    <Dashboard/>
      <Router>
        <Routes>
          {/* The root route should only match the exact path */}
          <Route exact path="/" element={<Dropzone />} />
          <Route exact path="/text-translate" element={<TextTranslate />} />
          {/* The Dropzone component should be rendered when the URL path is /dropzone */}
          <Route exact path="/history" element={<History />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;