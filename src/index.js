import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

//ReactDOM.render(<App />, document.getElementById("root"));

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ModelSelectionPage from './modelSelectionPage';

function Main() {
  const [selectedModel, setSelectedModel] = useState(null);

  const handleSelectModel = (model) => {
    setSelectedModel(model);
  };
  console.log('index:', selectedModel);
  return selectedModel ? (
    <App selectedModel={selectedModel} />
  ) : (
    <ModelSelectionPage onSelectModel={handleSelectModel} />
  );
}

ReactDOM.render(<Main />, document.getElementById('root'));
