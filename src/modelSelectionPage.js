// ModelSelectionPage.js

import React, { useState } from 'react';
import './App.css';

function ModelSelectionPage({ onSelectModel }) {
  const [selectedModel, setSelectedModel] = useState('coco-ssd');

  const handleSelectModel = () => {
    onSelectModel(selectedModel);
  };

  return (
    <div className="model-selection-container">
      <div className="model-selection-form">
        <h1 className="model-selection-title">Naruto Hand Sign Detection</h1>
        <select
          className="model-selection-select"
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
        >
          <option value="coco-ssd">COCO-SSD</option>
          <option value="Yolo">YOLO</option>
          {/* Add more options for other models if needed */}
        </select>
        <button className="model-selection-button" onClick={handleSelectModel}>
          Start
        </button>
      </div>
    </div>
  );
}

export default ModelSelectionPage;
