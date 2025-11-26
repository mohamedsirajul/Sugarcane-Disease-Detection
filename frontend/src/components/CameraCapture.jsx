import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Camera, X } from 'lucide-react';

export default function CameraCapture({ onImageCapture }) {
  const { t } = useTranslation();
  const [isActive, setIsActive] = useState(false);
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setIsActive(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please check permissions.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setIsActive(false);
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0);

      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' });
          const imageUrl = URL.createObjectURL(blob);
          onImageCapture(file, imageUrl);
          stopCamera();
        }
      }, 'image/jpeg');
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  if (!isActive) {
    return (
      <button
        onClick={startCamera}
        className="w-full bg-primary text-white py-4 px-6 rounded-xl flex items-center justify-center space-x-3 hover:bg-secondary transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-md text-lg font-semibold"
      >
        <Camera className="w-6 h-6" />
        <span>📷 Open Camera</span>
      </button>
    );
  }

  return (
    <div className="relative rounded-xl overflow-hidden shadow-lg">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full bg-black"
      />
      <canvas ref={canvasRef} className="hidden" />
      <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-4 px-4">
        <button
          onClick={captureImage}
          className="bg-primary text-white py-3 px-8 rounded-full hover:bg-secondary transition-all transform hover:scale-105 shadow-lg flex items-center space-x-2 font-semibold"
        >
          <Camera className="w-5 h-5" />
          <span>Capture</span>
        </button>
        <button
          onClick={stopCamera}
          className="bg-red-500 text-white py-3 px-8 rounded-full hover:bg-red-600 transition-all transform hover:scale-105 shadow-lg flex items-center space-x-2 font-semibold"
        >
          <X className="w-5 h-5" />
          <span>Cancel</span>
        </button>
      </div>
    </div>
  );
}
