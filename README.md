## DPI Görüntü Değiştirici
Bu proje, kullanıcıların bir görüntü yüklemesine, görüntünün DPI (İnç Başına Nokta) değerini değiştirmesine ve yeni DPI ayarıyla indirilen görüntüyü kaydetmesine olanak tanır. Uygulama, yüklenen görüntüyü sabit bir alan içinde ölçekleyerek gösterir, ancak indirildiğinde görüntü orijinal boyutlarında kalır.
![image](https://github.com/user-attachments/assets/3ce56f5c-df6c-4f0f-ab43-95f2d9d19d14)


## Özellikler
- Görüntü Yükleme: Kullanıcı, bir dosya girişi aracılığıyla bir görüntü yükleyebilir.
- Canvas Üzerinde Görüntüleme: Yüklenen görüntü, 300x300 piksel bir canvas alanına ölçeklenir, ancak orijinal oranları korunur.
- DPI Değiştirme: Kullanıcı, görüntü için yeni bir DPI değeri girebilir.
- Görüntü İndirme: Değiştirilen DPI ile görüntü orijinal boyutlarda indirilebilir.

## Kullanılan Teknolojiler
- React: Kullanıcı arayüzünü oluşturmak için kullanıldı.
- Canvas API: Görüntülerin canvas üzerinde işlenmesi ve manipüle edilmesi için kullanıldı.
- changeDPI.js: Görüntünün DPI bilgisini piksel verisine zarar vermeden değiştirmek için kullanılan kütüphane.
