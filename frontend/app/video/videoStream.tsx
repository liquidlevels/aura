import React from 'react';
import { Platform } from 'react-native';

// Importa ambos componentes
import AndroidVideoStream from './androidVideoStream';
import WebAndIOSVideoStream from './webAndIOSVideoStream';

const VideoStream: React.FC = () => {
  // Detección de plataforma
  if (Platform.OS === 'android') {
    return <AndroidVideoStream />;
  } else {
    return <WebAndIOSVideoStream />;
  }
};

export default VideoStream;