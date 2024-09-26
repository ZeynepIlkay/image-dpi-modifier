import React, { useState, useRef } from 'react';
import { changeDpiDataUrl } from 'changedpi';


function App() {
  const [imageSrc, setImageSrc] = useState(null);
  const [dpi, setDpi] = useState(300); // Varsayılan olarak 300 DPI
  const canvasRef = useRef(null);

  // Resim yükleyicisi
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
      setImageSrc(event.target.result); // Base64 olarak resmi state'e set ediyoruz
    };

    reader.readAsDataURL(file);
  };

  // Canvas üzerinde görüntüyü çizme
  const drawImageOnCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = imageSrc;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
    };
  };

  // DPI değiştirilip kaydedilen dosyayı indirme
  const handleSaveImageWithDpi = () => {
    const canvas = canvasRef.current;
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
    <div>
      <h1>DPI Değiştirici</h1>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <button onClick={drawImageOnCanvas}>Görüntüyü Çiz</button>
      <br />
      <canvas ref={canvasRef} style={{ display: imageSrc ? 'block' : 'none' }}></canvas>
      <br />
      <label>
        DPI Ayarı:
        <input
          type="number"
          value={dpi}
          onChange={(e) => setDpi(e.target.value)}
        />
      </label>
      <br />
      {imageSrc && (
        <button onClick={handleSaveImageWithDpi}>
          DPI'yi Değiştir ve Kaydet ({dpi} DPI)
        </button>
      )}
    </div>
  );
}

export default App;
