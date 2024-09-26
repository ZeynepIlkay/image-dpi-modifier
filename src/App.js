import React, { useState, useRef } from 'react';
import { changeDpiDataUrl } from 'changedpi';
import './App.css'; // CSS dosyasını ekleyelim

function App() {
  const [imageSrc, setImageSrc] = useState(null);
  const [dpi, setDpi] = useState(300);
  const canvasRef = useRef(null);
  const originalImage = useRef(null); // Orijinal resmi saklayacağız

  // Resim yükleyicisi
  const handleImageUpload = (e) => {
    const file = e.target.files[0]; // Dosya nesnesini alıyoruz

    if (file && file.type.startsWith('image/')) { // Yüklenen dosyanın bir resim olduğundan emin oluyoruz
      const reader = new FileReader();

      reader.onload = function (event) {
        setImageSrc(event.target.result); // Base64 olarak resmi state'e set ediyoruz
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          originalImage.current = img; // Orijinal resim boyutunu saklıyoruz
          drawImageOnCanvas(img); // Resmi canvas'a sığacak şekilde çiziyoruz
        };
      };

      reader.readAsDataURL(file); // Dosyayı base64 olarak okuyoruz
    } else {
      console.error("Lütfen bir resim dosyası seçin");
    }
  };

  // Resmi canvas alanına sığacak şekilde çizme
  const drawImageOnCanvas = (img) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const maxWidth = 300; // Canvas genişliği
    const maxHeight = 300; // Canvas yüksekliği
    let width = img.width;
    let height = img.height;

    // Ölçeklendirme oranını hesaplıyoruz
    if (width > height) {
      if (width > maxWidth) {
        height *= maxWidth / width;
        width = maxWidth;
      }
    } else {
      if (height > maxHeight) {
        width *= maxHeight / height;
        height = maxHeight;
      }
    }

    canvas.width = maxWidth;
    canvas.height = maxHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Önceki çizimi temizliyoruz
    ctx.drawImage(img, (canvas.width - width) / 2, (canvas.height - height) / 2, width, height); // Resmi ortalayarak çiziyoruz
  };

  // DPI değiştirilip kaydedilen dosyayı indirme
  const handleSaveImageWithDpi = () => {
    const img = originalImage.current; // Orijinal boyuttaki resmi kullanıyoruz
    const canvas = document.createElement('canvas'); // Yeni bir canvas oluşturuyoruz
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, img.width, img.height);

    const dataUrl = canvas.toDataURL('image/jpeg'); // Görüntüyü base64 formatına dönüştür

    // DPI'yı değiştir
    const dataUrlWithDpi = changeDpiDataUrl(dataUrl, dpi);

    // Yeni resmi indirme
    const a = document.createElement('a');
    a.href = dataUrlWithDpi;
    a.download = `image_with_${dpi}dpi.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="app-container">
      <div className="card">
        <h1 className="title">DPI Değiştirici</h1>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="file-input"
        />
        <div className="canvas-container">
          <canvas ref={canvasRef} className="image-canvas"></canvas>
        </div>
        <label className="dpi-label">
          DPI Ayarı:
          <input
            type="number"
            value={dpi}
            onChange={(e) => setDpi(e.target.value)}
            className="dpi-input"
          />
        </label>
        {imageSrc && (
          <button onClick={handleSaveImageWithDpi} className="save-button">
            DPI'yi Değiştir ve Kaydet ({dpi} DPI)
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
