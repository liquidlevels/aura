import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, SafeAreaView, Text } from 'react-native';
import Canvas, { CanvasRenderingContext2D, Image as CanvasImage } from 'react-native-canvas'; // Import Image from react-native-canvas
import io, { Socket } from 'socket.io-client';

const VideoStream: React.FC = () => {
  const canvasRef = useRef<Canvas | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);

  useEffect(() => {
    // Conectar al servidor Socket.IO
    socketRef.current = io('http://192.168.100.78:8780'); // Cambia a tu IP del servidor

    socketRef.current.on('frame', (frame: string) => {
      setIsStreaming(true);

      if (contextRef.current && canvasRef.current) {
        const img = new CanvasImage(canvasRef.current);
        img.src = `data:image/jpeg;base64,${frame}`;

        // Dibujar el frame cuando se cargue la imagen
        img.addEventListener('load', () => {
          const canvas = canvasRef.current!;
          const context = contextRef.current!;

          // Limpiar el canvas y dibujar el frame completo
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(img, 0, 0, canvas.width, canvas.height);
        });
      }
    });

    socketRef.current.on('disconnect', () => {
      console.log('Disconnected from the server');
      setIsStreaming(false);
    });

    // Limpiar el socket al desmontar el componente
    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  const handleCanvas = (canvas: Canvas) => {
    if (canvas) {
      canvas.width = 320; // Dimensiones del canvas
      canvas.height = 240;
      const context = canvas.getContext('2d');
      contextRef.current = context;
      canvasRef.current = canvas;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
        {isStreaming ? (
            <Canvas ref={handleCanvas} style={styles.canvas} />
        ) : (
            <Text style={styles.text}>Cargando video...</Text>
        )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  canvas: {
    marginTop: 16,
    borderRadius: 16,
    width: '90%',
    height: undefined,
    aspectRatio: 640 / 480,
  },
  text: {
    margin: 20,
    padding: 20,
    fontSize: 18,
  },
});

export default VideoStream;