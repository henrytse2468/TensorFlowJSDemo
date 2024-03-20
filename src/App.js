import React, { useRef, useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as cocossd from '@tensorflow-models/coco-ssd';
import * as handpose from '@tensorflow-models/handpose';
import Webcam from 'react-webcam';
import './App.css';
import { drawRect } from './utilities';
import { loadGraphModel } from '@tensorflow/tfjs-converter';

const MODEL_URL = './model/yolo/model.json';

function App({ selectedModel }) {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  console.log('app.js:', selectedModel);

  // Main function
  const runModel = async () => {
    let net;
    switch (selectedModel) {
      case 'coco-ssd':
        net = await cocossd.load();
        break;
      case 'yolo':
        net = await loadGraphModel(MODEL_URL);
        break;
      default:
        net = await cocossd.load(); // Default to coco-ssd
    }
    //  Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 30);
  };

  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== 'undefined' &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // 4. TODO - Make Detections
      // e.g. const obj = await net.detect(video);
      const obj = await net.detect(video);

      // Draw mesh
      const ctx = canvasRef.current.getContext('2d');

      // 5. TODO - Update drawing utility
      // drawSomething(obj, ctx)
      drawRect(obj, ctx);
      console.log('drawRect is running');
    }
  };

  useEffect(() => {
    runModel();
  }, [selectedModel]);

  //useEffect(() => {
  //  runCoco();
  //}, []);

  // Handle model change

  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          muted={true}
          style={{
            position: 'absolute',
            marginLeft: 'auto',
            marginRight: 'auto',
            left: 0,
            right: 0,
            textAlign: 'center',
            zindex: 9,
            width: '100%',
            height: '100vh',
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            marginLeft: 'auto',
            marginRight: 'auto',
            left: 0,
            right: 0,
            textAlign: 'center',
            zindex: 8,
            width: '100%',
            height: '100vh',
          }}
        />
      </header>
    </div>
  );
}

export default App;
