import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Text, Platform } from 'react-native';
import io from 'socket.io-client';

const VideoStream: React.FC = () => {
  // Estado para almacenar los datos de la imagen (en formato base64)
  const [imageData, setImageData] = useState<string | null>(null);

  useEffect(() => {
    // Conectar al servidor Socket.IO
    const socket = io('http://192.168.0.122:8780'); // Cambia a la dirección IP del servidor

    // Escuchar el evento "frame" del servidor
    socket.on('frame', (frame: string) => {
      setImageData(`data:image/jpeg;base64,${frame}`);
    });

    socket.on('connect', () => {
      console.log('Connected to Socket.IO server.');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from Socket.IO server.');
    });

    // Limpiar la conexión cuando se desmonte el componente
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <View style={styles.container}>
      {imageData ? (
        <Image
          source={{ uri: imageData }}
           style={[Platform.OS === 'web' ? styles.webImage : styles.mobileImage]}
resizeMode="contain"
        />
      ) : (
        <Text style={styles.text}>Cargando video...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  text: {
    fontSize: 20,
    margin: 20,
    padding: 20,
  },
  mobileImage: {
    marginTop: 16,
    borderRadius: 16,
    width: '90%',
    height: undefined,
    aspectRatio: 640 / 480,
  },
  webImage: {
    marginTop: 16,
    borderRadius: 16,
    width: '60%',
    height: undefined,
    aspectRatio: 640 / 480,
    maxWidth: 800,
    maxHeight: 600,
  },
});

export default VideoStream;