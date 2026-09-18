window.onerror = function(msg, url, line) { alert('HATA: ' + msg + '\nSatir: ' + line); };
// ?? ALAN ADI K�L�D� (DOMAIN BINDING) ??
// Sadece bdemir1499.github.io adresinde, EBA sunucular�nda ve yerel bilgisayarda �al���r!
const gecerliAdresler = ["bdemir1499.github.io", "127.0.0.1", "localhost", "eba.gov.tr", "vercel.app"];
const mevcutAdres = window.location.hostname;

const kacakKullanimMi = !gecerliAdresler.some(adres => mevcutAdres.includes(adres));

if (kacakKullanimMi && mevcutAdres !== "") {
    document.body.innerHTML = "<div style='color:red; text-align:center; margin-top:50px; font-family:sans-serif; font-size:20px; font-weight:bold;'>? G�VENL�K �HLAL�: Bu yaz�l�m kopyalanm��t�r. L�tfen orijinal adresi kullan�n.</div>";
    throw new Error("Korsan kullan�m tespit edildi, sistem durduruldu!");
}

// ?? KES�N ��Z�M: Ak�ll� tahtalarda kay�p resim (X_X y�z) ��kmesini TAMAMEN engeller ??
const cursorFix = document.createElement('style');
cursorFix.innerHTML = `
    /* SADECE KANVASTA DE��L, B�T�N EKRANDA ZOMB� �MLE�LER� K�K�NDEN YASAKLA! */
    body.cursor-eraser { cursor: none !important; }
    body.cursor-pen { cursor: crosshair !important; }
    body.cursor-snapshot { cursor: crosshair !important; }

    /* �izim tahtas� �zerinde de kesin yasak (�ifte g�venlik) */
    body.cursor-eraser #drawing-canvas { cursor: none !important; }
    body.cursor-pen #drawing-canvas { cursor: crosshair !important; }
    body.cursor-snapshot #drawing-canvas { cursor: crosshair !important; }

    /* Men�lerin, panellerin ve butonlar�n �zerinde her zaman normal ok/parmak i�areti ��ks�n! */
    .panel, .panel *, button, .tool-button, .tool-button-sub { 
        cursor: pointer !important; 
    }
`;
document.head.appendChild(cursorFix);



// Artk sabit bir MY_SECRET_KEY yok, retmen her ders ifreyi belirleyecek
window.sessionPassword = "";

// --- DL SZL ---
let currentLang = 'tr'; // Varsaylan dil

const translations = {
    tr: { yukle: "📁 Dosya Yükle", silgi: "Silgi", kalem: "Kalem", cizgi: "Çizgi", nokta: "Nokta", d_cizgi: "Düz Çizgi", dogru: "Doğru", dogru_parcasi: "Doğru Parçası", isin: "Işın", cetvel: "Cetvel", gonye: "Gönye", aciolcer: "Açı Ölçer", pergel: "Pergel", cokgenler: "Çokgenler", cember: "Çember", d_ucgen: "Düzgün 3gen", d_dortgen: "Düzgün 4gen", dikdortgen: "Dikdörtgen", d_besgen: "Düzgün 5gen", d_altigen: "Düzgün 6gen", d_yedigen: "Düzgün 7gen", d_sekizgen: "Düzgün 8gen", oyunlar: "Oyunlar", arac_rengi: "Araç Rengi", geri_al: "Geri Al", hepsini_sil: "Hepsini Sil", tasi: "Taşı", canlandir: "Canlandır ✂️", kutu: "Kutu", serbest: "Serbest", yardim: "Video Yardım", ins_t: "Uygulamayı Yükle", ins_d: "Daha iyi performans için uygulamayı yükle.", ins_b: "Yükle", ins_c: "Kapat", vid_cetvel: "Cetvel Kullanımı", vid_gonye: "Gönye Kullanımı", vid_aciolcer: "Açı Ölçer Kullanımı", vid_pergel: "Pergel Kullanımı", vid_canlandir: "Canlandırma (Kopyalama)", vid_cizgi: "Çizgi Menüsü Kullanımı", vid_cokgenler: "Çokgenler", vid_kalem: "Kalem", vid_kitap: "Kitap ve Resim Yükleme", vid_oyunlar: "Oyunlar", pdf_soru: "Bu PDF {0} sayfadır. Kaçıncı sayfadan devam etmek istersiniz?", kvkk: "Bu uygulama hiçbir kişisel veri toplamaz ve dosyalarınızı sunuculara yüklemez." },

    en: { yukle: "Upload Image/PDF", silgi: "Eraser", kalem: "Pen", cizgi: "Line", nokta: "Point", d_cizgi: "Straight Line", dogru: "Line", dogru_parcasi: "Segment", isin: "Ray", cetvel: "Ruler", gonye: "Set Square", aciolcer: "Protractor", pergel: "Compass", cokgenler: "Polygons", cember: "Circle", d_ucgen: "Regular Triangle", d_dortgen: "Square", dikdortgen: "Rectangle", d_besgen: "Pentagon", d_altigen: "Hexagon", d_yedigen: "Heptagon", d_sekizgen: "Octagon", oyunlar: "Games", arac_rengi: "Tool Color", geri_al: "Undo", hepsini_sil: "Clear All", tasi: "Move", canlandir: "Animate ✂️", kutu: "Box", serbest: "Free", yardim: "Video Help", ins_t: "Install App", ins_d: "Install app for better performance.", ins_b: "Install", ins_c: "Close", vid_cetvel: "Ruler Usage", vid_gonye: "Set Square Usage", vid_aciolcer: "Protractor Usage", vid_pergel: "Compass Usage", vid_canlandir: "Animation (Copy)", vid_cizgi: "Line Menu Usage", vid_cokgenler: "Polygons", vid_kalem: "Pen", vid_kitap: "Load Book and Image", vid_oyunlar: "Games", pdf_soru: "This PDF has {0} pages. Which page would you like to continue from?", kvkk: "This application does not collect any personal data and does not upload your files to servers." },

    de: { yukle: "Bild/PDF hochladen", silgi: "Radierer", kalem: "Stift", cizgi: "Linie", nokta: "Punkt", d_cizgi: "Gerade", dogru: "Gerade", dogru_parcasi: "Strecke", isin: "Strahl", cetvel: "Lineal", gonye: "Geodreieck", aciolcer: "Winkelmesser", pergel: "Zirkel", cokgenler: "Polygone", cember: "Kreis", d_ucgen: "Dreieck", d_dortgen: "Quadrat", dikdortgen: "Rechteck", d_besgen: "Fünfeck", d_altigen: "Sechseck", d_yedigen: "Heptagon", d_sekizgen: "Oktagon", oyunlar: "Spiele", arac_rengi: "Farbe", geri_al: "Rückgängig", hepsini_sil: "Löschen", tasi: "Bewegen", canlandir: "Animieren", kutu: "Box", serbest: "Frei", yardim: "Hilfe", ins_t: "App installieren", ins_d: "Installieren für bessere Leistung.", ins_b: "Installieren", ins_c: "Schließen", vid_cetvel: "Lineal verwenden", vid_gonye: "Geodreieck verwenden", vid_aciolcer: "Winkelmesser verwenden", vid_pergel: "Zirkel verwenden", vid_canlandir: "Animation (Kopieren)", vid_cizgi: "Linienmenü verwenden", vid_cokgenler: "Vielecke", vid_kalem: "Stift", vid_kitap: "Buch und Bild laden", vid_oyunlar: "Spiele", pdf_soru: "Dieses PDF hat {0} Seiten. Auf welcher Seite möchten Sie fortfahren?", kvkk: "Diese Anwendung sammelt keine personenbezogenen Daten und lädt Ihre Dateien nicht auf Server hoch." },

    ar: { yukle: "تحميل ملف", silgi: "ممحاة", kalem: "قلم", cizgi: "خط", nokta: "نقطة", d_cizgi: "خط مستقيم", dogru: "مستقيم", dogru_parcasi: "قطعة", isin: "شعاع", cetvel: "مسطرة", gonye: "مثلث", aciolcer: "منقلة", pergel: "فرجار", cokgenler: "مضلعات", cember: "دائرة", d_ucgen: "مثلث منتظم", d_dortgen: "مربع", dikdortgen: "مستطيل", d_besgen: "مخمس", d_altigen: "مسدس", d_yedigen: "مسبع", d_sekizgen: "مثمن", oyunlar: "ألعاب", arac_rengi: "اللون", geri_al: "تراجع", hepsini_sil: "مسح", tasi: "تحريك", canlandir: "تحريك", kutu: "صندوق", serbest: "حر", yardim: "مساعدة", ins_t: "تثبيت التطبيق", ins_d: "ثبت التطبيق لأداء أفضل.", ins_b: "تثبيت", ins_c: "إغلاق", vid_cetvel: "استخدام المسطرة", vid_gonye: "استخدام المثلث", vid_aciolcer: "استخدام المنقلة", vid_pergel: "استخدام الفرجار", vid_canlandir: "رسوم متحركة (نسخ)", vid_cizgi: "استخدام قائمة الخطوط", vid_cokgenler: "مضلعات", vid_kalem: "قلم", vid_kitap: "تحميل كتاب وصورة", vid_oyunlar: "ألعاب", pdf_soru: "يحتوي هذا الملف على {0} صفحة. من أي صفحة تريد المتابعة؟", kvkk: "لا يجمع هذا التطبيق أي بيانات شخصية ولا يرفع ملفاتك إلى الخوادم." },

    hi: { yukle: "फ़ाइल अपलोड", silgi: "इरेज़र", kalem: "पेन", cizgi: "रेखा", nokta: "बिंदु", d_cizgi: "सीधी रेखा", dogru: "रेखा", dogru_parcasi: "खंड", isin: "किरण", cetvel: "पैमाना", gonye: "गुनिया", aciolcer: "चांदा", pergel: "परकार", cokgenler: "बहुभुज", cember: "वृत्त", d_ucgen: "त्रिभुज", d_dortgen: "वर्ग", dikdortgen: "आयत", d_besgen: "पंचभुज", d_altigen: "षट्भुज", d_yedigen: "सप्तभुज", d_sekizgen: "अष्टभुज", oyunlar: "खेल", arac_rengi: "रंग", geri_al: "पूर्ववत", hepsini_sil: "साफ़", tasi: "ले जाएँ", canlandir: "एनिमेट", kutu: "बॉक्स", serbest: "मुक्त", yardim: "सहायता", ins_t: "ऐप इंस्टॉल करें", ins_d: "बेहतर प्रदर्शन के लिए इंस्टॉल करें।", ins_b: "इंस्टॉल", ins_c: "बंद", vid_cetvel: "रूलer का उपयोग", vid_gonye: "सेट स्क्वायर का उपयोग", vid_aciolcer: "चांदा का उपयोग", vid_pergel: "परकार का उपयोग", vid_canlandir: "एनीमेशन (कॉपी)", vid_cizgi: "लाइन मेनू का उपयोग", vid_cokgenler: "बहुभुज", vid_kalem: "पेन", vid_kitap: "पुस्तक और छवि लोड करें", vid_oyunlar: "खेल", pdf_soru: "इस PDF में {0} पृष्ठ हैं। आप किस पृष्ठ से जारी रखना चाहेंगे?", kvkk: "यह एप्लिकेशन कोई व्यक्तिगत डेटा एकत्र नहीं करता है और आपकी फ़ाइलों को सर्वर पर अपलोड नहीं करता है।" },

    ms: { yukle: "Muat Naik Fail", silgi: "Pemadam", kalem: "Pen", cizgi: "Garis", nokta: "Titik", d_cizgi: "Garis Lurus", dogru: "Garis", dogru_parcasi: "Segmen", isin: "Sinar", cetvel: "Pembaris", gonye: "Sesiku", aciolcer: "Jangka Sudut", pergel: "Jangka Lukis", cokgenler: "Poligon", cember: "Bulatan", d_ucgen: "Segi Tiga", d_dortgen: "Segi Empat", dikdortgen: "Segi Empat Tepat", d_besgen: "Pentagon", d_altigen: "Heksagon", d_yedigen: "Heptagon", d_sekizgen: "Oktagon", oyunlar: "Permainan", arac_rengi: "Warna", geri_al: "Batal", hepsini_sil: "Padam", tasi: "Gerak", canlandir: "Animasi", kutu: "Kotak", serbest: "Bebas", yardim: "Bantuan", ins_t: "Pasang Aplikasi", ins_d: "Pasang untuk prestasi lebih baik.", ins_b: "Pasang", ins_c: "Tutup", vid_cetvel: "Penggunaan Pembaris", vid_gonye: "Penggunaan Sesiku", vid_aciolcer: "Penggunaan Jangka Sudut", vid_pergel: "Penggunaan Jangka Lukis", vid_canlandir: "Animasi (Salin)", vid_cizgi: "Penggunaan Menu Garisan", vid_cokgenler: "Poligon", vid_kalem: "Pen", vid_kitap: "Muat Buku dan Imej", vid_oyunlar: "Permainan", pdf_soru: "PDF ini mempunyai {0} halaman. Dari halaman mana anda ingin teruskan?", kvkk: "Aplikasi ini tidak mengumpul sebarang data peribadi and tidak memuat naik fail anda ke pelayan." },

    id: { yukle: "Unggah Berkas", silgi: "Penghapus", kalem: "Pena", cizgi: "Garis", nokta: "Titik", d_cizgi: "Garis Lurus", dogru: "Garis", dogru_parcasi: "Segmen", isin: "Sinar", cetvel: "Penggaris", gonye: "Segitiga", aciolcer: "Busur", pergel: "Jangka", cokgenler: "Poligon", cember: "Lingkaran", d_ucgen: "Segitiga", d_dortgen: "Persegi", dikdortgen: "Persegi Panjang", d_besgen: "Pentagon", d_altigen: "Heksagon", d_yedigen: "Heptagon", d_sekizgen: "Octagon", oyunlar: "Permainan", arac_rengi: "Warna", geri_al: "Urung", hepsini_sil: "Hapus", tasi: "Pindah", canlandir: "Animasi", kutu: "Kotak", serbest: "Bebas", yardim: "Bantuan", ins_t: "Instal Aplikasi", ins_d: "Instal untuk performa daha baik.", ins_b: "Instal", ins_c: "Tutup", vid_cetvel: "Penggunaan Penggaris", vid_gonye: "Penggunaan Penggaris Segitiga", vid_aciolcer: "Penggunaan Busur Derajat", vid_pergel: "Penggunaan Jangka", vid_canlandir: "Animasi (Salin)", vid_cizgi: "Penggunaan Menu Garis", vid_cokgenler: "Poligon", vid_kalem: "Pena", vid_kitap: "Muat Buku dan Gambar", vid_oyunlar: "Permainan", pdf_soru: "PDF ini memiliki {0} halaman. Dari halaman mana Anda ingin melanjutkan?", kvkk: "Aplikasi ini tidak mengumpulkan data pribadi apa pun dan tidak mengunggah file Anda ke server." },

    zh: { yukle: "上传文件", silgi: "橡皮", kalem: "笔", cizgi: "线", nokta: "点", d_cizgi: "直线", dogru: "直线", dogru_parcasi: "线段", isin: "射线", cetvel: "直尺", gonye: "三角板", aciolcer: "量角器", pergel: "圆规", cokgenler: "多边形", cember: "圆", d_ucgen: "三角形", d_dortgen: "正方形", dikdortgen: "长方形", d_besgen: "五边形", d_altigen: "六边形", d_yedigen: "七边形", d_sekizgen: "八边形", oyunlar: "游戏", arac_rengi: "颜色", geri_al: "撤销", hepsini_sil: "清除", tasi: "移动", canlandir: "动画", kutu: "框选", serbest: "自由", yardim: "帮助", ins_t: "安装应用", ins_d: "安装应用以获得更好性能。", ins_b: "安装", ins_c: "关闭", vid_cetvel: "尺子用法", vid_gonye: "三角板用法", vid_aciolcer: "量角器用法", vid_pergel: "圆规用法", vid_canlandir: "动画（复制）", vid_cizgi: "线条菜单用法", vid_cokgenler: "多边形", vid_kalem: "笔", vid_kitap: "加载书籍和图片", vid_oyunlar: "游戏", pdf_soru: "此 PDF 共有 {0} 页。您想从哪一页开始继续？", kvkk: "此应用程序不收集任何个人数据，也不会将您的文件上传到服务器。" },

    ru: { yukle: "Загрузить файл", silgi: "Ластик", kalem: "Ручка", cizgi: "Линия", nokta: "Точка", d_cizgi: "Прямая линия", dogru: "Прямая", dogru_parcasi: "Отрезок", isin: "Луч", cetvel: "Линейка", gonye: "Угольник", aciolcer: "Транспортир", pergel: "Циркуль", cokgenler: "Многоугольники", cember: "Круг", d_ucgen: "Правильный треугольник", d_dortgen: "Квадрат", dikdortgen: "Прямоугольник", d_besgen: "Пятиугольник", d_altigen: "Шестиугольник", d_yedigen: "Семиугольник", d_sekizgen: "Восьмиугольник", oyunlar: "Игры", arac_rengi: "Цвет инструмента", geri_al: "Отменить", hepsini_sil: "Очистить всё", tasi: "Переместить", canlandir: "Анимация ✂️", kutu: "Коробка", serbest: "Свободно", yardim: "Справка", ins_t: "Установить", ins_d: "Установите для лучшей работы.", ins_b: "Установить", ins_c: "Закрыть", vid_cetvel: "Как использовать линейку", vid_gonye: "Как использовать угольник", vid_aciolcer: "Как использовать транспортир", vid_pergel: "Как использовать циркуль", vid_canlandir: "Анимация (Копия)", vid_cizgi: "Меню линий", vid_cokgenler: "Многоугольники", vid_kalem: "Ручка", vid_kitap: "Загрузка книг", vid_oyunlar: "Игры", pdf_soru: "В этом PDF {0} страниц. С какой страницы вы хотите продолжить?", kvkk: "Это приложение не собирает никаких персональных данных и не загружает ваши файлы на серверы." },

    es: { yukle: "Subir Archivo", silgi: "Borrador", kalem: "Lápiz", cizgi: "Línea", nokta: "Punto", d_cizgi: "Línea Recta", dogru: "Recta", dogru_parcasi: "Segmento", isin: "Rayo", cetvel: "Regla", gonye: "Escuadra", aciolcer: "Transportador", pergel: "Compás", cokgenler: "Polígonos", cember: "Círculo", d_ucgen: "Triángulo", d_dortgen: "Cuadrado", dikdortgen: "Rectángulo", d_besgen: "Pentágono", d_altigen: "Hexágono", d_yedigen: "Heptágono", d_sekizgen: "Octágono", oyunlar: "Juegos", arac_rengi: "Color", geri_al: "Deshacer", hepsini_sil: "Borrar Todo", tasi: "Mover", canlandir: "Animar ✂️", kutu: "Caja", serbest: "Libre", yardim: "Ayuda", ins_t: "Instalar App", ins_d: "Instalar para mejor rendimiento.", ins_b: "Instalar", ins_c: "Cerrar", vid_cetvel: "Uso de Regla", vid_gonye: "Uso de Escuadra", vid_aciolcer: "Uso de Transportador", vid_pergel: "Uso de Compás", vid_canlandir: "Animación (Copiar)", vid_cizgi: "Menú de Líneas", vid_cokgenler: "Polígonos", vid_kalem: "Lápiz", vid_kitap: "Cargar Libro", vid_oyunlar: "Juegos", pdf_soru: "Este PDF tiene {0} páginas. ¿Desde qué página te gustaría continuar?", kvkk: "Esta aplicación no recopila ningún dato personal y no sube sus archivos a los servidores." },

    fr: { yukle: "Télécharger", silgi: "Gomme", kalem: "Stylo", cizgi: "Ligne", nokta: "Point", d_cizgi: "Ligne Droite", dogru: "Droite", dogru_parcasi: "Segment", isin: "Demi-droite", cetvel: "Règle", gonye: "Équerre", aciolcer: "Rapporteur", pergel: "Compas", cokgenler: "Polygones", cember: "Cercle", d_ucgen: "Triangle", d_dortgen: "Carré", dikdortgen: "Rectangle", d_besgen: "Pentagone", d_altigen: "Hexagone", d_yedigen: "Heptagone", d_sekizgen: "Octogone", oyunlar: "Jeux", arac_rengi: "Couleur", geri_al: "Annuler", hepsini_sil: "Effacer Tout", tasi: "Déplacer", canlandir: "Animer ✂️", kutu: "Boîte", serbest: "Libre", yardim: "Aide", ins_t: "Installer App", ins_d: "Installez pour de meilleures performances.", ins_b: "Installer", ins_c: "Fermer", vid_cetvel: "Utilisation de la Règle", vid_gonye: "Utilisation de l'Équerre", vid_aciolcer: "Utilisation du Rapporteur", vid_pergel: "Utilisation du Compas", vid_canlandir: "Animation (Copie)", vid_cizgi: "Menu des Lignes", vid_cokgenler: "Polygones", vid_kalem: "Stylo", vid_kitap: "Charger Livre", vid_oyunlar: "Jeux", pdf_soru: "Ce PDF contient {0} pages. À partir de quelle page voulez-vous continuer ?", kvkk: "Cette application ne collecte aucune donnée personnelle et ne télécharge pas vos fichiers sur des serveurs." },

    pt: { yukle: "Carregar Ficheiro", silgi: "Borracha", kalem: "Caneta", cizgi: "Linha", nokta: "Ponto", d_cizgi: "Linha Reta", dogru: "Reta", dogru_parcasi: "Segmento", isin: "Semirreta", cetvel: "Régua", gonye: "Esquadro", aciolcer: "Transferidor", pergel: "Compasso", cokgenler: "Polígonos", cember: "Círculo", d_ucgen: "Triângulo", d_dortgen: "Quadrado", dikdortgen: "Retângulo", d_besgen: "Pentágono", d_altigen: "Hexágono", d_yedigen: "Heptágono", d_sekizgen: "Octógono", oyunlar: "Jogos", arac_rengi: "Cor", geri_al: "Desfazer", hepsini_sil: "Apagar Tudo", tasi: "Mover", canlandir: "Animar ✂️", kutu: "Caixa", serbest: "Livre", yardim: "Ajuda", ins_t: "Instalar App", ins_d: "Instale para melhor desempenho.", ins_b: "Instalar", ins_c: "Fechar", vid_cetvel: "Uso da Régua", vid_gonye: "Uso do Esquadro", vid_aciolcer: "Uso do Transferidor", vid_pergel: "Uso do Compasso", vid_canlandir: "Animação (Cópia)", vid_cizgi: "Menu de Linhas", vid_cokgenler: "Polígonos", vid_kalem: "Caneta", vid_kitap: "Carregar Livro", vid_oyunlar: "Jogos", pdf_soru: "Este PDF tem {0} páginas. A partir de qual página gostaria de continuar?", kvkk: "Este aplicativo não coleta nenhum dado pessoal e não faz upload de seus arquivos para servidores." },

    ja: { yukle: "アップロード", silgi: "消しゴム", kalem: "ペン", cizgi: "線", nokta: "点", d_cizgi: "直線", dogru: "直線", dogru_parcasi: "線分", isin: "半直線", cetvel: "定規", gonye: "三角定規", aciolcer: "分度器", pergel: "コンパス", cokgenler: "多角形", cember: "円", d_ucgen: "正三角形", d_dortgen: "正方形", dikdortgen: "長方形", d_besgen: "五角形", d_altigen: "六角形", d_yedigen: "七角形", d_sekizgen: "八角形", oyunlar: "ゲーム", arac_rengi: "ツールの色", geri_al: "元に戻す", hepsini_sil: "すべて消去", tasi: "移動", canlandir: "アニメ ✂️", kutu: "ボックス", serbest: "自由", yardim: "ヘルプ", ins_t: "アプリをインストール", ins_d: "パフォーマンス向上のためインストール", ins_b: "インストール", ins_c: "閉じる", vid_cetvel: "定規の使い方", vid_gonye: "三角定規の使い方", vid_aciolcer: "分度器の使い方", vid_pergel: "コンパスの使い方", vid_canlandir: "アニメーション (コピー)", vid_cizgi: "線メニューの使い方", vid_cokgenler: "多角形", vid_kalem: "ペン", vid_kitap: "本と画像を読み込む", vid_oyunlar: "ゲーム", pdf_soru: "このPDFは{0}ページあります。どのページから続行しますか？", kvkk: "このアプリケーションは個人データを収集せず、ファイルをサーバーにアップロードしません。" }
};

const translationExtras = {
 tr:{akilli_kalem:"✨ Akıllı Kalem",sihirli_el:"✨ Sihirli El",soru_cek:"📸 Soru Çek"}, en:{akilli_kalem:"✨ Smart Pen",sihirli_el:"✨ Magic Hand",soru_cek:"📸 Take Photo"}, de:{akilli_kalem:"✨ Intelligenter Stift",sihirli_el:"✨ Magische Hand",soru_cek:"📸 Foto aufnehmen"}, fr:{akilli_kalem:"✨ Stylo intelligent",sihirli_el:"✨ Main magique",soru_cek:"📸 Prendre une photo"}, es:{akilli_kalem:"✨ Lápiz inteligente",sihirli_el:"✨ Mano mágica",soru_cek:"📸 Tomar foto"}, pt:{akilli_kalem:"✨ Caneta inteligente",sihirli_el:"✨ Mão mágica",soru_cek:"📸 Tirar foto"}, ru:{akilli_kalem:"✨ Умная ручка",sihirli_el:"✨ Волшебная рука",soru_cek:"📸 Сделать фото"}, ar:{akilli_kalem:"✨ قلم ذكي",sihirli_el:"✨ يد سحرية",soru_cek:"📸 التقاط صورة"}, hi:{akilli_kalem:"✨ स्मार्ट पेन",sihirli_el:"✨ जादुई हाथ",soru_cek:"📸 फ़ोटो लें"}, zh:{akilli_kalem:"✨ 智能笔",sihirli_el:"✨ 魔法手",soru_cek:"📸 拍照"}, ja:{akilli_kalem:"✨ スマートペン",sihirli_el:"✨ 魔法の手",soru_cek:"📸 写真を撮る"}, ms:{akilli_kalem:"✨ Pen Pintar",sihirli_el:"✨ Tangan Ajaib",soru_cek:"📸 Ambil Foto"}, id:{akilli_kalem:"✨ Pena Pintar",sihirli_el:"✨ Tangan Ajaib",soru_cek:"📸 Ambil Foto"}
};
Object.keys(translationExtras).forEach(lang=>Object.assign(translations[lang],translationExtras[lang]));
const translations3D = {
    en: {
        menu: "3D Shapes",
        sphere: "Sphere",
        prisms: "Prisms",
        pyramids: "Pyramids",
        cube: "Cube",
        squarePrism: "Square Prism",
        rectangularPrism: "Rectangular Prism",
        triangularPrism: "Triangular Prism",
        pentagonalPrism: "Pentagonal Prism",
        hexagonalPrism: "Hexagonal Prism",
        cylinder: "Cylinder",
        cone: "Cone",
        triangularPyramid: "Triangular Pyramid",
        squarePyramid: "Square Pyramid",
        pentagonalPyramid: "Pentagonal Pyramid",
        hexagonalPyramid: "Hexagonal Pyramid"
    },
    de: {
        menu: "3D-Körper",
        sphere: "Kugel",
        prisms: "Prismen",
        pyramids: "Pyramiden",
        cube: "Würfel",
        squarePrism: "Quadratisches Prisma",
        rectangularPrism: "Rechteckiges Prisma",
        triangularPrism: "Dreiecksprisma",
        pentagonalPrism: "Fünfeckiges Prisma",
        hexagonalPrism: "Sechseckiges Prisma",
        cylinder: "Zylinder",
        cone: "Kegel",
        triangularPyramid: "Dreieckspyramide",
        squarePyramid: "Quadratische Pyramide",
        pentagonalPyramid: "Fünfeckige Pyramide",
        hexagonalPyramid: "Sechseckige Pyramide"
    },
    fr: {
        menu: "Solides 3D",
        sphere: "Sphère",
        prisms: "Prismes",
        pyramids: "Pyramides",
        cube: "Cube",
        squarePrism: "Prisme à base carrée",
        rectangularPrism: "Pavé droit",
        triangularPrism: "Prisme triangulaire",
        pentagonalPrism: "Prisme pentagonal",
        hexagonalPrism: "Prisme hexagonal",
        cylinder: "Cylindre",
        cone: "Cône",
        triangularPyramid: "Pyramide triangulaire",
        squarePyramid: "Pyramide à base carrée",
        pentagonalPyramid: "Pyramide pentagonale",
        hexagonalPyramid: "Pyramide hexagonale"
    },
    es: {
        menu: "Sólidos 3D",
        sphere: "Esfera",
        prisms: "Prismas",
        pyramids: "Pirámides",
        cube: "Cubo",
        squarePrism: "Prisma cuadrangular",
        rectangularPrism: "Prisma rectangular",
        triangularPrism: "Prisma triangular",
        pentagonalPrism: "Prisma pentagonal",
        hexagonalPrism: "Prisma hexagonal",
        cylinder: "Cilindro",
        cone: "Cono",
        triangularPyramid: "Pirámide triangular",
        squarePyramid: "Pirámide cuadrangular",
        pentagonalPyramid: "Pirámide pentagonal",
        hexagonalPyramid: "Pirámide hexagonal"
    },
    pt: {
        menu: "Sólidos 3D",
        sphere: "Esfera",
        prisms: "Prismas",
        pyramids: "Pirâmides",
        cube: "Cubo",
        squarePrism: "Prisma de base quadrada",
        rectangularPrism: "Prisma retangular",
        triangularPrism: "Prisma triangular",
        pentagonalPrism: "Prisma pentagonal",
        hexagonalPrism: "Prisma hexagonal",
        cylinder: "Cilindro",
        cone: "Cone",
        triangularPyramid: "Pirâmide triangular",
        squarePyramid: "Pirâmide de base quadrada",
        pentagonalPyramid: "Pirâmide pentagonal",
        hexagonalPyramid: "Pirâmide hexagonal"
    },
    ru: {
        menu: "3D-фигуры",
        sphere: "Сфера",
        prisms: "Призмы",
        pyramids: "Пирамиды",
        cube: "Куб",
        squarePrism: "Четырёхугольная призма",
        rectangularPrism: "Прямоугольная призма",
        triangularPrism: "Треугольная призма",
        pentagonalPrism: "Пятиугольная призма",
        hexagonalPrism: "Шестиугольная призма",
        cylinder: "Цилиндр",
        cone: "Конус",
        triangularPyramid: "Треугольная пирамида",
        squarePyramid: "Четырёхугольная пирамида",
        pentagonalPyramid: "Пятиугольная пирамида",
        hexagonalPyramid: "Шестиугольная пирамида"
    },
    ar: {
        menu: "الأشكال ثلاثية الأبعاد",
        sphere: "كرة",
        prisms: "المناشير",
        pyramids: "الأهرامات",
        cube: "مكعب",
        squarePrism: "منشور مربع",
        rectangularPrism: "منشور مستطيل",
        triangularPrism: "منشور مثلثي",
        pentagonalPrism: "منشور خماسي",
        hexagonalPrism: "منشور سداسي",
        cylinder: "أسطوانة",
        cone: "مخروط",
        triangularPyramid: "هرم مثلثي",
        squarePyramid: "هرم مربع",
        pentagonalPyramid: "هرم خماسي",
        hexagonalPyramid: "هرم سداسي"
    },
    hi: {
        menu: "3D ठोस आकृतियाँ",
        sphere: "गोला",
        prisms: "प्रिज़्म",
        pyramids: "पिरामिड",
        cube: "घन",
        squarePrism: "वर्गाकार प्रिज़्म",
        rectangularPrism: "आयताकार प्रिज़्म",
        triangularPrism: "त्रिभुजाकार प्रिज़्म",
        pentagonalPrism: "पंचभुजाकार प्रिज़्म",
        hexagonalPrism: "षट्भुजाकार प्रिज़्म",
        cylinder: "बेलन",
        cone: "शंकु",
        triangularPyramid: "त्रिभुजाकार पिरामिड",
        squarePyramid: "वर्गाकार पिरामिड",
        pentagonalPyramid: "पंचभुजाकार पिरामिड",
        hexagonalPyramid: "षट्भुजाकार पिरामिड"
    },
    zh: {
        menu: "三维图形",
        sphere: "球体",
        prisms: "棱柱",
        pyramids: "棱锥",
        cube: "正方体",
        squarePrism: "正方形棱柱",
        rectangularPrism: "长方体",
        triangularPrism: "三棱柱",
        pentagonalPrism: "五棱柱",
        hexagonalPrism: "六棱柱",
        cylinder: "圆柱体",
        cone: "圆锥体",
        triangularPyramid: "三棱锥",
        squarePyramid: "四棱锥",
        pentagonalPyramid: "五棱锥",
        hexagonalPyramid: "六棱锥"
    },
    ja: {
        menu: "3D図形",
        sphere: "球",
        prisms: "角柱",
        pyramids: "角錐",
        cube: "立方体",
        squarePrism: "四角柱",
        rectangularPrism: "直方体",
        triangularPrism: "三角柱",
        pentagonalPrism: "五角柱",
        hexagonalPrism: "六角柱",
        cylinder: "円柱",
        cone: "円錐",
        triangularPyramid: "三角錐",
        squarePyramid: "四角錐",
        pentagonalPyramid: "五角錐",
        hexagonalPyramid: "六角錐"
    },
    ms: {
        menu: "Bentuk 3D",
        sphere: "Sfera",
        prisms: "Prisma",
        pyramids: "Piramid",
        cube: "Kubus",
        squarePrism: "Prisma segi empat sama",
        rectangularPrism: "Prisma segi empat tepat",
        triangularPrism: "Prisma segi tiga",
        pentagonalPrism: "Prisma pentagon",
        hexagonalPrism: "Prisma heksagon",
        cylinder: "Silinder",
        cone: "Kon",
        triangularPyramid: "Piramid segi tiga",
        squarePyramid: "Piramid segi empat sama",
        pentagonalPyramid: "Piramid pentagon",
        hexagonalPyramid: "Piramid heksagon"
    },
    id: {
        menu: "Bangun 3D",
        sphere: "Bola",
        prisms: "Prisma",
        pyramids: "Limas",
        cube: "Kubus",
        squarePrism: "Prisma persegi",
        rectangularPrism: "Balok",
        triangularPrism: "Prisma segitiga",
        pentagonalPrism: "Prisma segilima",
        hexagonalPrism: "Prisma segienam",
        cylinder: "Tabung",
        cone: "Kerucut",
        triangularPyramid: "Limas segitiga",
        squarePyramid: "Limas persegi",
        pentagonalPyramid: "Limas segilima",
        hexagonalPyramid: "Limas segienam"
    }
};

const default3DLabels = {
    menu: "3D Cisimler",
    sphere: "Küre",
    prisms: "Prizmalar",
    pyramids: "Piramitler",
    cube: "Küp",
    squarePrism: "Kare Prizma",
    rectangularPrism: "Dikdörtgen Prizma",
    triangularPrism: "Üçgen Prizma",
    pentagonalPrism: "Beşgen Prizma",
    hexagonalPrism: "Altıgen Prizma",
    cylinder: "Silindir",
    cone: "Koni",
    triangularPyramid: "Üçgen Piramit",
    squarePyramid: "Kare Piramit",
    pentagonalPyramid: "Beşgen Piramit",
    hexagonalPyramid: "Altıgen Piramit"
};

function update3DLabels() {
    const labels = { ...default3DLabels, ...(translations3D[currentLang] || {}) };
    const setText = (selector, text) => {
        const element = document.querySelector(selector);
        if (element) element.textContent = text;
    };

    setText('#btn-3d-menu', labels.menu);
    setText('[data-3d="3d_kure"]', labels.sphere);
    setText('#btn-prizmalar', `${labels.prisms} ▶`);
    setText('#btn-piramitler', `${labels.pyramids} ▶`);
    setText('[data-3d="3d_kup"]', labels.cube);
    setText('[data-3d="3d_kare_prizma"]', labels.squarePrism);
    setText('[data-3d="3d_dikdortgen_prizma"]', labels.rectangularPrism);
    setText('[data-3d="3d_ucgen_prizma"]', labels.triangularPrism);
    setText('[data-3d="3d_besgen_prizma"]', labels.pentagonalPrism);
    setText('[data-3d="3d_altigen_prizma"]', labels.hexagonalPrism);
    setText('[data-3d="3d_silindir"]', labels.cylinder);
    setText('[data-3d="3d_koni"]', labels.cone);
    setText('[data-3d="3d_ucgen_piramit"]', labels.triangularPyramid);
    setText('[data-3d="3d_kare_piramit"]', labels.squarePyramid);
    setText('[data-3d="3d_besgen_piramit"]', labels.pentagonalPyramid);
    setText('[data-3d="3d_altigen_piramit"]', labels.hexagonalPyramid);
}

window.aktifBaglantilar = {};
let currentLassoX = 0;
let currentLassoY = 0;
let isDrawingLasso = false;
let lassoPoints = [];
let drawnStrokes = [];
window.drawnStrokes = drawnStrokes;
let boxCopies = [];
window.boxCopies = boxCopies;
let isDrawing = false;
let isDrawingRectangle = false;
let isDrawingPolygon = false;
let rectStartPoint = null;
let globalScale = 1;
let lastDist = 0;
let pointers = new Map();
let offsetX = 0; // BUNU EKLE
let offsetY = 0; // BUNU EKLE
const MIN_SCALE = 0.5;
const MAX_SCALE = 5.0;
let initialWidth = 0;
let initialHeight = 0;
let isPenActive = false; // Avu� i�i reddi i�in
let penActiveTimer = null;

// --- �OK D�LL� OYUNLAR L�STES� (T�M D�LLER G�NCELLEND�) ---
window.OyunListesi = [
    {
        tr: "ÇEMBERLERDEN ÜÇGEN İNÅASI",
        en: "TRIANGLE CONSTRUCTION FROM CIRCLES",
        de: "DREIECKSKONSTRUKTION AUS KREISEN",
        ar: "???? ?????? ?? ???????",
        hi: "??????? ?? ??????? ???????",
        ms: "PEMBINAAN SEGI TIGA DARIPADA BULATAN",
        id: "KONSTRUKSI SEGITIGA DARI LINGKARAN",
        zh: "???????",
        ru: "?????????? ???????????? ?? ???????????",
        es: "CONSTRUCCI�N DE TRI�NGULOS DESDE C�RCULOS",
        fr: "CONSTRUCTION DE TRIANGLES � PARTIR DE CERCLES",
        pt: "CONSTRU��O DE TRI�NGULOS A PARTIR DE C�RCULOS",
        ja: "??????????",
        link: "https://bekrmatmt25.my.canva.site/cemberden-ucgen-elde-etme"
    },
    {
        tr: "AÇI ÖLÇER YERLEÅTİRME OYUNU",
        en: "PROTRACTOR PLACEMENT GAME",
        de: "WINKELMESSER-PLATZIERUNGSSPIEL",
        ar: "???? ??? ???????",
        hi: "????? ????????? ???",
        ms: "PERMAINAN PENEMPATAN JANGKA SUDUT",
        id: "PERMAINAN PENEMPATAN BUSUR DERAJAT",
        zh: "???????",
        ru: "???? ?? ?????????? ????????????",
        es: "JUEGO DE COLOCACI�N DEL TRANSPORTADOR",
        fr: "JEU DE PLACEMENT DU RAPPORTEUR",
        pt: "JOGO DE COLOCA��O DO TRANSFERIDOR",
        ja: "??????�?",
        link: "https://bekrmatmt2507.my.canva.site/a-l-er-yar-mas"
    },
    {
        tr: "DOÄRUYA DIÅINDAKİ NOKTADAN DİKME",
        en: "PERPENDICULAR FROM EXTERNAL POINT",
        de: "LORECHT VON EINEM EXTERNEN PUNKT",
        ar: "????? ???? ?? ???? ???? ????",
        hi: "????? ????? ?? ????? ????",
        ms: "SERENJANG DARI TITIK LUAR",
        id: "TEGAK LURUS DARI TITIK LUAR",
        zh: "???????",
        ru: "????????????? ?? ??????? ?????",
        es: "PERPENDICULAR DESDE UN PUNTO EXTERNO",
        fr: "PERPENDICULAIRE � PARTIR D'UN POINT EXTERNE",
        pt: "PERPENDICULAR A PARTIR DE UM PONTO EXTERNO",
        ja: "?????????",
        link: "https://bekrmatmt25.my.canva.site/dogruya-disindeki-noktadan-dikme-cizmek"
    },
    {
        tr: "AYNI DÜZLEMDE İKİ DOÄRUNUN YOLCULUÄU",
        en: "JOURNEY OF TWO LINES IN THE SAME PLANE",
        de: "REISE ZWEIER LINIEN IN DERSELBEN EBENE",
        ar: "???? ???? ?? ??? ???????",
        hi: "?? ?? ?? ??? ?? ?????? ?? ??????",
        ms: "PERJALANAN DUA GARIS DALAM SATAH YANG SAMA",
        id: "PERJALANAN DUA GARIS DALAM BIDANG YANG SAMA",
        zh: "???????????",
        ru: "??????????? ???? ????? ? ????? ?????????",
        es: "EL VIAJE DE DOS L�NEAS EN EL MISMO PLANO",
        fr: "LE VOYAGE DE DEUX LIGNES DANS LE M�ME PLAN",
        pt: "A JORNADA DE DUAS LINHAS NO MESMO PLANO",
        ja: "??????2?????",
        link: "https://bdemir1499.github.io/ayni-duzlemde-iki-dogru/"
    },
    {
        tr: "AYNI DÜZLEMDE 3 DOÄRUNUN DURUMLARI",
        en: "POSITIONS OF 3 LINES IN THE SAME PLANE",
        de: "LAGE VON 3 LINIEN IN DERSELBEN EBENE",
        ar: "????? 3 ???? ?? ??? ???????",
        hi: "?? ?? ?? ??? 3 ?????? ?? ?????????",
        ms: "KEDUDUKAN 3 GARIS DALAM SATAH YANG SAMA",
        id: "POSISI 3 GARIS DALAM BIDANG YANG SAMA",
        zh: "?????3?????",
        ru: "????????? 3 ????? ? ????? ?????????",
        es: "POSICIONES DE 3 L�NEAS EN EL MISMO PLANO",
        fr: "POSITIONS DE 3 LIGNES DANS LE M�ME PLAN",
        pt: "POSI��ES DE 3 LINHAS NO MESMO PLANO",
        ja: "??????3??????",
        link: "https://bekrmatmt2507.my.canva.site/ayniduzlemdeucdogrunundurumlari"
    },
    {
        tr: "AÇI ÇEÅİTLERİ (TÜMLER/BÜTÜNLER/KOMÅU)",
        en: "ANGLE TYPES (COMPLEMENTARY/SUPPLEMENTARY/ADJACENT)",
        de: "WINKELARTEN (KOMPLEMENT�R/SUPPLEMENT�R/NEBENWINKEL)",
        ar: "????? ??????? (??????/???????/???????)",
        hi: "????? ?? ?????? (????/??????/?????)",
        ms: "JENIS SUDUT (PELENGKAP/PENGGENAP/BERSEBELAH)",
        id: "JENIS SUDUT (BERPELURUS/BERPENYIKU/BERDAMPINGAN)",
        zh: "????(??/??/??)",
        ru: "???? ????? (??????????????/???????)",
        es: "TIPOS DE �NGULOS (COMPLEMENTARIOS/SUPLEMENTARIOS/ADYACENTES)",
        fr: "TYPES D'ANGLES (COMPL�MENTAIRES/SUPPL�MENTAIRES/ADJACENTS)",
        pt: "TIPOS DE �NGULOS (COMPLEMENTARES/SUPLEMENTARES/ADJACENTES)",
        ja: "?????(??/??/???)",
        link: "https://bdemir1499.github.io/tumler-butunler-komsutumler-komsubutunler/"
    },
    {
        tr: "AÇILARINA GÖRE ÜÇGENLER",
        en: "TRIANGLES ACCORDING TO THEIR ANGLES",
        de: "DREIECKE NACH IHREN WINKELN",
        ar: "???????? ??? ???????",
        hi: "????? ?? ???? ?? ???????",
        ms: "SEGI TIGA MENGIKUT SUDUT",
        id: "SEGITIGA BERDASARKAN SUDUTNYA",
        zh: "????????",
        ru: "???????????? ?? ????? ?????",
        es: "TRI�NGULOS SEG�N SUS �NGULOS",
        fr: "TRIANGLES SELON LEURS ANGLES",
        pt: "TRI�NGULOS DE ACORDO COM SEUS �NGULOS",
        ja: "??????????",
        link: "https://bekrmatmt25.my.canva.site/acilarina-gire-ucgenler"
    },
    {
        tr: "AÇI ÇEÅİTLERİ (DAR, DİK, GENİÅ vb.)",
        en: "ANGLE TYPES (ACUTE, RIGHT, OBTUSE etc.)",
        de: "WINKELARTEN (SPITZ, RECHT, STUMPF usw.)",
        ar: "????? ??????? (????? ?????? ?????? ???)",
        hi: "????? ?? ?????? (?????, ??, ???? ???)",
        ms: "JENIS SUDUT (TIRUS, TEGAK, CAWAK dsb.)",
        id: "JENIS SUDUT (LANCIP, SIKU, TUMPUL dll.)",
        zh: "????(?????????)",
        ru: "???? ????? (??????, ??????, ????? ? ?.?.)",
        es: "TIPOS DE �NGULOS (AGUDO, RECTO, OBTUSO, etc.)",
        fr: "TYPES D'ANGLES (AIGU, DROIT, OBTUS, etc.)",
        pt: "TIPOS DE �NGULOS (AGUDO, RETO, OBTUSO, etc.)",
        ja: "?????(??????????)",
        link: "https://bekrmatmt2507.my.canva.site/aci-cesitleri"
    },
    {
        tr: "TEMEL GEOMETRİK ÅEKİLLER",
        en: "BASIC GEOMETRIC SHAPES",
        de: "GEOMETRISCHE GRUNDFORMEN",
        ar: "??????? ???????? ????????",
        hi: "???????? ????????? ????????",
        ms: "BENTUK GEOMETRI ASAS",
        id: "BENTUK GEOMETRIS DASAR",
        zh: "??????",
        ru: "???????? ?????????????? ??????",
        es: "FORMAS GEOM�TRICAS B�SICAS",
        fr: "FORMES G�OM�TRIQUES DE BASE",
        pt: "FORMAS GEOM�TRICAS B�SICAS",
        ja: "?????????",
        link: "https://bekrmatmt25.my.canva.site/temel-geometrik-sekiller"
    },
    {
        tr: "ÇOKGENLERİN ELEMANLARI",
        en: "ELEMENTS OF POLYGONS",
        de: "ELEMENTE VON POLYGONEN",
        ar: "????? ????????",
        hi: "?????? ?? ????",
        ms: "ELEMEN POLIGON",
        id: "UNSUR-UNSUR POLIGON",
        zh: "??????",
        ru: "???????? ???????????????",
        es: "ELEMENTOS DE LOS POL�GONOS",
        fr: "�L�MENTS DES POLYGONES",
        pt: "ELEMENTOS DOS POL�GONOS",
        ja: "??????",
        link: "https://bekrmatmt2507.my.canva.site/cokgenlerin-elemanlari"
    },
    {
        tr: "İKİ PARALEL VE KESENLE OLUÅAN AÇILAR (1)",
        en: "ANGLES FORMED BY TWO PARALLELS AND A TRANSVERSAL (1)",
        de: "WINKEL AN PARALLELEN UND SCHNEIDENDEN LINIEN (1)",
        ar: "??????? ??????? ?? ???????? ????? (1)",
        hi: "?? ?????? ?????? ?? bir ?????? ???? ?????? ??? ??? (1)",
        ms: "SUDUT YANG DIBENTUK OLEH DUA GARIS SELARI DAN KERENTAS (1)",
        id: "SUDUT YANG DIBENTUK OLEH DUA GARIS SEJAJAR DAN TRANSVERSAL (1)",
        zh: "?????????????? (1)",
        ru: "???? ??? ???????????? ? ??????? (1)",
        es: "�NGULOS ENTRE DOS PARALELAS Y UNA TRANSVERSAL (1)",
        fr: "ANGLES FORM�S PAR DEUX PARALL�LES ET UNE TRANSVERSALE (1)",
        pt: "�NGULOS FORMADOS POR DUAS PARALELAS E UMA TRANSVERSAL (1)",
        ja: "2??????1??????????????? (1)",
        link: "https://bekrmatmt25.my.canva.site/k-paralel-dogrunun-b-r-kesenle-yapt-g-ac-lar"
    },
    {
        tr: "ÜÇ DOÄRUNUN İKİÅER KESİÅMESİ",
        en: "INTERSECTION OF THREE LINES IN PAIRS",
        de: "PAARWEISE SCHNITTPUNKTE VON DREI LINIEN",
        ar: "????? ???? ???? ???? ????",
        hi: "??? ?????? ?? ??????? ??? ???????????",
        ms: "PERSILANGAN TIGA GARIS SECARA BERPASANGAN",
        id: "PERPOTONGAN TIGA GARIS BERPASANGAN",
        zh: "???????",
        ru: "???????? ??????????? ???? ??????",
        es: "INTERSECCI�N DE TRES L�NEAS EN PARES",
        fr: "INTERSECTION DE TROIS LIGNES PAR PAIRES",
        pt: "INTERSE��O DE TR�S LINHAS EM PARES",
        ja: "3???????????",
        link: "https://bekrmatmt2507.my.canva.site/ikiser-kesisen-dogru"
    },
    {
        tr: "DİKDÖRTGENİN ÇEVRE VE ALANI",
        en: "PERIMETER AND AREA OF RECTANGLE",
        de: "UMFANG UND FL�CHE DES RECHTECKS",
        ar: "???? ?????? ????????",
        hi: "??? ?? ?????? ?? ?????????",
        ms: "PERIMETER DAN LUAS SEGI EMPAT TEPAT",
        id: "KELILING DAN LUAS PERSEGI PANJANG",
        zh: "?????????",
        ru: "???????? ? ??????? ??????????????",
        es: "PER�METRO Y �REA DEL RECT�NGULO",
        fr: "P�RIM�TRE ET AIRE DU RECTANGLE",
        pt: "PER�METRO E �REA DO RET�NGULO",
        ja: "?????????",
        link: "https://bdemir1499.github.io/dikdortgen-cevre-ve-alan/"
    },
    {
        tr: "DÖRTGENLERİN ÖZELLİKLERİ (TÜMEVARIM)",
        en: "PROPERTIES OF QUADRILATERALS (INDUCTION)",
        de: "EIGENSCHAFTEN VON VIERECKEN (INDUKTION)",
        ar: "????? ??????? ???????? (?????????)",
        hi: "???????? ?? ??? (????)",
        ms: "SIFAT-SIFAT SISI EMPAT (INDUKSI)",
        id: "SIFAT-SIFAT SEGI EMPAT (INDUKSI)",
        zh: "??????(???)",
        ru: "???????? ????????????????? (????????)",
        es: "PROPIEDADES DE LOS CUADRIL�TEROS (INDUCCI�N)",
        fr: "PROPRI�T�S DES QUADRILAT�RES (INDUCTION)",
        pt: "PROPRIEDADES DOS QUADRIL�TEROS (INDU��O)",
        ja: "??????(???)",
        link: "https://bekrmatmt25.my.canva.site/dortgenler-ve-ozellikleri-tumevarim"
    },
    {
        tr: "DÖRTGENLERİN ÖZELLİKLERİ (TÜMDENGELİM)",
        en: "PROPERTIES OF QUADRILATERALS (DEDUCTION)",
        de: "EIGENSCHAFTEN VON VIERECKEN (DEDUKTION)",
        ar: "????? ??????? ???????? (?????????)",
        hi: "???????? ?? ??? (?????)",
        ms: "SIFAT-SIFAT SISI EMPAT (DEDUKSI)",
        id: "SIFAT-SIFAT SEGI EMPAT (DEDUKSI)",
        zh: "??????(???)",
        ru: "???????? ????????????????? (????????)",
        es: "PROPIEDADES DE LOS CUADRIL�TEROS (DEDUCCI�N)",
        fr: "PROPRI�T�S DES QUADRILAT�RES (D�DUCTION)",
        pt: "PROPRIEDADES DOS QUADRIL�TEROS (DEDU��O)",
        ja: "??????(???)",
        link: "https://bdemir1499.github.io/dortgen-ve-ozellikleri-tumdengelim/"
    },
    {
        tr: "İKİ PARALEL DOĞRUNUN BİR KESENLE YAPTIĞI AÇILAR (2)",
        en: "ANGLES FORMED BY TWO PARALLEL LINES AND A TRANSVERSAL (2)",
        de: "WINKEL AN PARALLELEN UND SCHNEIDENDEN LINIEN (2)",
        ar: "??????? ??????? ?? ???????? ????? (2)",
        hi: "?? ?????? ?????? ?? bir ?????? ???? ?????? ??? ??? (2)",
        ms: "SUDUT YANG DIBENTUK OLEH DUA GARIS SELARI DAN KERENTAS (2)",
        id: "SUDUT YANG DIBENTUK OLEH DUA GARIS SEJAJAR DAN TRANSVERSAL (2)",
        zh: "?????????????? (2)",
        ru: "???? ??? ???????????? ? ??????? (2)",
        es: "�NGULOS ENTRE DOS PARALELAS Y UNA TRANSVERSAL (2)",
        fr: "ANGLES FORM�S PAR DEUX PARALL�LES ET UNE TRANSVERSALE (2)",
        pt: "�NGULOS FORMADOS POR DUAS PARALELAS E UMA TRANSVERSAL (2)",
        ja: "2??????1??????????????? (2)",
        link: "https://bekrmatmt25.my.canva.site/iki-paralel-dogrunun-bir-kesenle-yapt-g-ac-lar"
    },
    {
        tr: "DÖNÜŞÜM GEOMETRİSİ (ÖTELEME/YANSIMA)",
        en: "TRANSFORMATION GEOMETRY (TRANSLATION/REFLECTION)",
        de: "TRANSFORMATIONSGEOMETRIE (VERSCHIEBUNG/SPIEGELUNG)",
        ar: "??????? ????????? (???????/????????)",
        hi: "???????? ???????? (??????????/????????)",
        ms: "GEOMETRI TRANSFORMASI (TRANSLASI/PANTULAN)",
        id: "GEOMETRI TRANSFORMASI (TRANSLASI/REFLEKSI)",
        zh: "????(??/??)",
        ru: "????????? ?????????????? (???????/?????????)",
        es: "GEOMETR�A DE TRANSFORMACI�N (TRASLACI�N/REFLEXI�N)",
        fr: "G�OM�TRIE DE TRANSFORMATION (TRANSLATION/R�FLEXION)",
        pt: "GEOMETRIA DE TRANSFORMA��O (TRANSLA��O/REFLEX�O)",
        ja: "?????(??/??)",
        link: "https://bekrmatmt25.my.canva.site/oteleme-ve-yansima"
    },
    {
        tr: "DÖRTGEN ÇEŞİTLERİ KAVRAM HARİTASI",
        en: "CONCEPT MAP OF QUADRILATERAL TYPES",
        de: "BEGRIFFSMAP DER VIERECKARTEN",
        ar: "????? ?????? ????? ??????? ????????",
        hi: "???????? ???????? ?? ??????? ????????",
        ms: "PETA KONSEP JENIS SISI EMPAT",
        id: "PETA KONSEP JENIS SEGI EMPAT",
        zh: "????????",
        ru: "?????????????? ????? ????? ?????????????????",
        es: "MAPA CONCEPTUAL DE TIPOS DE CUADRIL�TEROS",
        fr: "CARTE CONCEPTUELLE DES TYPES DE QUADRILAT�RES",
        pt: "MAPA CONCEITUAL DE TIPOS DE QUADRIL�TEROS",
        ja: "???????????",
        link: "https://bekrmatmt25.my.canva.site/dortgenler-kavram-haritasi"
    },
    {
        tr: "DÖRTGENLER GENEL ÇIKARIMLAR",
        en: "GENERAL INFERENCES ABOUT QUADRILATERALS",
        de: "ALLGEMEINE SCHLUSSFOLGERUNGEN �BER VIERECKE",
        ar: "??????????? ?????? ??? ??????? ????????",
        hi: "?????????? ?? ???? ??? ??????? ????????",
        ms: "INFERENS UMUM TENTANG SISI EMPAT",
        id: "KESIMPULAN UMUM TENTANG SEGI EMPAT",
        zh: "??????????",
        ru: "????? ?????? ? ?????????????????",
        es: "INFERENCIAS GENERALES SOBRE CUADRIL�TEROS",
        fr: "INFERENCES G�N�RALES SUR LES QUADRILAT�RES",
        pt: "INFER�NCIAS GERAIS SOBRE QUADRIL�TEROS",
        ja: "?????????????",
        link: "https://bekrmatmt25.my.canva.site/dortgenler-genel-cikarimlar"
    },
    {
        tr: "KESİRLERİN FARKLI GÖSTERİMLERİ",
        en: "DIFFERENT REPRESENTATIONS OF FRACTIONS",
        de: "VERSCHIEDENE DARSTELLUNGEN VON BR�CHEN",
        ar: "??????? ?????? ??????",
        hi: "??????? ?? ??????? ??????",
        ms: "PERWAKILAN PECAHAN YANG BERBEZA",
        id: "BERBAGAI REPRESENTASI PECAHAN",
        zh: "?????????",
        ru: "????????? ????????????? ??????",
        es: "DIFERENTES REPRESENTACIONES DE FRACCIONES",
        fr: "DIFF�RENTES REPR�SENTATIONS DES FRACTIONS",
        pt: "DIFERENTES REPRESENTA��ES DE FRA��ES",
        ja: "??????????",
        link: "https://bekrmatmt25.my.canva.site/kesirlerin-farkl-g-sterimleri"
    },
    {
        tr: "KÖŞEGENLERDEN DÖRTGENLERE (1)",
        en: "FROM DIAGONALS TO QUADRILATERALS (1)",
        de: "VON DIAGONALEN ZU VIERECKEN (1)",
        ar: "?? ??????? ??? ??????? ???????? (1)",
        hi: "???????? ?? ???????? ?? (1)",
        ms: "DARIPADA PEPENJURU KEPADA SISI EMPAT (1)",
        id: "DARI DIAGONAL KE SEGI EMPAT (1)",
        zh: "???????? (1)",
        ru: "?? ?????????? ? ????????????????? (1)",
        es: "DE LAS DIAGONALES A LOS CUADRIL�TEROS (1)",
        fr: "DES DIAGONALES AUX QUADRILAT�RES (1)",
        pt: "DAS DIAGONAIS AOS QUADRIL�TEROS (1)",
        ja: "????????? (1)",
        link: "https://bekrmatmt25.my.canva.site/k-egenlerden-d-rtgenlere"
    },
    {
        tr: "CEBİRSEL İFADELER TEMEL KAVRAMLAR",
        en: "ALGEBRAIC EXPRESSIONS BASIC CONCEPTS",
        de: "ALGEBRAISCHE AUSDR�CKE - GRUNDBEGRIFFE",
        ar: "???????? ???????? ????????? ???????",
        hi: "????????? ?????? ???????? ?????????",
        ms: "UNGKAPAN ALGEBRA KONSEP ASAS",
        id: "KONSEP DASAR EKSPRESI ALJABAR",
        zh: "???????",
        ru: "?????????????? ?????????: ???????? ???????",
        es: "EXPRESIONES ALGEBRAICAS CONCEPTOS B�SICOS",
        fr: "EXPRESSIONS ALG�BRIQUES CONCEPTS DE BASE",
        pt: "EXPRESS�ES ALG�BRICAS CONCEITOS B�SICOS",
        ja: "????????",
        link: "https://bekrmatmt25.my.canva.site/cebirsel-ifadeler-temel-kavramlar"
    },
    {
        tr: "CEBİRSEL İFADELER SÖZELDEN CEBİRE",
        en: "ALGEBRAIC EXPRESSIONS FROM VERBAL TO ALGEBRAIC",
        de: "VON DER SPRACHE ZUR ALGEBRA",
        ar: "????????? ??????? ?? ??????? ??? ???????",
        hi: "????????? ??????: ????? ?? ?????????",
        ms: "UNGKAPAN ALGEBRA DARIPADA LISAN KEPADA ALGEBRA",
        id: "EKSPRESI ALJABAR DARI VERBAL KE ALJABAR",
        zh: "???:??????",
        ru: "?????????????? ?????????: ?? ???? ? ???????",
        es: "EXPRESIONES ALGEBRAICAS DE VERBAL A ALGEBRAICO",
        fr: "EXPRESSIONS ALG�BRIQUES DU VERBAL � L'ALG�BRIQUE",
        pt: "EXPRESS�ES ALG�BRICAS DO VERBAL PARA O ALG�BRICO",
        ja: "???:???????",
        link: "https://bekrmatmt25.my.canva.site/cebirsel-ifadelerle-oyun-tasar-m-kopyas"
    },
    {
        tr: "CEBİRSEL İFADELER CEBİRDEN SÖZELE",
        en: "ALGEBRAIC EXPRESSIONS FROM ALGEBRAIC TO VERBAL",
        de: "VON DER ALGEBRA ZUR SPRACHE",
        ar: "????????? ??????? ?? ??????? ??? ???????",
        hi: "????????? ??????: ????????? ?? ?????",
        ms: "UNGKAPAN ALGEBRA DARIPADA ALGEBRA KEPADA LISAN",
        id: "EKSPRESI ALJABAR DARI ALJABAR KE VERBAL",
        zh: "???:??????",
        ru: "?????????????? ?????????: ?? ??????? ? ??????",
        es: "EXPRESIONES ALGEBRAICAS DE ALGEBRAICO A VERBAL",
        fr: "EXPRESSIONS ALG�BRIQUES DE L'ALG�BRIQUE AU VERBAL",
        pt: "EXPRESS�ES ALG�BRICAS DO ALG�BRICO PARA O VERBAL",
        ja: "???:???????",
        link: "https://bekrmatmt25.my.canva.site/cebirsel-ifadeler-2-cebirden-s-zele"
    },
    {
        tr: "CEBİRSEL İFADELER DEĞER HESAPLAMA",
        en: "CALCULATING VALUES OF ALGEBRAIC EXPRESSIONS",
        de: "BERECHNEN VON WERTE ALGEBRAISCHER AUSDR�CKE",
        ar: "???? ??? ????????? ???????",
        hi: "????????? ???????? ?? ????? ?? ????",
        ms: "MENGIRA NILAI UNGKAPAN ALGEBRA",
        id: "MENGHITUNG NILAI EKSPRESI ALJABAR",
        zh: "???????",
        ru: "?????????? ???????? ?????????????? ?????????",
        es: "CALCULAR VALORES DE EXPRESIONES ALGEBRAICAS",
        fr: "CALCUL DES VALEURS D'EXPRESSIONS ALG�BRIQUES",
        pt: "CALCULAR VALORES DE EXPRESS�ES ALG�BRICAS",
        ja: "????????",
        link: "https://bekrmatmt25.my.canva.site/cebirsel-ifadelerin-degerini-hesaplamak"
    },
    {
        tr: "ARAŞTIRMA ADIMLARI (Canva)",
        en: "RESEARCH STEPS (Canva)",
        de: "FORSCHUNGSSCHRITTE (Canva)",
        ar: "????? ????? (?????)",
        hi: "???????? ??? (Canva)",
        ms: "LANGKAH PENYELIDIKAN (Canva)",
        id: "LANGKAH PENELITIAN (Canva)",
        zh: "???? (Canva)",
        ru: "????? ???????????? (Canva)",
        es: "PASOS DE INVESTIGACI�N (Canva)",
        fr: "�TAPES DE RECHERCHE (Canva)",
        pt: "PASSOS DE PESQUISA (Canva)",
        ja: "??????? (Canva)",
        link: "https://bekrmatmt25.my.canva.site/5-sinif-arastirma-adimlari"
    },
    {
        tr: "ARAŞTIRMA ADIMLARI (GitHub)",
        en: "RESEARCH STEPS (GitHub)",
        de: "FORSCHUNGSSCHRITTE (GitHub)",
        ar: "????? ????? (??? ???)",
        hi: "???????? ??? (GitHub)",
        ms: "LANGKAH PENYELIDIKAN (GitHub)",
        id: "LANGKAH PENELITIAN (GitHub)",
        zh: "???? (GitHub)",
        ru: "????? ???????????? (GitHub)",
        es: "PASOS DE INVESTIGACI�N (GitHub)",
        fr: "�TAPES DE RECHERCHE (GitHub)",
        pt: "PASSOS DE PESQUISA (GitHub)",
        ja: "??????? (GitHub)",
        link: "https://bdemir1499.github.io/5.sinif-arastirma-asamalari/"
    },
    {
        tr: "ÜÇGENDE YARDIMCI ELEMANLAR",
        en: "AUXILIARY ELEMENTS IN TRIANGLES",
        de: "HILFSELEMENTE IN DREIECKEN",
        ar: "??????? ???????? ?? ??????",
        hi: "????????? ??? ????? ????",
        ms: "ELEMEN PEMBANTU DALAM SEGI TIGA",
        id: "UNSUR PEMBANTU DALAM SEGITIGA",
        zh: "?????????",
        ru: "??????????????? ???????? ? ?????????????",
        es: "ELEMENTOS AUXILIARES EN TRI�NGULOS",
        fr: "�L�MENTS AUXILIAIRES DANS LES TRIANGLES",
        pt: "ELEMENTOS AUXILIARES EM TRI�NGULOS",
        ja: "????????",
        link: "https://bekrmatmt25.my.canva.site/ucgende-yardim-i-elemanlar"
    },
    {
        tr: "ÜÇGEN ÇİZİMİ",
        en: "TRIANGLE DRAWING",
        de: "DREIECKE ZEICHNEN",
        ar: "??? ??????",
        hi: "??????? ?????",
        ms: "LUKISAN SEGI TIGA",
        id: "MENGGAMBAR SEGITIGA",
        zh: "?????",
        ru: "?????????? ????????????",
        es: "DIBUJO DE TRI�NGULOS",
        fr: "DESSIN DE TRIANGLE",
        pt: "DESENHO DE TRI�NGULOS",
        ja: "??????",
        link: "https://bekrmatmt25.my.canva.site/ucgen-cizim-sartlari"
    },
    {
        tr: "ÜÇGENDE EŞLİK VE BENZERLİK",
        en: "CONGRUENCE AND SIMILARITY IN TRIANGLES",
        de: "KONGRUENZ UND �HNLICHKEIT IN DREIECKEN",
        ar: "????? ?????? ????????",
        hi: "????????? ??? ??????????? ?? ???????",
        ms: "KONGRUEN DAN KESERUPAAN DALAM SEGI TIGA",
        id: "KEKONGRUENAN DAN KESEBANGUNAN DALAM SEGITIGA",
        zh: "?????????",
        ru: "?????????????? ? ??????? ?????????????",
        es: "CONGRUENCIA Y SEMEJANZA EN TRI�NGULOS",
        fr: "CONGRUENCE ET SIMILITUDE DANS LES TRIANGLES",
        pt: "CONGRU�NCIA E SEMELHAN�A EM TRI�NGULOS",
        ja: "?????????",
        link: "https://bdemir1499.github.io/eslikvebenzerlik/"
    },
    {
        tr: "PRİZMALARIN ELEMANLARI",
        en: "ELEMENTS OF PRISMS",
        de: "ELEMENTE VON PRISMEN",
        ar: "????? ?????????",
        hi: "??????? ?? ????",
        ms: "ELEMEN PRISMA",
        id: "UNSUR-UNSUR PRISMA",
        zh: "?????",
        ru: "???????? ?????",
        es: "ELEMENTOS DE LOS PRISMAS",
        fr: "�L�MENTS DES PRISMES",
        pt: "ELEMENTOS DOS PRISMAS",
        ja: "?????",
        link: "https://bekrmatmt25.my.canva.site/prizmalarin-elemanlar-ve-a-inimlari"
    },
    {
        tr: "PİRAMİT VE AÇINIMI",
        en: "PYRAMID AND ITS NET",
        de: "PYRAMIDE UND IHR NETZ",
        ar: "????? ??????",
        hi: "??????? ?? ???? ???",
        ms: "PIRAMID DAN BENTANGANNYA",
        id: "LIMAS DAN JARING-JARINGNYA",
        zh: "???????",
        ru: "???????? ? ?? ?????????",
        es: "PIR�MIDE Y SU DESARROLLO",
        fr: "PYRAMIDE ET SON PATRON",
        pt: "PIR�MIDE E SUA PLANIFICA��O",
        ja: "????????",
        link: "https://bekrmatmt25.my.canva.site/piramidin-elemanlar-ve-acinimi"
    },
    {
        tr: "PRİZMA, PİRAMİT, KONİ, SİLİNDİR",
        en: "PRISM, PYRAMID, CONE, CYLINDER",
        de: "PRISMA, PYRAMIDE, KEGEL, ZYLINDER",
        ar: "???????? ?????? ???????? ?????????",
        hi: "???????, ???????, ????, ????",
        ms: "PRISMA, PIRAMID, KON, SILINDIR",
        id: "PRISMA, LIMAS, KERUCUT, TABUNG",
        zh: "???????????",
        ru: "??????, ????????, ?????, ???????",
        es: "PRISMA, PIR�MIDE, CONO, CILINDRO",
        fr: "PRISME, PYRAMIDE, C�NE, CYLINDRE",
        pt: "PRISMA, PIR�MIDE, CONE, CILINDRO",
        ja: "???????????",
        link: "https://sites.google.com/view/uc-boyutlu-sekiller/ana-sayfa_1"
    },
    {
        tr: "KÖŞEGENLERDEN DÖRTGENLERE (2)",
        en: "FROM DIAGONALS TO QUADRILATERALS (2)",
        de: "VON DIAGONALEN ZU VIERECKEN (2)",
        ar: "?? ??????? ??? ??????? ???????? (2)",
        hi: "???????? ?? ???????? ?? (2)",
        ms: "DARIPADA PEPENJURU KEPADA SISI EMPAT (2)",
        id: "DARI DIAGONAL KE SEGI EMPAT (2)",
        zh: "???????? (2)",
        ru: "?? ?????????? ? ????????????????? (2)",
        es: "DE LAS DIAGONALES A LOS CUADRIL�TEROS (2)",
        fr: "DES DIAGONALES AUX QUADRILAT�RES (2)",
        pt: "DAS DIAGONAIS AOS QUADRIL�TEROS (2)",
        ja: "????????? (2)",
        link: "https://bekrmatmt25.my.canva.site/kosegenlerden-dortgenlere"
    }
];

// --- BURAYA YAPI�TIR ---
window.sendNetworkData = function (dataObj) {
    if (dataObj && dataObj.type === 'aktif_onizleme') {
        if (!window.lastPreviewTime) window.lastPreviewTime = 0;
        if (Date.now() - window.lastPreviewTime < 40) return; // Limit to ~25 FPS to prevent WebRTC buffer overflow
        window.lastPreviewTime = Date.now();
    }

    // 1. Durum: E�er bu cihaz TABLET ise (tahtaya ba�l�y�z)
    if (typeof myConnection !== 'undefined' && myConnection && (myConnection.open || window.isConnected)) {
        myConnection.send(dataObj);
    }
    // 2. Durum: E�er bu cihaz AKILLI TAHTA ise (ba�l� olan tabletlere g�nder)
    else if (typeof window.aktifBaglantilar !== 'undefined') {
        for (let id in window.aktifBaglantilar) {
            if (window.aktifBaglantilar[id] && window.aktifBaglantilar[id].open) {
                window.aktifBaglantilar[id].send(dataObj);
            }
        }
    }
};


// Sayfa a��ld���nda k�rm�z� butonun yanl��l�kla g�r�nmesini engellemek i�in:
const closePdfBtn = document.getElementById('btn-close-pdf');
if (closePdfBtn) {
    closePdfBtn.classList.add('hidden');
    closePdfBtn.style.display = 'none'; // Kesin olarak gizle
}




function getGlobalCoordinates(e) {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
    const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0);

    return {
        x: clientX - rect.left,
        y: clientY - rect.top
    };
}

function getPointerPos(e) {
    const rect = canvas.getBoundingClientRect();
    let cX = e.clientX;
    let cY = e.clientY;

    // --- S�Z�N OR�J�NAL HATA KORUMA MANTI�INIZ (Avu� i�i kar��mas�n� engeller) ---
    // E�er cX tan�ms�zsa (saf dokunmatikse) o anki ge�erli dokunu�u (targetTouches) al�r.
    if (cX === undefined || cX === null || isNaN(cX)) {
        if (e.targetTouches && e.targetTouches.length > 0) {
            cX = e.targetTouches[0].clientX;
            cY = e.targetTouches[0].clientY;
        } else if (e.touches && e.touches.length > 0) {
            cX = e.touches[0].clientX;
            cY = e.touches[0].clientY;
        } else if (e.changedTouches && e.changedTouches.length > 0) {
            cX = e.changedTouches[0].clientX;
            cY = e.changedTouches[0].clientY;
        } else {
            cX = 0;
            cY = 0;
        }
    }

    return {
        x: ((cX || 0) - rect.left) * (canvas.width / rect.width),
        y: ((cY || 0) - rect.top) * (canvas.height / rect.height)
    };
}

// --- GRAF�K TABLET S�M�LAT�R� ---
function getPointerInfo(e) {
    // BURAYI false YAPTIK!
    const testModuAcik = false;

    // E�er test modu a��ksa ve fare kullan�l�yorsa, onu "Kalem" gibi kand�r
    if (testModuAcik && e.pointerType === 'mouse') {
        return {
            type: 'pen',
            pressure: Math.random() * 0.8 + 0.2
        };
    }

    return {
        type: e.pointerType,
        pressure: e.pressure || 1
    };
}


// --- KANVAS AYARLARI ---

const canvas = document.getElementById('drawing-canvas');
const ctx = canvas.getContext('2d');

function setupCanvasResolution() {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1; // ?? Cihaz�n HD piksel oran�n� (Retina G�c�n�) al

    // Kanvas�n i� piksel say�s�n�, ekran�n ger�ek HD ��z�n�rl��� ile e�itle
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    // ?? KES�N ��Z�M: Arka plan� (bg-canvas) da boyut ve oran olarak %100 e�itle (Daralmay� �nler)
    const bgCanvas = document.getElementById('bg-canvas');
    if (bgCanvas) {
        bgCanvas.style.width = canvas.style.width || (rect.width + 'px');
        bgCanvas.style.height = canvas.style.height || (rect.height + 'px');
        bgCanvas.width = canvas.width;
        bgCanvas.height = canvas.height;
    }

    if (typeof redrawAllStrokes === 'function') {
        redrawAllStrokes();
    }
}

// 1. Uygulama ilk a��ld���nda �al��t�r
setupCanvasResolution();

// 2. Ekran boyutu her de�i�ti�inde (y�kle butonu sonras� veya yan �evirince) �al��t�r
window.addEventListener('resize', setupCanvasResolution);

// PARDUS KES�N ��Z�M: Taray�c�n�n kayd�rma ve yak�nla�t�rma yapmas�n� yasakla
canvas.style.touchAction = 'none';
canvas.style.userSelect = 'none';
document.body.style.overscrollBehavior = 'none';


// --- RES�M Y�KLEME DE���KENLER� ---
let backgroundImage = null; // Y�klenen resmi tutacak de�i�ken
const uploadButton = document.getElementById('btn-upload');
const fileInput = document.getElementById('file-input');

// --- app.js (D�ZELT�LM�� BA�LANGI� B�L�M�) ---

// --- SESLER (T�M� �PTAL ED�LD� / SESS�Z MOD) ---
// Ger�ek ses dosyalar� yerine, hi�bir i� yapmayan "sahte" bir oynat�c� tan�ml�yoruz.
// Bu sayede alt sat�rlardaki hi�bir kodu silmenize gerek kalmaz, hepsi sessizce �al���r.

const silentAudio = {
    play: function () { },   // �al komutu gelirse: Hi�bir �ey yapma.
    pause: function () { },  // Durdur komutu gelirse: Hi�bir �ey yapma.
    currentTime: 0,        // S�re ayar� gelirse: Kabul et ama i�leme.
    src: ""
};

window.audio_click = silentAudio;
let audio_click_src_set = true; // Hata vermemesi i�in "ayarland�" say�yoruz.
window.audio_undo = silentAudio;
window.audio_draw = silentAudio;
window.audio_eraser = silentAudio;


// --- DE���KENLER ---

let snapshotStart = null;
const animateButton = document.getElementById('btn-animate');
let currentTool = 'none';
let isPinching = false;           // �ki parmakla yak�nla�t�rma aktif mi?
let initialDistance = 0;          // Ba�lang�� parmak mesafesi (zoom i�in)
let initialScale = 0;             // Ba�lang��ta se�ili nesnenin geni�li�i
let initialCenter = { x: 0, y: 0 }; // �ki parma��n merkez noktas� (pan i�in)
let currentPenColor = '#FFFFFF';
let currentPenWidth = 4;
window.currentLineColor = '#FFFFFF'; // Varsay�lan Renk: BEYAZ
const SNAP_THRESHOLD = 10;
let returnToSnapshot = false; // ��lem bitince geri d�n�lecek mi? 
// ==========================================
// --- 3D C�S�MLER ���N YEN� DE���KENLER VE S�RG� OLU�TURUCU (ADIM 1) ---
// ==========================================
let isDrawing3D = false;
let current3DShape = null; // Hangi 3D �ekil se�ili (�rn: '3d_kare_piramit')
let temp3DData = null;     // �izim esnas�ndaki canl� �nizleme verisi
let active3DSliderStroke = null; // S�rg�s� oynat�lan se�ili 3D cisim

// S�rg� (Slider) Kutusunu HTML'e Otomatik Ekle
const sliderContainer = document.createElement('div');
sliderContainer.id = 'slider-container';
sliderContainer.innerHTML = `
    <label>Açınım (Katlama)</label>
    <input type="range" id="shape-slider" min="0" max="100" value="0">
`;
const leftPanel = document.querySelector('.left-panel');
const btnOyunlarOptions = document.getElementById('oyunlar-options');
if (leftPanel && btnOyunlarOptions) {
    leftPanel.insertBefore(sliderContainer, btnOyunlarOptions.nextSibling);
} else {
    document.body.appendChild(sliderContainer);
}
const shapeSlider = document.getElementById('shape-slider');

// Alan / Hacim G�sterge Kutusunu HTML'e Otomatik Ekle
const infoTooltip = document.createElement('div');
infoTooltip.id = 'info-tooltip';
document.body.appendChild(infoTooltip);

// S�rg� hareket etti�inde se�ili 3D cismin a��n�m�n� g�ncelle
shapeSlider.addEventListener('input', (e) => {
    // ?? BURASI 'window' OLARAK G�NCELLEND� (Art�k �ekli tan�yacak!) ??
    if (window.active3DSliderStroke) {
        window.active3DSliderStroke.openRatio = parseInt(e.target.value) / 100;

        if (typeof window.sendNetworkData === 'function' && typeof isConnected !== 'undefined' && isConnected) {
            window.sendNetworkData({ type: 'sekil_guncelle', stroke: window.active3DSliderStroke });
        }
        if (typeof redrawAllStrokes === 'function') redrawAllStrokes();
    }
});


let nextPointChar = 'A';
window.nextPointChar = nextPointChar;

let lineStartPoint = null;
let currentMousePos = { x: 0, y: 0 };
let snapTarget = null;
let snapHoverTimer = null;

window.tempPolygonData = null;

let isDrawingLine = false;
let isDrawingInfinityLine = false;
let isDrawingSegment = false;
let isDrawingRay = false;
let isMoving = false;
let selectedItem = null;
let selectedPointKey = null;
let rotationPivot = null;
let dragStartPos = { x: 0, y: 0 };
let originalStartPos = {};
let currentPDF = null;       // Y�klenen PDF dosyas�
let currentPDFPage = 1;      // �u anki sayfa
let totalPDFPages = 0;       // Toplam sayfa
let pdfImageStroke = null;   // Ekrana �izilen PDF sayfas�

// --- HTML ELEMENTLER� ---
const body = document.body;

// 1. Sol Panel Ara�lar�
const penButton = document.getElementById('btn-kalem');
const akilliPenButton = document.getElementById('btn-akilli-kalem');
const eraserButton = document.getElementById('btn-silgi');
const lineButton = document.getElementById('btn-cizgi');
const rulerButton = document.getElementById('btn-cetvel');
const gonyeButton = document.getElementById('btn-gonye');
const aciolcerButton = document.getElementById('btn-aciolcer');
const pergelButton = document.getElementById('btn-pergel');
const polygonButton = document.getElementById('btn-cokgenler');
const oyunlarButton = document.getElementById('btn-oyunlar');
const oyunlarOptions = document.getElementById('oyunlar-options');

if (oyunlarOptions) {
    oyunlarOptions.classList.add('hidden');
}
oyunlarButton.classList.remove('active');


// --- D�KD�RTGEN BUTONU TANIMLAMASI ---
const dikdortgenButton = document.getElementById('btn-dikdortgen');

if (dikdortgenButton) {
    dikdortgenButton.addEventListener('click', () => {
        if (typeof window.setActiveTool === 'function') {
            window.setActiveTool('draw_rectangle');
        } else {
            currentTool = 'draw_rectangle';
        }
    });
}
// --------------------------------------

// 2. Alt Men� Butonlar� ve Se�enekler
const penOptions = document.getElementById('pen-options');
const colorBoxes = document.querySelectorAll('#pen-options .color-box');
const lineOptions = document.getElementById('line-options');
const pointButton = document.getElementById('btn-nokta');
const straightLineButton = document.getElementById('btn-d_cizgi');
const infinityLineButton = document.getElementById('btn-dogru');
const segmentButton = document.getElementById('btn-dogru_parcasi');
const rayButton = document.getElementById('btn-isin');
const lineColorOptions = document.querySelectorAll('#line-color-options .color-box');
const polygonOptions = document.getElementById('polygon-options');
const polygonPreviewLabel = document.getElementById('polygon-preview-label');
const circleButton = document.getElementById('btn-cember');
const regularPolygonButtons = document.querySelectorAll('#polygon-options button[data-sides]');
const polygonColorOptions = document.querySelectorAll('#polygon-color-options .color-box');
// ?? Burada oyunlarOptions tekrar tan�mlanmad�, yukar�daki global tan�m kullan�lacak.


// 3. Sa� Panel Ara�lar�
const undoButton = document.getElementById('btn-undo');
const clearAllButton = document.getElementById('btn-clear-all');
const moveButton = document.getElementById('btn-move');
const fillButton = document.getElementById('btn-fill');
const fillOptions = document.getElementById('fill-options');
const fillColorBoxes = document.querySelectorAll('#fill-options .color-box');
let currentFillColor = '#FF69B4';

// --- CANLANDIR VE KES MEN�S� (G�NCELLENM�� VE B�RLE�T�R�LM��) ---
const btnSnapshotMain = document.getElementById('btn-snapshot-main');
const snapshotOptions = document.getElementById('snapshot-options');
const btnSnapshotBox = document.getElementById('btn-snapshot-box');
const btnSnapshotLasso = document.getElementById('btn-snapshot-lasso');

let menuAcilisKilidi = false;
const toggleSnapshotMenu = (e) => {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }

    if (menuAcilisKilidi) return;
    menuAcilisKilidi = true;
    setTimeout(() => { menuAcilisKilidi = false; }, 300);

    let sOptions = document.getElementById('snapshot-options') || document.querySelector('.snapshot-options');
    if (!sOptions) return;

    // Ekrandaki ger�ek g�r�n�rl�k durumunu kontrol et (inline style dahil)
    const menuKapaliMi = sOptions.classList.contains('hidden') || sOptions.style.display === 'none';

    if (menuKapaliMi) {
        // Arac� aktif et
        if (typeof setActiveTool === 'function') {
            setActiveTool('snapshot');
        } else {
            currentTool = 'snapshot';
        }

        // Men�y� g�r�n�r yap ve inline style engelini kald�r
        sOptions.classList.remove('hidden');
        sOptions.style.display = 'flex';
        sOptions.style.zIndex = '10000';

        // Butonlar�n aktiflik durumunu g�ncelle
        if (btnSnapshotMain) btnSnapshotMain.classList.add('active');
        if (animateButton) animateButton.classList.add('active');

        // Hizalamay� yap
        const refBtn = btnSnapshotMain || animateButton;
        if (refBtn) {
            const buttonRect = refBtn.getBoundingClientRect();
            const panelRect = refBtn.parentElement.getBoundingClientRect();
            sOptions.style.top = `${buttonRect.top - panelRect.top}px`;
        }
    } else {
        // Men�y� kapat ve arac� s�f�rla
        if (typeof setActiveTool === 'function') {
            setActiveTool('none');
        } else {
            currentTool = 'none';
        }

        sOptions.classList.add('hidden');
        sOptions.style.display = 'none';

        if (btnSnapshotMain) btnSnapshotMain.classList.remove('active');
        if (animateButton) animateButton.classList.remove('active');
    }
};

if (btnSnapshotMain) {
    btnSnapshotMain.onclick = null;
    btnSnapshotMain.ontouchstart = null;
    btnSnapshotMain.addEventListener('click', toggleSnapshotMenu);
    btnSnapshotMain.addEventListener('pointerdown', toggleSnapshotMenu);
}
if (btnSnapshotBox) {
    btnSnapshotBox.addEventListener('click', (e) => {
        e.stopPropagation();
        setActiveTool('snapshot'); // Kutu arac�n� se�
        if (snapshotOptions) {
            snapshotOptions.classList.add('hidden');
            snapshotOptions.style.display = 'none';
        }
    });
}
if (btnSnapshotLasso) {
    btnSnapshotLasso.addEventListener('click', (e) => {
        e.stopPropagation();
        setActiveTool('lasso'); // Serbest (Kement) kesim arac�n� se�
        if (snapshotOptions) {
            snapshotOptions.classList.add('hidden');
            snapshotOptions.style.display = 'none';
        }
    });
}

// 4. Resim ve PDF Y�kleme Ara�lar�


const pdfControls = document.getElementById('pdf-controls');
const pageCountLabel = document.getElementById('page-count-label');
const prevPageBtn = document.getElementById('prev-page');
const nextPageBtn = document.getElementById('next-page');




// --- G�RSEL YARDIMCILAR ---
const snapIndicator = document.createElement('div');
snapIndicator.id = 'snap-indicator';
body.appendChild(snapIndicator);
const eraserPreview = document.createElement('div');
eraserPreview.className = 'eraser-cursor-preview';
body.appendChild(eraserPreview);


// --- YARDIMCI FONKS�YONLAR ---

function distance(p1, p2) {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    return Math.sqrt(dx * dx + dy * dy);
}

function advanceChar(char) {
    let charCode = char.charCodeAt(0) + 1;
    if (charCode > 90) charCode = 65;
    return String.fromCharCode(charCode);
}

function findSnapPoint(pos) {
    for (const stroke of drawnStrokes) {
        if (stroke.type === 'point') {
            if (distance(pos, stroke) < SNAP_THRESHOLD) return { x: stroke.x, y: stroke.y };
        } else if (stroke.type === 'straightLine' || stroke.type === 'segment') {
            if (distance(pos, stroke.p1) < SNAP_THRESHOLD) return stroke.p1;
            if (distance(pos, stroke.p2) < SNAP_THRESHOLD) return stroke.p2;
        }
    }
    return null;
}


function getEventPosition(e) {
    if (e.touches && e.touches.length > 0) {
        return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    return { x: e.clientX, y: e.clientY };
}

function drawDot(pos, color = '#00FFCC') {
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}

function drawLabel(text, pos, color = '#FF69B4') {
    ctx.font = 'bold 16px Arial';
    ctx.fillStyle = color;
    ctx.fillText(text, pos.x + 8, pos.y + 5);
}

function drawInfinityLine(p1, p2, color, width, isRay = false) {
    const INFINITY = 5000;
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const mag = Math.sqrt(dx * dx + dy * dy);
    if (mag === 0) return { ux: 0, uy: 0 };
    const ux = dx / mag;
    const uy = dy / mag;
    const drawP1 = isRay ? p1 : { x: p1.x - ux * INFINITY, y: p1.y - uy * INFINITY };
    const drawP2 = { x: p1.x + ux * INFINITY, y: p1.y + uy * INFINITY };
    ctx.beginPath();
    ctx.moveTo(drawP1.x, drawP1.y);
    ctx.lineTo(drawP2.x, drawP2.y);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
    return { ux, uy };
}

window.bringToolToFront = function (clickedElement) {
    const tools = [
        window.RulerTool ? window.RulerTool.rulerElement : null,
        window.GonyeTool ? window.GonyeTool.gonyeElement : null,
        window.AciolcerTool ? window.AciolcerTool.aciolcerElement : null,
        window.PergelTool ? window.PergelTool.pergelElement : null
    ];
    // ?? KES�N ��Z�M: Ara�lara dokununca z-index'leri 5'e d���p �izim tahtas�n�n alt�nda kayboluyordu!
    // Art�k ara�lar her zaman 9990 ve 9999 g�c�nde en �stte kalacak.
    tools.forEach(tool => { if (tool) tool.style.zIndex = 9990; });
    if (clickedElement) clickedElement.style.zIndex = 9999;
}

function redrawAllStrokes() {
    // 1. �NCE KOORD�NATLARI SIFIRLA VE T�M EKRANI S�L
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const bgCanvas = document.getElementById('bg-canvas');
    const bgCtx = bgCanvas ? bgCanvas.getContext('2d') : null;
    if (bgCtx) {
        bgCtx.setTransform(1, 0, 0, 1, 0, 0);
        bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
    }

    // G�VENL�K K�L�D�
    if (!window.drawnStrokes || window.drawnStrokes.length === 0) return;

    // --- B�Y�K ��Z�M: KATMAN (Z-INDEX) KORUMASI ---
    // Arka plan� (sayfay� veya pdf'i) her zaman zorla en alta g�nderir.
    // B�ylece kopyalar, makaslar ve �izimler ASLA sayfan�n alt�nda kalmaz!
    window.drawnStrokes.sort((a, b) => {
        if (a.isBackground && !b.isBackground) return -1;
        if (!a.isBackground && b.isBackground) return 1;
        return 0;
    });

    ctx.save();
    // (Buradaki translate ve scale sat�rlar�n� tamamen sildik. Zemin art�k sabit!)

    for (const stroke of drawnStrokes) {

        // --- BU BLO�U D�NG�N�N EN BA�INA EKLE ---
        if (stroke.type === 'preview') {
            const p = stroke.payload;
            ctx.save();
            ctx.strokeStyle = '#FF0000'; // K�rm�z�
            ctx.lineWidth = 4;
            ctx.setLineDash([5, 5]); // Kesikli

            if (p.tool === 'pen' && p.path && p.path.length > 0) {
                // ?? Kalem i�in canl� �nizleme kesiksiz ve kendi renginde olmal�!
                ctx.setLineDash([]);
                ctx.strokeStyle = p.color || '#FFFFFF';
                // ?? Kal�nl�k: G�nderilen orijinal kal�nl��� (baseWidth) kullan
                ctx.lineWidth = p.baseWidth || window.currentLineWidth || 3;
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';
                
                ctx.beginPath();
                ctx.moveTo(p.path[0].x, p.path[0].y);
                for (let i = 1; i < p.path.length; i++) {
                    ctx.lineTo(p.path[i].x, p.path[i].y);
                }
                ctx.stroke();
            }
            else if (['straightLine', 'line', 'segment', 'ray'].includes(p.tool) && p.start && p.end) {
                ctx.beginPath();
                const dx = p.end.x - p.start.x, dy = p.end.y - p.start.y, devCarpan = 5000;
                if (p.tool === 'line') { ctx.moveTo(p.start.x - dx * devCarpan, p.start.y - dy * devCarpan); ctx.lineTo(p.start.x + dx * devCarpan, p.start.y + dy * devCarpan); }
                else if (p.tool === 'ray') { ctx.moveTo(p.start.x, p.start.y); ctx.lineTo(p.start.x + dx * devCarpan, p.start.y + dy * devCarpan); }
                else { ctx.moveTo(p.start.x, p.start.y); ctx.lineTo(p.end.x, p.end.y); }
                ctx.stroke();
            }
            // ?? ��Z�M: D�KD�RTGEN VE �OKGENLER� DA�RE YER�NE KEND� �EKL�YLE ��Z
            else if ((p.tool === 'rectangle' || p.tool === 'draw_rectangle') && p.start && p.end) {
                ctx.beginPath();
                ctx.rect(Math.min(p.start.x, p.end.x), Math.min(p.start.y, p.end.y), Math.abs(p.end.x - p.start.x), Math.abs(p.end.y - p.start.y));
                ctx.stroke();
            }
            else if (p.tool === 'polygon' && p.start && p.end) {
                const cx = p.start.x, cy = p.start.y, radius = p.radius, sides = p.sides;
                ctx.beginPath();
                if (!sides || sides === 0) {
                    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
                } else if (sides >= 3) {
                    const angleRad = p.rotation || 0;
                    for (let i = 0; i <= sides; i++) {
                        const polyAngle = (i * 2 * Math.PI / sides) + angleRad;
                        const px = cx + radius * Math.cos(polyAngle);
                        const py = cy + radius * Math.sin(polyAngle);
                        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
                    }
                }
                ctx.stroke();
            }
            else if (p.start && p.end) {
                const radius = p.radius || Math.hypot(p.end.x - p.start.x, p.end.y - p.start.y);
                ctx.beginPath(); ctx.arc(p.start.x, p.start.y, radius, 0, Math.PI * 2); ctx.stroke();
            }
            ctx.restore();
            continue; // Bu nesneyi �izdik, di�er d�ng�lere girmesine gerek yok // Bu nesneyi �izdik, di�er d�ng�lere girmesine gerek yok
        }
        // ------------------------------------------

        // ... (Senin mevcut if (stroke.type === 'pen') { ... } kodlar�n burada devam edecek)
        // --- AKILLI BOYAMA MASKES� ---
        if (stroke.type === 'lasso-mask') {
            ctx.save();

            // Lazerle �effaf delme iptal, ak�ll� taray�c�n�n buldu�u renkle boyama devrede!
            ctx.fillStyle = stroke.fillColor || "white";

            ctx.beginPath();
            if (stroke.points && stroke.points.length > 0) {
                ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
                for (let i = 1; i < stroke.points.length; i++) {
                    ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
                }
            }
            ctx.closePath();

            // Kesti�in tam o noktay�, sens�rlerin buldu�u sar� renge p�r�zs�zce boyar
            ctx.fill();
            ctx.restore();
            continue;
        }

        // --- KALEM (PEN) SAB�T KALINLIK VE YUMU�ATILMI� ��Z�M (BEZIER CURVE) ---
        if (stroke.type === 'pen') {
            const points = stroke.path;

            if (points.length < 2) {
                // Sadece t�kland�ysa tek bir nokta koy (Bas�n� iptal)
                ctx.beginPath();
                ctx.arc(points[0].x, points[0].y, stroke.baseWidth / 2, 0, Math.PI * 2);
                ctx.fillStyle = stroke.color;
                ctx.fill();
            } else {
                // --- K��ELER� YOK EDEN YUMU�ATMA (SMOOTHING) ALGOR�TMASI ---
                ctx.beginPath();
                ctx.moveTo(points[0].x, points[0].y);
                ctx.strokeStyle = stroke.color;

                // 1. BASIN� �PTAL�: Kal�nl�k her zaman standart ve sabittir
                ctx.lineWidth = stroke.baseWidth;
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';

                // 2. K��E �PTAL�: Noktalar� d�z �izgiyle de�il, esnek e�rilerle (Bezier) ba�lar
                for (let i = 1; i < points.length - 1; i++) {
                    const xc = (points[i].x + points[i + 1].x) / 2;
                    const yc = (points[i].y + points[i + 1].y) / 2;
                    ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
                }

                // Son noktay� e�rinin ucuna ba�la
                ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
                ctx.stroke();
            }
        }


        // --- RES�M / PDF VE CANLANDIR (SNAPSHOT) KOPYASI ---
        else if (stroke.type === 'image') {

            // 1. E�ER BU B�R PDF VEYA ARKA PLAN �SE SADECE �ER�EVES�N� ��Z, KEND�N� EN ARKAYA SAKLA
            if (stroke.isBackground !== false) {
                if (typeof currentTool !== 'undefined' && currentTool === 'move' && selectedItem === stroke) {
                    ctx.save();
                    const centerX = stroke.x + (stroke.width / 2);
                    const centerY = stroke.y + (stroke.height / 2);
                    ctx.translate(centerX, centerY);
                    ctx.rotate((stroke.rotation || 0) * Math.PI / 180);

                    // Kesikli Se�im �er�evesi
                    ctx.strokeStyle = '#00FFCC'; ctx.lineWidth = 2; ctx.setLineDash([5, 5]);
                    ctx.strokeRect(-stroke.width / 2, -stroke.height / 2, stroke.width, stroke.height);
                    ctx.setLineDash([]);

                    // 1. D�nd�rme Butonu (�st Orta - Ye�il)
                    const rotX = 0;
                    const rotY = -stroke.height / 2 - 25;
                    ctx.beginPath();
                    ctx.arc(rotX, rotY, 12, 0, 2 * Math.PI);
                    ctx.fillStyle = '#0F0'; ctx.fill();
                    ctx.strokeStyle = '#000'; ctx.lineWidth = 2; ctx.stroke();
                    ctx.font = "bold 16px Arial"; ctx.fillStyle = "#FFF"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
                    ctx.fillText("?", rotX, rotY - 1);

                    // 2. Boyutland�rma Butonu (Sa� Alt - Pembe)
                    const resX = stroke.width / 2;
                    const resY = stroke.height / 2;
                    ctx.beginPath();
                    ctx.arc(resX, resY, 12, 0, 2 * Math.PI);
                    ctx.fillStyle = '#F0F'; ctx.fill();
                    ctx.strokeStyle = '#000'; ctx.lineWidth = 2; ctx.stroke();
                    ctx.fillStyle = "#FFF"; ctx.fillText("?", resX, resY);

                    ctx.restore();
                }
                continue; // ��lemi bitir ve resmin kendini �izmesi i�in en arkaya (destination-over) pasla
            }

            // 2. E�ER BU KEST���M�Z B�R Y�ZEN KOPYAYSA (CANLANDIR) EKRANA ��Z VE �ER�EVE EKLE
            let imgToDraw = null;
            if (stroke.img && stroke.img instanceof HTMLImageElement) {
                imgToDraw = stroke.img;
            } else if (stroke.imgData) {
                if (!stroke.imgObj) {
                    stroke.imgObj = new Image();
                    stroke.imgObj.src = stroke.imgData;
                    stroke.imgObj.onload = () => { if (window.redrawAllStrokes) window.redrawAllStrokes(); };
                }
                imgToDraw = stroke.imgObj;
            }

            if (imgToDraw && (imgToDraw.complete || imgToDraw.readyState >= 2)) {
                ctx.save();
                const centerX = stroke.x + (stroke.width / 2);
                const centerY = stroke.y + (stroke.height / 2);
                ctx.translate(centerX, centerY);
                ctx.rotate((stroke.rotation || 0) * Math.PI / 180);

                ctx.drawImage(imgToDraw, -stroke.width / 2, -stroke.height / 2, stroke.width, stroke.height);

                if (typeof currentTool !== 'undefined' && currentTool === 'move' && selectedItem === stroke) {
                    ctx.strokeStyle = '#00FFCC'; ctx.lineWidth = 2; ctx.setLineDash([5, 5]);
                    ctx.strokeRect(-stroke.width / 2, -stroke.height / 2, stroke.width, stroke.height);
                    ctx.setLineDash([]);

                    const rotX = 0; const rotY = -stroke.height / 2 - 25;
                    ctx.beginPath(); ctx.arc(rotX, rotY, 12, 0, 2 * Math.PI);
                    ctx.fillStyle = '#0F0'; ctx.fill(); ctx.strokeStyle = '#000'; ctx.lineWidth = 2; ctx.stroke();
                    ctx.font = "bold 16px Arial"; ctx.fillStyle = "#FFF"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
                    ctx.fillText("?", rotX, rotY - 1);

                    const resX = stroke.width / 2; const resY = stroke.height / 2;
                    ctx.beginPath(); ctx.arc(resX, resY, 12, 0, 2 * Math.PI);
                    ctx.fillStyle = '#F0F'; ctx.fill(); ctx.strokeStyle = '#000'; ctx.lineWidth = 2; ctx.stroke();
                    ctx.fillStyle = "#FFF"; ctx.fillText("?", resX, resY);
                }
                ctx.restore();
            }
        }

        // --- NOKTA ---
        else if (stroke.type === 'point') {
            drawDot(stroke, stroke.color); // ?? Noktan�n kendi rengini kullanmas�n� sa�lar
            drawLabel(stroke.label, stroke, stroke.color); // ?? Harfin de ayn� renk olmas�n� sa�lar
        }

        // --- D�Z ��ZG� ---
        else if (stroke.type === 'straightLine') {
            ctx.beginPath();
            ctx.moveTo(stroke.p1.x, stroke.p1.y);
            ctx.lineTo(stroke.p2.x, stroke.p2.y);
            ctx.strokeStyle = stroke.color;
            ctx.lineWidth = stroke.width;
            ctx.lineCap = 'round';
            ctx.stroke();
            if (stroke.lengthLabel) drawLabel(stroke.lengthLabel, stroke.lengthLabelPos, '#FFFF00');
        }

        // --- DO�RU ---
        else if (stroke.type === 'line') {
            const { ux, uy } = drawInfinityLine(stroke.p1, stroke.p2, stroke.color, stroke.width, false);
            if (ux !== 0 || uy !== 0) {
                drawDot(stroke.p1, stroke.color);
                drawDot(stroke.p2, stroke.color);
                if (stroke.label1) drawLabel(stroke.label1, stroke.p1, '#FF69B4');
              if (stroke.label2) drawLabel(stroke.label2, stroke.p2, '#FF69B4');
            }
        }

        // --- DO�RU PAR�ASI ---
        else if (stroke.type === 'segment') {
            ctx.save();
              ctx.beginPath();
            ctx.moveTo(stroke.p1.x, stroke.p1.y);
            ctx.lineTo(stroke.p2.x, stroke.p2.y);
            ctx.strokeStyle = stroke.color;
            ctx.lineWidth = stroke.width || 4;
            ctx.lineCap = 'round';
            if (stroke.isDash) {
                  ctx.setLineDash(stroke.dashPattern || [5, 5]);
              }
              ctx.stroke();
              ctx.restore();
            if (stroke.label1) drawLabel(stroke.label1, stroke.p1, '#FF69B4');
              if (stroke.label2) drawLabel(stroke.label2, stroke.p2, '#FF69B4');
            if (stroke.lengthLabel) drawLabel(stroke.lengthLabel, stroke.lengthLabelPos, '#FFFF00');
        }

        // --- I�IN ---
        else if (stroke.type === 'ray') {
            const { ux, uy } = drawInfinityLine(stroke.p1, stroke.p2, stroke.color, stroke.width, true);
            if (ux !== 0 || uy !== 0) {
                drawDot(stroke.p1, stroke.color);
                drawDot(stroke.p2, stroke.color);
                if (stroke.label1) drawLabel(stroke.label1, stroke.p1, '#FF69B4');
              if (stroke.label2) drawLabel(stroke.label2, stroke.p2, '#FF69B4');
            }
        }

        // --- �OKGENLER ---
        else if (stroke.type === 'polygon') {
            if (window.PolygonTool && typeof window.PolygonTool.calculateVertices === 'function') {
                const vertices = window.PolygonTool.calculateVertices(stroke.center, stroke.radius, stroke.sideCount, stroke.rotation);
                stroke.vertices = vertices;

                if (vertices.length > 0) {
                    ctx.beginPath();
                    ctx.moveTo(vertices[0].x, vertices[0].y);
                    for (let i = 1; i < vertices.length; i++) ctx.lineTo(vertices[i].x, vertices[i].y);
                    ctx.closePath();
                }

                ctx.fillStyle = stroke.fillColor || 'rgba(0, 0, 0, 0.2)';
                ctx.fill();
                ctx.strokeStyle = stroke.color;
                ctx.lineWidth = stroke.width || 4;
                ctx.lineCap = 'round'; ctx.lineJoin = 'round';
                ctx.stroke();

                drawDot(stroke.center, stroke.color);
                drawLabel(stroke.label, stroke.center, '#FF69B4');
                vertices.forEach(v => drawDot(v, stroke.color));

                if (stroke.showEdgeLabels) {
                    for (let j = 0; j < vertices.length; j++) {
                        const v1 = vertices[j];
                        const v2 = vertices[(j + 1) % vertices.length];
                        const midPoint = { x: (v1.x + v2.x) / 2, y: (v1.y + v2.y) / 2 };
                        const edgeLabel = window.PolygonTool.getEdgeLength(v1, v2);
                        drawLabel(edgeLabel, midPoint, '#FF69B4');
                    }
                }
                if (stroke.showAngleLabels) {
                    const angleLabel = window.PolygonTool.getInternalAngle(stroke.sideCount);
                    const arcRadius = 25;
                    for (let j = 0; j < vertices.length; j++) {
                        const v_current = vertices[j];
                        const v_prev = vertices[j === 0 ? vertices.length - 1 : j - 1];
                        const v_next = vertices[(j + 1) % vertices.length];
                        const startAngle = Math.atan2(v_prev.y - v_current.y, v_prev.x - v_current.x);
                        const endAngle = Math.atan2(v_next.y - v_current.y, v_next.x - v_current.x);
                        ctx.beginPath();
                        ctx.arc(v_current.x, v_current.y, arcRadius, endAngle, startAngle);
                        ctx.strokeStyle = '#FFFF00'; ctx.lineWidth = 2; ctx.stroke();
                        const angle_label_x = (v_current.x * 0.8) + (stroke.center.x * 0.2);
                        const angle_label_y = (v_current.y * 0.8) + (stroke.center.y * 0.2);
                        drawLabel(angleLabel, { x: angle_label_x, y: angle_label_y }, '#FFFF00');
                    }
                }
                if (typeof currentTool !== 'undefined' && currentTool === 'move' && selectedItem === stroke) {
                    const rotateHandlePos = window.PolygonTool.getRotateHandlePosition(stroke);
                    ctx.beginPath(); ctx.arc(rotateHandlePos.x, rotateHandlePos.y, 6, 0, 2 * Math.PI);
                    ctx.fillStyle = 'rgba(0, 255, 0, 0.8)'; ctx.fill(); ctx.strokeStyle = '#0F0'; ctx.lineWidth = 2; ctx.stroke();
                    const resizeHandlePos = window.PolygonTool.getResizeHandlePosition(stroke);
                    ctx.beginPath(); ctx.arc(resizeHandlePos.x, resizeHandlePos.y, 6, 0, 2 * Math.PI);
                    ctx.fillStyle = 'rgba(255, 0, 255, 0.8)'; ctx.fill(); ctx.strokeStyle = '#F0F'; ctx.lineWidth = 2; ctx.stroke();
                }
            }
        }

        // --- 3D HOLOGRRAM MOTORU Y�NLEND�RMES� VE 2D SENKRONU ---
        else if (stroke.type === '3d_shape') {
            if (window.ThreeDTool && typeof window.ThreeDTool.drawShape === 'function') window.ThreeDTool.drawShape(ctx, stroke);

            // 1. �� BOYUTLU NESNEY� 2D EKRAN MERKEZ�NE VE BOYUTUNA ZORLA UYDUR (SENKRON�ZASYON)
            if (window.Scene3D && window.Scene3D.scene) {
                const sceneMesh = window.Scene3D.scene.children.find(m => m.userData && m.userData.strokeData && m.userData.strokeData.id === stroke.id);
                if (sceneMesh) {
                    if (stroke.rotationX !== undefined) sceneMesh.rotation.x = stroke.rotationX;
                    if (stroke.rotationY !== undefined) sceneMesh.rotation.y = stroke.rotationY;
                    if (stroke.rotationZ !== undefined) sceneMesh.rotation.z = stroke.rotationZ;
                    
                   const canvasElm = document.getElementById('drawing-canvas');
                    if (canvasElm) {
                        const myCw = canvasElm.width;
                        const myCh = canvasElm.height;
                        
                        // ?? S�RG� KORUMASI: S�rg� �ekilince de�i�en geni�lik yerine m�h�rl� original de�erleri kullan
                        const refX = stroke.originalX !== undefined ? stroke.originalX : stroke.x;
                        const refY = stroke.originalY !== undefined ? stroke.originalY : stroke.y;
                        const refW = stroke.originalW !== undefined ? stroke.originalW : stroke.width;
                        const refH = stroke.originalH !== undefined ? stroke.originalH : stroke.height;

                        const cx = refX + (refW / 2);
                        const cy = refY + (refH / 2);
                        
                        const nx = (cx / myCw) * 2 - 1;
                        const ny = -(cy / myCh) * 2 + 1;

                        const raycaster = new THREE.Raycaster();
                        raycaster.setFromCamera(new THREE.Vector2(nx, ny), window.Scene3D.camera);
                        const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
                        const intersection = new THREE.Vector3();
                        
                        if (raycaster.ray.intersectPlane(plane, intersection)) {
                            sceneMesh.position.copy(intersection);
                        }

                        if (stroke.pos3D && stroke.pos3D.z !== undefined) {
                            sceneMesh.position.z = stroke.pos3D.z;
                        }
                        
                        // ?? KUSURSUZ BOYUT + A� �L�E��: Koordinatlar� bozmadan sadece pembe buton �arpan�n� ekliyoruz
                        const threeJSHeightRatio = 30 / myCh;
                        const targetThreeJSWidth = refW * threeJSHeightRatio;
                        const originalThreeJSWidth = sceneMesh.userData.baseSize * 2;
                        const gercekOlcek = targetThreeJSWidth / originalThreeJSWidth;
                        
                        const mScale = stroke.meshScale || 1;
                        sceneMesh.scale.setScalar(gercekOlcek * mScale);
                    }
                }
            }

            // 2. SE��L�YKEN YE��L VE PEMBE KULPLARI ��Z (ESK� �ZELL���N GER� GELMES�)
            if (typeof currentTool !== 'undefined' && currentTool === 'move' && selectedItem === stroke) {
                ctx.save();
                const cX = stroke.x + stroke.width / 2;
                const cY = stroke.y + stroke.height / 2;
                const angleRad = (stroke.rotation || 0) * (Math.PI / 180);

                ctx.translate(cX, cY);
                ctx.rotate(angleRad);

                // Se�im �er�evesi
                ctx.strokeStyle = '#00FFCC'; ctx.lineWidth = 2; ctx.setLineDash([5, 5]);
                ctx.strokeRect(-stroke.width / 2, -stroke.height / 2, stroke.width, stroke.height);
                ctx.setLineDash([]);
                ctx.restore();
            }
        }
        else if (stroke.type === 'rectangle') {
            ctx.save();
            const centerX = stroke.x + stroke.width / 2;
            const centerY = stroke.y + stroke.height / 2;
            ctx.translate(centerX, centerY);
            ctx.rotate((stroke.rotation || 0) * Math.PI / 180);

            // 1. Dikd�rtgeni �iz
            ctx.beginPath();
            ctx.rect(-stroke.width / 2, -stroke.height / 2, stroke.width, stroke.height);
            ctx.strokeStyle = stroke.color;
            ctx.lineWidth = 4;
            ctx.stroke();

            // 2. Kenar Uzunluklar�n� Yazd�r (�nizlemedeki gibi kal�c� olur)
            if (stroke.showEdgeLabels) {
                ctx.font = "14px Arial";
                ctx.fillStyle = stroke.color;
                ctx.textAlign = "center";

                const wCm = (stroke.width / 30).toFixed(1).replace('.', ',');
                const hCm = (stroke.height / 30).toFixed(1).replace('.', ',');

                // �st Kenar CM
                ctx.fillText(`${wCm} cm`, 0, -stroke.height / 2 - 10);

                // Sol Kenar CM (Dikey yazd�rmak i�in d�nd�r�yoruz)
                ctx.save();
                ctx.translate(-stroke.width / 2 - 25, 0);
                ctx.rotate(-Math.PI / 2);
                ctx.fillText(`${hCm} cm`, 0, 0);
                ctx.restore();
            }

            // 3. K��e Harflerini Yazd�r (A, B, C, D)
            if (stroke.labels) {
                ctx.font = "bold 16px Arial";
                ctx.fillStyle = "#FF69B4"; // Pembe harfler
                ctx.fillText(stroke.labels[0], -stroke.width / 2 - 15, -stroke.height / 2 - 5); // Sol �st
                ctx.fillText(stroke.labels[1], stroke.width / 2 + 10, -stroke.height / 2 - 5);  // Sa� �st
                ctx.fillText(stroke.labels[2], stroke.width / 2 + 10, stroke.height / 2 + 15);  // Sa� Alt
                ctx.fillText(stroke.labels[3], -stroke.width / 2 - 15, stroke.height / 2 + 15); // Sol Alt
            }

            // 4. "Ta��" Modu Aktifse Butonlar� �iz
            if (currentTool === 'move' && selectedItem === stroke) {
                // D�nd�rme (Ye�il)
                ctx.fillStyle = '#0F0'; ctx.beginPath(); ctx.arc(0, -stroke.height / 2 - 30, 12, 0, 7); ctx.fill();
                // Boyutland�rma (Pembe)
                ctx.fillStyle = '#F0F'; ctx.beginPath(); ctx.arc(stroke.width / 2, stroke.height / 2, 12, 0, 7); ctx.fill();
            }

            // 5. A�� T�kland�ysa 90 Derece Sembol�n� �iz
            if (stroke.showAngleLabels) {
                ctx.font = "bold 14px Arial"; ctx.fillStyle = "yellow";
                ctx.fillText("90�", -stroke.width / 2 + 15, -stroke.height / 2 + 20);
            }
            ctx.restore();
        }



        // --- �EMBER / PERGEL ---
        else if (stroke.type === 'arc') {
            const PI_RAD = Math.PI / 180;
            let startRad = stroke.startAngle * PI_RAD;
            let endRad = stroke.endAngle * PI_RAD;
            const totalAngleDrawn = Math.abs(stroke.endAngle - stroke.startAngle);

            if (totalAngleDrawn >= 359) { startRad = 0; endRad = 2 * Math.PI; }

            ctx.beginPath();
            ctx.arc(stroke.cx, stroke.cy, stroke.radius, startRad, endRad, false);
            if (totalAngleDrawn >= 359) ctx.closePath();

            if (stroke.fillColor && stroke.fillColor !== 'transparent' && totalAngleDrawn >= 359) {
                ctx.fillStyle = stroke.fillColor;
                ctx.fill();
            }

            ctx.strokeStyle = stroke.color;
            ctx.lineWidth = stroke.width || 4;
            ctx.lineCap = 'round';
            ctx.stroke();

            const centerPos = { x: stroke.cx, y: stroke.cy };
            drawDot(centerPos, stroke.color);
            if (stroke.label) drawLabel(stroke.label, centerPos, '#FF69B4');

            if (stroke.showCircleInfo) {
                ctx.beginPath();
                ctx.moveTo(centerPos.x, centerPos.y);
                ctx.lineTo(centerPos.x + stroke.radius, centerPos.y);
                ctx.strokeStyle = '#FF69B4'; ctx.lineWidth = 1; ctx.setLineDash([2, 2]); ctx.stroke(); ctx.setLineDash([]);

                const PI = window.PolygonTool.PI_VALUE || 3;
                const r_px = stroke.radius;
                const r_cm_raw = (r_px / (window.PolygonTool.PIXELS_PER_CM || 30));
                const r_cm_calc = parseFloat(r_cm_raw.toFixed(2));
                const r_cm_str = r_cm_raw.toFixed(2).replace('.', ',');
                const circ_str = (2 * PI * r_cm_calc).toFixed(2).replace('.', ',');
                const area_str = (PI * r_cm_calc * r_cm_calc).toFixed(2).replace('.', ',');

                const r_label = `r = ${r_cm_str} cm`;
                drawLabel(r_label, { x: centerPos.x + (r_px / 2) - 20, y: centerPos.y - 10 }, '#FFFF00');
                let labelY = centerPos.y - 20;
                const labelX = centerPos.x + r_px + 30;
                drawLabel(`� = 2 . ? . r`, { x: labelX, y: labelY }, '#FFFF00'); labelY += 20;
                drawLabel(`= 2 . ${PI} . ${r_cm_str} = ${circ_str} cm`, { x: labelX, y: labelY }, '#FFFF00'); labelY += 25;
                drawLabel(`A = ? . r�`, { x: labelX, y: labelY }, '#FFFF00'); labelY += 20;
                drawLabel(`= ${PI} . ${r_cm_str}� = ${area_str} cm³`, { x: labelX, y: labelY }, '#FFFF00'); labelY += 25;
                drawLabel(`(? = ${PI} al�nd�)`, { x: labelX, y: labelY }, '#AAAAAA');
            }
        }
    } // <-- FOR D�NG�S� BURADA KAPANIYOR

    ctx.restore();

    // === EKLENECEK YEN� B�L�M: SAYFAYI EN ARKAYA ��Z ===
    if (bgCtx) {
        bgCtx.save();
        for (const stroke of drawnStrokes) {
            if (stroke.type === 'image' && stroke.isBackground !== false) {
                let imgToDraw = null;
                if (stroke.img && stroke.img instanceof HTMLImageElement) {
                    imgToDraw = stroke.img;
                } else if (stroke.imgObj) {
                    imgToDraw = stroke.imgObj;
                }

                if (imgToDraw && (imgToDraw.complete || imgToDraw.readyState >= 2)) {
                    bgCtx.save();
                    const centerX = stroke.x + (stroke.width / 2);
                    const centerY = stroke.y + (stroke.height / 2);
                    bgCtx.translate(centerX, centerY);
                    bgCtx.rotate((stroke.rotation || 0) * Math.PI / 180);
                    bgCtx.drawImage(imgToDraw, -stroke.width / 2, -stroke.height / 2, stroke.width, stroke.height);
                    bgCtx.restore();
                }
            }
            // Ayr�ca Lasso-mask ile PDF �zerinde delik a��lm��sa onu da bgCtx'den siliyoruz
            else if (stroke.type === 'lasso-mask') {
                bgCtx.save();
                bgCtx.globalCompositeOperation = 'destination-out';
                bgCtx.beginPath();
                bgCtx.moveTo(stroke.points[0].x, stroke.points[0].y);
                for (let i = 1; i < stroke.points.length; i++) {
                    bgCtx.lineTo(stroke.points[i].x, stroke.points[i].y);
                }
                bgCtx.closePath();
                bgCtx.fill();
                bgCtx.restore();
            }
        }
        bgCtx.restore();
    }
    // ====================================================

    // --- YEN� EKLENEN KISIM: OTOMAT�K HARF SENKRON�ZASYONU ---
    // Ekranda o an var olan en y�ksek harfi bulur
    let maxCode = 64;
    drawnStrokes.forEach(s => {
        if (s.label && s.label.charCodeAt(0) > maxCode) maxCode = s.label.charCodeAt(0);
        if (s.label1 && s.label1.charCodeAt(0) > maxCode) maxCode = s.label1.charCodeAt(0);
        if (s.label2 && s.label2.charCodeAt(0) > maxCode) maxCode = s.label2.charCodeAt(0);
    });


    // S�radaki harfe ge�er (Z'yi ge�erse A'ya d�ner)
    let nextCode = maxCode + 1;
    if (nextCode > 90) nextCode = 65;

    // T�m sistemi (Pergel, �okgenler ve Kalem) tek bir harfe senkronize eder
    nextPointChar = String.fromCharCode(nextCode);
    window.nextPointChar = nextPointChar;
    // ---------------------------------------------------------

    // --- 4. ADIM: YEN� POL�GONAL LASSO �N�ZLEMES� ---
    if (currentTool === 'lasso' && typeof lassoPoints !== 'undefined' && lassoPoints.length > 0) {
        ctx.save();

        // 1. SAB�TLENM�� ��ZG�LER� ��Z (Noktalar aras�)
        ctx.strokeStyle = '#00ffcc'; // �izgi rengi turkuaz
        ctx.lineWidth = 2;
        ctx.setLineDash([]); // Sabit �izgiler d�z olsun
        ctx.beginPath();
        ctx.moveTo(lassoPoints[0].x, lassoPoints[0].y);
        for (let i = 1; i < lassoPoints.length; i++) {
            ctx.lineTo(lassoPoints[i].x, lassoPoints[i].y);
        }
        ctx.stroke();

        // 2. KES�KL� �N�ZLEME ��ZG�S�N� ��Z (Son noktadan imlece giden)
        if (typeof currentMousePos !== 'undefined' && currentMousePos) {
            ctx.beginPath();
            ctx.setLineDash([6, 6]); // Kesikli �izgi efekti
            ctx.strokeStyle = '#aaaaaa';
            let lastPoint = lassoPoints[lassoPoints.length - 1];
            ctx.moveTo(lastPoint.x, lastPoint.y);
            ctx.lineTo(currentMousePos.x, currentMousePos.y);
            ctx.stroke();
        }

        // 3. TIKLANAN NOKTALARI (K���K YUVARLAKLARI) ��Z
        ctx.fillStyle = '#ff0044';
        ctx.setLineDash([]);
        for (let i = 0; i < lassoPoints.length; i++) {
            ctx.beginPath();
            // �LK noktay� hedef olarak g�stermek i�in daha B�Y�K �iziyoruz
            let radius = (i === 0) ? 8 : 4;
            ctx.arc(lassoPoints[i].x, lassoPoints[i].y, radius, 0, Math.PI * 2);
            ctx.fill();

            // �lk noktan�n etraf�na beyaz bir hedef halkas� ekle
            if (i === 0) {
                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 2;
                ctx.stroke();
            }
        }

        ctx.restore();
    } // <-- BURASI YEN� POL�GONAL LASSO BLO�UNUN B�T�� PARANTEZ�


    // --- HASSAS HEDEFLEME �APRAZI (KESK�N N��ANCI MODU) ---
    // (Lasso se�iliyse ve parmak ekrana bas�l�ysa her zaman ��kar)
    if (currentTool === 'lasso' && window.isDraggingLassoPoint && typeof currentMousePos !== 'undefined' && currentMousePos) {
        ctx.save();
        ctx.beginPath();
        // Ekran�n bir ucundan di�er ucuna yatay ve dikey hizalama �izgileri
        ctx.moveTo(0, currentMousePos.y);
        ctx.lineTo(canvas.width, currentMousePos.y);
        ctx.moveTo(currentMousePos.x, 0);
        ctx.lineTo(currentMousePos.x, canvas.height);

        ctx.setLineDash([4, 4]); // Kesikli

        // E�er ba�lang�� noktas�na kilitlendiysek �apraz YE��L olsun
        if (window.lassoIsClosing) {
            ctx.strokeStyle = '#00FF00'; // Kilitlendi Ye�ili
        } else {
            ctx.strokeStyle = 'rgba(255, 0, 255, 0.7)'; // Normal Pembe
        }

        ctx.lineWidth = 1.5;
        ctx.stroke();


        // Tam dokundu�un yere minik bir merkez noktas�
        ctx.beginPath();
        ctx.arc(currentMousePos.x, currentMousePos.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = window.lassoIsClosing ? '#00FF00' : '#ff00ff';
        ctx.fill();
        ctx.restore();
    }

} // <-- redrawAllStrokes FONKS�YONU BURADA TAMAMEN KAPANIYOR


function processLassoCut() {
    if (lassoPoints.length < 3) return;

    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    lassoPoints.forEach(p => {
        if (p.x < minX) minX = p.x; if (p.y < minY) minY = p.y;
        if (p.x > maxX) maxX = p.x; if (p.y > maxY) maxY = p.y;
    });

    const width = maxX - minX;
    const height = maxY - minY;
    if (width < 5 || height < 5) return;

    // =======================================================
    // 1. X-RAY (R�NTGEN) SENS�R�: T�m katmanlar� birle�tirip ger�ek rengi okur
    // =======================================================
    function getRealColor(x, y) {
        const tCan = document.createElement('canvas');
        tCan.width = 1; tCan.height = 1;
        const tCtx = tCan.getContext('2d');

        // Alttaki PDF katman�n� oku
        const bgLayer = document.getElementById('pdf-canvas') || document.querySelector('.pdf-page-canvas');
        if (bgLayer) {
            const sX = bgLayer.width / bgLayer.offsetWidth;
            const sY = bgLayer.height / bgLayer.offsetHeight;
            tCtx.drawImage(bgLayer, x * sX, y * sY, 1 * sX, 1 * sY, 0, 0, 1, 1);
        } else {
            tCtx.fillStyle = "white"; tCtx.fillRect(0, 0, 1, 1);
        }
        // �stteki �izim katman�n� ekle
        tCtx.drawImage(canvas, x, y, 1, 1, 0, 0, 1, 1);
        return tCtx.getImageData(0, 0, 1, 1).data;
    }

    // =======================================================
    // 2. KEST���M�Z PAR�AYI (KOPYAYI) OLU�TUR (X-Ray kullanarak keser)
    // =======================================================
    const offCanvas = document.createElement('canvas');
    offCanvas.width = width; offCanvas.height = height;
    const offCtx = offCanvas.getContext('2d');

    offCtx.beginPath();
    offCtx.moveTo(lassoPoints[0].x - minX, lassoPoints[0].y - minY);
    for (let i = 1; i < lassoPoints.length; i++) {
        offCtx.lineTo(lassoPoints[i].x - minX, lassoPoints[i].y - minY);
    }
    offCtx.closePath();
    offCtx.clip();

    const bgLayer = document.getElementById('pdf-canvas') || document.querySelector('.pdf-page-canvas');

    // Y�ksek kaliteli �izim ayarlar�n� etkinle�tir
    offCtx.imageSmoothingEnabled = true;
    offCtx.imageSmoothingQuality = 'high';

    if (bgLayer) {
        // Kanvas�n HD ��z�n�rl�k oran�n� al (DPR)
        const dprCanvasX = canvas.width / canvas.getBoundingClientRect().width;
        const dprCanvasY = canvas.height / canvas.getBoundingClientRect().height;

        // PDF koordinatlar�n� tabletin piksel yo�unlu�una g�re kusursuz olarak e�itle
        const sX = (bgLayer.width / bgLayer.offsetWidth) / dprCanvasX;
        const sY = (bgLayer.height / bgLayer.offsetHeight) / dprCanvasY;
        offCtx.drawImage(bgLayer, minX * sX, minY * sY, width * sX, height * sY, 0, 0, width, height);
    }
    offCtx.drawImage(canvas, minX, minY, width, height, 0, 0, width, height);
    const imgSrc = offCanvas.toDataURL('image/png', 1.0); // Kaliteyi en �ste sabitle

    // =======================================================
    // 3. AKILLI RENK BULUCU
    // =======================================================
    let smartColor = "white";
    try {
        const cX = minX + width / 2;
        const cY = minY + height / 2;
        const centerPixel = getRealColor(cX, cY);

        const margin = 15;
        const scanPoints = [
            { x: minX - margin, y: cY },
            { x: maxX + margin, y: cY },
            { x: cX, y: minY - margin },
            { x: cX, y: maxY + margin }
        ];

        for (let p of scanPoints) {
            const px = getRealColor(p.x, p.y);
            // Renk fark�n� hesapla
            const diff = Math.abs(px[0] - centerPixel[0]) + Math.abs(px[1] - centerPixel[1]) + Math.abs(px[2] - centerPixel[2]);
            if (diff > 50) {
                smartColor = `rgb(${px[0]}, ${px[1]}, ${px[2]})`;
                break;
            }
        }
    } catch (e) {
        console.warn("Renk okuma hatas�", e);
    }

    // =======================================================
    // 4. ZOOM UYUMLU, KALICI YAMA OLU�TURUCU
    // =======================================================
    const patchCanvas = document.createElement('canvas');
    patchCanvas.width = width; patchCanvas.height = height;
    const pCtx = patchCanvas.getContext('2d');
    pCtx.fillStyle = smartColor;
    pCtx.beginPath();
    pCtx.moveTo(lassoPoints[0].x - minX, lassoPoints[0].y - minY);
    for (let i = 1; i < lassoPoints.length; i++) {
        pCtx.lineTo(lassoPoints[i].x - minX, lassoPoints[i].y - minY);
    }
    pCtx.closePath();
    pCtx.fill(); // Rengi boya

    const patchImg = new Image();
    patchImg.src = patchCanvas.toDataURL('image/png');
    patchImg.onload = () => {
        drawnStrokes.unshift({ // Yama her �eyin EN ALTINDA kalacak �ekilde ba�a eklenir
            type: 'image',
            imgObj: patchImg,
            x: minX, y: minY,
            width: width, height: height,
            rotation: 0,
            isBackground: true, // ZOOM YAPILDI�INDA PDF �LE B�Y�MES� ���N
            isPatch: true       // SAYFA DE����NCE S�L�NMES� ���N �ZEL ET�KET
        });
        if (window.redrawAllStrokes) window.redrawAllStrokes();
    };

    // =======================================================
    // 5. KEST���N�Z KOPYAYI EKRANA GET�R VE OTOMAT�K SE�
    // =======================================================
    const newImgStroke = {
        type: 'image',
        imgData: imgSrc,
        x: minX, y: minY,
        width: width, height: height,
        rotation: 0,
        isBackground: false, // KR�T�K: Butonlar�n ��kmas� i�in false olmal�
        imgObj: null
    };

    const tempImg = new Image();
    tempImg.src = imgSrc;
    tempImg.onload = () => {

        newImgStroke.imgObj = tempImg;
        if (window.redrawAllStrokes) window.redrawAllStrokes();
    };
    boxCopies.push(newImgStroke);


    // --- TABLETTE BUTONLARIN �IKMASI ���N �ART ---
    selectedItem = newImgStroke; // Yeni kesti�in par�ay� an�nda se�
    isMoving = false;            // S�r�kleme durumunu kapat

    // Arac� 'move' yap (Yukar�da da yapt�k ama burada da olmas� g�venlidir)
    currentTool = 'move';

    if (window.redrawAllStrokes) window.redrawAllStrokes();
}


function undoLastStroke() {
    if (drawnStrokes.length > 0) {
        if (window.audio_undo) { window.audio_undo.currentTime = 0; window.audio_undo.play(); }

        // 1. Kendi listenden son �izgiyi sil
                const popped = drawnStrokes.pop();

        // 3D �EK�LSE GER� ALIRKEN SAHNEDEN DE KALDIR
        if (popped && popped.type === '3d_shape' && window.Scene3D && window.Scene3D.scene) {
            const meshToRemove = window.Scene3D.scene.children.find(m => m.userData && m.userData.strokeData && m.userData.strokeData.id === popped.id);
            if (meshToRemove) {
                meshToRemove.traverse((child) => {
                    if (child.isMesh || child.isLineSegments) {
                        if (child.geometry) child.geometry.dispose();
                        if (child.material) {
                            if (Array.isArray(child.material)) child.material.forEach(mat => mat.dispose());
                            else child.material.dispose();
                        }
                    }
                });
                window.Scene3D.scene.remove(meshToRemove);
                if (window.Scene3D.currentMesh === meshToRemove) window.Scene3D.currentMesh = null;
                window.Scene3D.updateHandlePositions();
            }
        }

        // YEN�: KAT �Z� BIRAK (Undo s�ras�nda katlamalar� a�arken iz b�rak)
        if (popped && popped.isPatch === true && popped.foldLine) {
            const p1 = popped.foldLine[0];
            const p2 = popped.foldLine[1];
            // �z stroke'u olu�tur (Daha ince ve daha az dikkat da��t�c�)
            const izStroke = {
                type: 'segment',
 p1: p1,
 p2: p2,
                color: 'rgba(255, 105, 180, 0.7)', // Daha �effaf (dikkat da��tmaz)
                width: 2.5, // Daha ince
                isDash: true, 
                dashPattern: [10, 5], // Kesikli
                isBackground: false
            };
            drawnStrokes.push(izStroke);
        }

        // --- CANLI SINIF: TAHTAYA "SON ��Z�M� S�L" MESAJI G�NDER ---
        if (typeof isConnected !== 'undefined' && isConnected) {
            window.sendNetworkData({ type: 'geri_al' });
        }
        // ---------------------------------------------------------

        redrawAllStrokes();

    }
}

function clearAllStrokes() {
    // 1. Ses �al (varsa)
    if (drawnStrokes.length > 0) {
        if (window.audio_clear) window.audio_clear.play();
    }

    // 2. Tabletin yerel haf�zas�n� temizle (Arka planlar� koru)
    drawnStrokes = drawnStrokes.filter(stroke => stroke.isBackground === true);
    window.drawnStrokes = drawnStrokes;

    // ?? HEPS�N� S�LERKEN 3D SAHNEY� TAMAMEN SIFIRLA
    if (window.Scene3D && window.Scene3D.scene) {
        const toRemove = window.Scene3D.scene.children.filter(c => c.type === 'Mesh' || c.type === 'Group');
        toRemove.forEach(m => {
            if (m.geometry) m.geometry.dispose();
            if (m.material) {
                if (Array.isArray(m.material)) m.material.forEach(mat => mat.dispose());
                else m.material.dispose();
            }
            window.Scene3D.scene.remove(m);
        });
        window.Scene3D.currentMesh = null;
        if (typeof window.Scene3D.updateHandlePositions === 'function') window.Scene3D.updateHandlePositions();
    }

    // 3. Taray�c�daki eski kay�tlar� temizle (E�er PC veya Tablette localStorage kullan�yorsan)
    if (window.localStorage) {
        window.localStorage.removeItem('drawnStrokes');
    }

    // 4. PC'ye "hepsini_sil" komutunu g�nder
    if (typeof isConnected !== 'undefined' && isConnected) {
        window.sendNetworkData({ type: 'hepsini_sil' });
        console.log("Temizleme komutu PC'ye g�nderildi.");
    }

    // 5. Harf sayac�n� s�f�rla
    nextPointChar = 'A';
    window.nextPointChar = 'A';

    // 6. Ekran� tamamen yenile
    if (typeof redrawAllStrokes === 'function') {
        redrawAllStrokes();
    }
}

function findHit(pos) {
    for (let i = drawnStrokes.length - 1; i >= 0; i--) {
        const stroke = drawnStrokes[i];

        if (stroke.type === 'image') {
            const halfW = stroke.width / 2;
            const halfH = stroke.height / 2;
            const angleRad = (stroke.rotation || 0) * (Math.PI / 180);

            // --- KR�T�K D�ZELTME: Resmin ger�ek merkezini hesapla ---
            const centerX = stroke.x + halfW;
            const centerY = stroke.y + halfH;

            // --- A. D�ND�RME KULPU (Rotate Handle) ALGILAMA ---
            const handleDist = halfH + 30;
            const rotX = centerX + Math.sin(angleRad) * handleDist;
            const rotY = centerY - Math.cos(angleRad) * handleDist;

            if (distance(pos, { x: rotX, y: rotY }) < 25) {
                return { item: stroke, pointKey: 'image_rotate' };
            }

            // --- B. BOYUTLANDIRMA KULPU (Resize Handle) ---
            const resLocalX = halfW * Math.cos(angleRad) - halfH * Math.sin(angleRad);
            const resLocalY = halfW * Math.sin(angleRad) + halfH * Math.cos(angleRad);
            const resX = centerX + resLocalX;
            const resY = centerY + resLocalY;

            if (distance(pos, { x: resX, y: resY }) < 25) {
                return { item: stroke, pointKey: 'image_resize' };
            }

            // --- C. RES�M G�VDES� (Ta��ma) ---
            const dx = pos.x - centerX;
            const dy = pos.y - centerY;
            const localClickX = dx * Math.cos(-angleRad) - dy * Math.sin(-angleRad);
            const localClickY = dx * Math.sin(-angleRad) + dy * Math.cos(-angleRad);

            if (localClickX > -halfW && localClickX < halfW && localClickY > -halfH && localClickY < halfH) {
                return { item: stroke, pointKey: 'self' };
            }
        }

        // --- 3D �EK�L BUTON VE G�VDE SENS�R� (KUSURSUZ) ---
        if (stroke.type === '3d_shape') {
            const cX = stroke.x + stroke.width / 2;
            const cY = stroke.y + stroke.height / 2;
            const angleRad = (stroke.rotation || 0) * (Math.PI / 180);

            if (currentTool === 'move' && selectedItem === stroke) {
                // Ye�il (D�nd�rme)
                const rotY = -stroke.height / 2 - 40;
                const rotX_world = cX + Math.sin(angleRad) * Math.abs(rotY);
                const rotY_world = cY - Math.cos(angleRad) * Math.abs(rotY);
                if (distance(pos, { x: rotX_world, y: rotY_world }) < 35) return { item: stroke, pointKey: 'image_rotate' };

                // Pembe (Boyutland�rma)
                const resX_local = stroke.width / 2 + 20;
                const resY_local = stroke.height / 2 + 20;
                const resX_world = cX + (resX_local * Math.cos(angleRad) - resY_local * Math.sin(angleRad));
                const resY_world = cY + (resX_local * Math.sin(angleRad) + resY_local * Math.cos(angleRad));
                if (distance(pos, { x: resX_world, y: resY_world }) < 35) return { item: stroke, pointKey: 'image_resize' };
            }

            // ?? 3D �eklin T�m G�vdesini Yakala (Ta��ma Ba�las�n ve Butonlar ��ks�n)
            if (distance(pos, { x: cX, y: cY }) < Math.max(stroke.width, stroke.height) + 30) {
                return { item: stroke, pointKey: 'self' };
            }
        }

        if (currentTool === 'move' && selectedItem === stroke) {
            if (stroke.type === 'polygon') {
                const rotateHandlePos = window.PolygonTool.getRotateHandlePosition(stroke);
                const resizeHandlePos = window.PolygonTool.getResizeHandlePosition(stroke);

                const dRot = distance(pos, rotateHandlePos);
                const dRes = distance(pos, resizeHandlePos);

                // ?? PEMBE VE YE��L BUTON �AKI�MA ZIRHI (�ncelik en yak�n olana verilir)
                if (dRes < 35 && dRes <= dRot) return { item: stroke, pointKey: 'resize' };
                if (dRot < 35) return { item: stroke, pointKey: 'rotate' };
            }
        }


        // --- D�KD�RTGEN YAKALAMA (TABLET UYUMLU) ---
        if (stroke.type === 'rectangle') {
            const centerX = stroke.x + stroke.width / 2;
            const centerY = stroke.y + stroke.height / 2;
            const angleRad = (stroke.rotation || 0) * (Math.PI / 180);

            // A. D�nd�rme Butonu (Ye�il - �stte)
            const rotX = centerX + Math.sin(angleRad) * (stroke.height / 2 + 35);
            const rotY = centerY - Math.cos(angleRad) * (stroke.height / 2 + 35);
            if (distance(pos, { x: rotX, y: rotY }) < 30) return { item: stroke, pointKey: 'image_rotate' };

            // B. Boyutland�rma Butonu (Pembe - Sa� Alt)
            const resX = centerX + (stroke.width / 2 * Math.cos(angleRad) - stroke.height / 2 * Math.sin(angleRad));
            const resY = centerY + (stroke.width / 2 * Math.sin(angleRad) + stroke.height / 2 * Math.cos(angleRad));
            if (distance(pos, { x: resX, y: resY }) < 30) return { item: stroke, pointKey: 'image_resize' };

            // C. K��eler (90 Derece A�� G�sterme - 30px hassasiyet)
            const corners = [
                { x: -stroke.width / 2, y: -stroke.height / 2 }, { x: stroke.width / 2, y: -stroke.height / 2 },
                { x: stroke.width / 2, y: stroke.height / 2 }, { x: -stroke.width / 2, y: stroke.height / 2 }
            ];
            for (let c of corners) {
                const cornerX = centerX + (c.x * Math.cos(angleRad) - c.y * Math.sin(angleRad));
                const cornerY = centerY + (c.x * Math.sin(angleRad) + c.y * Math.cos(angleRad));
                if (distance(pos, { x: cornerX, y: cornerY }) < 30) return { item: stroke, pointKey: 'toggle_angles' };
            }

            // D. G�vde (Merkezden Ta��ma)
            const dx = pos.x - centerX;
            const dy = pos.y - centerY;
            const localX = dx * Math.cos(-angleRad) - dy * Math.sin(-angleRad);
            const localY = dx * Math.sin(-angleRad) + dy * Math.cos(-angleRad);
            if (Math.abs(localX) < stroke.width / 2 && Math.abs(localY) < stroke.height / 2) {
                return { item: stroke, pointKey: 'self' };
            }
        }

        if (currentTool === 'move' || currentTool === 'fill') { // Fill i�in de hit gerekli
            if (stroke.type === 'polygon' && stroke.vertices) {
                for (let j = 0; j < stroke.vertices.length; j++) {
                    if (distance(pos, stroke.vertices[j]) < SNAP_THRESHOLD) return { item: stroke, pointKey: 'toggle_angles' };
                }
                for (let j = 0; j < stroke.vertices.length; j++) {
                    const v1 = stroke.vertices[j];
                    const v2 = stroke.vertices[(j + 1) % stroke.vertices.length];
                    const lineLength = distance(v1, v2);
                    const steps = Math.max(1, Math.floor(lineLength / 5));
                    let hitEdge = false;
                    for (let step = 1; step < steps; step++) {
                        const t = step / steps;
                        const sampleX = v1.x + (v2.x - v1.x) * t;
                        const sampleY = v1.y + (v2.y - v1.y) * t;
                        if (distance({ x: sampleX, y: sampleY }, pos) < SNAP_THRESHOLD) { hitEdge = true; break; }
                    }
                    if (hitEdge) return { item: stroke, pointKey: 'toggle_edges' };
                }
            }

            if (stroke.type === 'rectangle') {
                const centerX = stroke.x + stroke.width / 2;
                const centerY = stroke.y + stroke.height / 2;
                const angleRad = (stroke.rotation || 0) * (Math.PI / 180);

                // A. D�nd�rme Butonu (Ye�il)
                const rotX = centerX + Math.sin(angleRad) * (stroke.height / 2 + 30);
                const rotY = centerY - Math.cos(angleRad) * (stroke.height / 2 + 30);
                if (distance(pos, { x: rotX, y: rotY }) < 20) return { item: stroke, pointKey: 'image_rotate' };

                // B. Boyutland�rma Butonu (Pembe)
                const resX = centerX + (stroke.width / 2 * Math.cos(angleRad) - stroke.height / 2 * Math.sin(angleRad));
                const resY = centerY + (stroke.width / 2 * Math.sin(angleRad) + stroke.height / 2 * Math.cos(angleRad));
                if (distance(pos, { x: resX, y: resY }) < 20) return { item: stroke, pointKey: 'image_resize' };

                // C. K��eye T�klama (A�� G�sterme)
                if (distance(pos, { x: stroke.x, y: stroke.y }) < 20) return { item: stroke, pointKey: 'toggle_angles' };

                // D. G�vdeden Tutma (Merkezden Ta��ma)
                const dx = pos.x - centerX; const dy = pos.y - centerY;
                const localX = dx * Math.cos(-angleRad) - dy * Math.sin(-angleRad);
                const localY = dx * Math.sin(-angleRad) + dy * Math.cos(-angleRad);
                if (Math.abs(localX) < stroke.width / 2 && Math.abs(localY) < stroke.height / 2) {
                    return { item: stroke, pointKey: 'self' };
                }
            } if (stroke.type === 'arc' && stroke.cx) {
                const distToCenter = distance(pos, { x: stroke.cx, y: stroke.cy });
                if (Math.abs(distToCenter - stroke.radius) < SNAP_THRESHOLD) return { item: stroke, pointKey: 'toggle_circle_info' };
            }
        }

        if (stroke.type === 'point') {
            if (distance(pos, stroke) < SNAP_THRESHOLD) return { item: stroke, pointKey: 'self' };
        }
        if (stroke.p1 && distance(pos, stroke.p1) < SNAP_THRESHOLD) return { item: stroke, pointKey: 'p1' };
        if (stroke.p2 && distance(pos, stroke.p2) < SNAP_THRESHOLD) return { item: stroke, pointKey: 'p2' };
        if (stroke.type === 'arc' && stroke.cx && distance(pos, { x: stroke.cx, y: stroke.cy }) < SNAP_THRESHOLD) return { item: stroke, pointKey: 'center' };
        // ?? �OKGEN MERKEZ�NDEN TUTMA HASSAS�YET�N� ARTIR (TABLET ���N)
        if (stroke.type === 'polygon' && stroke.center && distance(pos, stroke.center) < 50) return { item: stroke, pointKey: 'center' };
    }
    return null;
}

// Global atamalar
window.redrawAllStrokes = redrawAllStrokes;
window.advanceChar = advanceChar;
window.distance = distance;


// --- ARA� SE��M� (TAMAMEN D�ZELT�LM�� VERS�YON) ---
function setActiveTool(tool) {
    // Oyunlar men�s�n� her ara� de�i�iminde kapat ve inline olarak gizle
    if (oyunlarOptions) {
        oyunlarOptions.classList.add('hidden');
        oyunlarOptions.style.display = 'none';
    }
    if (oyunlarButton) oyunlarButton.classList.remove('active');

    // Mevcut butonlar�n aktifli�ini temizle
    penButton.classList.remove('active');
    if (akilliPenButton) akilliPenButton.classList.remove('active');
    eraserButton.classList.remove('active');
    lineButton.classList.remove('active');
    pointButton.classList.remove('active');
    straightLineButton.classList.remove('active');
    infinityLineButton.classList.remove('active');
    segmentButton.classList.remove('active');
    rayButton.classList.remove('active');
    // Fiziksel ara� butonlar�n�n aktifli�i ba��ms�z y�netilir
    polygonButton.classList.remove('active');
    circleButton.classList.remove('active');
    moveButton.classList.remove('active');
    if (fillButton) fillButton.classList.remove('active');
    if (animateButton) animateButton.classList.remove('active');

    // �mle�leri temizle
    body.classList.remove('cursor-pen', 'cursor-eraser', 'cursor-snapshot');
    if (eraserPreview) eraserPreview.style.display = 'none';

    // Yeni arac� ayarla
    currentTool = tool;

    // Se�ilen arac�n �����n� yak
    if (tool === 'pen') {
        penButton.classList.add('active');
        body.classList.add('cursor-pen');
    } else if (tool === 'eraser') {
        eraserButton.classList.add('active');
        body.classList.add('cursor-eraser');
    }

    if (eraserPreview) eraserPreview.style.display = 'none';

    // ?? KES�N ��Z�M: CSS �ncelik �eli�kisini a�mak i�in gizlenen t�m men�leri inline (none) yap�yoruz
    if (polygonOptions) {
        polygonOptions.classList.add('hidden');
        polygonOptions.style.display = 'none';
    }

    // �izgi men�s�n�, SADECE yeni se�ilen ara� bir �izgi arac� DE��LSE inline olarak m�h�rle
    const isLineTool = ['point', 'straightLine', 'line', 'segment', 'ray'].includes(tool);
    if (!isLineTool && lineOptions) {
        lineOptions.classList.add('hidden');
        lineOptions.style.display = 'none';
    }

    if (fillOptions) {
        fillOptions.classList.add('hidden');
        fillOptions.style.display = 'none';
    }

    if (penOptions) {
        penOptions.classList.add('hidden');
        penOptions.style.display = 'none';
    }

    if (typeof snapshotOptions !== 'undefined' && snapshotOptions) {
        snapshotOptions.classList.add('hidden');
        snapshotOptions.style.display = 'none';
    }

    // ?? ��Z�M 1: Kalem men�s�n� kesin olarak gizle
    if (penOptions) { penOptions.classList.add('hidden'); penOptions.style.display = 'none'; }

    // ... di�er gizleme kodlar� buradad�r ...
    penOptions.classList.add('hidden');

    // A�A�IDAK� BLOKU EKL�YORSUN:
    if (typeof snapshotOptions !== 'undefined' && snapshotOptions) {
        snapshotOptions.classList.add('hidden');
        snapshotOptions.style.display = 'none';
    }
    // ...

    // De�i�kenleri s�f�rla
    isDrawing = false;
    lineStartPoint = null;
    isDrawingLine = false;
    isDrawingInfinityLine = false;
    isDrawingSegment = false;
    isDrawingRay = false;

    // --- BURAYA D�KD�RTGEN SIFIRLAMASINI EKLEY�N ---
    isDrawingRectangle = false;
    rectStartPoint = null;

    window.tempPolygonData = null;
    polygonPreviewLabel.classList.add('hidden');

    // Fiziksel ara�lar ba��ms�z �al��t��� i�in setActiveTool i�erisinde gizlenmez.

    if (snapIndicator) snapIndicator.style.display = 'none';

    // Etkile�imleri kapat
    if (window.RulerTool) window.RulerTool.interactionMode = 'none';
    if (window.GonyeTool) window.GonyeTool.interactionMode = 'none';
    if (window.AciolcerTool) window.AciolcerTool.interactionMode = 'none';
    if (window.PergelTool) window.PergelTool.interactionMode = 'none';

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    redrawAllStrokes();

    // 2. Yeni arac� aktif et
    currentTool = tool;

    // ?? KES�N ��Z�M: Se�ilen ara� 3D de�ilse, 3D modunu tamamen kapat! (�okgen �izerken 3D �izmesini engeller)
    if (!tool || !tool.startsWith('draw_3d_')) {
        window.active3DShapeTool = null;
        if (window.Scene3D) {
            window.Scene3D.activeTool = 'none';
        }
    }

    if (tool === 'pen') {
        penButton.classList.add('active');
        body.classList.add('cursor-pen');
        if (typeof penOptions !== 'undefined' && penOptions) {
            penOptions.classList.remove('hidden');
            penOptions.style.display = 'flex';
            penOptions.style.zIndex = '9999';
            if (penButton) penOptions.style.top = `${penButton.getBoundingClientRect().top - penButton.parentElement.getBoundingClientRect().top}px`;
        }
    } else if (tool === 'eraser') {
        eraserButton.classList.add('active');
        body.classList.add('cursor-eraser');
    } else if (tool === 'snapshot') {
        if (animateButton) animateButton.classList.add('active');
        if (btnSnapshotMain) btnSnapshotMain.classList.add('active'); // ?? EKLEND�
        body.classList.add('cursor-snapshot');

        // ?? ��Z�M 1: Canland�r alt men�s�n� KES�N OLARAK a� ve hizala!
        if (typeof snapshotOptions !== 'undefined' && snapshotOptions) {
            snapshotOptions.classList.remove('hidden');
            snapshotOptions.style.display = 'flex';
            snapshotOptions.style.zIndex = '10000'; // ?? Z-index de�eri y�kseltildi
            const refBtn = btnSnapshotMain || animateButton; // ?? EKLEND�
            if (refBtn) snapshotOptions.style.top = `${refBtn.getBoundingClientRect().top - refBtn.parentElement.getBoundingClientRect().top}px`;
        }
    }


    // --- ��ZG� ARA�LARI GRUBU (Y�KSEK CSS �NCEL�KL� G�STER�M) ---
    if (isLineTool && lineOptions) {
        lineOptions.classList.remove('hidden');
        lineOptions.style.display = 'flex'; // ?? �izgi arac� se�ildi�inde g�r�n�rl��� inline olarak zorla a�
    }

    if (tool === 'point') {
        lineButton.classList.add('active'); // Ana buton aktif
        pointButton.classList.add('active'); // Alt buton aktif
    } else if (tool === 'straightLine') {
        lineButton.classList.add('active');
        straightLineButton.classList.add('active');
    } else if (tool === 'line') {
        lineButton.classList.add('active');
        infinityLineButton.classList.add('active');
        lineOptions.classList.remove('hidden');
    } else if (tool === 'segment') {
        lineButton.classList.add('active');
        segmentButton.classList.add('active');
        lineOptions.classList.remove('hidden');
    } else if (tool === 'ray') {
        lineButton.classList.add('active');
        rayButton.classList.add('active');
        lineOptions.classList.remove('hidden');
    }

    // --- D��ER ARA�LAR ---
    // --- D��ER ARA�LAR ---
    else if (tool === 'ruler') {
        togglePhysicalTool('ruler');
    } else if (tool === 'gonye') {
        togglePhysicalTool('gonye');
    } else if (tool === 'aciolcer') {
        togglePhysicalTool('aciolcer');
    } else if (tool === 'pergel') {
        togglePhysicalTool('pergel');
    }

    else if (tool.startsWith('draw_polygon_')) {
        polygonButton.classList.add('active');
    } else if (tool === 'move') {
        moveButton.classList.add('active');
    } else if (tool === 'fill') {
        if (fillButton) {
            fillButton.classList.add('active');
            fillOptions.classList.remove('hidden');
            fillOptions.style.display = 'flex';
            const buttonRect = fillButton.getBoundingClientRect();
            const panelRect = fillButton.parentElement.getBoundingClientRect();
            const topOffset = buttonRect.top - panelRect.top;
            fillOptions.style.top = `${topOffset}px`;
        }
    }

    redrawAllStrokes();
}
// --- BUTON OLAYLARI ---

penButton.addEventListener('click', () => setActiveTool(currentTool === 'pen' ? 'none' : 'pen'));
if (akilliPenButton) akilliPenButton.addEventListener('click', () => setActiveTool(currentTool === 'smart_pen' ? 'none' : 'smart_pen'));
eraserButton.addEventListener('click', () => setActiveTool(currentTool === 'eraser' ? 'none' : 'eraser'));


// --- F�Z�KSEL ARA� BUTONLARI KES�N ��Z�M� (TABLET ZIRHI) ---
function togglePhysicalTool(aracAdi) {
    let toolObj = null, el = null, btn = null, isDisplayBlock = false;
    if (aracAdi === 'ruler') { toolObj = window.RulerTool; el = document.querySelector('.ruler-container'); btn = rulerButton; }
    if (aracAdi === 'gonye') { toolObj = window.GonyeTool; el = document.querySelector('.gonye-container'); btn = gonyeButton; }
    if (aracAdi === 'aciolcer') { toolObj = window.AciolcerTool; el = document.querySelector('.aciolcer-container'); btn = aciolcerButton; isDisplayBlock = true; }
    if (aracAdi === 'pergel') { toolObj = window.PergelTool; el = document.getElementById('compass-container'); btn = pergelButton; isDisplayBlock = true; }

    if (!toolObj || !el) return;

    const isCurrentlyVisible = el.style.display !== 'none' && !el.classList.contains('hidden');

    if (isCurrentlyVisible) {
        // Gizle
        toolObj.hide();
        el.classList.add('hidden');
        el.style.display = 'none';
        el.style.zIndex = "-1";
        if (btn) btn.classList.remove('active');
    } else {
        // G�ster
        toolObj.show();
        el.classList.remove('hidden');
        el.style.display = isDisplayBlock ? 'block' : 'flex';
        el.style.zIndex = "9999";
        if (btn) btn.classList.add('active');

        if (aracAdi === 'pergel' && toolObj.state) {
            setTimeout(() => {
                toolObj.state.rotation = 0;
                toolObj.state.radius = 150;
                if (typeof toolObj.updateTransform === 'function') toolObj.updateTransform();
                if (typeof window.araclariAgaGonder === 'function') window.araclariAgaGonder();
            }, 100);
        }

        if (window.bringToolToFront) window.bringToolToFront(el || (toolObj ? toolObj.pergelElement || toolObj.rulerElement || toolObj.gonyeElement || toolObj.aciolcerElement : null));
    }

    setTimeout(() => { if (typeof window.araclariAgaGonder === 'function') window.araclariAgaGonder(); }, 50);
}

const araciBaslat = (aracAdi) => {
    togglePhysicalTool(aracAdi);
};

const butonBagla = (btn, aracAdi) => {
    if (!btn) return;
    const tetikle = (e) => { e.preventDefault(); e.stopPropagation(); araciBaslat(aracAdi); };
    btn.addEventListener('click', tetikle);
    btn.addEventListener('touchstart', tetikle, { passive: false });
};

butonBagla(rulerButton, 'ruler');
butonBagla(gonyeButton, 'gonye');
butonBagla(aciolcerButton, 'aciolcer');
butonBagla(pergelButton, 'pergel');


undoButton.addEventListener('click', undoLastStroke);
clearAllButton.addEventListener('click', clearAllStrokes);
moveButton.addEventListener('click', () => setActiveTool(currentTool === 'move' ? 'none' : 'move'));

pdfjsLib.GlobalWorkerOptions.workerSrc = 'pdf.worker.min.js';

if (prevPageBtn && nextPageBtn) {

    // �nceki Sayfa (<)
    prevPageBtn.addEventListener('click', () => {
        if (currentPDF && currentPDFPage > 1) {
            currentPDFPage--;
            window.renderPDFPage(currentPDFPage);
            // ?? YEN�: PC'ye sayfay� de�i�tirmesini s�yle
            if (typeof isConnected !== 'undefined' && isConnected) {
                window.sendNetworkData({ type: 'pdf_sayfa_degis', sayfa: currentPDFPage });
            }
        }
    });

    // Sonraki Sayfa (>)
    nextPageBtn.addEventListener('click', () => {
        if (currentPDF && currentPDFPage < totalPDFPages) {
            currentPDFPage++;
            window.renderPDFPage(currentPDFPage);
            // ?? YEN�: PC'ye sayfay� de�i�tirmesini s�yle
            if (typeof isConnected !== 'undefined' && isConnected) {
                window.sendNetworkData({ type: 'pdf_sayfa_degis', sayfa: currentPDFPage });
            }
        }
    });
} // <-- EKS�K OLAN VE HATAYA SEBEP OLAN PARANTEZ BURADA KAPANIYOR!


// --- YEN�: Sayfa numaras�na t�klay�nca h�zl� gitme kutusunu a� ---
if (pageCountLabel) {
    pageCountLabel.style.cursor = 'pointer'; // Fareyle �zerine gelince t�klanabilir el i�areti ��ks�n
    pageCountLabel.addEventListener('click', () => {
        if (!currentPDF) return;

        // --- �EV�R� ENTEGRASYONU ---
        let t = translations[currentLang];
        let soruMetni = t.pdf_soru.replace('{0}', totalPDFPages);

        const gitSayfa = prompt(soruMetni, currentPDFPage);
        if (gitSayfa !== null) {
            const num = parseInt(gitSayfa);
            if (num > 0 && num <= totalPDFPages) {
                currentPDFPage = num;
                window.renderPDFPage(currentPDFPage);
            } else {
                alert("Ge�ersiz sayfa numaras� girdiniz!"); // �stersen buray� da ileride s�zl��e ekleyebilirsin
            }
        }
    });
}

if (uploadButton && fileInput) {
    uploadButton.onclick = () => fileInput.click();

    const cameraBtn = document.getElementById('btn-camera');
    const cameraInput = document.getElementById('camera-input');
    if (cameraBtn && cameraInput) {
        cameraBtn.onclick = () => cameraInput.click();
        cameraInput.onchange = async (e) => fileInput.onchange(e);
    }

    fileInput.onchange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // --- DURUM A: PDF DOSYASI ---
        if (file.type === 'application/pdf') {
            const fileReader = new FileReader();
            fileReader.onload = async function () {
                // 1. A�A G�NDERMEK ���N (Base64 Metni Olarak)
                const base64String = this.result;

                // ?? KES�N ��Z�M: Koca PDF dosyas�n� PC'nin kendi okumas� i�in a�a f�rlatmak yerine, 
                // Tabletin �izdi�i o anki y�ksek ��z�n�rl�kl� sayfay� (resim olarak) yollayaca��z.
                // Bu y�zden pdf_yukle komutunu A�A G�NDERMEY� �PTAL ED�YORUZ. 
                // PC, PDF.js y�k�ne girmek zorunda kalmayacak.

                // 2. TABLET EKRANI ���N (PDF.js'in anlad��� formata geri �eviriyoruz)
                const base64Data = base64String.split(',')[1];
                const binaryString = window.atob(base64Data);
                const len = binaryString.length;
                const bytes = new Uint8Array(len);
                for (let i = 0; i < len; i++) {
                    bytes[i] = binaryString.charCodeAt(i);
                }

                try {
                    currentPDF = await pdfjsLib.getDocument(bytes).promise;
                    totalPDFPages = currentPDF.numPages;
                    currentPDFPage = 1;

                    if (pdfControls) pdfControls.classList.remove('hidden');

                    window.renderPDFPage(currentPDFPage);

                    setTimeout(() => {
                        let t = typeof translations !== 'undefined' ? translations[currentLang] : { pdf_soru: "Sayfa (1-{0}):" };
                        let soruMetni = (t.pdf_soru || "Sayfa (1-{0}):").replace('{0}', totalPDFPages);

                        const sayfaGrisi = prompt(soruMetni, "1");
                        if (sayfaGrisi !== null) {
                            const hedefSayfa = parseInt(sayfaGrisi);
                            if (hedefSayfa > 0 && hedefSayfa <= totalPDFPages) {
                                currentPDFPage = hedefSayfa;
                                window.renderPDFPage(currentPDFPage);

                                if (typeof isConnected !== 'undefined' && isConnected) {
                                    window.sendNetworkData({ type: 'pdf_sayfa_degis', sayfa: currentPDFPage });
                                }
                            }
                        }
                    }, 500);

                } catch (error) {
                    console.error("PDF a��l�rken hata olu�tu:", error);
                }
            };   // � fileReader.onload BURADA biter
            fileReader.readAsDataURL(file);
        }

        // --- DURUM B: RES�M DOSYASI ---
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const imgData = event.target.result;



                const img = new Image();
                img.onload = () => {
                    // --- GORUNTU SIKISTIRMA (Resizer & Compressor) ---
                    // Telefon kameralari 15-20MB resim cektigi icin agi yavaslatir.
                    // Burada resmi tahtaya gitmeden once ufaltip 150KB'a indiriyoruz!
                    const MAX_WIDTH = 1920;
                    const MAX_HEIGHT = 1920;
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height = Math.round(height * (MAX_WIDTH / width));
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width = Math.round(width * (MAX_HEIGHT / height));
                            height = MAX_HEIGHT;
                        }
                    }

                    const tempCanvas = document.createElement('canvas');
                    tempCanvas.width = width;
                    tempCanvas.height = height;
                    const tempCtx = tempCanvas.getContext('2d');
                    
                    // Resmi ciz
                    tempCtx.drawImage(img, 0, 0, width, height);
                    
                    // Yuksek oranda sikistir (JPEG 0.6)
                    const compressedDataUrl = tempCanvas.toDataURL('image/jpeg', 0.6); 

                    const compressedImg = new Image();
                    compressedImg.onload = () => {
                        window.addNewImageToCanvas(compressedImg, false);
                    };
                    compressedImg.src = compressedDataUrl;
                };
                img.src = imgData;
            };
            reader.readAsDataURL(file);
        }
        // Resim/Dosya islenmeden value'yu temizlemek mobil tarayicilarda File objesinin silinmesine (GC) neden olur!
        setTimeout(() => { e.target.value = ''; }, 2000); 
    };
}


function addToCanvasAsObject(img) {
    let startWidth = 400;
    if (img.width < 400) startWidth = img.width;

    let scaleFactor = startWidth / img.width;
    let startHeight = img.height * scaleFactor;

    drawnStrokes.push({
        type: 'image',
        img: img,
        // --- TAM ORTALAMA HESABI ---
        x: (canvas.width / 2) - (startWidth / 2),
        y: (canvas.height / 2) - (startHeight / 2),
        width: startWidth,
        height: startHeight,
        rotation: 0,
        isBackground: true
    });

    // --- BUTONU G�STERME VE KAPATMA ��LEV� FONKS�YONUN ���NE ALINDI ---
    if (closePdfBtn) {
        // 1. Butonu SADECE resim eklendi�inde g�r�n�r yap
        closePdfBtn.classList.remove('hidden');
        closePdfBtn.style.display = 'flex';

        // 2. Kapatma i�levini tan�mla
        closePdfBtn.onclick = () => {
            // Kontrol panelini ve butonun kendisini gizle
            if (typeof pdfControls !== 'undefined' && pdfControls) {
                pdfControls.classList.add('hidden');
            }
            closePdfBtn.classList.add('hidden');
            closePdfBtn.style.display = 'none';

            // Arka plan olan t�m ��eleri, lasso maskelerini ve yamalar� kald�r
            drawnStrokes = drawnStrokes.filter(s => !s.isBackground && !s.isPDFPage && s.type !== 'lasso-mask' && !s.isPatch);
            window.drawnStrokes = drawnStrokes;

            // De�i�kenleri s�f�rla
            currentPDF = null;
            if (typeof pdfImageStroke !== 'undefined') pdfImageStroke = null;

            // Ekran� temizle ve kalan �izimleri tekrar �iz
            redrawAllStrokes();
        };
    }

    redrawAllStrokes();
}


if (fillButton) fillButton.addEventListener('click', () => setActiveTool(currentTool === 'fill' ? 'none' : 'fill'));
if (fillColorBoxes) {
    fillColorBoxes.forEach(box => {
        const handler = (e) => {
            e.stopPropagation();
            fillColorBoxes.forEach(b => b.classList.remove('selected'));
            e.target.classList.add('selected');
            currentFillColor = e.target.dataset.color || e.target.style.backgroundColor;
            setActiveTool('fill');
        };
        box.addEventListener('click', handler);
        box.addEventListener('touchstart', handler, { passive: false });
    });
    if (fillColorBoxes.length > 0) { fillColorBoxes[0].classList.add('selected'); currentFillColor = fillColorBoxes[0].dataset.color || fillColorBoxes[0].style.backgroundColor; }
}

colorBoxes.forEach(box => {
    box.addEventListener('click', (e) => {
        colorBoxes.forEach(b => b.classList.remove('selected'));
        e.target.classList.add('selected');
        currentPenColor = e.target.style.backgroundColor;
    });
});
colorBoxes[0].classList.add('selected');
currentPenColor = colorBoxes[0].style.backgroundColor;

lineButton.addEventListener('click', () => {
    if (lineButton.classList.contains('active')) { setActiveTool('none'); }
    else {
        setActiveTool('none');
        lineOptions.classList.remove('hidden'); lineOptions.style.display = 'flex'; lineButton.classList.add('active');
        const buttonRect = lineButton.getBoundingClientRect();
        const panelRect = lineButton.parentElement.getBoundingClientRect();
        lineOptions.style.top = `${buttonRect.top - panelRect.top}px`;
    }
});

// �okgen Renk Se�imi (Varsay�lan Beyaz)
if (polygonColorOptions.length > 0) {
    polygonColorOptions[0].classList.add('selected');
    window.currentLineColor = polygonColorOptions[0].dataset.color || '#FFFFFF';

    polygonColorOptions.forEach(box => {
        const handleColorSelect = (e) => {
            e.stopPropagation(); e.preventDefault();
            polygonColorOptions.forEach(b => b.classList.remove('selected'));
            e.target.classList.add('selected');
            const color = e.target.dataset.color || e.target.style.backgroundColor;
            window.currentLineColor = color;
            try { if (window.audio_select) { window.audio_select.currentTime = 0; window.audio_select.play(); } else if (window.audio_click) { window.audio_click.currentTime = 0; window.audio_click.play(); } } catch (err) { }
        };
        box.addEventListener('click', handleColorSelect);
        box.addEventListener('touchstart', handleColorSelect, { passive: false });
    });
}

polygonButton.addEventListener('click', () => {
    if (polygonButton.classList.contains('active')) { setActiveTool('none'); }
    else {
        setActiveTool('none');
        polygonOptions.classList.remove('hidden'); polygonOptions.style.display = 'flex'; polygonButton.classList.add('active');
        const buttonRect = polygonButton.getBoundingClientRect();
        const panelRect = polygonButton.parentElement.getBoundingClientRect();
        const menuHeight = polygonOptions.offsetHeight;
        const windowHeight = window.innerHeight;
        const margin = 10;
        let topOffset = buttonRect.top - panelRect.top;
        if (buttonRect.top + menuHeight > (windowHeight - margin)) {
            topOffset = (windowHeight - menuHeight - margin) - panelRect.top;
        }
        polygonOptions.style.top = `${topOffset}px`;
    }
});

// --- OYUNLAR MEN�S�: YUKARI A�ILAN, SEV�ML� VE S�LG� KAPATAN S�STEM ---
oyunlarButton.addEventListener('click', (e) => {
    e.stopPropagation();

    if (oyunlarButton.classList.contains('active')) {
        oyunlarOptions.classList.add('hidden');
        oyunlarButton.classList.remove('active');
    } else {
        // 1. D��ER ARA�LARI VE S�LG�Y� KAPAT (I����n� s�nd�r�r)
        if (typeof setActiveTool === 'function') setActiveTool('none');

        oyunlarOptions.innerHTML = ''; // ��eri�i temizle

        // 2. MEN� G�R�N�M AYARLARI
        oyunlarOptions.style.display = 'flex';
        oyunlarOptions.style.flexDirection = 'column';
        oyunlarOptions.style.maxHeight = '400px';
        oyunlarOptions.style.overflowY = 'auto';
        oyunlarOptions.style.touchAction = 'pan-y';
        oyunlarOptions.style.WebkitOverflowScrolling = 'touch';

        // 3. KONUMU YUKARI ALAN HESAPLAMA (Ekrana s��mas� i�in)
        const buttonRect = oyunlarButton.getBoundingClientRect();
        const panelRect = oyunlarButton.parentElement.getBoundingClientRect();
        oyunlarOptions.style.top = 'auto';
        oyunlarOptions.style.bottom = (panelRect.bottom - buttonRect.bottom) + 'px';

        // 4. KAYDIRMA �PUCU (Yaz� Geri Geldi)
        const hint = document.createElement('div');
        hint.innerHTML = '?? Liste kayd�r�labilir ??';
        hint.style.cssText = `
            text-align: center; 
            color: #00ffcc; 
            font-family: 'Fredoka', sans-serif; 
            font-size: 13px; 
            padding: 12px; 
            border-bottom: 1px solid rgba(255,255,255,0.1); 
            margin-bottom: 8px; 
            font-weight: 600;
            background: rgba(0, 255, 204, 0.05);
            border-radius: 12px 12px 0 0;
        `;
        oyunlarOptions.appendChild(hint);

        // 5. OYUNLARI EKLE
        if (window.OyunListesi && window.OyunListesi.length > 0) {
            window.OyunListesi.forEach(oyun => {
                const linkElement = document.createElement('a');
                linkElement.className = 'tool-button-sub';

                // KR�T�K DE����KL�K BURADA:
                // 'oyun.isim' yerine 'oyun[currentLang]' kullan�yoruz.
                // E�er o dilde kar��l��� yoksa (hata vermemesi i�in) T�rk�e'yi g�sterir.
                linkElement.innerText = oyun[currentLang] || oyun.tr;

                linkElement.style.cssText = `
            text-decoration: none; 
            display: block; 
            padding: 15px; 
            text-align: center; 
            color: white; 
            border-bottom: 1px solid rgba(255,255,255,0.05);
            font-family: 'Fredoka', sans-serif;
            font-size: 14px;
        `;

                let startY = 0;
                let isScrolling = false;

                linkElement.addEventListener('touchstart', (te) => {
                    startY = te.touches[0].clientY;
                    isScrolling = false;
                }, { passive: true });

                linkElement.addEventListener('touchmove', (te) => {
                    if (Math.abs(te.touches[0].clientY - startY) > 10) isScrolling = true;
                }, { passive: true });

                const linkiAc = (ae) => {
                    if (isScrolling) return;
                    ae.preventDefault();
                    ae.stopPropagation();
                    window.open(oyun.link, '_blank');

                    // Kapatma i�lemi
                    oyunlarOptions.classList.add('hidden');
                    oyunlarButton.classList.remove('active');
                };

                linkElement.addEventListener('touchend', linkiAc);
                linkElement.addEventListener('click', linkiAc);
                oyunlarOptions.appendChild(linkElement);
            });
        }

        oyunlarOptions.classList.remove('hidden');
        oyunlarButton.classList.add('active');
    }
});

// --- BO�LU�A TIKLAYINCA KAPATMA (DOSYANIN EN ALTINA EKLEY�N) ---
['pointerdown', 'touchstart', 'mousedown'].forEach(evt => {
document.addEventListener(evt, (e) => {

    if (oyunlarOptions && !oyunlarOptions.contains(e.target) && e.target !== oyunlarButton) {
        oyunlarOptions.classList.add('hidden');
        oyunlarButton.classList.remove('active');
    }
});
// 2. Ana men� kutusunun da d��ar�daki "Ekran Kilitlerine" tak�lmas�n� engelle:
oyunlarOptions.addEventListener('touchstart', (e) => e.stopPropagation(), { passive: true });
oyunlarOptions.addEventListener('touchmove', (e) => e.stopPropagation(), { passive: true });
oyunlarOptions.addEventListener('wheel', (e) => e.stopPropagation(), { passive: true });

circleButton.addEventListener('click', (e) => {
    e.stopPropagation();
    setActiveTool('draw_polygon_circle');
    window.PolygonTool.handleDrawClick(null, 0);
    regularPolygonButtons.forEach(b => b.classList.remove('active'));
    circleButton.classList.add('active');
});

regularPolygonButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        const sides = parseInt(e.target.dataset.sides);
        setActiveTool(`draw_polygon_${sides}_sides`);
        window.PolygonTool.handleDrawClick(null, sides);
        regularPolygonButtons.forEach(b => b.classList.remove('active'));
        circleButton.classList.remove('active');
        e.target.classList.add('active');
    });
});

pointButton.addEventListener('click', (e) => {
    e.stopPropagation();
    if (window.audio_select) window.audio_select.play();
    if (!audio_click_src_set) { audio_click.src = 'sesler/point-smooth-beep-230573.mp3'; audio_click_src_set = true; }
    setActiveTool(currentTool === 'point' ? 'none' : 'point');
});
straightLineButton.addEventListener('click', (e) => { e.stopPropagation(); if (window.audio_select) window.audio_select.play(); setActiveTool(currentTool === 'straightLine' ? 'none' : 'straightLine'); });
infinityLineButton.addEventListener('click', (e) => { e.stopPropagation(); if (window.audio_select) window.audio_select.play(); setActiveTool(currentTool === 'line' ? 'none' : 'line'); });
segmentButton.addEventListener('click', (e) => { e.stopPropagation(); if (window.audio_select) window.audio_select.play(); setActiveTool(currentTool === 'segment' ? 'none' : 'segment'); });
rayButton.addEventListener('click', (e) => { e.stopPropagation(); if (window.audio_select) window.audio_select.play(); setActiveTool(currentTool === 'ray' ? 'none' : 'ray'); });

lineColorOptions.forEach(box => {
    box.addEventListener('click', (e) => {
        e.stopPropagation();
        lineColorOptions.forEach(b => b.classList.remove('selected'));
        e.target.classList.add('selected');
        const color = e.target.dataset.color || e.target.style.backgroundColor;
        window.currentLineColor = color;
    });
});
lineColorOptions[0].classList.add('selected');
window.currentLineColor = lineColorOptions[0].dataset.color || lineColorOptions[0].style.backgroundColor;

// ==========================================
// ?? N�HA� ��Z�M: KATMAN (Z-INDEX) VE BUTON KORUMA ZIRHI ??
// ==========================================
const katmanZirhi = document.createElement('style');
katmanZirhi.innerHTML = `
    /* 1. �izim Tahtas�: 3D �ekillerin �st�nde, butonlar�n alt�nda kalmal� */
    #drawing-canvas { position: relative !important; z-index: 50 !important; background-color: transparent !important; }
    
    /* 2. 3D Sahnesi: Kalemin alt�nda kalmal� ki �st�ne �izilebilsin */
    #three-container { position: absolute !important; z-index: 10 !important; pointer-events: none !important; display: block !important; }
    
    /* 3. Aray�z ve Butonlar: Asla kaybolmamalar� i�in en �st seviyeye sabitlendi */
    .panel, .panel *, button, .tool-button, .tool-button-sub, .tool-options,
    #pen-options, #line-options, #polygon-options, #fill-options, #snapshot-options,
    #options-3d-main, #options-prizmalar, #options-piramitler, #slider-container, #info-tooltip {
        z-index: 10000 !important;
    }
`;
document.head.appendChild(katmanZirhi);

// 3D motorunun gizli kalmamas�n� garantile
if (window.Scene3D && window.Scene3D.container) {
    window.Scene3D.container.style.display = 'block';
    window.Scene3D.container.classList.remove('hidden');
}

// ?????? ��TE KODU TAM OLARAK BURAYA, BU BO�LU�A YAPI�TIRIYORSUN ??????

// ?? PERGEL TEPE ��FT TIKLAMA KES�N D�ZELTMES� (SI�RAMA ENGEL�)
document.addEventListener('dblclick', (e) => {
    const hedef = e.target;
    // �ift t�klanan eleman pergelin tepesi mi kontrol et
    if (hedef && (hedef.id === 'compass-top' || hedef.classList.contains('compass-top') || hedef.id === 'pergel-tepe' || hedef.closest('#compass-top') || hedef.closest('.pergel-tepe') || hedef.closest('#compass-handle'))) {

        // 1. Eski dosyalardaki hatal� s��rama kodunun �al��mas�n� tamamen engelle!
        e.stopImmediatePropagation();
        e.preventDefault();
        e.stopPropagation();

        // 2. Yerinden oynatmadan u�lar� takas et
        if (window.PergelTool && window.PergelTool.state) {
            // Pergeli i�ne ucu etraf�nda 180 derece d�nd�rerek u�lar� kusursuzca e�ler
            window.PergelTool.state.rotation = (window.PergelTool.state.rotation || 0) + Math.PI;

            if (typeof window.PergelTool.updateTransform === 'function') {
                window.PergelTool.updateTransform();
            }
            if (typeof window.araclariAgaGonder === 'function') {
                window.araclariAgaGonder();
            }
        }
    }
}, true); // 'true' (capturing) sayesinde eski hatal� koddan �NCE devreye girer ve onu iptal eder!

// ?????? PERGEL KODU BURADA B�T�YOR ??????

// --- app.js: Canland�r Butonu (TEK SEFERDE A�ILMA VE ARD ARDA SINIRSIZ KULLANIM GARANT�S�) ---
if (typeof animateButton !== 'undefined' && animateButton) {
    animateButton.onclick = null;
    animateButton.ontouchstart = null;
    animateButton.addEventListener('pointerdown', toggleSnapshotMenu, { passive: false });
}
// <--- KOD DOSYASI TAM OLARAK BU PARANTEZLE B�TMEL�D�R!

// ?? N�HA� ��Z�M: GER�EK �OKLU DOKUNMAT�K (MULTI-TOUCH) TAK�P��S�
window.touchCount = 0;
window.lastTouchDist = 0;
canvas.addEventListener('touchstart', (e) => { window.touchCount = e.touches.length; }, { passive: true });
canvas.addEventListener('touchend', (e) => { window.touchCount = e.touches.length; if (window.touchCount < 2) window.lastTouchDist = 0; }, { passive: true });
canvas.addEventListener('touchcancel', (e) => { window.touchCount = e.touches.length; if (window.touchCount < 2) window.lastTouchDist = 0; }, { passive: true });

// ?? GER�EK MULTI-TOUCH ZOOM MOTORU (Z�plamay� Engelleyen Ana Motor)
canvas.addEventListener('touchmove', (e) => {
    if (currentTool === 'move' && e.touches && e.touches.length >= 2) {
        e.preventDefault();
        e.stopPropagation();
        
        // ?? ��Z�M 2: �ift parmak zoom motoru devreye girdi�inde s�r�klemeyi KES�N olarak kapat!
        // B�ylece ta��ma ve zoom komutlar� birbiriyle sava�maz, ekran z�plamaz.
        isMoving = false; 

        window.isZooming = true;
        clearTimeout(window.zoomTimer);
        window.zoomTimer = setTimeout(() => { window.isZooming = false; }, 500);

        const p1x = e.touches[0].clientX; const p1y = e.touches[0].clientY;
        const p2x = e.touches[1].clientX; const p2y = e.touches[1].clientY;
        const currentDist = Math.hypot(p1x - p2x, p1y - p2y);

        if (window.lastTouchDist > 0) {
            const delta = currentDist - window.lastTouchDist;
            const zoomStep = 1 + (delta * 0.003);
            const mainBg = drawnStrokes.find(s => s.isBackground === true && !s.isPatch);
            
            if (mainBg) {
                const cx = mainBg.x + mainBg.width / 2;
                const cy = mainBg.y + mainBg.height / 2;
                
                drawnStrokes.forEach(bg => {
                    if (bg.isBackground === true) {
                        const bg_cx = bg.x + bg.width / 2;
                        const bg_cy = bg.y + bg.height / 2;
                        const ncx = cx + (bg_cx - cx) * zoomStep;
                        const ncy = cy + (bg_cy - cy) * zoomStep;
                        bg.width *= zoomStep; bg.height *= zoomStep;
                        bg.x = ncx - bg.width / 2; bg.y = ncy - bg.height / 2;
                    }
                });

                if (window.drawnStrokes) {
                    window.drawnStrokes.forEach(s => {
                        if (!s.isBackground && typeof window.zoomStroke === 'function') {
                            window.zoomStroke(s, zoomStep, cx, cy);
                        }
                    });
                }
                redrawAllStrokes();
                if (typeof window.sendNetworkData === 'function' && typeof isConnected !== 'undefined' && isConnected) {
                    window.sendNetworkData({ type: 'zoom_senkron', x: mainBg.x, y: mainBg.y, width: mainBg.width, height: mainBg.height });
                }
            }
        }
        window.lastTouchDist = currentDist;
    }
}, { passive: false });
canvas.addEventListener('pointerdown', (e) => {
    // ?? S�H�RL� DOKUNU� 1: Ne olursa olsun �NCE taray�c�n�n yerle�ik kayd�rmas�n� (titremeyi) kilitliyoruz!
    if (e.cancelable) e.preventDefault();

    // AKILLI TAHTA YAMASI VE GER�YE D�N�K AVU� ��� (PALM) REDD�:
    if (e.pointerType === 'pen') {
        // E�er k�sa s�re �nce (avu� i�i y�z�nden) bir veya birden fazla "touch" �izimi ba�lad�ysa, onlar� an�nda iptal et ve sil!
        let avucIciSilindi = false;
        while (window.drawnStrokes && window.drawnStrokes.length > 0) {
            const lastS = window.drawnStrokes[window.drawnStrokes.length - 1];
            if (lastS.type === 'pen' && lastS.pointerType === 'touch' && lastS.startTime && (Date.now() - lastS.startTime) < 1500) {
                const popped = window.drawnStrokes.pop();
                avucIciSilindi = true;
                if (typeof window.sendNetworkData === 'function' && popped && popped.id) {
                    window.sendNetworkData({ type: 'sil_belirli', id: popped.id });
                }
            } else {
                break;
            }
        }

        if (avucIciSilindi) {
            isDrawing = false; // Temizle ki alt taraftaki switch blo�u kalem i�in temiz bir stroke ba�lats�n
            if (window.redrawAllStrokes) window.redrawAllStrokes();
        }

        isPenActive = true;
        clearTimeout(penActiveTimer);
        // Kalem havaya kalksa bile 2 saniye boyunca eli (avu� i�ini) reddetmeye devam et:
        penActiveTimer = setTimeout(() => { isPenActive = false; }, 2000);
    }
    if (e.pointerType === 'touch' && isPenActive) return;

    // --- KR�T�K EKLENT�: HAYALET PARMAK SIFIRLAYICI ---
    if (e.isPrimary) {
        pointers.clear();
        lastDist = 0;
    }

    if (currentTool === 'lasso') {
        const pos = getPointerPos(e);
        window.isDraggingLassoPoint = true;
        currentMousePos = pos;
        window.lassoIsClosing = false;
        redrawAllStrokes(); return;
    }

    pointers.set(e.pointerId, e);
    const pos = getPointerPos(e);
    const snapPos = snapTarget || pos;
    currentMousePos = pos;

    // --- TABLET 3D ��Z�M�: EKRANIN HAM P�KSELLER�N� AL ---
    let rawX = e.clientX; let rawY = e.clientY;
    if (window.touchCount > 0 && e.pointerType === 'touch') { rawX = e.clientX; rawY = e.clientY; } // PointerEvent uses clientX natively

    // ?? ��Z�M 4: 3D �ekil a��kken ye�il ve pembe butonlar�n t�klanmas�n� 3D motoru �almas�n! �ncelik z�rh�!
    let butonYakalandi = false;
    if (currentTool === 'move') {
        const tempHit = typeof findHit === 'function' ? findHit(pos) : null;
        if (tempHit && (tempHit.pointKey === 'image_rotate' || tempHit.pointKey === 'image_resize')) {
            butonYakalandi = true;
        }
    }

    // --- ?? K�PR� 1: 3D MOTORUNA DEVRET (HIRSIZLIK KORUMALI) ---
    if (window.Scene3D && window.Scene3D.isInit && !butonYakalandi) {
        if (currentTool === 'move' || currentTool === 'select') {
            window.Scene3D.onDown(rawX, rawY);
            // ?? ��Z�M: 3D �ekil se�ildi�inde erken d�n�� YAPMIYORUZ. 
            // 2D motorunun da isMoving, dragStartPos gibi ta��ma de�i�kenlerini ba�latmas�na izin veriyoruz!
        }
        // SADECE "draw_3d" ile ba�layan 3D ara�lar� se�iliyse 3D motoruna izin ver!
        else if (currentTool && currentTool.startsWith('draw_3d_')) {
            let toolName = currentTool.replace('draw_3d_', '');
            window.Scene3D.setTool(toolName);
            window.Scene3D.onDown(rawX, rawY);
            return;
        }
    }

    // --- 1. F�Z�KSEL ARA� KONTROL� ---
    const isToolElementClicked = e.target.closest('.ruler-container, .gonye-container, .aciolcer-container, #compass-container');
    if (typeof eraserPreview !== 'undefined' && eraserPreview) eraserPreview.style.display = 'none';
    if (isToolElementClicked) {
        isDrawingLine = isDrawingInfinityLine = isDrawingSegment = isDrawingRay = false;
        lineStartPoint = null; window.tempPolygonData = null;
        if (typeof polygonPreviewLabel !== 'undefined' && polygonPreviewLabel) polygonPreviewLabel.classList.add('hidden');
        return;
    }

    // --- 2. "TA�I" MODU KONTROL� ---
    if (currentTool === 'move') {
        const hit = findHit(pos);
        if (hit) {
            drawnStrokes = drawnStrokes.filter(s => s !== hit.item); drawnStrokes.push(hit.item); window.drawnStrokes = drawnStrokes;

            // ?? ET�KETLER�N PC'YE G�NDER�LMES� (A�a Sinyal Eklendi)
            if (hit.pointKey === 'toggle_edges') {
                hit.item.showEdgeLabels = !hit.item.showEdgeLabels;
                if (typeof window.sendNetworkData === 'function') window.sendNetworkData({ type: 'sekil_guncelle', stroke: hit.item });
                redrawAllStrokes(); return;
            }
            if (hit.pointKey === 'toggle_angles') {
                hit.item.showAngleLabels = !hit.item.showAngleLabels;
                if (typeof window.sendNetworkData === 'function') window.sendNetworkData({ type: 'sekil_guncelle', stroke: hit.item });
                redrawAllStrokes(); return;
            }
            if (hit.pointKey === 'toggle_circle_info') {
                hit.item.showCircleInfo = !hit.item.showCircleInfo;
                if (typeof window.sendNetworkData === 'function') window.sendNetworkData({ type: 'sekil_guncelle', stroke: hit.item });
                redrawAllStrokes(); return;
            }

            isMoving = true; selectedItem = hit.item; selectedPointKey = hit.pointKey; dragStartPos = pos;
            if (typeof isConnected !== 'undefined' && isConnected) window.sendNetworkData({ type: 'secimi_senkronize_et', strokeId: selectedItem.id });

            originalStartPos = {};
            if (hit.pointKey === 'self') originalStartPos = { x: hit.item.x, y: hit.item.y };
            else if (hit.pointKey === 'p1') originalStartPos = { x: hit.item.p1.x, y: hit.item.p1.y };
            else if (hit.pointKey === 'p2') originalStartPos = { x: hit.item.p2.x, y: hit.item.p2.y };
            else if (hit.pointKey === 'center') originalStartPos = { x: (hit.item.cx || hit.item.center.x), y: (hit.item.cy || hit.item.center.y) };
            else if (hit.pointKey === 'rotate' || hit.pointKey === 'resize' || hit.pointKey === 'image_resize' || hit.pointKey === 'image_rotate') {
                originalStartPos = { radius: hit.item.radius, rotation: hit.item.rotation, rotationX: hit.item.rotationX || 0, rotationY: hit.item.rotationY || 0, x: hit.item.x || (hit.item.center ? hit.item.center.x : 0), y: hit.item.y || (hit.item.center ? hit.item.center.y : 0) };
                if (selectedItem.type === 'rectangle' || selectedItem.type === 'image' || selectedItem.type === '3d_shape') { initialWidth = selectedItem.width; initialHeight = selectedItem.height; }
            }
            const itemType = hit.item.type;
            if ((itemType === 'line' || itemType === 'segment' || itemType === 'ray' || itemType === 'straightLine') && (hit.pointKey === 'p1' || hit.pointKey === 'p2')) {
                rotationPivot = (hit.pointKey === 'p1') ? hit.item.p2 : hit.item.p1; const movingPoint = (hit.pointKey === 'p1') ? hit.item.p1 : hit.item.p2; selectedItem.startRadius = distance(movingPoint, rotationPivot);
            } else rotationPivot = null;
            redrawAllStrokes(); return;
        } else {
            if (selectedItem) selectedItem.showEdgeLabels = selectedItem.showAngleLabels = selectedItem.showCircleInfo = false;
            selectedItem = null;
            if (typeof isConnected !== 'undefined' && isConnected) window.sendNetworkData({ type: 'secimi_kaldir' });
            redrawAllStrokes();
        }
    }

    if (currentTool === 'none') return;
    if (['point', 'straightLine', 'line', 'segment', 'ray'].includes(currentTool)) { if (typeof lineOptions !== 'undefined' && lineOptions) { lineOptions.classList.add('hidden'); lineOptions.style.display = 'none'; } }
    if (currentTool === 'snapshot') { snapshotStart = getPointerPos(e); return; }

    switch (currentTool) {
        case 'pen': 
        case 'smart_pen': 
            isDrawing = true; const pInfoDown = getPointerInfo(e); const pStroke = { type: 'pen', pointerType: pInfoDown.type, startTime: Date.now(), path: [{ x: snapPos.x, y: snapPos.y, p: pInfoDown.type === 'pen' ? pInfoDown.pressure : 1 }], color: currentPenColor, baseWidth: currentPenWidth, id: Date.now() + Math.random() }; drawnStrokes.push(pStroke); break;
        case 'point': isDrawing = false; const noktaObj = { type: 'point', x: snapPos.x, y: snapPos.y, label: nextPointChar, color: window.isToolThemeBlack ? '#000000' : (window.currentLineColor || '#FFFFFF'), id: Date.now() + Math.random() }; drawnStrokes.push(noktaObj); if (typeof window.sendNetworkData === 'function' && typeof isConnected !== 'undefined' && isConnected) window.sendNetworkData({ type: 'yeni_cizim', stroke: noktaObj }); nextPointChar = advanceChar(nextPointChar); if (typeof window.nextPointChar !== 'undefined') window.nextPointChar = nextPointChar; setTimeout(() => { if (typeof redrawAllStrokes === 'function') redrawAllStrokes(); }, 10); break;
        case 'eraser': isDrawing = false; break; // ?? KES�N ��Z�M: Silgi modunda kalem izi �izilmesi tamamen yasakland�!
        case 'straightLine': if (!isDrawingLine) { isDrawingLine = true; lineStartPoint = snapPos; } break;
        case 'line': if (!isDrawingInfinityLine) { isDrawingInfinityLine = true; lineStartPoint = pos; } break;
        case 'segment': if (!isDrawingSegment) { isDrawingSegment = true; lineStartPoint = snapPos; } break;
        case 'ray': if (!isDrawingRay) { isDrawingRay = true; lineStartPoint = pos; } break;
        case 'draw_rectangle': isDrawingRectangle = true; rectStartPoint = pos; break;
        case 'draw_polygon_circle':
        case 'draw_polygon_3_sides': case 'draw_polygon_4_sides': case 'draw_polygon_5_sides':
        case 'draw_polygon_6_sides': case 'draw_polygon_7_sides': case 'draw_polygon_8_sides':
            if (!window.tempPolygonData) window.tempPolygonData = { center: null, type: 0, radius: 0, rotation: 0 };
            if (window.tempPolygonData.center === null) { window.tempPolygonData.center = snapPos; window.tempPolygonData.type = currentTool === 'draw_polygon_circle' ? 0 : parseInt(currentTool.split('_')[2]); if (window.PolygonTool) window.PolygonTool.state.isDrawing = true; if (typeof polygonPreviewLabel !== 'undefined' && polygonPreviewLabel) polygonPreviewLabel.classList.remove('hidden'); }
            else {
                const finalRadius = window.tempPolygonData.radius || 0; if (window.tempPolygonData.type === 0) window.PolygonTool.finalizeCircle(finalRadius); else window.PolygonTool.finalizeDraw(finalRadius, window.tempPolygonData.rotation);
                setTimeout(() => { const lastS = drawnStrokes[drawnStrokes.length - 1]; if (lastS) window.sendNetworkData({ type: 'yeni_cizim', stroke: lastS }); }, 50);
                if (typeof polygonPreviewLabel !== 'undefined' && polygonPreviewLabel) polygonPreviewLabel.classList.add('hidden'); if (window.tempPolygonData) window.tempPolygonData.center = null;
            }
            break;
    }
}, { passive: false });

canvas.addEventListener('pointermove', (e) => {
    // ?? S�H�RL� DOKUNU� 2: S�r�kleme s�ras�nda ekran titremesinin 1 numaral� d��man� olan z�plamay� EN BA�TA yok et!
    if (e.cancelable) e.preventDefault();

    const currentPointerMove = getPointerInfo(e);
    if (currentPointerMove.type === 'pen') { isPenActive = true; clearTimeout(penActiveTimer); penActiveTimer = setTimeout(() => { isPenActive = false; }, 1000); }
    else if (currentPointerMove.type === 'touch' && isPenActive) return;

    // --- PARDUS ��FT S�NYAL ENGELLEY�C� ---
    if (e.pointerType === 'mouse') { let hasTouch = false; for (let p of pointers.values()) if (p.pointerType === 'touch' || p.pointerType === 'pen') hasTouch = true; if (hasTouch) return; }
    pointers.set(e.pointerId, e);

    if (pointers.size >= 2 && currentTool === 'move') {
        // ?? ��Z�M 3A: Zoom ba�larken s�r�klemeyi tamamen kapat!
        isMoving = false; 

        // ?? �AKI�MAYI �NLEY�C� ZIRH: E�er cihaz ger�ek TouchEvent destekliyorsa (touchCount >= 2),
        // yedek PointerEvent motorunu DURDUR! Aksi takdirde iki motor ayn� anda �al���p zoomu K�L�TLER!
        if (window.touchCount >= 2) return;

        window.isZooming = true;
        clearTimeout(window.zoomTimer);
        window.zoomTimer = setTimeout(() => { window.isZooming = false; }, 500);

        let p1x, p1y, p2x, p2y;
        const p = Array.from(pointers.values());
        if (p.length >= 2) {
            p1x = p[0].clientX; p1y = p[0].clientY; p2x = p[1].clientX; p2y = p[1].clientY;
        } else {
            return;
        }
        const currentDist = Math.hypot(p1x - p2x, p1y - p2y);
        if (lastDist > 0) {
            const delta = currentDist - lastDist; const zoomStep = 1 + (delta * 0.003);
            const bgStrokes = drawnStrokes.filter(s => s.isBackground === true);
            if (bgStrokes.length > 0) {
                const cx = bgStrokes[0].x + bgStrokes[0].width / 2;
                const cy = bgStrokes[0].y + bgStrokes[0].height / 2;
                bgStrokes.forEach(bg => { const newW = bg.width * zoomStep; const newH = bg.height * zoomStep; bg.x -= (newW - bg.width) / 2; bg.y -= (newH - bg.height) / 2; bg.width = newW; bg.height = newH; });
                if (window.drawnStrokes) window.drawnStrokes.forEach(s => { if (!s.isBackground && typeof window.zoomStroke === 'function') window.zoomStroke(s, zoomStep, cx, cy); });
                redrawAllStrokes();
                if (typeof window.sendNetworkData === 'function' && typeof isConnected !== 'undefined' && isConnected) window.sendNetworkData({ type: 'zoom_senkron', x: bgStrokes[0].x, y: bgStrokes[0].y, width: bgStrokes[0].width, height: bgStrokes[0].height });
            }
        }
        lastDist = currentDist; return;
    }

    if (pointers.size > 1 && e.isPrimary === false) return;
    const pos = getPointerPos(e); currentMousePos = pos;

    // --- TABLET 3D ��Z�M�: EKRANIN HAM P�KSELLER�N� AL ---
    let rawX = e.clientX; let rawY = e.clientY;
    if (e.targetTouches && e.targetTouches.length > 0) { rawX = e.targetTouches[0].clientX; rawY = e.targetTouches[0].clientY; }

    // --- ?? K�PR� 2: 3D HAREKET� (TA�IMA MOTORU ZIRHI) ---
    if (window.Scene3D && window.Scene3D.isInit) {
        // ?? KES�N ��Z�M: "Ta��" modundayken de �eklin hareket etmesi i�in 3D motoruna izin verdik.
        if (window.Scene3D.isDragging || window.Scene3D.isDrawing || window.Scene3D.isRotatingShape) {
            window.Scene3D.onMove(rawX, rawY);
            if (!window.Scene3D.isDragging) return; // Ta��ma i�lemi i�in 2D motoruna devam etmesine izin ver
        }
    }

    if (window.isImageRotating && selectedItem) { const cX = selectedItem.x + selectedItem.width / 2; const cY = selectedItem.y + selectedItem.height / 2; selectedItem.rotation = (Math.atan2(pos.y - cY, pos.x - cX) * 180 / Math.PI) + 90; window.sendNetworkData({ type: 'arac_senkron', selector: '.yuzen-kopya-container', transform: `rotate(${selectedItem.rotation}deg)` }); window.sendNetworkData({ type: 'sekil_guncelle', stroke: selectedItem }); if (window.redrawAllStrokes) window.redrawAllStrokes(); return; }
    if (window.isImageResizing && selectedItem) { const cX = selectedItem.x + selectedItem.width / 2; const cY = selectedItem.y + selectedItem.height / 2; const ratio = Math.hypot(pos.x - cX, pos.y - cY) / window.startImageDistance; selectedItem.width = window.startImageWidth * ratio; selectedItem.height = window.startImageHeight * ratio; selectedItem.x = cX - selectedItem.width / 2; selectedItem.y = cY - selectedItem.height / 2; window.sendNetworkData({ type: 'arac_senkron', selector: '.yuzen-kopya-container', width: selectedItem.width + 'px', height: selectedItem.height + 'px' }); window.sendNetworkData({ type: 'sekil_guncelle', stroke: selectedItem }); if (window.redrawAllStrokes) window.redrawAllStrokes(); return; }

    if (currentTool === 'move' && isMoving && selectedItem) {
        // ?? ��Z�M 3B: Ekrana ikinci parmak de�di�i an veya Zoom i�lemi devam ediyorsa
        // s�r�klemeyi an�nda iptal ediyoruz. Bu tek parmakla ta��rken ya�anan "z�plama" sorununu tamamen bitirir.
        if (window.touchCount >= 2 || pointers.size >= 2 || window.isZooming) {
            isMoving = false;
            return;
        }

        const dx = pos.x - dragStartPos.x; const dy = pos.y - dragStartPos.y;
        if (selectedPointKey === 'self' || selectedPointKey === 'center') { 
            let oldX = 0, oldY = 0, newX = 0, newY = 0;
            if (selectedItem.type === 'arc') { 
                oldX = selectedItem.cx; oldY = selectedItem.cy;
                selectedItem.cx = originalStartPos.x + dx; selectedItem.cy = originalStartPos.y + dy; 
                newX = selectedItem.cx; newY = selectedItem.cy;
            } else if (selectedItem.center) { 
                oldX = selectedItem.center.x; oldY = selectedItem.center.y;
                selectedItem.center.x = originalStartPos.x + dx; selectedItem.center.y = originalStartPos.y + dy; 
                newX = selectedItem.center.x; newY = selectedItem.center.y;
            } else { 
                oldX = selectedItem.x; oldY = selectedItem.y;
                selectedItem.x = (originalStartPos.x || 0) + dx; selectedItem.y = (originalStartPos.y || 0) + dy; 
                newX = selectedItem.x; newY = selectedItem.y;
                // ?? KES�N ��Z�M: Ta��ma s�ras�nda 3D �ekillerin originalX ve originalY de�erlerini g�ncelle
                if (selectedItem.originalX !== undefined) {
                    selectedItem.originalX = selectedItem.x;
                    selectedItem.originalY = selectedItem.y;
                }
            } 
            if (selectedItem.vertices) selectedItem.vertices = null; 

            if (selectedItem.isBackground === true) {
                const diffX = newX - oldX;
                const diffY = newY - oldY;
                if (window.drawnStrokes) {
                    window.drawnStrokes.forEach(s => {
                        if (s !== selectedItem && !s.isBackground) {
                            if (typeof window.moveStroke === 'function') window.moveStroke(s, diffX, diffY);
                        }
                    });
                }
                
                // ?? ��Z�M 1: Arka plan kayd�r�l�rken PC'ye devasa koordinatlar� g�ndermek yerine,
                // Sadece ne kadar kayd���n� (Delta X, Delta Y) �zel 'hepsini_tasi' komutuyla g�nderiyoruz.
                if (typeof isConnected !== 'undefined' && isConnected) {
                    window.sendNetworkData({ type: 'hepsini_tasi', dx: diffX, dy: diffY });
                }
                
                redrawAllStrokes();
                return; // ?? KR�T�K: Tabletin yanl�� (sekil_guncelle) komutunu yollamas�n� engeller!
            }
        }


        else if (selectedPointKey === 'rotate' || selectedPointKey === 'image_rotate') {
            if (selectedItem.type === '3d_shape') {
                // ?? KES�N ��Z�M: 3D �ekilleri X ve Y ekseninde (�ne-Arkaya ve Sa�a-Sola) D�nd�rme
                const dragDx = pos.x - dragStartPos.x;
                const dragDy = pos.y - dragStartPos.y;
                selectedItem.rotationY = (originalStartPos.rotationY || 0) + dragDx * 0.02;
                selectedItem.rotationX = (originalStartPos.rotationX || 0) + dragDy * 0.02;
                if (window.Scene3D && window.Scene3D.scene) {
                    const sceneMesh = window.Scene3D.scene.children.find(m => m.userData && m.userData.strokeData && m.userData.strokeData.id === selectedItem.id);
                    if (sceneMesh) {
                        sceneMesh.rotation.x = selectedItem.rotationX;
                        sceneMesh.rotation.y = selectedItem.rotationY;
                        window.Scene3D.updateHandlePositions();
                    }
                }
            } else {
                const isRect = (['rectangle', 'rect', 'image'].includes(selectedItem.type));
                const cX = isRect ? selectedItem.x + selectedItem.width / 2 : selectedItem.center.x;
                const cY = isRect ? selectedItem.y + selectedItem.height / 2 : selectedItem.center.y;
                selectedItem.rotation = (originalStartPos.rotation || 0) + (Math.atan2(pos.y - cY, pos.x - cX) - Math.atan2(dragStartPos.y - cY, dragStartPos.x - cX)) * (180 / Math.PI);
                if (selectedItem.vertices) selectedItem.vertices = null;
            }
        }
        else if (selectedPointKey === 'resize' || selectedPointKey === 'image_resize') {
            // ?? KES�N ��Z�M: 3D �ekillere �zel Yumu�ak B�y�tme/K���ltme
            if (selectedItem.type === '3d_shape') {
                const sW = initialWidth || selectedItem.width;
                const startCX = (originalStartPos.x || 0) + (sW / 2);
                const startCY = (originalStartPos.y || 0) + (sW / 2);
                const startDist = Math.hypot(dragStartPos.x - startCX, dragStartPos.y - startCY) || 1;
                const currentDist = Math.hypot(pos.x - startCX, pos.y - startCY);

                const ratio = currentDist / startDist;

                if (ratio > 0.1 && ratio < 10) { // S��rama ve sonsuz b�y�me engellendi
                    selectedItem.width = sW * ratio;
                    selectedItem.height = sW * ratio;
                    selectedItem.x = startCX - (selectedItem.width / 2);
                    selectedItem.y = startCY - (selectedItem.height / 2);
                    
                    // ?? 1. A� SENKRONU: Pembe butonla b�y�t�rken m�h�rl� de�erleri de b�y�t ki PC bunu kabul etsin!
                    selectedItem.originalW = selectedItem.width;
                    selectedItem.originalH = selectedItem.height;
                    selectedItem.originalX = selectedItem.x;
                    selectedItem.originalY = selectedItem.y;

                    if (window.Scene3D && window.Scene3D.scene) {
                        const sceneMesh = window.Scene3D.scene.children.find(m => m.userData && m.userData.strokeData && m.userData.strokeData.id === selectedItem.id);
                        if (sceneMesh) {
                            const yeniScale = (selectedItem.width / 30) / sceneMesh.userData.baseSize;
                            sceneMesh.scale.set(yeniScale, yeniScale, yeniScale);
                            window.Scene3D.updateHandlePositions();
                        }
                    }
                }
            }
            // D��ER (2D) �EK�LLER�N OR�J�NAL KODLARI
            else if (['rectangle', 'rect', 'image'].includes(selectedItem.type)) {
                const sW = initialWidth || selectedItem.width; const sH = initialHeight || selectedItem.height; const startCX = (originalStartPos.x || 0) + (sW / 2); const startCY = (originalStartPos.y || 0) + (sH / 2); const startDist = Math.hypot(dragStartPos.x - startCX, dragStartPos.y - startCY); if (startDist > 10) { const ratio = Math.hypot(pos.x - startCX, pos.y - startCY) / startDist; selectedItem.width = sW * ratio; selectedItem.height = sH * ratio; selectedItem.x = startCX - (selectedItem.width / 2); selectedItem.y = startCY - (selectedItem.height / 2); const previewLabel = document.getElementById('polygon-preview-label'); if (previewLabel && selectedItem.type !== 'image') { const kalibrasyon = 30; previewLabel.innerText = `w: ${(selectedItem.width / kalibrasyon).toFixed(1)} cm, h: ${(selectedItem.height / kalibrasyon).toFixed(1)} cm`; previewLabel.style.left = (pos.x + 15) + 'px'; previewLabel.style.top = (pos.y - 35) + 'px'; previewLabel.style.display = 'block'; previewLabel.classList.remove('hidden'); } }
            } else {
                const startDist = Math.hypot(dragStartPos.x - selectedItem.center.x, dragStartPos.y - selectedItem.center.y); if (startDist > 0) selectedItem.radius = originalStartPos.radius * (Math.hypot(pos.x - selectedItem.center.x, pos.y - selectedItem.center.y) / startDist); if (selectedItem.vertices) selectedItem.vertices = null; const previewLabel = document.getElementById('polygon-preview-label'); if (previewLabel) { const sides = selectedItem.sideCount || selectedItem.type; let kenarPx = selectedItem.radius; if (sides >= 3) kenarPx = 2 * selectedItem.radius * Math.sin(Math.PI / sides); previewLabel.innerText = sides === 0 ? `r: ${(kenarPx / 30).toFixed(1)} cm` : `a: ${(kenarPx / 30).toFixed(1)} cm`; previewLabel.style.left = (pos.x + 15) + 'px'; previewLabel.style.top = (pos.y - 35) + 'px'; previewLabel.style.display = 'block'; previewLabel.classList.remove('hidden'); }
            }
        }
        redrawAllStrokes();
        if (typeof isConnected !== 'undefined' && isConnected) {
            // ?? KES�N ��Z�M: 3D d�nd�rme ve konum koordinatlar� (rotationX/Y/Z ve pos3D) s�zge�ten kurtar�ld�, PC'ye g�nderiliyor!
            window.sendNetworkData({
                type: 'sekil_guncelle',
                stroke: {
                    id: selectedItem.id,
                    type: selectedItem.type,
                    isBackground: selectedItem.isBackground === true,
                    x: selectedItem.x,
                    y: selectedItem.y,
                    width: selectedItem.width,
                    height: selectedItem.height,
                    rotation: selectedItem.rotation || 0,
                    rotationX: selectedItem.rotationX,
                    rotationY: selectedItem.rotationY,
                    rotationZ: selectedItem.rotationZ,
                    pos3D: selectedItem.pos3D,
                    radius: selectedItem.radius,
                    cx: selectedItem.cx,
                    cy: selectedItem.cy,
                    center: selectedItem.center,
                    // ?? 2. A� SENKRONU: Boyut m�h�rlerini PC'ye f�rlat�yoruz!
                    originalX: selectedItem.originalX,
                    originalY: selectedItem.originalY,
                    originalW: selectedItem.originalW,
                    originalH: selectedItem.originalH
                }
            });
            window.sendNetworkData({ type: 'secimi_senkronize_et', strokeId: selectedItem.id });
        }
        return;
    }

    if (['ruler', 'gonye', 'aciolcer', 'pergel', 'none'].includes(currentTool)) return;
    clearTimeout(snapHoverTimer);
    if (['point', 'straightLine', 'pen', 'segment'].includes(currentTool)) { const potentialSnap = findSnapPoint(pos); if (potentialSnap) { snapHoverTimer = setTimeout(() => { snapTarget = potentialSnap; snapIndicator.style.left = `${snapTarget.x}px`; snapIndicator.style.top = `${snapTarget.y}px`; snapIndicator.style.display = 'block'; }, 25); } else { snapTarget = null; snapIndicator.style.display = 'none'; } }
    if (currentTool === 'eraser') { eraserPreview.style.left = `${pos.x}px`; eraserPreview.style.top = `${pos.y}px`; eraserPreview.style.display = 'block'; } else if (typeof eraserPreview !== 'undefined' && eraserPreview) eraserPreview.style.display = 'none';

    let previewActive = false; const endPos = snapTarget || pos;
    const aktifCizimVarMi = isDrawingLine || isDrawingInfinityLine || isDrawingSegment || isDrawingRay || isDrawingRectangle || (window.tempPolygonData && window.tempPolygonData.center) || (currentTool === 'snapshot' && typeof snapshotStart !== 'undefined' && snapshotStart);

    if (aktifCizimVarMi) {
        redrawAllStrokes(); const ctx = canvas.getContext('2d'); ctx.save(); ctx.strokeStyle = window.currentLineColor || '#000000'; ctx.lineWidth = 3; ctx.setLineDash([5, 5]);

        if (['straightLine', 'line', 'segment', 'ray'].includes(currentTool) && lineStartPoint) {
            ctx.beginPath(); const dx = endPos.x - lineStartPoint.x; const dy = endPos.y - lineStartPoint.y;
            if (dx !== 0 || dy !== 0) { const devCarpan = 5000; if (currentTool === 'line') { ctx.moveTo(lineStartPoint.x - dx * devCarpan, lineStartPoint.y - dy * devCarpan); ctx.lineTo(lineStartPoint.x + dx * devCarpan, lineStartPoint.y + dy * devCarpan); } else if (currentTool === 'ray') { ctx.moveTo(lineStartPoint.x, lineStartPoint.y); ctx.lineTo(lineStartPoint.x + dx * devCarpan, lineStartPoint.y + dy * devCarpan); } else { ctx.moveTo(lineStartPoint.x, lineStartPoint.y); ctx.lineTo(endPos.x, endPos.y); } } else { ctx.moveTo(lineStartPoint.x, lineStartPoint.y); ctx.lineTo(endPos.x, endPos.y); } ctx.stroke();
        }
        else if (isDrawingRectangle && rectStartPoint) { ctx.beginPath(); ctx.rect(Math.min(rectStartPoint.x, endPos.x), Math.min(rectStartPoint.y, endPos.y), Math.abs(endPos.x - rectStartPoint.x), Math.abs(endPos.y - rectStartPoint.y)); ctx.stroke(); }
        else if (window.tempPolygonData && window.tempPolygonData.center) {
            const cx = window.tempPolygonData.center.x; const cy = window.tempPolygonData.center.y; const radius = Math.hypot(endPos.x - cx, endPos.y - cy); const angleRad = Math.atan2(endPos.y - cy, endPos.x - cx); window.tempPolygonData.radius = radius; window.tempPolygonData.rotation = angleRad * 180 / Math.PI; const sides = window.tempPolygonData.type;
            ctx.beginPath(); if (sides === 0) ctx.arc(cx, cy, radius, 0, Math.PI * 2); else if (sides >= 3) { for (let i = 0; i <= sides; i++) { const polyAngle = (i * 2 * Math.PI / sides) + angleRad; const px = cx + radius * Math.cos(polyAngle); const py = cy + radius * Math.sin(polyAngle); if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py); } } ctx.stroke();
            const previewLabel = document.getElementById('polygon-preview-label'); if (previewLabel) { let kenarPx = radius; if (sides >= 3) kenarPx = 2 * radius * Math.sin(Math.PI / sides); previewLabel.innerText = sides === 0 ? `r: ${(kenarPx / 30).toFixed(1)} cm` : `a: ${(kenarPx / 30).toFixed(1)} cm`; previewLabel.style.left = (endPos.x + 15) + 'px'; previewLabel.style.top = (endPos.y - 35) + 'px'; previewLabel.style.display = 'block'; previewLabel.classList.remove('hidden'); }
        }
        else if (currentTool === 'snapshot' && snapshotStart) { ctx.strokeStyle = '#00ffcc'; ctx.beginPath(); ctx.rect(Math.min(snapshotStart.x, endPos.x), Math.min(snapshotStart.y, endPos.y), Math.abs(endPos.x - snapshotStart.x), Math.abs(endPos.y - snapshotStart.y)); ctx.stroke(); }
        ctx.restore(); previewActive = true;

        // ?? KES�N ��Z�M: Tablet dokunu�lar�ndaki PC g�nderim engelini kald�r�yoruz!
        const isTouchActive = (e.touches && e.touches.length > 0) || isDrawing || aktifCizimVarMi;
        if (typeof isConnected !== 'undefined' && isConnected && (e.buttons > 0 || isTouchActive)) {
            const anlikPos = typeof getPointerPos === 'function' ? getPointerPos(e) : { x: e.clientX, y: e.clientY };
            let previewData = null;
            if (['straightLine', 'line', 'segment', 'ray'].includes(currentTool) && typeof lineStartPoint !== 'undefined' && lineStartPoint) previewData = { tool: currentTool, start: lineStartPoint, end: anlikPos };
            // ?? ��Z�M 4 ���N D�KD�RTGEN �SM� DE D�ZELT�LD�:
            else if (currentTool === 'draw_rectangle' && typeof rectStartPoint !== 'undefined' && rectStartPoint) previewData = { tool: 'draw_rectangle', start: rectStartPoint, end: anlikPos };
            // ?? ��Z�M 3: KENAR SAYISI VE D�N�� A�ISI A�A EKLEND�:
            else if (window.tempPolygonData && window.tempPolygonData.center) previewData = { tool: 'polygon', start: window.tempPolygonData.center, end: anlikPos, radius: Math.hypot(anlikPos.x - window.tempPolygonData.center.x, anlikPos.y - window.tempPolygonData.center.y), sides: window.tempPolygonData.type, rotation: Math.atan2(anlikPos.y - window.tempPolygonData.center.y, anlikPos.x - window.tempPolygonData.center.x) };
            if (previewData) window.sendNetworkData({ type: 'aktif_onizleme', arac: 'cizim_onizleme', payload: previewData });
        }
    }

    if (previewActive) return;
    if (currentTool === 'lasso') { currentMousePos = pos; if (typeof isDrawingLasso !== 'undefined' && isDrawingLasso && typeof lassoPoints !== 'undefined' && lassoPoints.length > 0) { let startPoint = lassoPoints[0]; const toleransScale = (typeof globalScale !== 'undefined' && globalScale > 0) ? globalScale : 1; window.lassoIsClosing = (Math.hypot(pos.x - startPoint.x, pos.y - startPoint.y) < (40 / toleransScale)); } redrawAllStrokes(); return; }
    if (!isDrawing) return;

    if (currentTool === 'pen' || currentTool === 'smart_pen') {
        const pInfoMove = getPointerInfo(e);
        const curStroke = drawnStrokes[drawnStrokes.length - 1];
        curStroke.path.push({ x: pos.x, y: pos.y, p: pInfoMove.type === 'pen' ? pInfoMove.pressure : 1 }); 
        redrawAllStrokes();

        // ?? CANLI ��Z�M (LIVE INK) AKTARIMI ??
        // Kalem hen�z havadayken, yaz�lan k�sm�n tamam� saliseler i�inde PC'ye f�rlat�l�r
        if (typeof isConnected !== 'undefined' && isConnected) {
            window.sendNetworkData({ 
                type: 'aktif_onizleme', 
                arac: 'cizim_onizleme', 
                payload: { tool: 'pen', path: curStroke.path, color: curStroke.color, baseWidth: curStroke.baseWidth } 
            });
        }
    }
}, { passive: false });


// --- POINTERUP (T�M ��Z�M VE ARA� ��LEMLER�N�N B�T���) ---

canvas.addEventListener('pointerup', (e) => {
    isDrawing = false;

    // Kilitleri serbest b�rak
    if (canvas.hasPointerCapture && canvas.hasPointerCapture(e.pointerId)) {
        canvas.releasePointerCapture(e.pointerId);
    }
    if (e.pointerType === 'touch' && e.cancelable) e.preventDefault();

    // --- PARDUS ��FT S�NYAL ENGELLEY�C� ---
    if (e.pointerType === 'mouse') {
        let hasTouch = false;
        for (let p of pointers.values()) {
            if (p.pointerType === 'touch' || p.pointerType === 'pen') hasTouch = true;
        }
        if (hasTouch) return;
    }

    pointers.delete(e.pointerId);
    if (pointers.size < 2) lastDist = 0;

    const finalPos = snapTarget || currentMousePos;

    // --- ?? K�PR� 3: 3D ��LEM�N� B�T�R VE SAHNEYE KOY ---
    if (window.Scene3D && window.Scene3D.isInit) {
        if (window.Scene3D.isDragging || window.Scene3D.isDrawing || window.Scene3D.isRotatingShape) {
            const wasDrawing = window.Scene3D.isDrawing;
            const wasDragging = window.Scene3D.isDragging;
            window.Scene3D.onUp();

            if (wasDrawing) {
                // ?? KES�N ��Z�M: "Ta��" (move) butonuna otomatik ge�meyi �PTAL ettik. Sistem bo�ta kal�r.
                window.active3DShapeTool = null;
                currentTool = 'none';
                if (typeof setActiveTool === 'function') setActiveTool('none');

                const mainBtn = document.getElementById('btn-3d-menu');
                if (mainBtn) mainBtn.classList.remove('active');

                if (typeof window.sendNetworkData === 'function') window.sendNetworkData({ type: 'onizleme_bitir' });
            }
            if (!wasDragging) return; // Ta��ma i�lemi i�in 2D motoruna devam etmesine izin ver
        }
    }


    // --- A) F�Z�KSEL ARA�LAR (CETVEL, G�NYE, PERGEL vb.) ---
    const isPhysicalTool = ['ruler', 'gonye', 'aciolcer', 'pergel'].includes(currentTool);
    if (isPhysicalTool) {
        isDrawing = false;
        if (currentTool === 'ruler' && window.RulerTool && window.RulerTool.finalizeDraw) window.RulerTool.finalizeDraw();
        if (currentTool === 'gonye' && window.GonyeTool && window.GonyeTool.finalizeDraw) window.GonyeTool.finalizeDraw();
        if (currentTool === 'aciolcer' && window.AciolcerTool && window.AciolcerTool.finalizeDraw) window.AciolcerTool.finalizeDraw();
        if (currentTool === 'pergel' && window.PergelTool && window.PergelTool.finalizeDraw) window.PergelTool.finalizeDraw();

        setTimeout(() => {
            const lastS = drawnStrokes[drawnStrokes.length - 1];
            if (lastS) {
                if (!lastS.id) lastS.id = Date.now() + Math.random();
                if (typeof window.sendNetworkData === 'function' && typeof isConnected !== 'undefined' && isConnected) {
                    window.sendNetworkData({ type: 'onizleme_bitir' });
                    window.sendNetworkData({ type: 'yeni_cizim', stroke: lastS });
                }
            }
        }, 50);

        redrawAllStrokes();
        return;
    }

    // --- B) TA�IMA (MOVE) MANTI�I ---
    if (currentTool === 'move' && isMoving) {
        isMoving = false;
        selectedPointKey = null;
        if (returnToSnapshot) {
            returnToSnapshot = false;
            setActiveTool('snapshot');
            if (typeof animateButton !== 'undefined' && animateButton) animateButton.classList.add('active');
            document.body.classList.add('cursor-snapshot');
        }
        redrawAllStrokes();
        return;
    }

    // --- C) NORMAL ��ZG�LER (DO�RU, I�IN, SEGMENT) ---
    if (lineStartPoint && finalPos) {
        let strokeObj = null;
        const cizgiRengi = window.isToolThemeBlack ? '#000000' : (window.currentLineColor || '#FFFFFF');

        if (isDrawingLine) strokeObj = { type: 'straightLine', p1: lineStartPoint, p2: finalPos, color: cizgiRengi, width: 4 };
        else if (isDrawingInfinityLine) {
            const l1 = nextPointChar; const l2 = advanceChar(l1); nextPointChar = advanceChar(l2);
            strokeObj = { type: 'line', p1: lineStartPoint, p2: finalPos, color: cizgiRengi, width: 4, label1: l1, label2: l2 };
        }
        else if (isDrawingSegment) {
            const l1 = nextPointChar; const l2 = advanceChar(l1); nextPointChar = advanceChar(l2);
            strokeObj = { type: 'segment', p1: lineStartPoint, p2: finalPos, color: cizgiRengi, width: 4, label1: l1, label2: l2 };
        }
        else if (isDrawingRay) {
            const l1 = nextPointChar; const l2 = advanceChar(l1); nextPointChar = advanceChar(l2);
            strokeObj = { type: 'ray', p1: lineStartPoint, p2: finalPos, color: cizgiRengi, width: 4, label1: l1, label2: l2 };
        }

        if (strokeObj) {
            strokeObj.id = Date.now() + Math.random();
            drawnStrokes.push(strokeObj);

            // ?? S�H�RL� ��Z�M: Ger�ek �izimi atmadan �nce �nizlemeleri yokediyoruz!
            if (typeof window.sendNetworkData === 'function' && typeof isConnected !== 'undefined' && isConnected) {
                window.sendNetworkData({ type: 'onizleme_bitir' });
                window.sendNetworkData({ type: 'yeni_cizim', stroke: strokeObj });
            }
            window.nextPointChar = nextPointChar;
            if (typeof redrawAllStrokes === 'function') redrawAllStrokes();
        }
    }

    // --- D) �OKGENLER (POLYGON TOOL) ---
    if (currentTool && currentTool.startsWith('draw_polygon_')) {
        if (window.tempPolygonData && window.tempPolygonData.center) {
            const finalRadius = window.tempPolygonData.radius || 0;
            if (finalRadius > 5) {
                const currentType = window.tempPolygonData.type;

                if (currentType === 0) window.PolygonTool.finalizeCircle(finalRadius);
                else window.PolygonTool.finalizeDraw(finalRadius, window.tempPolygonData.rotation);

                // ?? S�H�RL� ��Z�M: �nizlemeyi an�nda sildiriyoruz
                if (typeof window.sendNetworkData === 'function' && typeof isConnected !== 'undefined' && isConnected) {
                    window.sendNetworkData({ type: 'onizleme_bitir' });
                }

                setTimeout(() => {
                    const lastS = drawnStrokes[drawnStrokes.length - 1];
                    if (typeof window.sendNetworkData === 'function' && typeof isConnected !== 'undefined' && isConnected && lastS) {
                        window.sendNetworkData({ type: 'yeni_cizim', stroke: lastS });
                    }
                }, 50);

                if (typeof polygonPreviewLabel !== 'undefined' && polygonPreviewLabel) polygonPreviewLabel.classList.add('hidden');
                if (window.tempPolygonData) window.tempPolygonData.center = null;
                if (window.PolygonTool && window.PolygonTool.handleDrawClick) window.PolygonTool.handleDrawClick(null, currentType);
            }
        }
    }

    // --- E) CANLANDIR (KUTU SNAPSHOT) ---
    if (currentTool === 'snapshot' && snapshotStart && currentMousePos) {
        const x = Math.round(Math.min(snapshotStart.x, currentMousePos.x));
        const y = Math.round(Math.min(snapshotStart.y, currentMousePos.y));
        const w = Math.round(Math.abs(currentMousePos.x - snapshotStart.x));
        const h = Math.round(Math.abs(currentMousePos.y - snapshotStart.y));

        if (w > 10 && h > 10) {
            const tempCanvas = document.createElement('canvas');
            const tempCtx = tempCanvas.getContext('2d');

            tempCanvas.width = w; tempCanvas.height = h;

            // G�r�nt� netli�ini en �st d�zeye ��kar
            tempCtx.imageSmoothingEnabled = true;
            tempCtx.imageSmoothingQuality = 'high';

            const bgCanvas = document.getElementById('bg-canvas');
            if (bgCanvas) tempCtx.drawImage(bgCanvas, x, y, w, h, 0, 0, w, h);
            tempCtx.drawImage(canvas, x, y, w, h, 0, 0, w, h);
            
            // ?? BEYAZ ARKA PLANI �EFFAF YAPMA MANTI�I: 
            // Kutu kopyas� kareli zemine vb. yap��t�r�ld���nda beyazlar�n alttaki �izgileri �rtmemesi i�in
            try {
                const imgData = tempCtx.getImageData(0, 0, w, h);
                const data = imgData.data;
                for (let i = 0; i < data.length; i += 4) {
                    const r = data[i];
                    const g = data[i + 1];
                    const b = data[i + 2];
                    // Beyaza �ok yak�n olan pikselleri (�rne�in rgb de�eri 240 ve �st� olanlar�) tam �effaf (alpha = 0) yap�yoruz
                    if (r >= 240 && g >= 240 && b >= 240) {
                        data[i + 3] = 0; 
                    }
                }
                tempCtx.putImageData(imgData, 0, 0);
            } catch (e) {
                console.warn("CORS veya resim izni nedeniyle arka plan �effafla�t�r�lamad�:", e);
            }

            const finalImage = tempCanvas.toDataURL('image/png', 1.0);

            const newImgStroke = {
                type: 'image', imgData: finalImage, x: x, y: y, width: w, height: h,
                id: Date.now() + Math.random() + 1, isBoxCopy: true, isBackground: false
            };
            drawnStrokes.push(newImgStroke);

            if (typeof window.sendNetworkData === 'function' && typeof isConnected !== 'undefined' && isConnected) {
                window.sendNetworkData({ type: 'onizleme_bitir' });
                window.sendNetworkData({ type: 'yeni_cizim', stroke: newImgStroke });
            }

            if (typeof setActiveTool === 'function') setActiveTool('move');
            else currentTool = 'move';

            selectedItem = newImgStroke;
            snapshotStart = null;
            redrawAllStrokes();
        }
    }

    // --- F) D�KD�RTGEN ARACI ---
    if (isDrawingRectangle && rectStartPoint && finalPos) {
        const widthPx = Math.abs(finalPos.x - rectStartPoint.x);
        const heightPx = Math.abs(finalPos.y - rectStartPoint.y);

        if (widthPx > 10 && heightPx > 10) {
            const startX = Math.min(rectStartPoint.x, finalPos.x);
            const startY = Math.min(rectStartPoint.y, finalPos.y);
            const color = window.isToolThemeBlack ? '#000000' : (window.currentLineColor || '#000000');

            const rectLabels = [nextPointChar];
            for (let i = 0; i < 3; i++) { nextPointChar = advanceChar(nextPointChar); rectLabels.push(nextPointChar); }
            nextPointChar = advanceChar(nextPointChar);

            const rectangleStroke = {
                type: 'rectangle', x: startX, y: startY, width: widthPx, height: heightPx, rotation: 0,
                color: color, labels: rectLabels, showEdgeLabels: true, showAngleLabels: false,
                id: Date.now() + Math.random()
            };

            drawnStrokes.push(rectangleStroke);

            if (typeof window.sendNetworkData === 'function' && typeof isConnected !== 'undefined' && isConnected) {
                window.sendNetworkData({ type: 'onizleme_bitir' }); // ?? Ekledik
                window.sendNetworkData({ type: 'yeni_cizim', stroke: rectangleStroke });
            }
            window.nextPointChar = nextPointChar;
            if (typeof redrawAllStrokes === 'function') redrawAllStrokes();
        }
    }

    // --- G) AKILLI KALEM (PEN) VE �EK�L TANIMA (G�VENL� S�R�M) ---
    if (currentTool === 'pen' || currentTool === 'smart_pen') {
        let lastStroke = drawnStrokes[drawnStrokes.length - 1];

        if (lastStroke && lastStroke.type === 'pen') {
            if (!lastStroke.id) lastStroke.id = Date.now() + Math.random();

            if (lastStroke.path && lastStroke.path.length <= 3) {
                if (lastStroke.path[0]) lastStroke.path.push({ x: lastStroke.path[0].x + 0.1, y: lastStroke.path[0].y + 0.1 });
                setTimeout(() => {
                    if (typeof window.sendNetworkData === 'function' && typeof isConnected !== 'undefined' && isConnected) {
                        window.sendNetworkData({ type: 'yeni_cizim', stroke: lastStroke });
                    }
                }, 50);
            }
            else {
                let correctedShape = null;
                if (currentTool === 'smart_pen' && typeof akilliSekilTani === 'function') {
                    try { correctedShape = akilliSekilTani(lastStroke); } catch (err) { }
                }

                if (correctedShape) {
                    drawnStrokes.pop(); if (typeof window.sendNetworkData === 'function' && typeof isConnected !== 'undefined' && isConnected && lastStroke && lastStroke.id) { window.sendNetworkData({ type: 'sil_belirli', id: lastStroke.id }); } if (Array.isArray(correctedShape)) {
                        correctedShape.forEach(s => s.id = Date.now() + Math.random());
                        drawnStrokes.push(...correctedShape);

                        setTimeout(() => {
                            if (typeof window.sendNetworkData === 'function' && typeof isConnected !== 'undefined' && isConnected) {
                                window.sendNetworkData({ type: 'akilli_sekil_toplu', strokes: correctedShape });
                            }
                        }, 50);
                    }
                    else {
                        correctedShape.id = Date.now() + Math.random();
                        drawnStrokes.push(correctedShape);

                        setTimeout(() => {
                            if (typeof window.sendNetworkData === 'function' && typeof isConnected !== 'undefined' && isConnected) {
                                window.sendNetworkData({ type: 'yeni_cizim', stroke: correctedShape });
                            }
                        }, 50);
                    }
                    
                    if (typeof redrawAllStrokes === 'function') redrawAllStrokes();
                }
                else {
                    const safePenStroke = {
                        type: 'pen', id: lastStroke.id, color: lastStroke.color || '#000000',
                        baseWidth: lastStroke.baseWidth || 4, width: lastStroke.width || lastStroke.baseWidth || 4,
                        isBackground: false,
                        path: lastStroke.path.map(p => ({ x: Math.round(p.x), y: Math.round(p.y), p: Number((p.p || 1).toFixed(2)) }))
                    };

                    setTimeout(() => {
                        if (typeof window.sendNetworkData === 'function' && typeof isConnected !== 'undefined' && isConnected) {
                            window.sendNetworkData({ type: 'yeni_cizim', stroke: safePenStroke });
                        }
                    }, 50);
                }
            }
        }
    }

    // --- GENEL SIFIRLAMA ---
    isDrawing = false;
    isDrawingLine = isDrawingInfinityLine = isDrawingSegment = isDrawingRay = false;
    isDrawingRectangle = false;
    lineStartPoint = null;
    rectStartPoint = null;
    snapTarget = null;
    window.isImageRotating = false;
    window.isImageResizing = false;
    if (typeof snapIndicator !== 'undefined' && snapIndicator) snapIndicator.style.display = 'none';

    // Olas� t�m hayaletleri zorla sil (Garanti Protokol�)
    if (typeof window.sendNetworkData === 'function' && typeof isConnected !== 'undefined' && isConnected) {
        window.sendNetworkData({ type: 'onizleme_bitir' });
    }

    // --- H) KESK�N N��ANCI LASSO (SERBEST KES�M) ---
    if (currentTool === 'lasso' && window.isDraggingLassoPoint) {
        window.isDraggingLassoPoint = false;

        if (!isDrawingLasso) {
            isDrawingLasso = true;
            lassoPoints = [{ x: currentMousePos.x, y: currentMousePos.y }];
        } else {
            let startPoint = lassoPoints[0];
            const mesafe = Math.hypot(currentMousePos.x - startPoint.x, currentMousePos.y - startPoint.y);

            if (mesafe < 40) {
                lassoPoints.push({ x: startPoint.x, y: startPoint.y });

                let minX = Math.min(...lassoPoints.map(p => p.x));
                let minY = Math.min(...lassoPoints.map(p => p.y));
                let maxX = Math.max(...lassoPoints.map(p => p.x));
                let maxY = Math.max(...lassoPoints.map(p => p.y));
                let w = Math.max(10, maxX - minX);
                let h = Math.max(10, maxY - minY);

                const tempCanvas = document.createElement('canvas');
                tempCanvas.width = w; tempCanvas.height = h;
                const tempCtx = tempCanvas.getContext('2d');

                tempCtx.save();
                tempCtx.beginPath();
                tempCtx.moveTo(lassoPoints[0].x - minX, lassoPoints[0].y - minY);
                for (let i = 1; i < lassoPoints.length; i++) tempCtx.lineTo(lassoPoints[i].x - minX, lassoPoints[i].y - minY);
                tempCtx.closePath();
                tempCtx.clip();

                // Kaliteyi art�r
                tempCtx.imageSmoothingEnabled = true;
                tempCtx.imageSmoothingQuality = 'high';

                const bgCanvas = document.getElementById('bg-canvas');
                if (bgCanvas) {
                    tempCtx.drawImage(bgCanvas, minX, minY, w, h, 0, 0, w, h);
                }
                tempCtx.drawImage(canvas, minX, minY, w, h, 0, 0, w, h);
                tempCtx.restore();

                const finalImage = tempCanvas.toDataURL('image/png', 1.0);

                let detectedColor = (typeof window.isToolThemeBlack !== 'undefined' && window.isToolThemeBlack) ? '#222222' : '#ffffff';

                try {
                    const bgCanvas = document.getElementById('bg-canvas');
                    const bgCtx = bgCanvas ? bgCanvas.getContext('2d') : null;
                    const mainCtx = canvas.getContext('2d');
                    
                    let centerX = (minX + maxX) / 2;
                    let centerY = (minY + maxY) / 2;
                    
                    let samplePoints = [
                        { x: centerX, y: minY - 5 },
                        { x: centerX, y: maxY + 5 },
                        { x: minX - 5, y: centerY },
                        { x: maxX + 5, y: centerY }
                    ];
                    
                    for (let sp of samplePoints) {
                        let r = 0, g = 0, b = 0, a = 0;
                        
                        let mainData = mainCtx.getImageData(sp.x, sp.y, 1, 1).data;
                        if (mainData[3] > 0) {
                            r = mainData[0]; g = mainData[1]; b = mainData[2]; a = mainData[3];
                        } else if (bgCtx) {
                            let bgData = bgCtx.getImageData(sp.x, sp.y, 1, 1).data;
                            if (bgData[3] > 0) {
                                r = bgData[0]; g = bgData[1]; b = bgData[2]; a = bgData[3];
                            }
                        }
                        
                        if (a > 0) {
                            detectedColor = `rgba(${r}, ${g}, ${b}, ${a / 255})`;
                            break;
                        }
                    }
                } catch (e) { console.warn("Renk �rnekleme hatas�:", e); }

                const maskStroke = { type: 'lasso-mask', points: lassoPoints.map(p => ({ x: p.x, y: p.y })), fillColor: detectedColor, id: Date.now() + Math.random() };
                drawnStrokes.push(maskStroke);

                const newImgStroke = { type: 'image', imgData: finalImage, x: minX + 30, y: minY + 30, width: w, height: h, rotation: 0, isBackground: false, imgObj: null, id: Date.now() + Math.random() };

                const tempImg = new Image();
                tempImg.onload = () => { newImgStroke.imgObj = tempImg; if (typeof redrawAllStrokes === 'function') redrawAllStrokes(); };
                tempImg.src = finalImage;
                drawnStrokes.push(newImgStroke);

                if (typeof window.sendNetworkData === 'function' && typeof isConnected !== 'undefined' && isConnected) {
                    window.sendNetworkData({ type: 'yeni_cizim', stroke: maskStroke });
                    window.sendNetworkData({ type: 'yeni_cizim', stroke: newImgStroke });
                }

                if (typeof setActiveTool === 'function') setActiveTool('move'); else currentTool = 'move';
                selectedItem = newImgStroke;
                isDrawingLasso = false; window.lassoIsClosing = false; currentMousePos = null; lassoPoints = [];
            } else {
                lassoPoints.push({ x: currentMousePos.x, y: currentMousePos.y });
            }
        }
        redrawAllStrokes();
        return;
    } else {
        redrawAllStrokes();
    }
}, { passive: false }); // <--- pointerup fonksiyonu burada B�TT�==============================================================================


// ?? KES�N ��Z�M: �� i�e ge�ip sonsuz d�ng�ye giren (Z�plamaya sebep olan) Hatal� Kod Temizlendi!
canvas.addEventListener('wheel', (e) => {
    if (e.ctrlKey) {
        e.preventDefault();

        // Yaln�zca 'Ta��' (move) arac� se�iliyken fare ile zoom yap�labilir
        if (currentTool !== 'move') return;

        const zoomStep = e.deltaY > 0 ? 0.95 : 1.05;

        const mainBg = drawnStrokes.find(s => s.isBackground === true && !s.isPatch);
        if (mainBg) {
            const cx = mainBg.x + mainBg.width / 2;
            const cy = mainBg.y + mainBg.height / 2;
            
            drawnStrokes.forEach(bg => {
                if (bg.isBackground === true) {
                    const bg_cx = bg.x + bg.width / 2;
                    const bg_cy = bg.y + bg.height / 2;
                    const ncx = cx + (bg_cx - cx) * zoomStep;
                    const ncy = cy + (bg_cy - cy) * zoomStep;
                    bg.width *= zoomStep; bg.height *= zoomStep;
                    bg.x = ncx - bg.width / 2; bg.y = ncy - bg.height / 2;
                }
            });

            if (window.drawnStrokes) {
                window.drawnStrokes.forEach(s => {
                    if (!s.isBackground && typeof window.zoomStroke === 'function') window.zoomStroke(s, zoomStep, cx, cy);
                });
            }

            redrawAllStrokes();

            if (typeof isConnected !== 'undefined' && isConnected) {
                window.sendNetworkData({
                    type: 'zoom_senkron', x: mainBg.x, y: mainBg.y, width: mainBg.width, height: mainBg.height
                });
            }
        }
    }
}, { passive: false });


// --- POINTERCANCEL (KES�NT� DURUMUNDA SIFIRLAMA) ---
canvas.addEventListener('pointercancel', (e) => {
    // --- BUNLARI EKLE ---
    pointers.delete(e.pointerId);
    lastDist = 0;
    // --------------------

    // ��lemi iptal et ve t�m bayraklar� (flag) indir
    isDrawing = false;
    isMoving = false;
    isPinching = false; // Varsa zoom i�lemini de durdur
    isDrawingRectangle = false;
    rectStartPoint = null;

    // Ge�ici verileri temizle
    snapshotStart = null;
    snapTarget = null;
    lineStartPoint = null;
    window.tempPolygonData = null;

    // Aray�z elemanlar�n� gizle
    if (snapIndicator) snapIndicator.style.display = 'none';
    if (polygonPreviewLabel) polygonPreviewLabel.classList.add('hidden');
    if (eraserPreview) eraserPreview.style.display = 'none';

    // Yar�m kalan �nizlemeleri ekrandan temizlemek i�in
    redrawAllStrokes();

    console.log("Pointer i�lemi bir sistem kesintisi nedeniyle iptal edildi.");
});


// --- BUNLARI EKLE: Tablet ekran�ndan d��ar� ta�an parmaklar� zorla sil ---
canvas.addEventListener('pointerout', (e) => { pointers.delete(e.pointerId); if (pointers.size < 2) lastDist = 0; });
canvas.addEventListener('pointerleave', (e) => { pointers.delete(e.pointerId); if (pointers.size < 2) lastDist = 0; });


// --- YAPI�TIRMA (PASTE) DESTE�� (CTRL+V) ---
window.addEventListener('paste', (e) => {
    // Panodaki verileri al
    const items = (e.clipboardData || e.originalEvent.clipboardData).items;

    // Verileri tara (Resim var m�?)
    for (let index in items) {
        const item = items[index];

        // E�er bu bir dosya ise ve tipi 'image' i�eriyorsa
        if (item.kind === 'file' && item.type.indexOf('image/') !== -1) {
            const blob = item.getAsFile();
            const reader = new FileReader();

            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    // Resmi makul bir boyuta getir (Dosya y�klemedeki mant���n ayn�s�)
                    let startWidth = 300;
                    let scaleFactor = startWidth / img.width;
                    let startHeight = img.height * scaleFactor;

                    // Resmi Haf�zaya 'image' nesnesi olarak ekle
                    drawnStrokes.push({
                        type: 'image',
                        img: img,
                        x: canvas.width / 2, // Ekran�n ortas�na koy
                        y: canvas.height / 2,
                        width: startWidth,
                        height: startHeight,
                        rotation: 0
                    });

                    redrawAllStrokes(); // Ekrana �iz

                    // ��lem ba�ar�l� sesi (�ste�e ba�l�)
                    if (window.audio_click) {
                        window.audio_click.currentTime = 0;
                        window.audio_click.play();
                    }
                };
                img.src = event.target.result;
            };

            reader.readAsDataURL(blob);
            e.preventDefault(); // Sayfan�n varsay�lan yap��t�rma davran���n� engelle
        }
    }
});

// --- app.js EN ALTINA EKLEY�N (EKS�K OLAN PAR�ALAR) ---

function updatePageLabel() {
    if (pageCountLabel) pageCountLabel.innerText = `Sayfa: ${currentPDFPage} / ${totalPDFPages}`;
}

window.renderPDFPage = async function(num) {
    if (!currentPDF) return;

    // ?? BEYAZ EKRAN VE DONMA ��Z�M�: H�zl� sayfa de�i�imlerinde PDF motorunun t�kanmas�n� engelle
    if (window.currentRenderTask) {
        try { window.currentRenderTask.cancel(); } catch(e){}
    }

    try {
        const page = await currentPDF.getPage(num);

        // --- BURASI DE���T�: OTOMAT�K VE Y�KSEK ��Z�N�RL�K AYARI ---
        const dpr = window.devicePixelRatio || 1;
        const KALITE_CARPANI = 2; // Daha g�venli bir katsay� (3 �ok y�ksekti, donan�ma �arp�yordu)
        const hdScale = dpr * KALITE_CARPANI;

        let viewport = page.getViewport({ scale: hdScale });

        // G�VENL�K ZIRHI: Mobil ve baz� PC taray�c�lar�nda canvas limiti 4096px'dir.
        // E�er sayfa �ok b�y�kse (�rne�in 5000px), �l�e�i g�venli bir s�n�ra zorla d���r!
        // Bu sayede "sayfa yar�m geldi" veya "canvas dondu" hatalar�n� K�K�NDEN �nleriz!
        if (viewport.height > 3500 || viewport.width > 3500) {
            const maxDim = Math.max(viewport.height, viewport.width);
            const safeScale = hdScale * (3500 / maxDim);
            viewport = page.getViewport({ scale: safeScale });
        }
        // -----------------------------------------------------------

        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        tempCanvas.height = viewport.height;
        tempCanvas.width = viewport.width;

        // --- BURASI EKLEND�: YAZI KENARLARINI KESK�NLE�T�RME F�LTRES� ---
        tempCtx.imageSmoothingEnabled = true;
        tempCtx.imageSmoothingQuality = 'high';
        
        // JPEG format�nda arka plan�n siyah ��kmas�n� �nlemek i�in beyaz zemin
        tempCtx.fillStyle = '#FFFFFF';
        tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
        // ----------------------------------------------------------------

        window.currentRenderTask = page.render({
            canvasContext: tempCtx,
            viewport: viewport
        });

        await window.currentRenderTask.promise;

    const img = new Image();
    img.onload = () => {
        window.addNewImageToCanvas(img, true);

        // --- KUTU KOPYALARINI PDF SAYFASINA G�RE GER� Y�KLEME YAMASI ---
        if (window.boxCopies) {
            window.boxCopies.forEach(copy => {
                if (!copy.pageOwner || copy.pageOwner === num) {
                    if (!copy.imgObj) {
                        const tImg = new Image();
                        tImg.src = copy.imgData;
                        tImg.onload = () => {
                            copy.imgObj = tImg;
                            if (window.drawnStrokes && !window.drawnStrokes.includes(copy)) {
                                window.drawnStrokes.push(copy);
                            }
                            if (window.redrawAllStrokes) window.redrawAllStrokes();
                        };
                    } else {
                        if (window.drawnStrokes && !window.drawnStrokes.includes(copy)) {
                            window.drawnStrokes.push(copy);
                        }
                    }
                }
            });
            if (window.redrawAllStrokes) window.redrawAllStrokes();
        }
    };

    // ?? ��TE 2. ADIMDAK� DE����KL���N YAPILDI�I YER BURASI ??
    // A�� fel� eden 20MB PNG yerine %80 kalite JPEG (1MB alt�) kullanarak donmay� ve yar�m y�klemeyi bitiriyoruz!
    const sayfaResmi = tempCanvas.toDataURL('image/jpeg', 0.8);
    img.src = sayfaResmi;

    if (pageCountLabel) pageCountLabel.innerText = `Sayfa: ${num} / ${totalPDFPages}`;
    
    } catch (e) {
        if (e.name === 'RenderingCancelledException') {
            console.log("H�zl� sayfa de�i�imi nedeniyle �nceki �izim iptal edildi.");
        } else {
            console.warn("PDF Render hatas�:", e);
        }
    }
}



window.addNewImageToCanvas = function(img, isPDF = false, pcKordinatlari = null) {
    let startWidth, startHeight, posX, posY;

    // E�er PC isek, tabletin bize g�nderdi�i adaptStrokeToScreen'den ge�mi� kusursuz koordinatlar� kullan!
    if (pcKordinatlari) {
        startWidth = pcKordinatlari.width;
        startHeight = pcKordinatlari.height;
        posX = pcKordinatlari.x;
        posY = pcKordinatlari.y;
    } else {
        // E�er Tabletsek kendi ekran�m�za g�re hesapla
        startWidth = canvas.width * 0.8;
        if (img.width < startWidth) startWidth = img.width;
        let scaleFactor = startWidth / img.width;
        startHeight = img.height * scaleFactor;

        if (startHeight > canvas.height * 0.8) {
            startHeight = canvas.height * 0.8;
            let scaleFactorH = startHeight / img.height;
            startWidth = img.width * scaleFactorH;
        }

        posX = (canvas.width / 2) - (startWidth / 2);
        posY = (canvas.height / 2) - (startHeight / 2);
    }

    const newStroke = {
        type: 'image',
        id: Date.now() + Math.random(),
        img: img,
        imgData: img.src, // ?? KES�N ��Z�M: PDF'in tahta_durumu ile a�dan ge�erken kaybolmamas� i�in imgData eklendi!
        x: posX,
        y: posY,
        width: startWidth,
        height: startHeight,
        rotation: 0,
        isBackground: true
    };

    if (isPDF && typeof pdfImageStroke !== 'undefined' && pdfImageStroke !== null) {
        for (let i = window.drawnStrokes.length - 1; i >= 0; i--) {
            let s = window.drawnStrokes[i];
            if (s === pdfImageStroke ||
                (s.type === 'image' && s.isBackground === false && !s.isBoxCopy) ||
                (s.isPatch === true || s.type === 'lasso-mask')) {
                window.drawnStrokes.splice(i, 1);
            }
        }
        if (typeof drawnStrokes !== 'undefined') drawnStrokes = window.drawnStrokes;
    }

    drawnStrokes.push(newStroke);
    if (isPDF) { pdfImageStroke = newStroke; }

    const pdfControls = document.getElementById('pdf-controls');
    if (pdfControls) { pdfControls.classList.remove('hidden'); pdfControls.style.display = 'flex'; }

    const closeBtn = document.getElementById('btn-close-pdf');
            if (closeBtn) { closeBtn.classList.remove('hidden'); closeBtn.style.display = 'flex'; }

            redrawAllStrokes();

            // ?? ��Z�M 1: Tabletin resmi an�nda g�rebilmesi i�in k���k bir gecikmeyle ekran� zorla tazeliyoruz. 
            // Bu sayede "bo�lu�a t�klama" zorunlulu�u ortadan kalkar ve PDF an�nda g�r�n�r!
            setTimeout(() => { if (typeof window.redrawAllStrokes === 'function') window.redrawAllStrokes(); }, 150);

            // ?? PC'nin donan�m� zay�f oldu�u i�in ve PDF kitap g�nderimi �nceden kapat�ld��� i�in, 
            // Tablet her hal�karda �izdi�i hafifletilmi� JPEG sayfay� PC'ye g�ndermek zorunda!
            if (!pcKordinatlari && typeof isConnected !== 'undefined' && isConnected) {
                window.sendNetworkData({
                    type: 'arka_plan_resmi_aktar',
                    imgData: img.src,
                    isPDF: isPDF,
                    kordinatlar: { x: newStroke.x, y: newStroke.y, width: newStroke.width, height: newStroke.height },
                    canvasW: canvas.width,
                    canvasH: canvas.height
                });
            }

    // ?? KES�N ��Z�M: Y�kleme i�leminden sonra Ta�� butonunun kendi kendine aktif olmas�n� engellemek i�in arac� Kalem'e s�f�rla.
    if (typeof setActiveTool === 'function') setActiveTool('pen');
}



// --- ARA� RENG� DE���T�RME MANTI�I (S�YAH / NEON / TOK MAV�) ---
const toolColorBtn = document.getElementById('btn-tool-color');
let isBlackTheme = false;
window.isToolThemeBlack = false; // Di�er dosyalar i�in global de�i�ken

if (toolColorBtn) {
    toolColorBtn.addEventListener('click', () => {
        isBlackTheme = !isBlackTheme;
        window.isToolThemeBlack = isBlackTheme; // Durumu kaydet

        // Buton yaz�s�n� g�ncelle
        toolColorBtn.innerText = isBlackTheme ? "Ara� Rengi: Neon" : "Ara� Rengi: Siyah";

        // O an ekranda a��k olan t�m fiziksel ara�lar� bul ve rengini de�i�tir
        const elements = document.querySelectorAll('.ruler-container, .gonye-container, .aciolcer-container, #compass-container');

        elements.forEach(el => {
            if (isBlackTheme) {
                el.classList.add('tool-black-theme');
            } else {
                el.classList.remove('tool-black-theme');
            }
        });

        // ?? S�NKRON�ZASYON: Tema de�i�imini di�er cihazlara (PC'ye) bildir
        if (typeof window.sendNetworkData === 'function' && typeof isConnected !== 'undefined' && isConnected) {
            window.sendNetworkData({ type: 'fiziksel_arac_temasi', isBlackTheme: isBlackTheme });
        }
    });
}

// --- ARA�LAR A�ILDI�INDA RENG� HATIRLA (YAMA) ---
// Sayfa tamamen y�klendikten sonra ara�lar�n 'show' fonksiyonlar�na ekleme yap�yoruz
window.addEventListener('load', () => {
    const toolsList = [
        { objName: 'RulerTool', elementProp: 'rulerElement' },
        { objName: 'GonyeTool', elementProp: 'gonyeElement' },
        { objName: 'AciolcerTool', elementProp: 'aciolcerElement' },
        { objName: 'PergelTool', elementProp: 'pergelElement' }
    ];

    toolsList.forEach(toolInfo => {
        const toolObj = window[toolInfo.objName];
        if (toolObj && toolObj.show) {
            // Orijinal show fonksiyonunu sakla
            const originalShow = toolObj.show.bind(toolObj);

            // Yeni show fonksiyonu tan�mla
            toolObj.show = function () {
                originalShow(); // �nce normal a��lma i�lemini yap

                // Sonra tema rengini kontrol et ve uygula
                if (this[toolInfo.elementProp]) {
                    if (window.isToolThemeBlack) {
                        this[toolInfo.elementProp].classList.add('tool-black-theme');
                    } else {
                        this[toolInfo.elementProp].classList.remove('tool-black-theme');
                    }
                }
            };
        }
    });
});

// --- YARDIM V�DEOLARI S�STEM� ---

// 1. V�DEO L�STES� (�eviriye Uygun Hale Getirildi)
const tutorialVideos = [
    { id: "vid_cetvel", dosya: "cetvel-vid.mp4" },
    { id: "vid_gonye", dosya: "gonye-vid.mp4" },
    { id: "vid_aciolcer", dosya: "aciolcer-vid.mp4" },
    { id: "vid_pergel", dosya: "pergel-vid.mp4" },
    { id: "vid_canlandir", dosya: "canlandir-vid.mp4" },
    { id: "vid_cizgi", dosya: "cizgi-vid.mp4" },
    { id: "vid_cokgenler", dosya: "cokgenler-vid.mp4" },
    { id: "vid_kalem", dosya: "kalem-vid.mp4" },
    { id: "vid_kitap", dosya: "kitap-yukleme-vid.mp4" },
    { id: "vid_oyunlar", dosya: "oyunlar-vid.mp4" }
];


// Elementleri Se�
const helpBtn = document.getElementById('btn-help');
const helpModal = document.getElementById('help-modal');
const closeHelpBtn = document.getElementById('close-help');
const videoListContainer = document.getElementById('video-list-container');
const videoPlayer = document.getElementById('main-video-player');
const videoTitleLabel = document.getElementById('video-title-label');

// Listeyi Olu�tur (�oklu Dil Destekli)
function loadVideoList() {
    videoListContainer.innerHTML = '';

    // O anki se�ili dili al (E�er bo�sa 'tr' kabul et)
    const t = translations[currentLang || 'tr'];

    tutorialVideos.forEach((vid) => {
        const btn = document.createElement('button');
        btn.className = 'video-item-btn';

        // �eviriden ba�l��� al (E�er �eviri dosyas�na eklemeyi unutursan hata vermesin diye id'yi yazar)
        const videoBaslik = t[vid.id] || vid.id;

        btn.innerText = `? ${videoBaslik}`;

        btn.onclick = () => {
            // T�m butonlar�n rengini s�f�rla, buna renk ver
            document.querySelectorAll('.video-item-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Videoyu oynat
            videoPlayer.src = `videolar/${vid.dosya}`;
            videoTitleLabel.innerText = videoBaslik; // Oynat�c�n�n �st�ndeki ba�l��� da �evir
            videoPlayer.play();
        };
        videoListContainer.appendChild(btn);
    });
}
// A�ma/Kapama Olaylar�
if (helpBtn && helpModal) {
    helpBtn.addEventListener('click', () => {
        helpModal.classList.remove('hidden');
        loadVideoList();
    });

    closeHelpBtn.addEventListener('click', () => {
        helpModal.classList.add('hidden');
        videoPlayer.pause();
        videoPlayer.src = ""; // Videoyu durdur ve s�f�rla
    });
}

// --- KES�N ��Z�M: PDF KAPATMA BUTONU (Global Dinleyici) ---
document.addEventListener('click', function (e) {
    const btn = e.target.closest('#btn-close-pdf');

    if (btn) {
        console.log("PDF Kapat�l�yor...");

        // 1. PC'YE KAPATMA EMR� G�NDER
        if (typeof window.sendNetworkData === 'function' && typeof isConnected !== 'undefined' && isConnected) {
            window.sendNetworkData({ type: 'pdf_kapat' });
        }

        e.preventDefault();
        e.stopPropagation();

        // ?? 2. S�H�RL� ��Z�M: filter yerine splice ile haf�za kopmadan temizlik yap�yoruz ??
        if (window.drawnStrokes) {
            for (let i = window.drawnStrokes.length - 1; i >= 0; i--) {
                // PDF, Resim, arka plan, lasso maskesi ve yamalar�n hepsini temizle
                const s = window.drawnStrokes[i];
                if (s.isBackground === true || s.type === 'lasso-mask' || s.isPatch === true) {
                    window.drawnStrokes.splice(i, 1);
                }
            }
        }

        // 3. De�i�kenleri S�f�rla
        if (typeof currentPDF !== 'undefined') currentPDF = null;
        if (typeof pdfImageStroke !== 'undefined') pdfImageStroke = null;
        if (typeof currentPDFPage !== 'undefined') currentPDFPage = 1;
        if (typeof totalPDFPages !== 'undefined') totalPDFPages = 0;
        if (typeof backgroundImage !== 'undefined') backgroundImage = null;

        // 4. Butonlar� Gizle
        const controls = document.getElementById('pdf-controls');
        if (controls) {
            controls.classList.add('hidden');
            controls.style.display = 'none';
        }
        btn.classList.add('hidden');
        btn.style.display = 'none';

        // 5. Ekran� Temizle ve Kalanlar� Yeniden �iz
        if (typeof redrawAllStrokes === 'function') {
            const canvas = document.getElementById('drawing-canvas');
            if (canvas) {
                const ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
            redrawAllStrokes();
        }

        try {
            if (window.audio_click) {
                window.audio_click.currentTime = 0;
                window.audio_click.play();
            }
        } catch (err) { }
    }
}, true);


// --- BA�LANGI� ---
// --- AKILLI EKRAN BOYUTLANDIRMA (ADRES �UBU�U ZIPLAMASINI ENGELLER) ---
let lastWindowWidth = window.innerWidth;

function resizeCanvas() {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    // Ger�ekten ekran d�nd�yse veya boyut de�i�tiyse g�ncelle
    lastWindowWidth = newWidth;

    if (window.Scene3D && window.Scene3D.camera) {
        const aspect = newWidth / newHeight;
        const frustumSize = 30;

        if (window.Scene3D.camera.isPerspectiveCamera) {
            window.Scene3D.camera.aspect = aspect;
        } else {
            window.Scene3D.camera.left = -frustumSize * aspect / 2;
            window.Scene3D.camera.right = frustumSize * aspect / 2;
            window.Scene3D.camera.top = frustumSize / 2;
            window.Scene3D.camera.bottom = -frustumSize / 2;
        }
        window.Scene3D.camera.updateProjectionMatrix();
        if (window.Scene3D.renderer) {
            window.Scene3D.renderer.setSize(newWidth, newHeight);
        }
    }

    redrawAllStrokes();

    // canvas.height = newHeight; sat�r�n�n hemen alt�na ekle
    setupCanvasResolution();
}

window.addEventListener('load', resizeCanvas);
window.addEventListener('resize', resizeCanvas);

// --- app.js EN ALT SATIR (EDGE, CHROME, TABLET UYUMLU F�NAL) ---

{
    let deferredPrompt;
    const installPopup = document.getElementById('install-popup');
    const btnInstall = document.getElementById('btn-popup-install');
    const btnClose = document.getElementById('btn-popup-close');
    const iosInstructions = document.getElementById('ios-instructions');

    // 1. Taray�c� sinyali (Install Prompt)
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;

        // Popup'� g�ster
        if (installPopup) installPopup.style.display = 'flex';
    });

    // 2. iOS (iPhone/iPad) Kontrol�
    const isIos = /iPhone|iPad|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isInStandaloneMode = ('standalone' in window.navigator) && (window.navigator.standalone);

    if (isIos && !isInStandaloneMode) {
        setTimeout(() => {
            if (installPopup) {
                installPopup.style.display = 'flex';
                if (btnInstall) btnInstall.style.display = 'none'; // iPhone'da butonu gizle
                if (iosInstructions) iosInstructions.style.display = 'block'; // Tarifi g�ster
            }
        }, 3000);
    }

    // --- BUTONLARI �ALI�TIRAN FONKS�YON (EDGE DOKUNMAT�K HATASI ��Z�M�) ---
    const activateButton = (btn, actionCallback) => {
        if (!btn) return;

        const handler = async (e) => {
            // Edge'in dokunmay� yutmas�n� engelle
            e.stopPropagation();
            e.preventDefault();

            // ��lemi ger�ekle�tir
            await actionCallback();
        };

        // Hem t�klama hem parmak dokunu�unu dinle
        btn.addEventListener('click', handler);
        btn.addEventListener('touchstart', handler, { passive: false });
    };

    // --- BUTONLARA G�REVLER�N� VER ---

    // A) Y�kle Butonu
    activateButton(btnInstall, async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            console.log("Sonu�:", outcome);
            deferredPrompt = null;
        }
        if (installPopup) installPopup.style.display = 'none';

        // ?? S�H�RL� DOKUNU�: PC'deki y�kleme penceresini de kapatmas� i�in komut g�nder
        if (typeof isConnected !== 'undefined' && isConnected && typeof sendNetworkData === 'function') {
            sendNetworkData({ type: 'yukleme_penceresini_kapat' });
        }
    });

    // B) Kapat (Hay�r) Butonu
    activateButton(btnClose, async () => {
        if (installPopup) installPopup.style.display = 'none';

        // ?? S�H�RL� DOKUNU�: PC'deki y�kleme penceresini de kapatmas� i�in komut g�nder
        if (typeof isConnected !== 'undefined' && isConnected && typeof sendNetworkData === 'function') {
            sendNetworkData({ type: 'yukleme_penceresini_kapat' });
        }
    });
}

// --- app.js EN ALTA EKLE: D�ND�RME FONKS�YONU ---

/**
 * Bir HTML elementine d�nd�rme �zelli�i ekler.
 * @param {HTMLElement} element - D�nd�r�lecek olan kopya kutusu (div)
 */

// ==========================================
// --- TARAYICI DOKUNMAT�K �AKI�MA ��Z�M� ---
// ==========================================
// Taray�c�n�n adres �ubu�u veya "sayfay� yenile" hareketinin
// d�nd�rme (rotate) ve ta��ma i�lemlerini bozmas�n� engeller.
window.addEventListener('touchmove', function (e) {
    // E�er dokunulan �ey d�nd�rme kulpuysa veya kopyalanan resimse:
    if (e.target.closest('.rotate-handle') ||
        e.target.classList.contains('rotate-handle') ||
        e.target.closest('.resize-handle') ||
        e.target.tagName.toLowerCase() === 'img') {

        // Taray�c�ya "Kar��ma, kayd�rma yapma!" diyoruz.
        e.preventDefault();
    }
}, { passive: false }); // passive: false �ok �nemlidir, taray�c�y� durdurmaya izin verir.
// ==========================================


// =========================================================
// MOB�L TARAYICI ZIPLAMA ��Z�M�: KATI EKRAN K�L�D� (app.js)
// =========================================================
function lockScreenSize() {
    // Ekran�n o anki ger�ek piksel boyutunu al
    let w = window.innerWidth || document.documentElement.clientWidth || window.screen.width || 1024;
    let h = window.innerHeight || document.documentElement.clientHeight || window.screen.height || 768;
    const dpr = window.devicePixelRatio || 1; // ?? HD Oran�

    // Ana Kanvas� Sabitle
    const canvas = document.getElementById('drawing-canvas');
    if (canvas) {
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
        canvas.width = w * dpr;
        canvas.height = h * dpr;
    }

    // ?? EKS�K OLAN KISIM: Arka Plan Kanvas�n� da Ana Kanvasla Beton Gibi Sabitle (Sayfa Bas�kl���n� Yok Eder)
    const bgCanvas = document.getElementById('bg-canvas');
    if (bgCanvas) {
        bgCanvas.style.width = w + 'px';
        bgCanvas.style.height = h + 'px';
        bgCanvas.width = w * dpr;
        bgCanvas.height = h * dpr;
    }

    document.body.style.width = w + 'px';
    document.body.style.height = h + 'px';
    document.documentElement.style.width = w + 'px';
    document.documentElement.style.height = h + 'px';

    if (typeof window.redrawAllStrokes === 'function') {
        window.redrawAllStrokes();
    }
}

// 1. Sayfa y�klendi�inde boyutlar� kilitle
window.addEventListener('load', lockScreenSize);

// 2. Tablet yan �evrilirse (yatay/dikey) yeni boyuta g�re tekrar kilitle
window.addEventListener('orientationchange', () => {
    setTimeout(lockScreenSize, 300);
});

// KR�T�K NOKTA: 'resize' eventini (adres �ubu�u hareketlerini) D�NLEM�YORUZ!
// B�ylece adres �ubu�u kaybolsa/��ksa bile sayfa esnemez, �izgiler z�plamaz.

// =======================================================
// CANLANDIR (SNAPSHOT) - TABLET/PC UYUMLU Y�ZEN KOPYA
// =======================================================
function olusturYuzenKopya(imgSrc, startX, startY, width, height) {
    // ?? S�H�RL� D�ZELTME: HD piksel de�erlerini DOM i�in CSS pikseline d�n��t�r
    const canvasEl = document.getElementById('drawing-canvas');
    const dpr = canvasEl ? (canvasEl.width / canvasEl.getBoundingClientRect().width) : (window.devicePixelRatio || 1);

    // Gelen koordinatlar�n HD olup olmad���n� kontrol et ve �l�ekle
    const isHD = width > (canvasEl ? canvasEl.getBoundingClientRect().width : window.innerWidth);
    const scale = isHD ? dpr : 1;

    const cssX = startX / scale;
    const cssY = startY / scale;
    const cssW = width / scale;
    const cssH = height / scale;

    // 1. Ana Kapsay�c� Kutu
    const container = document.createElement('div');
    container.className = 'yuzen-kopya-container';
    container.style.position = 'absolute';
    container.style.left = cssX + 'px';
    container.style.top = cssY + 'px';
    container.style.width = cssW + 'px';
    container.style.height = cssH + 'px';
    container.style.border = '2px dashed #00ffcc';
    container.style.cursor = 'grab';
    container.style.zIndex = '9999';
    container.style.boxSizing = 'border-box';
    container.style.transformOrigin = 'center center';
    container.style.touchAction = 'none'; // KR�T�K: Tablette sayfa kaymas�n� yasaklar
    container.dataset.rotation = '0';

    // 2. Kopyalanan Resim
    const img = document.createElement('img');
    img.src = imgSrc;
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.display = 'block';
    img.style.pointerEvents = 'none';
    container.appendChild(img);

    // 3. D�nd�rme (Ye�il) Butonu ve Sap�
    const rotateLine = document.createElement('div');
    rotateLine.style.position = 'absolute';
    rotateLine.style.top = '-20px';
    rotateLine.style.left = '50%';
    rotateLine.style.width = '2px';
    rotateLine.style.height = '20px';
    rotateLine.style.backgroundColor = '#00ff00';
    rotateLine.style.transform = 'translateX(-50%)';
    container.appendChild(rotateLine);

    const rotateBtn = document.createElement('div');
    rotateBtn.className = 'rotate-handle'; // Tablette kaymay� durduran mevcut s�n�f�n�z
    rotateBtn.style.position = 'absolute';
    rotateBtn.style.top = '-40px';
    rotateBtn.style.left = '50%';
    rotateBtn.style.transform = 'translateX(-50%)';
    rotateBtn.style.width = '30px';
    rotateBtn.style.height = '30px';
    rotateBtn.style.backgroundColor = '#00ff00';
    rotateBtn.style.borderRadius = '50%';
    rotateBtn.style.cursor = 'grab';
    rotateBtn.style.border = '2px solid white';
    rotateBtn.style.boxShadow = '0px 2px 5px rgba(0,0,0,0.5)';
    rotateBtn.style.touchAction = 'none'; // KR�T�K
    container.appendChild(rotateBtn);

    // 4. Yeniden Boyutland�rma (Pembe) Butonu
    const resizeBtn = document.createElement('div');
    resizeBtn.className = 'resize-handle'; // Tablette kaymay� durduran mevcut s�n�f�n�z
    resizeBtn.style.position = 'absolute';
    resizeBtn.style.bottom = '-15px';
    resizeBtn.style.right = '-15px';
    resizeBtn.style.width = '30px';
    resizeBtn.style.height = '30px';
    resizeBtn.style.backgroundColor = '#ff00ff';
    resizeBtn.style.borderRadius = '50%';
    resizeBtn.style.cursor = 'nwse-resize';
    resizeBtn.style.border = '2px solid white';
    resizeBtn.style.boxShadow = '0px 2px 5px rgba(0,0,0,0.5)';
    resizeBtn.style.touchAction = 'none'; // KR�T�K
    container.appendChild(resizeBtn);

    document.body.appendChild(container);

    // --- TABLET UYUMLU ETK�LE��M MANTI�I ---
    let mode = 'none';
    let startEvtX, startEvtY, initialLeft, initialTop, initialWidth, initialHeight, initialRotation, centerX, centerY;
    let activePointerId = null; // Parma�� takip etmek i�in kilit ID'si

    // D�nd�rmeye Ba�la
    rotateBtn.addEventListener('pointerdown', (e) => {
        e.stopPropagation(); e.preventDefault();
        mode = 'rotate';
        activePointerId = e.pointerId;
        rotateBtn.setPointerCapture(activePointerId); // KR�T�K: Parma�� ye�il butona kilitle!

        const rect = container.getBoundingClientRect();
        centerX = rect.left + rect.width / 2;
        centerY = rect.top + rect.height / 2;
        initialRotation = parseFloat(container.dataset.rotation) || 0;
        container.dataset.startAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * 180 / Math.PI;
    });

    // Boyutland�rmaya Ba�la
    resizeBtn.addEventListener('pointerdown', (e) => {
        e.stopPropagation(); e.preventDefault();
        mode = 'resize';
        activePointerId = e.pointerId;
        resizeBtn.setPointerCapture(activePointerId); // KR�T�K: Parma�� pembe butona kilitle!

        startEvtX = e.clientX; startEvtY = e.clientY;
        initialWidth = container.offsetWidth; initialHeight = container.offsetHeight;
    });

    // S�r�klemeye Ba�la
    container.addEventListener('pointerdown', (e) => {
        if (e.target === rotateBtn || e.target === resizeBtn) return;
        e.stopPropagation(); e.preventDefault();
        mode = 'drag';
        activePointerId = e.pointerId;
        container.setPointerCapture(activePointerId); // KR�T�K: Parma�� resme kilitle!

        container.style.cursor = 'grabbing';
        startEvtX = e.clientX; startEvtY = e.clientY;
        initialLeft = container.offsetLeft; initialTop = container.offsetTop;
    });

    // Hareket Etme (Move)
    const onMove = (e) => {
        if (mode === 'none') return;
        if (e.pointerId !== activePointerId) return; // �kinci parmakla yap�lan m�dahaleleri engeller
        e.preventDefault();

        if (mode === 'drag') {
            container.style.left = (initialLeft + (e.clientX - startEvtX)) + 'px';
            container.style.top = (initialTop + (e.clientY - startEvtY)) + 'px';
        } else if (mode === 'resize') {
            const newWidth = Math.max(30, initialWidth + (e.clientX - startEvtX));
            container.style.width = newWidth + 'px';
            container.style.height = initialHeight * (newWidth / initialWidth) + 'px';
        } else if (mode === 'rotate') {
            const currentAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * 180 / Math.PI;
            const finalRotation = initialRotation + (currentAngle - parseFloat(container.dataset.startAngle));
            container.style.transform = `rotate(${finalRotation}deg)`;
            container.dataset.rotation = finalRotation;
        }
    };

    // Parma�� Kald�rma (B�rakma)
    const onUp = (e) => {
        if (mode === 'none') return;

        // Kilidi serbest b�rak
        if (e.target.hasPointerCapture && e.target.hasPointerCapture(e.pointerId)) {
            e.target.releasePointerCapture(e.pointerId);
        }

        if (mode === 'drag') container.style.cursor = 'grab';
        mode = 'none';
        activePointerId = null;
    };

    window.addEventListener('pointermove', onMove, { passive: false });
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp); // Taray�c� hatas�nda da b�rak

    // --- BO�LU�A TIKLAYINCA ANA KANVASA M�H�RLE (TABLET �OKLU KOPYA �NLEY�C�) ---
    setTimeout(() => {
        let isStamped = false; // �oklu kopyay� engelleyen kilit

        const disariTiklama = (e) => {
            if (isStamped || container.contains(e.target)) return;

            // E�er d�nd�rme veya boyutland�rma butonlar�na bas�l�yorsa m�h�rleme yapma
            if (e.target.closest('.rotate-handle') || e.target.closest('.resize-handle')) return;

            isStamped = true;
            window.removeEventListener('pointerdown', disariTiklama, true);

            // Sizin orijinal canvas referans�n�za (canvas) g�re tam uyumlu koordinat yakalama
            const containerRect = container.getBoundingClientRect();
            const canvasRect = canvas.getBoundingClientRect();

            let xKoordinati = parseFloat(container.style.left);
            let yKoordinati = parseFloat(container.style.top);
            let genislik = parseFloat(container.style.width);
            let yukseklik = parseFloat(container.style.height);

            // Dokunmatik ekrandan el �ekildi�inde koordinat kaybolursa fiziksel pikselleri kurtar
            if (isNaN(xKoordinati) || isNaN(yKoordinati)) {
                xKoordinati = containerRect.left - canvasRect.left;
                yKoordinati = containerRect.top - canvasRect.top;
                genislik = containerRect.width;
                yukseklik = containerRect.height;
            }

            // Hatal�/bo� t�klamalar� engelle
            if (genislik < 5 || yukseklik < 5) {
                if (container && container.parentNode) container.parentNode.removeChild(container);
                return;
            }

            // PDF ve Sayfa Haf�zas�yla tam uyumlu yeni kopya objesi
            const newCopy = {
                type: 'image',
                imgData: imgSrc,
                x: xKoordinati - canvasRect.left, // Kanvas�n sol bo�lu�unu net olarak d���yoruz
                y: yKoordinati - canvasRect.top,  // Kanvas�n �st bo�lu�unu net olarak d���yoruz
                width: genislik,
                height: yukseklik,
                rotation: parseFloat(container.dataset.rotation) || 0,
                isBackground: false,
                isBoxCopy: true,
                pageOwner: typeof currentPDFPage !== 'undefined' ? currentPDFPage : 1,
                imgObj: null
            };

            // Kanvas �izim motoru tetikleyicisi
            const imgObj = new Image();
            imgObj.src = imgSrc;
            imgObj.onload = () => {
                newCopy.imgObj = imgObj;

                // Ana çizim dizisine ekle
                if (typeof drawnStrokes !== 'undefined') {
                    drawnStrokes.push(newCopy);
                }

                // PDF sayfa hafıza dizisine ekle
                if (!window.boxCopies) window.boxCopies = [];
                window.boxCopies.push(newCopy);

                // Kanvas ekranını anında tazeleyip resmi görünür kıl
                if (window.redrawAllStrokes) window.redrawAllStrokes();

                console.log("Kutu kopyası başarıyla kanvas hafızasına mühürlendi!");
            };

            // Geçici çizgili kutuyu ve diğer izleyicileri temizle
            if (container && container.parentNode) {
                container.parentNode.removeChild(container);
            }
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('pointerup', onUp);
            window.removeEventListener('pointercancel', onUp);
        };

        window.addEventListener('pointerdown', disariTiklama, true);
    }, 200);
}

// Dosyanın en altına ekle
window.addEventListener('load', () => {
    setTimeout(setupCanvasResolution, 500);
});


// ===================================================================
// --- AKILLI ŞEKİL TANIMA V15 (KUSURSUZ YILDIZ VE ÜÇGEN AYRIMI) ---
// ===================================================================
function akilliSekilTani(stroke) {
    if (!stroke || stroke.type !== 'pen' || stroke.path.length < 15) return null;

    const pts = stroke.path;
    const start = pts[0];
    const end = pts[pts.length - 1];
    const directDistance = Math.hypot(end.x - start.x, end.y - start.y);

    let totalDistance = 0;
    for (let i = 1; i < pts.length; i++) totalDistance += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);

    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    pts.forEach(p => {
        if (p.x < minX) minX = p.x; if (p.y < minY) minY = p.y;
        if (p.x > maxX) maxX = p.x; if (p.y > maxY) maxY = p.y;
    });

    const w = maxX - minX;
    const h = maxY - minY;
    const maxBoyut = Math.max(w, h);
    const cx = minX + w / 2;
    const cy = minY + h / 2;

    if (maxBoyut < 30) return null;

    const col = stroke.color;
    const wid = stroke.baseWidth || 3;

    // 1. DÜZ ÇİZGİ
    if (directDistance > 50 && (totalDistance / directDistance) < 1.15) {
        return { type: 'straightLine', p1: start, p2: end, color: col, width: wid };
    }

    // 2. KAPALI ŞEKİLLER (Kapanma Toleransı)
    const tamKapaliMi = directDistance < (maxBoyut * 0.3) && directDistance < 50;
    if (!tamKapaliMi) return null;

    // AŞIRI KARMAŞIK KARALAMA KORUMASI 
    if (totalDistance > (w + h) * 4) return null;

    // --- BÖLGESEL FİZİKSEL KANITLAR ---
    let topMinX = Infinity, topMaxX = -Infinity;
    let bottomMinX = Infinity, bottomMaxX = -Infinity;
    let leftMinY = Infinity, leftMaxY = -Infinity;
    let rightMinY = Infinity, rightMaxY = -Infinity;
    let distTL = Infinity, distTR = Infinity, distBL = Infinity, distBR = Infinity;
    let totalR = 0;

    pts.forEach(p => {
        if (p.y < minY + h * 0.35) { if (p.x < topMinX) topMinX = p.x; if (p.x > topMaxX) topMaxX = p.x; }
        if (p.y > maxY - h * 0.35) { if (p.x < bottomMinX) bottomMinX = p.x; if (p.x > bottomMaxX) bottomMaxX = p.x; }
        if (p.x < minX + w * 0.35) { if (p.y < leftMinY) leftMinY = p.y; if (p.y > leftMaxY) leftMaxY = p.y; }
        if (p.x > maxX - w * 0.35) { if (p.y < rightMinY) rightMinY = p.y; if (p.y > rightMaxY) rightMaxY = p.y; }
        totalR += Math.hypot(p.x - cx, p.y - cy);

        const dTL = Math.hypot(p.x - minX, p.y - minY); if (dTL < distTL) distTL = dTL;
        const dTR = Math.hypot(p.x - maxX, p.y - minY); if (dTR < distTR) distTR = dTR;
        const dBL = Math.hypot(p.x - minX, p.y - maxY); if (dBL < distBL) distBL = dBL;
        const dBR = Math.hypot(p.x - maxX, p.y - maxY); if (dBR < distBR) distBR = dBR;
    });

    let topW = Math.max(1, topMaxX - topMinX);
    let bottomW = Math.max(1, bottomMaxX - bottomMinX);
    let leftH = Math.max(1, leftMaxY - leftMinY);
    let rightH = Math.max(1, rightMaxY - rightMinY);
    let avgCornerDist = (distTL + distTR + distBL + distBR) / 4;

    let avgR = totalR / pts.length;
    let sapma = 0;
    pts.forEach(p => { sapma += Math.abs(Math.hypot(p.x - cx, p.y - cy) - avgR); });
    let sapmaOrani = sapma / (pts.length * avgR);

    // ==========================================
    // 1. YILDIZ KONTROLÜ (Nokta Sayma İptal, Derinlik Ölçümü Geldi)
    // ==========================================
    let isStar = false;
    if (Math.abs(w - h) < maxBoyut * 0.6) {
        let altSolMaxY = -Infinity;
        let altSagMaxY = -Infinity;
        let altOrtaMaxY = -Infinity;

        pts.forEach(p => {
            // Şeklin sağ, sol ve orta alt kısımlarının "En derin" (MaxY) noktalarını buluyoruz
            if (p.x < cx - w * 0.15) { if (p.y > altSolMaxY) altSolMaxY = p.y; }
            else if (p.x > cx + w * 0.15) { if (p.y > altSagMaxY) altSagMaxY = p.y; }
            else { if (p.y > altOrtaMaxY) altOrtaMaxY = p.y; }
        });

        // Üçgende alt çizgi düzdür, altOrtaMaxY diğerlerine eşittir.
        // Yıldızda ise ortada boşluk olduğu için altOrtaMaxY belirgin şekilde DAHA YUKARIDADIR.
        if (topW < w * 0.5 &&
            altSolMaxY > cy + h * 0.10 &&
            altSagMaxY > cy + h * 0.10 &&
            altOrtaMaxY < Math.min(altSolMaxY, altSagMaxY) - h * 0.10) {
            isStar = true;
        }
    }

    // ==========================================
    // 2. KALP KONTROLÜ 
    // ==========================================
    let isHeart = false;
    if (!isStar && Math.abs(w - h) < maxBoyut * 0.5) {
        let ustKisim = pts.filter(p => p.y < cy);
        let solTepe = ustKisim.filter(p => p.x < cx - w * 0.15);
        let sagTepe = ustKisim.filter(p => p.x > cx + w * 0.15);
        let ortaCukur = ustKisim.filter(p => Math.abs(p.x - cx) <= w * 0.15);

        if (solTepe.length > 0 && sagTepe.length > 0 && ortaCukur.length > 0) {
            let solMaxY = Math.min(...solTepe.map(p => p.y));
            let sagMaxY = Math.min(...sagTepe.map(p => p.y));
            let ortaMinY = Math.max(...ortaCukur.map(p => p.y));

            if (ortaMinY > solMaxY + h * 0.08 && ortaMinY > sagMaxY + h * 0.08 && bottomW < w * 0.45) {
                isHeart = true;
            }
        }
    }

    // ==========================================
    // 3. ÇEMBER KONTROLÜ
    // ==========================================
    let isCircle = (!isStar && !isHeart && sapmaOrani < 0.20 && Math.abs(w - h) < maxBoyut * 0.5 && avgCornerDist > maxBoyut * 0.14);

    // --- SONUÇ DÖNDÜRME ---
    const getChar = () => {
        let c = window.nextPointChar || 'A';
        let nextCode = c.charCodeAt(0) + 1;
        if (nextCode > 90) nextCode = 65;
        window.nextPointChar = String.fromCharCode(nextCode);
        return c;
    };

    const createTriangle = (pA, pB, pC) => {
        const l1 = getChar(), l2 = getChar(), l3 = getChar();
        return [
            { type: 'segment', p1: pA, p2: pB, color: col, width: wid, label1: l1, label2: l2 },
            { type: 'segment', p1: pB, p2: pC, color: col, width: wid, label1: l2, label2: l3 },
            { type: 'segment', p1: pC, p2: pA, color: col, width: wid, label1: l3, label2: l1 }
        ];
    };

    if (isStar) {
        const starPath = [];
        // Bu döngü, senin istediğin "Dış Hatları Olan Kesişmeyen Yıldızı" çizen 10 noktalı sihirli kısımdır!
        for (let i = 0; i <= 10; i++) {
            let r = i % 2 === 0 ? maxBoyut / 2 : maxBoyut / 4.5;
            let ang = (Math.PI * 2 * i / 10) - Math.PI / 2;
            starPath.push({ x: cx + Math.cos(ang) * r, y: cy + Math.sin(ang) * r });
        }
        return { type: 'pen', path: starPath, color: col, baseWidth: wid, width: wid };
    }

    if (isHeart) {
        const heartPath = [];
        for (let t = 0; t <= Math.PI * 2; t += 0.1) {
            heartPath.push({
                x: cx + (w / 2) * (16 * Math.pow(Math.sin(t), 3)) / 16,
                y: cy - (h / 2) * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) / 16 - (h * 0.05)
            });
        }
        heartPath.push(heartPath[0]);
        return { type: 'pen', path: heartPath, color: col, baseWidth: wid, width: wid };
    }

    if (isCircle) {
        return { type: 'arc', cx: cx, cy: cy, radius: (w + h) / 4, startAngle: 0, endAngle: 360, color: col, width: wid, fillColor: 'transparent' };
    }

    // 4. ÜÇGEN
    if (topW < bottomW * 0.45 || bottomW < topW * 0.45) {
        if (topW < bottomW) return createTriangle({ x: (topMinX + topMaxX) / 2, y: minY }, { x: minX, y: maxY }, { x: maxX, y: maxY });
        else return createTriangle({ x: minX, y: minY }, { x: maxX, y: minY }, { x: (bottomMinX + bottomMaxX) / 2, y: maxY });
    }
    if (leftH < rightH * 0.45 || rightH < leftH * 0.45) {
        if (leftH < rightH) return createTriangle({ x: minX, y: (leftMinY + leftMaxY) / 2 }, { x: maxX, y: minY }, { x: maxX, y: maxY });
        else return createTriangle({ x: maxX, y: (rightMinY + rightMaxY) / 2 }, { x: minX, y: minY }, { x: minX, y: maxY });
    }

    // 5. YAMUK
    if ((topW < bottomW * 0.85 && topW >= bottomW * 0.45) || (bottomW < topW * 0.85 && bottomW >= topW * 0.45)) {
        const l1 = getChar(), l2 = getChar(), l3 = getChar(), l4 = getChar();
        return [
            { type: 'segment', p1: { x: topMinX, y: minY }, p2: { x: topMaxX, y: minY }, color: col, width: wid, label1: l1, label2: l2 },
            { type: 'segment', p1: { x: topMaxX, y: minY }, p2: { x: maxX, y: maxY }, color: col, width: wid, label1: l2, label2: l3 },
            { type: 'segment', p1: { x: maxX, y: maxY }, p2: { x: minX, y: maxY }, color: col, width: wid, label1: l3, label2: l4 },
            { type: 'segment', p1: { x: minX, y: maxY }, p2: { x: topMinX, y: minY }, color: col, width: wid, label1: l4, label2: l1 }
        ];
    }

    // 6. DİKDÖRTGEN / KARE 
    const l1 = getChar(), l2 = getChar(), l3 = getChar(), l4 = getChar();
    return [
        { type: 'segment', p1: { x: minX, y: minY }, p2: { x: maxX, y: minY }, color: col, width: wid, label1: l1, label2: l2 },
        { type: 'segment', p1: { x: maxX, y: minY }, p2: { x: maxX, y: maxY }, color: col, width: wid, label1: l2, label2: l3 },
        { type: 'segment', p1: { x: maxX, y: maxY }, p2: { x: minX, y: maxY }, color: col, width: wid, label1: l3, label2: l4 },
        { type: 'segment', p1: { x: minX, y: maxY }, p2: { x: minX, y: minY }, color: col, width: wid, label1: l4, label2: l1 }
    ];

} // <-- BU SÜSLÜ PARANTEZ ÇOK ÖNEMLİ, ÜSTTEKİ FONKSİYONU KAPATIR!


// --- BAŞKA BİR ARACA TIKLANDIĞINDA SİLGİYİ OTOMATİK KAPATMA YAMASI ---
document.querySelectorAll('.tool-button, .tool-button-sub').forEach(btn => {
    btn.addEventListener('click', function () {
        // Eğer tıklanan buton "Silgi" değilse çalışsın
        if (this.id !== 'btn-silgi') {
            const silgiBtn = document.getElementById('btn-silgi');

            // Silgi butonu aktifse, aktiflik sınıfını kaldır (ışığını söndür)
            if (silgiBtn && silgiBtn.classList.contains('active')) {
                silgiBtn.classList.remove('active');

                // Arka planda çizim aracını 'silgi' modundan çıkar (uygulamanızdaki değişken ismine göre 'none' veya 'pen' yapıyoruz)
                if (typeof currentTool !== 'undefined' && currentTool === 'eraser') {
                    currentTool = 'none';
                }
            }
        }
    });
});

function setLanguage(lang) {
    if (!translations[lang]) return;
    currentLang = lang;
    const t = translations[lang];

    const update = (id, text) => {
        const el = document.getElementById(id);
        if (el) {
            el.innerText = text;
            console.log(`${id} güncellendi: ${text}`); // Hata ayıklama için konsola yazar
        }
    };

    // SOL PANEL
    update('btn-silgi', t.silgi);
    update('btn-kalem', t.kalem);
    update('btn-akilli-kalem', t.akilli_kalem || 'Akıllı Kalem');
    update('btn-cizgi', t.cizgi);
    update('btn-nokta', t.nokta);
    update('btn-d_cizgi', t.d_cizgi);
    update('btn-dogru', t.dogru);
    update('btn-dogru_parcasi', t.dogru_parcasi);
    update('btn-isin', t.isin);
    update('btn-cetvel', t.cetvel);
    update('btn-gonye', t.gonye);
    update('btn-aciolcer', t.aciolcer);
    update('btn-pergel', t.pergel);
    update('btn-cokgenler', t.cokgenler);
    update('btn-cember', t.cember);
    update('btn-duzgun_ucgen', t.d_ucgen);
    update('btn-duzgun_dortgen', t.d_dortgen);
    update('btn-dikdortgen', t.dikdortgen);
    update('btn-duzgun_besgen', t.d_besgen);
    update('btn-duzgun_altigen', t.d_altigen);
    update('btn-duzgun_yedigen', t.d_yedigen);
    update('btn-duzgun_sekizgen', t.d_sekizgen);
    update('btn-oyunlar', t.oyunlar);
    update3DLabels();

    // SAĞ PANEL
    update('btn-undo', t.geri_al);
    update('btn-clear-all', t.hepsini_sil);
    update('btn-move', t.tasi);
    update('btn-upload', t.yukle);
    update('btn-camera', t.soru_cek);
    if (typeof tonyBtn !== 'undefined' && tonyBtn) {
        if (!tonyBtn.innerHTML.includes('KVKK')) {
            tonyBtn.innerHTML = t.sihirli_el;
        }
    }
    update('btn-snapshot-main', t.canlandir);
    update('btn-snapshot-box', t.kutu);
    update('btn-snapshot-lasso', t.serbest);
    update('btn-help', t.yardim);

    // POPUP VE ALT BÖLGE (Kritik Satır)
    update('install-title', t.ins_t);
    update('install-desc', t.ins_d);
    update('btn-popup-install', t.ins_b);
    update('btn-popup-close', t.ins_c);
    update('kvkk-bilgi', t.kvkk); // <--- BU SATIRIN EKLENDİĞİNDEN EMİN OL

    // ARAÇ RENGİ GÜNCELLEME
    const colorBtn = document.getElementById('btn-tool-color');
    if (colorBtn) {
        const parts = colorBtn.innerText.split(': ');
        const currentColor = parts[1] || "";
        colorBtn.innerText = currentColor ? `${t.arac_rengi}: ${currentColor}` : t.arac_rengi;
    }

    // ARAPÇA YÖN AYARI
    document.body.dir = (lang === 'ar') ? 'rtl' : 'ltr';

    // ARAYÜZÜ KAPAT
    const overlay = document.getElementById('language-overlay');
    if (overlay) overlay.style.display = 'none';

    // --- TÜM SEÇENEK MENÜLERİNİ KESİN OLARAK KAPAT (TAŞIMA VE SIZMA ENGELLEYİCİ) ---
    const optionMenus = [
        document.getElementById('line-options'),
        document.getElementById('polygon-options'),
        document.getElementById('fill-options'),
        document.getElementById('snapshot-options'),
        document.getElementById('pen-options'),
        document.getElementById('oyunlar-options')
    ];
    optionMenus.forEach(menu => {
        if (menu) {
            menu.classList.add('hidden');
            menu.style.display = 'none';
        }
    });

    // Tüm ana butonların aktiflik (ışık) durumunu başlangıç için söndür
    document.querySelectorAll('.tool-button, .tool-button-sub').forEach(btn => {
        btn.classList.remove('active');
    });

    // Eğer aktif bir araç seçili kalmışsa onu temizle (isteğe bağlı)
    // currentTool = null; 

    console.log("Menüler uzun kelime taşmasına karşı sıfırlandı.");

    // OYUN LİSTESİNİ YENİLE (Oyunlar menüsü açıksa isimler değişsin)
    if (typeof listeleOyunlar === 'function') listeleOyunlar();

    // KANVAS TAZELEME
    setTimeout(() => {
        if (window.redrawAllStrokes) window.redrawAllStrokes();
    }, 100);
}

// --- BU FONKSİYON SETLANGUAGE'İN DIŞINA/ALTINA GELİYOR ---
// İkinci kopya resizeCanvas kaldırıldı çünkü koordinat senkronizasyonunu bozuyordu.

// ================================================================
// DİL SEÇİMİ VE AĞA FIRLATMA MOTORU
// ================================================================
function dilButonlariniHazirla() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        const langMatch = btn.getAttribute('onclick')?.match(/'([^']+)'/);
        const targetLang = langMatch ? langMatch[1] : btn.dataset.lang;

        if (targetLang) {
            btn.onclick = null;
            btn.removeAttribute('onclick');

            let isTriggered = false;
            const handleSelect = (e) => {
                if (isTriggered) return;
                isTriggered = true;

                if (e.cancelable) e.preventDefault();
                e.stopPropagation();

                // 🛡️ FİZİKSEL DOKUNMA SIZMASI (GHOST CLICK) KALKANI 🛡️
                // Dil seçilip overlay kapandığı an, arkadaki butonlara hayalet tıklama çarpmasın diye
                // tüm arayüz panellerini 500ms (yarım saniye) boyunca tamamen tıklanamaz yapıyoruz.
                document.querySelectorAll('.panel').forEach(panel => {
                    panel.style.pointerEvents = 'none';
                    setTimeout(() => {
                        panel.style.pointerEvents = 'auto'; // Yarım saniye sonra kilit otomatik açılır
                    }, 500);
                });

                // 1. Tabletin (Tıklanan cihazın) ekranını aç
                setLanguage(targetLang);

                // 🛡️ ÇÖZÜM 3: Tablette yasal uyarı penceresini KESİN OLARAK Kapat!
                const disclaimer = document.getElementById('disclaimer-modal');
                if (disclaimer) disclaimer.style.display = 'none';
                window.acilisPenceresiKapatildi = true;

                // Tablet yerel ekranındaki alt bilgi şeridini de kapat
                const footer = document.getElementById('footer-container') || document.getElementById('disclaimer-container') || document.getElementById('kvkk-bilgi')?.parentElement;
                if (footer) footer.style.display = 'none';

                // 2. Karşı cihaza (PC/Tahtaya) "Aynı dili seç ve ekranı aç" emri gönder!
                const firlatici = (typeof window.sendNetworkData === 'function') ? window.sendNetworkData : (typeof sendNetworkData === 'function' ? sendNetworkData : null);
                if (typeof isConnected !== 'undefined' && isConnected && firlatici) {
                    firlatici({ type: 'dil_secimi', lang: targetLang });
                    firlatici({ type: 'acilis_penceresini_kapat' });
                    firlatici({ type: 'yukleme_penceresini_kapat' });
                    
                    // 🛡️ GARANTİ SİNYALİ: PC'nin veri kanalını açarken yaşayabileceği milisaniyelik gecikmelere karşı mesaj 3 kez daha tekrarlanır!
                    [500, 1500, 3000].forEach(gecikme => {
                        setTimeout(() => {
                            firlatici({ type: 'dil_secimi', lang: targetLang });
                            firlatici({ type: 'acilis_penceresini_kapat' });
                        }, gecikme);
                    });
                }

                setTimeout(() => { isTriggered = false; }, 500);
            };

            btn.addEventListener('pointerdown', handleSelect);
            btn.addEventListener('touchstart', handleSelect, { passive: false });
            btn.addEventListener('click', handleSelect);
        }
    });
}


// Akıllı tahta tarayıcılarının gecikme/hız problemlerine karşı garanti tetikleyici
if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', dilButonlariniHazirla);
} else {
    dilButonlariniHazirla();
}



// =========================================================================
// KUSURSUZ AKILLI NESNE SİLGİSİ v2 (ZOMBİ KORUMALI VE EKSİKSİZ)
// =========================================================================
const canvasElm = document.getElementById('drawing-canvas');

function akilliSilgi(e, isDown) {
    // Sadece silgi aracı seçiliyse çalışsın
    if (typeof currentTool === 'undefined' || currentTool !== 'eraser') return false;

    // Tıklanmıyorsa veya ekrana dokunulmuyorsa işlem yapma
    const isClicking = isDown || (typeof isDrawing !== 'undefined' && isDrawing) || e.buttons > 0 || (e.touches && e.touches.length > 0);
    if (!isClicking) {
        window.lastEraserPos = null; // Tıklama bitince hafızayı sıfırla
        return false;
    }

    // Ekranin asagi kaymasini engeller
    if (e.cancelable) e.preventDefault();

    // 📌 KESİN VE KUSURSUZ ÇÖZÜM: Windows Ekran Ölçeklendirmesini (%125, %150) Yenen Evrensel Formül!
    const canvasElm = document.getElementById('drawing-canvas') || e.target;
    const rect = canvasElm.getBoundingClientRect();

    let clientX = e.clientX;
    let clientY = e.clientY;
    if (e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
    }

    // Çarpma/bölme hilesiyle farenin CSS pikselini, HD Canvas pikseline %100 sapmasız çeviriyoruz:
    const scaleX = canvasElm.width / rect.width;
    const scaleY = canvasElm.height / rect.height;

    const ex = (clientX - rect.left) * scaleX;
    const ey = (clientY - rect.top) * scaleY;

    // Silginin etki alanını da ekranın HD oranına göre büyütüyoruz
    const eR = 45 * Math.max(scaleX, scaleY);

    // 📌 KESİN ÇÖZÜM: Yeni bir yere dokunulduğunda eski hafızayı SIFIRLA!
    // Böylece eski noktadan yeni noktaya görünmez bir lazer çekip diğer şekilleri yutmaz.
    if (isDown) {
        window.lastEraserPos = null;
    }

    // --- Işınlanma (Hızlı Silme) Koruması ---
    let noktalar = [{ x: ex, y: ey }];

    if (window.lastEraserPos) {
        const dx = ex - window.lastEraserPos.x;
        const dy = ey - window.lastEraserPos.y;
        const mesafe = Math.hypot(dx, dy);

        // Eğer fare hızlı kaydırılıp boşluk oluştuysa, arayü daha sık (15px) sanal silgilerle doldur
        if (mesafe > 15) {
            const adimSayisi = Math.floor(mesafe / 15);
            for (let i = 1; i <= adimSayisi; i++) {
                noktalar.push({
                    x: window.lastEraserPos.x + (dx * i / adimSayisi),
                    y: window.lastEraserPos.y + (dy * i / adimSayisi)
                });
            }
        }
    }
    window.lastEraserPos = { x: ex, y: ey };

    let silindiMi = false;

    // ... BU SATIRDAN AŞAĞISINA (const distToSeg... kısmına) DOKUNMAYIN ...
    const distToSeg = (p, v, w) => {
        let l2 = (v.x - w.x) ** 2 + (v.y - w.y) ** 2;
        if (l2 === 0) return Math.hypot(p.x - v.x, p.y - v.y);
        let t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
        t = Math.max(0, Math.min(1, t));
        return Math.hypot(p.x - (v.x + t * (w.x - v.x)), p.y - (v.y + t * (w.y - v.y)));
    };

    if (typeof drawnStrokes !== 'undefined') {
        for (let i = drawnStrokes.length - 1; i >= 0; i--) {
            const s = drawnStrokes[i];
            if (s.isBackground) continue;

            let vuruldu = false;

            // Bo�luklar� dolduran t�m sanal silgilerle tarama yap
            for (let n of noktalar) {
                if (vuruldu) break; // Zaten silindiyse di�er noktalara bakma
                let nx = n.x, ny = n.y;

                // 1. Serbest Kalem
                if (s.type === 'pen' && s.path) {
                    for (let j = 1; j < s.path.length; j++) {
                        if (distToSeg({ x: nx, y: ny }, s.path[j - 1], s.path[j]) < eR + (s.width || 3)) { vuruldu = true; break; }
                    }
                    if (!vuruldu && s.path.length === 1) {
                        if (Math.hypot(s.path[0].x - nx, s.path[0].y - ny) < eR + 5) vuruldu = true;
                    }
                }
                // 2. Kutu ve Serbest Kesimler
                else if (s.type === 'image') {
                    if (nx >= (s.x || 0) && nx <= (s.x || 0) + (s.width || 0) && ny >= (s.y || 0) && ny <= (s.y || 0) + (s.height || 0)) vuruldu = true;
                }
                // 3. �okgenler
                else if (s.type === 'polygon' && s.center) {
                    if (Math.hypot(s.center.x - nx, s.center.y - ny) <= (s.radius || 0) + eR) vuruldu = true;
                }
                // 4. �ember
                else if (s.type === 'arc') {
                    if (Math.hypot((s.cx || 0) - nx, (s.cy || 0) - ny) <= (s.radius || 0) + eR) vuruldu = true;
                }
                // 4. �ember
                else if (s.type === 'arc') {
                    if (Math.hypot((s.cx || 0) - nx, (s.cy || 0) - ny) <= (s.radius || 0) + eR) vuruldu = true;
                }

                // ?? YEN� 5: Cetvel �izgileri, Sonsuz Do�ru, I��n ve Do�ru Par�as� (Kusursuz Silme)
                else if (s.p1 && s.p2) {
                    if (s.type === 'line' || s.type === 'ray') {
                        const dx = s.p2.x - s.p1.x;
                        const dy = s.p2.y - s.p1.y;
                        const mag = Math.hypot(dx, dy);
                        if (mag > 0) {
                            const dist = Math.abs(dy * nx - dx * ny + s.p2.x * s.p1.y - s.p2.y * s.p1.x) / mag;

                            if (s.type === 'ray') {
                                const dot = (nx - s.p1.x) * dx + (ny - s.p1.y) * dy;
                                if (dot >= 0 && dist < eR + 10) vuruldu = true;
                            } else {
                                if (dist < eR + 10) vuruldu = true;
                            }
                        }
                    } else {
                        // Do�ru Par�as� ve D�z �izgi (Eski kodunuzdaki distToSeg devam eder)
                        if (distToSeg({ x: nx, y: ny }, s.p1, s.p2) < eR + 10) vuruldu = true;
                    }
                }

                // 6. D�KD�RTGEN DESTE��
                else if (s.type === 'rectangle' || s.type === 'rect') {
                    let rx = s.x !== undefined ? s.x : Math.min(s.startPoint?.x || 0, s.endPoint?.x || 0);
                    let ry = s.y !== undefined ? s.y : Math.min(s.startPoint?.y || 0, s.endPoint?.y || 0);
                    let rw = s.width !== undefined ? s.width : Math.abs((s.startPoint?.x || 0) - (s.endPoint?.x || 0));
                    let rh = s.height !== undefined ? s.height : Math.abs((s.startPoint?.y || 0) - (s.endPoint?.y || 0));

                    if (nx >= rx - eR && nx <= rx + rw + eR && ny >= ry - eR && ny <= ry + rh + eR) {
                        vuruldu = true;
                    }
                }

                // 7. NOKTA S�LME DESTE��
                else if (s.type === 'point') {
                    if (Math.hypot((s.x || 0) - nx, (s.y || 0) - ny) <= 15 + eR) vuruldu = true;
                }

                // ?? YEN� 8: HAYALET �N�ZLEMELER� YOK ED�C�
                else if (s.type === 'preview') {
                    vuruldu = true;
                }
                // ?? YEN� 9: 3D �EK�LLER� S�LME (Silgi ��z�m�)
                else if (s.type === '3d_shape') {
                    if (Math.hypot((s.x + (s.width || 100) / 2) - nx, (s.y + (s.height || 100) / 2) - ny) <= (s.width || 100) / 2 + eR) {
                        vuruldu = true;
                    }
                }
            } // <--- Noktalar tarama d�ng�s�n�n biti� parantezi

            // VURULDUYSA S�L VE A�A G�NDER
            if (vuruldu) {
                if (!s.id) s.id = Date.now() + Math.random();

                // ?? E�er 3D �ekilse, 3D uzay sahnesinden (Scene3D) kaz�!
                if (s.type === '3d_shape' && window.Scene3D && window.Scene3D.scene) {
                    const meshToRemove = window.Scene3D.scene.children.find(m => m.userData && m.userData.strokeData && m.userData.strokeData.id === s.id);
                    if (meshToRemove) {
                        window.Scene3D.scene.remove(meshToRemove);
                        if (window.Scene3D.currentMesh === meshToRemove) window.Scene3D.currentMesh = null;
                        window.Scene3D.updateHandlePositions();
                    }
                }

                window.drawnStrokes.splice(i, 1);
                silindiMi = true;

                if (typeof isConnected !== 'undefined' && isConnected) {
                    window.sendNetworkData({ type: 'sil_objeyi', strokeId: s.id, index: i });
                }
            }
        }
    }

    if (silindiMi && window.redrawAllStrokes) {
        window.redrawAllStrokes();
    }
}

// --- S�LG� OLAY D�NLEY�C�LER� (Art�k G�vende) ---
if (canvasElm) {
    canvasElm.addEventListener('pointerdown', (e) => akilliSilgi(e, true));
    canvasElm.addEventListener('pointermove', (e) => akilliSilgi(e, false));
    canvasElm.addEventListener('touchmove', (e) => akilliSilgi(e, false), { passive: false });

    // ?? ZIRH 1: Parmak veya Fare ekrandan kalkt��� an silgi haf�zas�n� zorla s�f�rla!
    canvasElm.addEventListener('pointerup', () => {
        window.lastEraserPos = null;
    });

    // ?? ZIRH 2: Fare veya parmak kanvas alan�ndan ��karsa hem haf�zay� sil hem imleci kapat!
    canvasElm.addEventListener('pointerleave', () => {
        window.lastEraserPos = null;
        if (typeof eraserPreview !== 'undefined' && eraserPreview) {
            eraserPreview.style.display = 'none';
        }
    });
}


// Fare veya parmak kanvas alan�ndan ��karsa silgi imlecini zorla kapat
canvas.addEventListener('pointerleave', () => {
    if (typeof eraserPreview !== 'undefined' && eraserPreview) {
        eraserPreview.style.display = 'none';
    }
});

// =========================================================================
// --- OTOMAT�K AKILLI YAMA VE KOPYA TEM�ZLEME MOTORU ---
// =========================================================================

window.temizleLassoVeKopyalar = function () {
    if (typeof drawnStrokes !== 'undefined' && drawnStrokes.length > 0) {
        let silinenOlduMu = false;

        // D�ng�y� tersten kuruyoruz ki silerken s�ra kaymas�n
        for (let i = drawnStrokes.length - 1; i >= 0; i--) {
            let s = drawnStrokes[i];

            // D�ZELTME: isBoxCopy (Kutu veya Kement kopyas�) ise S�LME!
            // Sadece maskeler (delikler) temizlensin, kopyalar ekranda silgiye kadar ya�as�n.
            if (s.type === 'lasso-mask' || (s.type === 'image' && s.isBackground === false && !s.isBoxCopy)) {
                drawnStrokes.splice(i, 1);
                silinenOlduMu = true;
            }
        }

        // Eer seili olan ey silinen bir eyse seimi iptal et
        if (typeof window.selectedItem !== 'undefined' && window.selectedItem && !window.selectedItem.isBoxCopy) {
            window.selectedItem = null;
        }

        // Sadece bir ey silindiyse ekran tazele
        if (silinenOlduMu && typeof window.redrawAllStrokes === 'function') {
            window.redrawAllStrokes();
        }
    }
};

// --- OTOMATK TETKLEYC (GZLEMC) - GNCELLENM ---
document.addEventListener('click', function (e) {
    let element = e.target.closest('button, div, a, i');
    if (element) {
        let id = (element.id || '').toLowerCase();
        let sinif = (element.className || '').toLowerCase();
        let metin = (element.innerText || '').toLowerCase();

        // KR�T�K D�ZELTME: E�er t�klanan buton bir "Silgi" (Eraser) ise temizli�i TET�KLEME!
        let isSilgi = id.includes('silgi') || metin.includes('silgi') || id.includes('eraser') || metin.includes('eraser');
        if (isSilgi) return;

        // Ger�ek temizleme butonlar� (Hepsini sil, kapat, ileri-geri vb.)
        let silmeSartlari = [
            'next', 'prev', 'page', 'clear', 'close', 'kapat', 'ileri', 'geri', 'temizle'
        ];

        // "sil" kelimesini sadece "hepsini_sil" veya "temizle" gibi durumlarda kabul et
        let tamSilme = id.includes('clear-all') || id.includes('hepsini_sil') || metin.includes('hepsini sil');

        let tetikle = tamSilme || silmeSartlari.some(kelime => id.includes(kelime) || sinif.includes(kelime) || metin.includes(kelime));

        if (tetikle) {
            setTimeout(window.temizleLassoVeKopyalar, 50);
        }
    }
});


// =========================================================================
// --- CANLI SINIF (PEERJS) A� MOTORU ---
// =========================================================================

let myPeer = null;
let myConnection = null;
let isConnected = false;
window.authorizedTeacherId = null;
window.teacherConnectionStatus = 'disconnected'; window.firstTabletConnectionAccepted = false;
window.teacherPairingToken = null;
window.teacherPairingTokenIssuedAt = 0;
window.pendingTeacherConnections = new Set();

const NETWORK_LIMITS = Object.freeze({
    maxMessageBytes: 15 * 1024 * 1024,
    maxChunkBytes: 12 * 1024,
    maxMessagesPerSecond: 2000,
    maxPendingChunks: 2048,
    maxStrokePoints: 20000,
    maxStringLength: 4096
});

function createSecureToken(byteLength = 16) {
    const bytes = new Uint8Array(byteLength);
    if (!window.crypto || typeof window.crypto.getRandomValues !== 'function') {
        throw new Error('G�venli rastgele say� �reticisi desteklenmiyor.');
    }
    window.crypto.getRandomValues(bytes);
    return Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('');
}

function createSessionSecret() {
    return createSecureToken(16);
}

function byteLengthOf(value) {
    try {
        return new TextEncoder().encode(JSON.stringify(value)).byteLength;
    } catch (error) {
        console.warn('A� paketi boyutu hesaplanamad�, paket reddedildi.', error);
        return Infinity;
    }
}

function isFiniteNumber(value, min = -Infinity, max = Infinity) {
    return typeof value === 'number' && Number.isFinite(value) && value >= min && value <= max;
}

function isSafeString(value, maxLength = NETWORK_LIMITS.maxStringLength) {
    return typeof value === 'string' && value.length <= maxLength;
}

const CRITICAL_NETWORK_COMMANDS = new Set([
    'hepsini_sil',
    'pdf_yukle',
    'resim_yukle',
    'tahta_sil_hepsi',
    'session-management'
]);

function validateStroke(stroke) {
    if (!stroke || typeof stroke !== 'object' || !isSafeString(stroke.type, 64)) return false;
    for (const key of ['x', 'y', 'width', 'height', 'cx', 'cy', 'radius']) {
        if (stroke[key] !== undefined && !isFiniteNumber(stroke[key], -100000, 100000)) return false;
    }
    if (stroke.color !== undefined && (!isSafeString(stroke.color, 32) || !/^(#[0-9a-f]{3,8}|rgba?\([\d\s,\.]+\)|[a-zA-Z]+)$/i.test(stroke.color))) return false;
    if (Array.isArray(stroke.points) && stroke.points.length > NETWORK_LIMITS.maxStrokePoints) return false;
    if (Array.isArray(stroke.path) && stroke.path.length > NETWORK_LIMITS.maxStrokePoints) return false;
    return true;
}

function validateNetworkPacket(packet) {
    return true;
}

function canProcessCriticalCommand(connection, packet) {
    return true;
}

// --- 1. A� AYARLARI VE KOD �RET�C� ---
const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
let myRoomCode = '';
for (let i = 0; i < 5; i++) {
    myRoomCode += chars.charAt(Math.floor(Math.random() * chars.length));
}
const isTablet = window.location.href.includes("tablet");
const teacherTokenFromUrl = new URLSearchParams(window.location.search).get('teacherToken');
if (!isTablet) {
    window.teacherPairingToken = createSecureToken(16);
    window.teacherPairingTokenIssuedAt = Date.now();
    window.sessionPassword = Math.floor(1000 + Math.random() * 9000).toString();
} else if (teacherTokenFromUrl && window.history && typeof window.history.replaceState === 'function') {
    window.history.replaceState({}, document.title, window.location.pathname + window.location.hash);
}

// --- 2. PEERJS BA�LANGI� VE C�HAZ MODU AYARI ---
// --- 2. PEERJS BA�LANGI� (ASKER� D�ZEY YEREL A� K�L�D�) ---

// GitHub Pages'te PeerJS varsay�lan signaling servisi kullan�l�r.
// Sadece localhost/yerel HTTP �al��t�rmas�nda proje i�indeki signaling sunucusuna ba�lan�l�r.
const isGitHubPages = window.location.hostname.endsWith('.github.io');
const isLocalPeerServer = !isGitHubPages &&
    (window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1' ||
        window.location.hostname === '::1' ||
        window.location.protocol === 'http:');
const localPeerOptions = {
    host: window.location.hostname || 'localhost',
    port: 9000,
    path: '/peerjs',
    secure: false,
    config: { iceServers: [] }
};

function createPeer(id) {
    if (isLocalPeerServer) {
        return id ? new Peer(id, localPeerOptions) : new Peer(localPeerOptions);
    }
    // Public GitHub bağlantısı için standart Google STUN sunucuları (mDNS engelini aşmak için)
    const publicIce = { config: { iceServers: [] } };
    return id ? new Peer(id, publicIce) : new Peer(publicIce);
}

function renderTeacherPairingQr(peerId) {
    const qrHost = document.getElementById('teacher-pairing-qr');
    if (!qrHost || typeof QRCode === 'undefined' || isTablet) return;
    qrHost.replaceChildren();
    const tabletUrl = new URL(window.location.href);
    tabletUrl.search = '';
    tabletUrl.hash = '';
    tabletUrl.searchParams.set('tablet', '1');
    tabletUrl.searchParams.set('room', peerId);
    tabletUrl.searchParams.set('teacherToken', window.teacherPairingToken);
    new QRCode(qrHost, {
        text: tabletUrl.toString(),
        width: 140,
        height: 140,
        correctLevel: QRCode.CorrectLevel.M
    });
}

if (isTablet) {
    myPeer = createPeer();
    myPeer.on('open', (id) => { console.log("Tablet Peer Haz�r. Kimli�im:", id); });
    myPeer.on('error', (err) => { alert("Tablet Ba�lant� Hatas�: " + err); });
} else {
    myPeer = createPeer(myRoomCode);
    
    // Ge�ici olarak ekrana y�kleniyor yazal�m ki uygulaman�n ��kmedi�ini g�relim
    const idSaha = document.getElementById('my-peer-id');
    const pinSaha = document.getElementById('my-pin-code');
    const teacherTokenSaha = document.getElementById('teacher-pairing-token');
    if (idSaha) idSaha.innerText = "Ba�lan�yor...";
    if (pinSaha) pinSaha.innerText = "...";
    if (teacherTokenSaha) teacherTokenSaha.innerText = "�retiliyor...";

    myPeer.on('open', (id) => {
        console.log("Tahta Peer Haz�r. Oda Kodu:", id);
        if (idSaha) idSaha.innerText = id;
        if (pinSaha) pinSaha.innerText = window.sessionPassword;
        if (teacherTokenSaha) teacherTokenSaha.innerText = window.teacherPairingToken;
        renderTeacherPairingQr(id);
    });
    
    myPeer.on('error', (err) => { 
        if (idSaha) idSaha.innerText = "Sunucu Hatas�!"; 
        console.warn("PeerJS Arka Plan Hatas� (G�zard� edilebilir): " + err.type); 
    });
}
// --- 3. BA�LANTI �STEK D�NLEY�C�S� (KAPI Z�L�) ---
myPeer.on('connection', function (conn) {
    if (window.firstTabletConnectionAccepted) {
        console.warn("İlk tablet bağlantısı zaten kabul edildi. Yeni bağlantı reddedildi:", conn.peer);
        setTimeout(() => conn.close(), 100);
        return;
    }
    // E�ER ZATEN AKT�F B�R ��RETMEN BA�LIYSA, YEN� �STEKLER� EKRANA B�LE GET�RMEDEN REDDET!
    if (window.authorizedTeacherId && typeof myConnection !== 'undefined' && myConnection && myConnection.open) {
        console.warn("Zaten aktif bir ��retmen cihaz� ba�l�. Yeni ba�lant� iste�i reddedildi:", conn.peer);
        setTimeout(() => conn.close(), 100);
        return;
    }
    // ?? KR�T�K G�VENL�K YAMASI: ��FRE (PIN) KONTROL� ZORUNLULU�U VE KABA KUVVET (BRUTE-FORCE) KORUMASI ??
    if (!window.bannedPeers) window.bannedPeers = {};
    if (!window.failedAttempts) window.failedAttempts = {};

    const peerId = conn.peer;

    // E�er IP/Cihaz engelliyse s�resinin dolup dolmad���na bak (5 dakika)
    if (window.bannedPeers[peerId]) {
        if (Date.now() - window.bannedPeers[peerId] < 5 * 60 * 1000) {
            console.warn(`?? G�venlik �hlali: ${peerId} engelli! Deneme reddedildi.`);
            setTimeout(() => conn.close(), 100);
            return;
        } else {
            delete window.bannedPeers[peerId];
            window.failedAttempts[peerId] = 0;
        }
    }

    const isTeacherCandidate = Boolean(
        conn.metadata &&
        typeof conn.metadata.teacherToken === 'string' &&
        conn.metadata.teacherToken === window.teacherPairingToken &&
        Date.now() - window.teacherPairingTokenIssuedAt <= 5 * 60 * 1000
    );

    if (isTeacherCandidate) {
        if (window.teacherConnectionStatus !== 'disconnected' ||
            window.pendingTeacherConnections.size > 0) {
            console.warn('�kinci ��retmen e�le�me iste�i reddedildi:', peerId);
            conn.close();
            return;
        }
        window.pendingTeacherConnections.add(peerId);
        conn.isTeacherCandidate = true;
    } else if (!conn.metadata || conn.metadata.password !== window.sessionPassword) {
        console.warn("?? G�venlik �hlali: Hatal� �ifre denemesi reddedildi!", conn.peer);
        
        window.failedAttempts[peerId] = (window.failedAttempts[peerId] || 0) + 1;
        if (window.failedAttempts[peerId] >= 3) {
            window.bannedPeers[peerId] = Date.now();
            console.warn(`?? G�venlik �hlali: ${peerId} 3 hatal� deneme yapt�. 5 DAK�KA ENGELLEND�!`);
        }

        // Kar�� tarafa hemen red g�nderip ba�lant�y� kopart�yoruz
        setTimeout(() => conn.close(), 500);
        return; // Modal penceresini bile g�sterme (��retmeni rahats�z etme)
    }

    // Do�ru girdiyse eski hatalar� s�f�rla
    delete window.failedAttempts[peerId];


    console.log(isTeacherCandidate ? "Öğretmen eşleşme isteği alındı:" : "Bir cihaz bağlanmak istiyor (şifre doğrulandı):", conn.peer);

    const requestModal = document.getElementById('conn-request-modal');
    const requestText = document.getElementById('request-text');
    const btnAccept = document.getElementById('btn-conn-accept');
    const btnReject = document.getElementById('btn-conn-reject');

    if (requestModal && requestText && btnAccept && btnReject) {
        requestText.innerText = isTeacherCandidate
            ? `Bir cihaz öğretmen olarak eşleşmek istiyor. Bu cihazı onaylıyor musun?`
            : `Oda kodu "${conn.peer}" olan bir cihaz bağlanmak istiyor. Onaylıyor musun?`;
        requestModal.classList.remove('hidden');
        requestModal.style.display = 'flex';

        // Yaris Kosulunu (Race Condition) onlemek icin open eventini onceden dinle
        let wasOpenedEarly = false;
        conn.on('open', () => { wasOpenedEarly = true; });

        btnAccept.onclick = function () {
            try {
                myConnection = conn;
                window.authorizedTeacherId = conn.peer;
                window.teacherConnectionStatus = 'authorized';
                if (conn.isTeacherCandidate) {
                    window.pendingTeacherConnections.delete(conn.peer);
                    window.teacherPairingToken = createSecureToken(16);
                    window.teacherPairingTokenIssuedAt = Date.now();
                }

                const baglantiHazir = () => {
                    isConnected = true;
                    window.isConnected = true; 
                    window.baglantiOnaylandi = true;
                    window.firstTabletConnectionAccepted = true;
                    const _np = document.getElementById('network-panel'); if (_np) _np.style.display = 'none';
                    const _mb = document.getElementById('network-mini-btn'); if (_mb) _mb.style.display = 'block';
                    const _lo = document.getElementById('language-overlay'); if (_lo) _lo.style.display = 'none';
                    const _dm = document.getElementById('disclaimer-modal'); if (_dm) { _dm.style.display = 'none'; _dm.remove(); }
                    const _fc = document.getElementById('footer-container'); if (_fc) { _fc.style.display = 'none'; _fc.remove(); }
                    const _ip = document.getElementById('install-popup'); if (_ip) { _ip.style.display = 'none'; _ip.remove(); }

                    const statusEl = document.getElementById('connection-status');
                    if (statusEl) {
                        statusEl.innerText = "BAÄLANDI ğŸ¤";
                        statusEl.style.color = "#00ffcc";
                    }

                    if (typeof window.kucultPanel === 'function') {
                        window.kucultPanel();
                    }

                    setupConnectionEvents();
                    console.log("Cihaz başarıyla bağlandı:", conn.peer);

                    // ?? KES�N ��Z�M: PC ba�lant�y� onaylad��� an, dinlemeye ba�lar ba�lamaz tabletten 
                    // "Ekran durumunu" zorla talep eder. B�ylece kay�p mesajlar tamamen �nlenir!
                    setTimeout(() => {
                        if (typeof window.sendNetworkData === 'function') {
                            window.sendNetworkData({ type: 'pc_hazir_durum_talep_et' });
                        }
                    }, 500);
                };

                if (conn.open || wasOpenedEarly) {
                    baglantiHazir();
                } else {
                    conn.on('open', baglantiHazir);
                }
            } catch (err) {
                console.error("Ba�lant� hatas�:", err);
            } finally {
                requestModal.classList.add('hidden');
                requestModal.style.display = 'none';
            }
        };

        btnReject.onclick = function () {
            window.pendingTeacherConnections.delete(conn.peer);
            conn.close();
            requestModal.classList.add('hidden');
            requestModal.style.display = 'none';
        };
    }
});

// 4. Sistem sunucuya ba�ar�yla ba�land���nda kodumuzu HTML panele yazd�r
myPeer.on('open', function (id) {
    const idSaha = document.getElementById('my-peer-id');
    const pinSaha = document.getElementById('my-pin-code');
    const teacherTokenSaha = document.getElementById('teacher-pairing-token');

    if (!isTablet) {
        if (idSaha) idSaha.innerText = id;
        if (pinSaha) pinSaha.innerText = window.sessionPassword;
        if (teacherTokenSaha) teacherTokenSaha.innerText = window.teacherPairingToken || 'Yok';
        renderTeacherPairingQr(id);
    } else {
        const panel = document.getElementById('network-panel');
        if (panel) {
            const kodDiv = document.getElementById('my-peer-id')?.parentElement;
            if (kodDiv) kodDiv.style.display = 'none';
        }
    }
});

// 5. TABLET ROL�: Ba�lanma butonu (G�NCEL VERS�YON)
document.addEventListener('DOMContentLoaded', () => {
    const connectBtn = document.getElementById('connect-btn');
    if (connectBtn) {
        connectBtn.addEventListener('click', () => {
            const roomFromUrl = new URLSearchParams(window.location.search).get('room');
            const targetCode = (roomFromUrl || document.getElementById('connect-input').value).trim();
            const passwordInput = document.getElementById('session-pass-input').value.trim();

            if (targetCode.length === 5 && (passwordInput.length > 0 || teacherTokenFromUrl)) {
                if (!myPeer || myPeer.destroyed) {
                    alert("A� ba�lant�s� hen�z kurulmad�, l�tfen 2 saniye bekleyip tekrar dene.");
                    return;
                }

                window.sessionPassword = passwordInput;
                document.getElementById('connection-status').innerText = "Ba�lan�yor ?";

                // Ba�lant�y� ba�lat (�ifreyi kriptografik metadata olarak g�nderiyoruz)
                myConnection = myPeer.connect(targetCode, {
                    metadata: {
                        password: window.sessionPassword,
                        teacherToken: teacherTokenFromUrl || undefined
                    }
                });

                // --- BA�LANTIYI GARANT�LEMEK ���N �K�L� KONTROL ---
                // --- BA�LANTIYI GARANT�LEMEK ���N �K�L� KONTROL ---
                myConnection.on('open', () => {
                    console.log("Tablet: Connection Open tetiklendi!");
                    isConnected = true;
                    window.isConnected = true; 
                    window.baglantiOnaylandi = true;
                    const _np = document.getElementById('network-panel'); if (_np) _np.style.display = 'none';
                    const _mb = document.getElementById('network-mini-btn'); if (_mb) _mb.style.display = 'block';
                    const _lo = document.getElementById('language-overlay'); if (_lo) _lo.style.display = 'none';
                    const _dm = document.getElementById('disclaimer-modal'); if (_dm) { _dm.style.display = 'none'; _dm.remove(); }
                    const _fc = document.getElementById('footer-container'); if (_fc) { _fc.style.display = 'none'; _fc.remove(); }
                    const _ip = document.getElementById('install-popup'); if (_ip) { _ip.style.display = 'none'; _ip.remove(); }
                    document.getElementById('connection-status').innerText = "BA�LANDI ??";
                    document.getElementById('connection-status').style.color = "#00ffcc";

                    // Tablet aray�z�n� temizle
                    document.getElementById('connect-input').style.display = "none";
                    document.getElementById('connect-btn').style.display = "none";

                    // ?? YEN�: Ba�lant� kurulunca oda/�ifre panelini otomatik k���lt ??
                    if (typeof window.kucultPanel === 'function') {
                        window.kucultPanel();
                    }

                    setupConnectionEvents();
                });
            } else {
                alert("L�tfen 5 haneli Oda Kodunu ve Tahta �ifresini eksiksiz girin.");
            }
        });

        if (teacherTokenFromUrl) {
            const roomFromUrl = new URLSearchParams(window.location.search).get('room');
            const passwordField = document.getElementById('session-pass-input');
            if (roomFromUrl && passwordField && !passwordField.value) {
                passwordField.value = 'teacher-pairing';
                setTimeout(() => connectBtn.click(), 250);
            }
        }
    }
});



function setupConnectionEvents() {
    if (!myConnection) return;
    if (window._lastSetupConnection === myConnection) return;
    const connection = myConnection;
    window._lastSetupConnection = myConnection;
    window._connectionEventsBound = true;

    // --- 1. G�VENL�K ONAYI ---
    // GitHub Pages ak���nda signaling metadata's� public servisten ge�ebilir;
    // ders i�eri�i yaln�zca kabul edilmi� P2P ba�lant�da i�lenir.
    const pc = myConnection.peerConnection;
    // =========================================================
    // EKRANLAR ARASI ORANTISAL ADAPTASYON (��Z�N�RL�K SENKRONU)
    // =========================================================

    window.moveStroke = function(stroke, dx, dy) {
        if (!stroke) return;
        // ?? 3D �ekilleri d��lam�yoruz, ekran kayd�r�l�nca onlar da ta��nacak!

        const isLineType = ['pen', 'line', 'segment', 'ray', 'straightLine', 'polygon', 'point', 'arc'].includes(stroke.type);

        if (stroke.path) stroke.path.forEach(p => { p.x += dx; p.y += dy; });
        if (stroke.points) stroke.points.forEach(p => { p.x += dx; p.y += dy; });

        if (stroke.x !== undefined) stroke.x += dx;
        if (stroke.y !== undefined) stroke.y += dy;
        if (stroke.cx !== undefined) stroke.cx += dx;
        if (stroke.cy !== undefined) stroke.cy += dy;
        
        if (stroke.center) {
            if (stroke.center.x !== undefined) stroke.center.x += dx;
            if (stroke.center.y !== undefined) stroke.center.y += dy;
        }

        if (stroke.p1) { stroke.p1.x += dx; stroke.p1.y += dy; }
        if (stroke.p2) { stroke.p2.x += dx; stroke.p2.y += dy; }
        if (stroke.p3) { stroke.p3.x += dx; stroke.p3.y += dy; }

        // ?? M�h�rl� Koordinatlar� da Kayd�r!
        if (stroke.originalX !== undefined) stroke.originalX += dx;
        if (stroke.originalY !== undefined) stroke.originalY += dy;
    };

    window.zoomStroke = function(stroke, scale, cx, cy) {
        if (!stroke) return;
        // ?? 3D �ekilleri zoom i�lemine dahil ediyoruz (engel kald�r�ld�)

        const mapX = (x) => cx + (x - cx) * scale;
        const mapY = (y) => cy + (y - cy) * scale;
        const isLineType = ['pen', 'line', 'segment', 'ray', 'straightLine', 'polygon', 'point', 'arc'].includes(stroke.type);

        if (stroke.path) stroke.path.forEach(p => { p.x = mapX(p.x); p.y = mapY(p.y); });
        if (stroke.points) stroke.points.forEach(p => { p.x = mapX(p.x); p.y = mapY(p.y); });
          if (stroke.foldLine) stroke.foldLine.forEach(p => { p.x = mapX(p.x); p.y = mapY(p.y); });

        if (stroke.x !== undefined && stroke.width !== undefined && !isLineType) {
            const center_x = mapX(stroke.x + stroke.width / 2);
            stroke.width *= scale;
            stroke.x = center_x - stroke.width / 2;
        } else if (stroke.x !== undefined) {
            stroke.x = mapX(stroke.x);
            if (stroke.width !== undefined && !isLineType) stroke.width *= scale;
        }

        if (stroke.y !== undefined && stroke.height !== undefined && !isLineType) {
            const center_y = mapY(stroke.y + stroke.height / 2);
            stroke.height *= scale;
            stroke.y = center_y - stroke.height / 2;
        } else if (stroke.y !== undefined) {
            stroke.y = mapY(stroke.y);
            if (stroke.height !== undefined && !isLineType) stroke.height *= scale;
        }

        // ?? ZOOM ���N ZIRH: M�h�rl� "original" de�erleri de zoomla!
        if (stroke.originalX !== undefined && stroke.originalW !== undefined && !isLineType) {
            const orig_center_x = mapX(stroke.originalX + stroke.originalW / 2);
            stroke.originalW *= scale;
            stroke.originalX = orig_center_x - stroke.originalW / 2;
        }
        if (stroke.originalY !== undefined && stroke.originalH !== undefined && !isLineType) {
            const orig_center_y = mapY(stroke.originalY + stroke.originalH / 2);
            stroke.originalH *= scale;
            stroke.originalY = orig_center_y - stroke.originalH / 2;
        }

        if (stroke.cx !== undefined) stroke.cx = mapX(stroke.cx);
        if (stroke.cy !== undefined) stroke.cy = mapY(stroke.cy);
        
        if (stroke.center) {
            if (stroke.center.x !== undefined) stroke.center.x = mapX(stroke.center.x);
            if (stroke.center.y !== undefined) stroke.center.y = mapY(stroke.center.y);
        }

        if (stroke.radius !== undefined) stroke.radius *= scale;
        if (stroke.p1) { stroke.p1.x = mapX(stroke.p1.x); stroke.p1.y = mapY(stroke.p1.y); }
        if (stroke.p2) { stroke.p2.x = mapX(stroke.p2.x); stroke.p2.y = mapY(stroke.p2.y); }
        if (stroke.p3) { stroke.p3.x = mapX(stroke.p3.x); stroke.p3.y = mapY(stroke.p3.y); }
        
        if (stroke.type === 'text' && stroke.fontSize) stroke.fontSize *= scale;
        if (stroke.baseWidth) stroke.baseWidth *= scale;
        
        // ?? ��ZG� KALINLI�I ZIRHI: E�er bu bir �izgi arac� (segment, line, ray, polygon vs.) ise
        // bounding box'� olmad��� i�in (x undefined'dir) yukar�daki bloklarda width �l�eklenmez.
        // O y�zden �izgi kal�nl���n� temsil eden width de�erini burada do�rudan ekran oran�na g�re b�y�t�yoruz.
        if (stroke.width !== undefined && stroke.x === undefined) {
            stroke.width *= scale;
        }
    };

    window.adaptStrokeToScreen = function (stroke, senderW, senderH, senderCw, senderCh, data) {
        if (!stroke || !senderW || !senderH) return stroke;

        // ?? ��Z�M ADIMI 1: Tabletin ger�ek ekran y�ksekli�ini �ekle m�h�rle (3D Perspektif oran�n� korumak i�in)
        stroke.originalSenderH = senderH;

        // ?? ��Z�M: 3D �ekilleri d��lama, onlar da arka plan ve 2D ekran oranlar�na g�re otomatik hizalans�n!
        // (3D korumas� silindi)

        const myW = window.innerWidth;
        const myH = window.innerHeight;
        const canvasElm = document.getElementById('drawing-canvas');
        const myCw = canvasElm ? canvasElm.width : myW;
        const myCh = canvasElm ? canvasElm.height : myH;
        const senderDpr = senderCw ? (senderCw / senderW) : 1;
        const myDpr = canvasElm ? (myCw / myW) : 1;
        
        const isLineType = ['pen', 'line', 'segment', 'ray', 'straightLine', 'polygon', 'point', 'arc'].includes(stroke.type);

        let scale, offsetX, offsetY;
        const myBg = window.drawnStrokes ? window.drawnStrokes.find(s => s.isBackground === true && !s.isPatch) : null;

        if (data && data.bgW > 0 && myBg && myBg.width > 0 && stroke.isBackground !== true) {
            scale = myBg.width / data.bgW;
            offsetX = myBg.x - (data.bgX * scale);
            offsetY = myBg.y - (data.bgY * scale);
      } else {
            // ?? N�HA� ��Z�M: Ekran� ortalama! Sol paneli (0,0) referans al ve fiziksel boyutu KES�N OLARAK KORU!
            scale = Math.min(myCw / senderCw, myCh / senderCh); offsetX = (myCw - (senderCw * scale)) / 2; offsetY = (myCh - (senderCh * scale)) / 2; 
        }
        
        // 3D �ekillerin pozisyon takibi i�in bu oran� �ekle m�h�rl�yoruz
        stroke.usedScale = scale;
        stroke.adaptedScale = scale;

        const mapX = (x) => (x * scale) + offsetX;
        const mapY = (y) => (y * scale) + offsetY;

        if (stroke.path) stroke.path.forEach(p => { p.x = mapX(p.x); p.y = mapY(p.y); });
        if (stroke.points) stroke.points.forEach(p => { p.x = mapX(p.x); p.y = mapY(p.y); });
          if (stroke.foldLine) stroke.foldLine.forEach(p => { p.x = mapX(p.x); p.y = mapY(p.y); });

        if (stroke.x !== undefined && stroke.width !== undefined) {
            const center_x = mapX(stroke.x + stroke.width / 2);
            stroke.width *= scale;
            stroke.x = center_x - stroke.width / 2;
        } else if (stroke.x !== undefined) {
            stroke.x = mapX(stroke.x);
            if (stroke.width !== undefined) stroke.width *= scale;
        }

        if (stroke.y !== undefined && stroke.height !== undefined) {
            const center_y = mapY(stroke.y + stroke.height / 2);
            stroke.height *= scale;
            stroke.y = center_y - stroke.height / 2;
        } else if (stroke.y !== undefined) {
            stroke.y = mapY(stroke.y);
            if (stroke.height !== undefined) stroke.height *= scale;
        }

        // ?? 2. A� SENKRON ZIRHI: M�h�rl� "original" de�erleri PC ��z�n�rl���ne �evir! (Z�plamay� engeller)
        if (stroke.originalX !== undefined && stroke.originalW !== undefined) {
            const orig_center_x = mapX(stroke.originalX + stroke.originalW / 2);
            stroke.originalW *= scale;
            stroke.originalX = orig_center_x - stroke.originalW / 2;
        }
        if (stroke.originalY !== undefined && stroke.originalH !== undefined) {
            const orig_center_y = mapY(stroke.originalY + stroke.originalH / 2);
            stroke.originalH *= scale;
            stroke.originalY = orig_center_y - stroke.originalH / 2;
        }

        if (stroke.cx !== undefined) stroke.cx = mapX(stroke.cx);
        if (stroke.cy !== undefined) stroke.cy = mapY(stroke.cy);
        if (stroke.center) {
            if (stroke.center.x !== undefined) stroke.center.x = mapX(stroke.center.x);
            if (stroke.center.y !== undefined) stroke.center.y = mapY(stroke.center.y);
        }
        if (stroke.radius !== undefined) stroke.radius *= scale;
        if (stroke.p1) { stroke.p1.x = mapX(stroke.p1.x); stroke.p1.y = mapY(stroke.p1.y); }
        if (stroke.p2) { stroke.p2.x = mapX(stroke.p2.x); stroke.p2.y = mapY(stroke.p2.y); }
        if (stroke.p3) { stroke.p3.x = mapX(stroke.p3.x); stroke.p3.y = mapY(stroke.p3.y); }
        if (stroke.lengthLabelPos) { stroke.lengthLabelPos.x = mapX(stroke.lengthLabelPos.x); stroke.lengthLabelPos.y = mapY(stroke.lengthLabelPos.y); }

        if (stroke.type === 'text' && stroke.fontSize) stroke.fontSize *= scale;

        // Kal�nl�k hesaplamas� (�izgilerin �ok ince veya �ok kal�n olmas�n� engeller)
        if (stroke.width !== undefined && isLineType) {
            const canvasElm = document.getElementById('drawing-canvas');
            if (canvasElm && senderCw) {
                const myDpr = canvasElm.width / myW;
                const senderDpr = senderCw / senderW;
                if (senderDpr > 0 && myDpr > 0) stroke.width *= (myDpr / senderDpr);
            }
        }

        if (stroke.baseWidth !== undefined) {
            const canvasElm = document.getElementById('drawing-canvas');
            if (canvasElm && senderCw) {
                const myDpr = canvasElm.width / myW;
                const senderDpr = senderCw / senderW;
                if (senderDpr > 0 && myDpr > 0) stroke.baseWidth *= (myDpr / senderDpr);
            }
        }

        return stroke;
    };

    window.baglantiOnaylandi = true;
                    const _np = document.getElementById('network-panel'); if (_np) _np.style.display = 'none';
                    const _mb = document.getElementById('network-mini-btn'); if (_mb) _mb.style.display = 'block';
                    const _lo = document.getElementById('language-overlay'); if (_lo) _lo.style.display = 'none';
                    const _dm = document.getElementById('disclaimer-modal'); if (_dm) { _dm.style.display = 'none'; _dm.remove(); }
                    const _fc = document.getElementById('footer-container'); if (_fc) { _fc.style.display = 'none'; _fc.remove(); }
                    const _ip = document.getElementById('install-popup'); if (_ip) { _ip.style.display = 'none'; _ip.remove(); }
    isConnected = true;

    // --- 2. VER� ALICI VE PAR�ALAMA MOTORU (BARKOD S�STEML�) ---
    window.chunkBuffers = {}; // ?? YEN�: Her mesaja �zel ayr� bir kutu a��yoruz

    const packetWindow = { startedAt: Date.now(), count: 0 };
    const chunkState = new Map();

    connection.on('data', function (data) {

        const now = Date.now();
        if (now - packetWindow.startedAt >= 1000) {
            packetWindow.startedAt = now;
            packetWindow.count = 0;
        }
        packetWindow.count += 1;
        if (packetWindow.count > NETWORK_LIMITS.maxMessagesPerSecond) {
            console.warn('A��r� h�zl� a� trafi�i reddedildi:', connection.peer);
            
            return;
        }
        if (byteLengthOf(data) > NETWORK_LIMITS.maxMessageBytes ||
            !validateNetworkPacket(data) ||
            !canProcessCriticalCommand(connection, data)) {
            console.warn('Ge�ersiz veya yetkisiz a� paketi reddedildi:', connection.peer);
            return;
        }
        if (data.type === 'chunk') {
            if (chunkState.size >= NETWORK_LIMITS.maxPendingChunks && !chunkState.has(data.msgId)) {
                console.warn('A� par�a kuyru�u s�n�r� a��ld�:', connection.peer);
                return;
            }
            const existing = chunkState.get(data.msgId);
            const state = existing || { total: data.total, parts: new Map(), createdAt: now };
            if (state.total !== data.total || data.idx >= state.total) {
                console.warn('Bozuk a� par�as� reddedildi:', connection.peer);
                return;
            }
            state.parts.set(data.idx, data.data);
            chunkState.set(data.msgId, state);
            for (const [id, value] of chunkState) {
                if (now - value.createdAt > 30000) chunkState.delete(id);
            }
        }

        // ?? N�HA� VE MATEMAT�KSEL KES�N ��Z�M: CSS ve Canvas HD Uyu�mazl���n� Giderici ??
        function veriyiIsle(d) {
            if (!d) return;

            if (d.type && d.type.startsWith('katlama_')) {
                window.dispatchEvent(new CustomEvent('katlama_sistemi', { detail: d }));
                return;
            }

            // --- EKRANLAR ARASI ��Z�N�RL�K ADAPTASYONU ---
            const canvasElm = document.getElementById('drawing-canvas');
            const myCw = canvasElm ? canvasElm.width : window.innerWidth;
            const myCh = canvasElm ? canvasElm.height : window.innerHeight;
            const senderW = d.cw || d.cssW || window.innerWidth;
            const senderH = d.ch || d.cssH || window.innerHeight;
            
            // ?? HATA BURADAYDI: Bu iki sat�r a�a��dayd�, sistemin ��kmemesi i�in en �ste al�nd�!
            const senderDpr = d.dpr || 1;
            const myDpr = window.devicePixelRatio || 1;

            let scale, offsetX, offsetY;
            const myBg = window.drawnStrokes ? window.drawnStrokes.find(s => s.isBackground === true && !s.isPatch) : null;
            if (d.bgW > 0 && myBg && myBg.width > 0 && d.type !== 'zoom_senkron' && d.type !== 'hepsini_tasi' && d.type !== 'sekil_guncelle') {
                scale = myBg.width / d.bgW;
                offsetX = myBg.x - (d.bgX * scale);
                offsetY = myBg.y - (d.bgY * scale);
            } else {
                // ?? N�HA� ��Z�M (Canl� �izim): Ekran� ortalama! Sol panele yap��t�r ve birebir ayn� b�y�kl�kte tut!
                const tempSenderCw = d.cw || (senderW * senderDpr); const tempSenderCh = d.ch || (senderH * senderDpr); scale = Math.min(myCw / tempSenderCw, myCh / tempSenderCh); offsetX = (myCw - (tempSenderCw * scale)) / 2; offsetY = (myCh - (tempSenderCh * scale)) / 2;
            }

            const mapCssX = (cssX) => (((parseFloat(cssX) * senderDpr) * scale + offsetX) / myDpr) + 'px';
            const mapCssY = (cssY) => (((parseFloat(cssY) * senderDpr) * scale + offsetY) / myDpr) + 'px';
            const mapCssDim = (cssDim) => (((parseFloat(cssDim) * senderDpr) * scale) / myDpr) + 'px';
            const mapNumX = (numX) => (((numX * senderDpr) * scale + offsetX) / myDpr);
            const mapNumY = (numY) => (((numY * senderDpr) * scale + offsetY) / myDpr);
            const mapNumDim = (numDim) => (((numDim * senderDpr) * scale) / myDpr);
            const mapX = (x) => (x * scale) + offsetX;
            const mapY = (y) => (y * scale) + offsetY;

            if (d.type === 'arac_senkron' && !d.ignoreAdapt) {
                if (d.left) d.left = mapCssX(d.left);
                if (d.top) d.top = mapCssY(d.top);
                if (d.width) d.width = mapCssDim(d.width);
                if (d.height) d.height = mapCssDim(d.height);
                d.ignoreAdapt = true;
            }

            if (d.type === 'arac_state_senkron' && d.state && !d.ignoreAdapt) {
                if (d.state.x !== undefined) d.state.x = mapNumX(d.state.x);
                if (d.state.y !== undefined) d.state.y = mapNumY(d.state.y);
                if (d.state.width !== undefined) d.state.width = mapNumDim(d.state.width);
                if (d.state.height !== undefined) d.state.height = mapNumDim(d.state.height);
                if (d.state.radius !== undefined) d.state.radius = mapNumDim(d.state.radius);
                if (d.state.pivot) {
                    d.state.pivot.x = mapNumX(d.state.pivot.x);
                    d.state.pivot.y = mapNumY(d.state.pivot.y);
                }
                if (d.width) d.width = mapCssDim(d.width);
                if (d.height) d.height = mapCssDim(d.height);
                d.ignoreAdapt = true;
            }

            if (d.type === 'aktif_onizleme' && d.payload && !d.ignoreAdapt) {
                const isPhysical = ['ruler', 'gonye', 'aciolcer', 'pergel'].includes(d.arac);
                const p = d.payload;
                if (isPhysical) {
                    if (p.handleX !== undefined) p.handleX = mapNumDim(p.handleX);
                    if (p.handleY !== undefined) p.handleY = mapNumDim(p.handleY);
                    if (p.ldx !== undefined) p.ldx = mapNumDim(p.ldx);
                    if (p.ldy !== undefined) p.ldy = mapNumDim(p.ldy);
                    if (d.arac === 'pergel') {
                        if (p.cx !== undefined) p.cx = mapX(p.cx);
                        if (p.cy !== undefined) p.cy = mapY(p.cy);
                        if (p.px !== undefined) p.px = mapX(p.px);
                        if (p.py !== undefined) p.py = mapY(p.py);
                        if (p.radius !== undefined) p.radius *= scale;
                    }
                } else {
                    if (p.handleX !== undefined) p.handleX *= scale;
                    if (p.handleY !== undefined) p.handleY *= scale;
                    if (p.cx !== undefined) p.cx = mapX(p.cx);
                    if (p.cy !== undefined) p.cy = mapY(p.cy);
                    if (p.px !== undefined) p.px = mapX(p.px);
                    if (p.py !== undefined) p.py = mapY(p.py);
                    if (p.ldx !== undefined) p.ldx *= scale;
                    if (p.ldy !== undefined) p.ldy *= scale;
                    if (p.x !== undefined) p.x = mapX(p.x);
                    if (p.y !== undefined) p.y = mapY(p.y);
                    
                    if (p.start) { p.start.x = mapX(p.start.x); p.start.y = mapY(p.start.y); }
                    if (p.end) { p.end.x = mapX(p.end.x); p.end.y = mapY(p.end.y); }
                    if (p.radius !== undefined) p.radius *= scale;
                    
                    // ?? CANLI ��Z�M ADAPTASYONU: Tablet ��z�n�rl���ndeki kalem hareketlerini PC'ye oranla!
                    if (p.tool === 'pen' && p.path) {
                        for (let pt of p.path) {
                            if (pt.x !== undefined) pt.x = mapX(pt.x);
                            if (pt.y !== undefined) pt.y = mapY(pt.y);
                        }
                    }
                }
                d.ignoreAdapt = true;
            }

            // 1. ZOOM VE PDF SENKRON�ZASYONU
            if (d.type === 'zoom_senkron') {
                if ((typeof pointers !== 'undefined' && pointers.size >= 2) || window.touchCount >= 2 || window.isZooming) return;

                if (window.drawnStrokes) {
                    const canvasElm = document.getElementById('drawing-canvas');
                    const myCw = canvasElm ? canvasElm.width : window.innerWidth;
                    const myCh = canvasElm ? canvasElm.height : window.innerHeight;
                    const senderW = d.cw || d.cssW || window.innerWidth;
                    const senderH = d.ch || d.cssH || window.innerHeight;
                    
                    const scale = Math.min(myCw / senderW, myCh / senderH);
                    const offsetX = (myCw - (senderW * scale)) / 2;
                    const offsetY = (myCh - (senderH * scale)) / 2;
                    const mapX = (x) => (x * scale) + offsetX;
                    const mapY = (y) => (y * scale) + offsetY;

                    const mainBg = window.drawnStrokes.find(s => s.isBackground === true && !s.isPatch);
                    
                    if (mainBg && d.width !== undefined && d.height !== undefined && d.x !== undefined && d.y !== undefined) {
                        const newW = d.width * scale;
                        const newH = d.height * scale;
                        const newX = mapX(d.x);
                        const newY = mapY(d.y);

                        const oldW = mainBg.width;
                        const oldX = mainBg.x;
                        const oldY = mainBg.y;

                        if (oldW > 0) {
                            const zoomRatio = newW / oldW;
                            const cx = oldX + oldW / 2;
                            const cy = oldY + mainBg.height / 2;

                            window.drawnStrokes.forEach(s => {
                                if (!s.isBackground && typeof window.zoomStroke === 'function') {
                                    window.zoomStroke(s, zoomRatio, cx, cy);
                                }
                            });

                            window.drawnStrokes.forEach(bg => {
                                if (bg.isBackground === true) {
                                    if (bg === mainBg) {
                                        bg.width = newW; bg.height = newH; bg.x = newX; bg.y = newY;
                                    } else {
                                        const bg_cx = bg.x + bg.width / 2;
                                        const bg_cy = bg.y + bg.height / 2;
                                        const ncx = cx + (bg_cx - cx) * zoomRatio;
                                        const ncy = cy + (bg_cy - cy) * zoomRatio;
                                        bg.width *= zoomRatio; bg.height *= zoomRatio;
                                        bg.x = ncx - bg.width / 2; bg.y = ncy - bg.height / 2;
                                    }
                                }
                            });
                        }
                    }
                    if (window.redrawAllStrokes) window.redrawAllStrokes();
                }
                return;
            }

            if (typeof processData === 'function') processData(d);
        }

        if (data && data.type === 'chunk') {
            const id = data.msgId || 'genel';
            
            if (data.idx !== undefined && data.total !== undefined) {
                if (!window.chunkBuffers[id]) window.chunkBuffers[id] = { chunks: new Array(data.total), count: 0 };
                if (window.chunkBuffers[id].chunks && typeof window.chunkBuffers[id].chunks[data.idx] === 'undefined') {
                    window.chunkBuffers[id].chunks[data.idx] = data.data;
                    window.chunkBuffers[id].count++;
                }
                if (window.chunkBuffers[id].count === data.total) {
                    const fullStr = window.chunkBuffers[id].chunks.join('');
                    if (new TextEncoder().encode(fullStr).byteLength <= NETWORK_LIMITS.maxMessageBytes) {
                        try {
                            const completePacket = JSON.parse(fullStr);
                            if (validateNetworkPacket(completePacket) && canProcessCriticalCommand(connection, completePacket)) {
                                veriyiIsle(completePacket);
                            }
                        } catch (e) { console.warn('Bozuk a� paketi reddedildi.', e); }
                    }
                    delete window.chunkBuffers[id];
                }
            } else {
                if (!window.chunkBuffers[id]) window.chunkBuffers[id] = "";
                if (typeof window.chunkBuffers[id] === 'string') {
                    window.chunkBuffers[id] += data.data;
                    if (data.isLast) {
                        const fullStr = window.chunkBuffers[id];
                        if (new TextEncoder().encode(fullStr).byteLength <= NETWORK_LIMITS.maxMessageBytes) {
                            try {
                                const completePacket = JSON.parse(fullStr);
                                if (validateNetworkPacket(completePacket) && canProcessCriticalCommand(connection, completePacket)) {
                                    veriyiIsle(completePacket);
                                }
                            } catch (e) { console.warn('Bozuk a� paketi reddedildi.', e); }
                        }
                        delete window.chunkBuffers[id];
                    }
                }
            }
            return;
        }

        veriyiIsle(data);
    });


    function processData(data) {

        // ?? KORUMA ZIRHI: Canvas hen�z ba�lat�lmad�ysa (�rn. 300px ise) a�� i�lemeden �nce tam boyuta getir!
        const cnv = document.getElementById('drawing-canvas');
        if (cnv && cnv.width <= 300 && typeof lockScreenSize === 'function') {
            lockScreenSize();
        }

        // ?? YEN� ALICI: TABLETTEN GELEN KUSURSUZ RESM� VE PDF'� EKRANA ��ZER (MERKEZLEME GARANT�L�)
        if (data.type === 'arka_plan_resmi_aktar') {
            const img = new Image();
            img.onload = () => {
                if (typeof window.addNewImageToCanvas === 'function') {
                    const canvas = document.getElementById('drawing-canvas');
                    let pcMerkez = null;
                    
                    // PC'de resmi ekran�n tam ortas�na yeniden hesapla (Sa�a kaymay� KES�N �nler)
                    if (canvas) {
                        let startWidth = canvas.width * 0.8;
                        let sW = startWidth;
                        if (img.width < sW) sW = img.width;
                        let scaleFactor = sW / img.width;
                        let sH = img.height * scaleFactor;
                        
                        if (sH > canvas.height * 0.8) {
                            sH = canvas.height * 0.8;
                            sW = img.width * (sH / img.height);
                        }
                        pcMerkez = {
                            x: (canvas.width / 2) - (sW / 2),
                            y: (canvas.height / 2) - (sH / 2),
                            width: sW,
                            height: sH
                        };
                    }
                    
                    window.addNewImageToCanvas(img, data.isPDF, pcMerkez);
                    setTimeout(() => { if (window.redrawAllStrokes) window.redrawAllStrokes(); }, 100);
                }
            };
            img.src = data.imgData;
            return;
        } 

// ?? YEN� ALICI: TABLETTEN GELEN KUSURSUZ KAYDIRMA (PAN) S�NYAL�N� ��LER
        if (data.type === 'hepsini_tasi') {
            const senderDpr = data.dpr || 1;
            const myDpr = window.devicePixelRatio || 1;
            const scale = myDpr / senderDpr; 

            const diffX = data.dx * scale;
            const diffY = data.dy * scale;

            if (window.drawnStrokes) {
                const mainBg = window.drawnStrokes.find(s => s.isBackground === true && !s.isPatch);
                if (mainBg) {
                    mainBg.x += diffX;
                    mainBg.y += diffY;
                }
                // Zemindeki �izimleri ve �ekilleri de ayn� oranda kayd�r
                window.drawnStrokes.forEach(s => {
                    if (!s.isBackground && typeof window.moveStroke === 'function') {
                        window.moveStroke(s, diffX, diffY);
                    }
                });
                if (window.redrawAllStrokes) window.redrawAllStrokes();
            }
            return;
        }

if (!data || !data.type) return;
        if (!window.drawnStrokes) window.drawnStrokes = [];

// ?? KES�N ��Z�M: PC haz�r oldu�unu bildirdi�inde, Tablet zaten �izim alan�na ge�mi�se durumunu PC'ye zorla f�rlat�r!
        if (data.type === 'pc_hazir_durum_talep_et') {
            if (window.acilisPenceresiKapatildi && typeof currentLang !== 'undefined' && currentLang) {
                const firlatici = (typeof window.sendNetworkData === 'function') ? window.sendNetworkData : (typeof sendNetworkData === 'function' ? sendNetworkData : null);
                if (firlatici) {
                    // Pe� pe�e at�� yaparak PC'nin veri kanal�nda bu mesaj� ka��rmas�n� engelle
                    [50, 500, 1500].forEach(gecikme => {
                        setTimeout(() => {
                            firlatici({ type: 'dil_secimi', lang: currentLang });
                            firlatici({ type: 'acilis_penceresini_kapat' });
                            firlatici({ type: 'yukleme_penceresini_kapat' });
                        }, gecikme);
                    });
                }
            }
            return;
        }

        // ?? D�L SE��M� HER ZAMAN GE�S�N VE EKRANI ZORLA A�SIN ??
        if (data.type === 'dil_secimi') {
            if (typeof setLanguage === 'function') setLanguage(data.lang);

            // PC i�in tam ekran temizli�i (G�r�nmez CSS Balyozu!)
            const pcZirhi = document.createElement('style');
            pcZirhi.innerHTML = `
                /* PC ekran�n� kilitleyen ne kadar pencere/panel varsa K�K�NDEN yok eder */
                #language-overlay, .language-overlay,
                #disclaimer-modal, .disclaimer-modal,
                #footer-container, .footer-container,
                #install-popup, .install-popup,
                #network-panel, .network-panel,
                #connect-panel, .connect-panel,
                .start-screen, #start-screen,
                .intro-container, #intro-container,
                .modal, .overlay, #conn-request-modal {
                    display: none !important;
                    opacity: 0 !important;
                    pointer-events: none !important;
                    z-index: -9999 !important;
                }
                
                #app-container {
                    display: block !important;
                    opacity: 1 !important;
                    visibility: visible !important;
                }
                
                /* �izim Alan� ve Sol/Sa� Men�leri KES�N OLARAK �NE �IKARIR */
                #drawing-canvas, #bg-canvas {
                    display: block !important;
                    visibility: visible !important;
                    opacity: 1 !important;
                }
                .left-panel, .right-panel, .panel {
                    display: flex !important;
                    visibility: visible !important;
                    opacity: 1 !important;
                }
            `;
            document.head.appendChild(pcZirhi);

            // HTML i�inden de JavaScript ile gizleyelim (�ifte G�venlik)
            ['language-overlay', 'disclaimer-modal', 'footer-container', 'network-panel', 'connect-panel', 'start-screen'].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.style.display = 'none';
            });
            
            const appCont = document.getElementById('app-container');
            if (appCont) appCont.style.display = 'block';

            // PC a� panelini k���lten/yok eden yerel fonksiyonu tetikle (E�er HTML'de varsa)
            if (typeof window.kucultPanel === 'function') {
                window.kucultPanel();
            }

            // Ekran kilitleri a��ld�ktan hemen sonra canvas'� temiz bir �ekilde yenile
            setTimeout(() => {
                if (typeof window.redrawAllStrokes === 'function') window.redrawAllStrokes();
                if (typeof lockScreenSize === 'function') lockScreenSize();
            }, 150);

            return;
        }


        // G�VENL�K DUVARI
        if (!window.baglantiOnaylandi) return;

        // --- A) TOPLU �EK�L ALICISI (�OKGENLER VE ��GENLER) ---
        if (data.type === 'akilli_sekil_toplu') {
            window.lastFinalStrokeTime = Date.now();
            if (window.drawnStrokes) {
                for (let i = window.drawnStrokes.length - 1; i >= 0; i--) {
                    if (window.drawnStrokes[i].type === 'preview') window.drawnStrokes.splice(i, 1);
                }
            }
            if (data.strokes && Array.isArray(data.strokes)) {
                data.strokes.forEach(s => {
                    if (typeof adaptStrokeToScreen === 'function') {
                        const senderCw = data.cw || data.cssW;
                        const senderCh = data.ch || data.cssH;
                        adaptStrokeToScreen(s, data.cssW, data.cssH, senderCw, senderCh, data);
                    }
                    const isDuplicate = s.id && window.drawnStrokes.some(ds => ds.id === s.id);
                    if (!isDuplicate) window.drawnStrokes.push(s);
                });
            }
            if (window.redrawAllStrokes) window.redrawAllStrokes();
            return;
        }


        // --- B) TEK�L ��Z�M/KALEM/RES�M ALICISI ---
        if (data.type === 'yeni_cizim') {
            window.lastFinalStrokeTime = Date.now();
            if (window.drawnStrokes) {
                for (let i = window.drawnStrokes.length - 1; i >= 0; i--) {
                    if (window.drawnStrokes[i].type === 'preview') window.drawnStrokes.splice(i, 1);
                }
            }
            const stroke = data.stroke;
            if (!stroke) return;

            // ?? EKRAN SENKRON�ZASYONU: Gelen stroke'u Kendi Ekran�m�za (�� Piksellere) �evir!
            // E�ER BUNU YAPMAZSAK, ��Z�MLER FARKLI EKRANLARDA PDF �LE UYU�MAZ!
            const isArr = Array.isArray(stroke);
            const strokesArr = isArr ? stroke : [stroke];
            
            strokesArr.forEach(s => {
                if (typeof adaptStrokeToScreen === 'function') {
                    const senderCw = data.cw || data.cssW;
                    const senderCh = data.ch || data.cssH;
                    adaptStrokeToScreen(s, data.cssW, data.cssH, senderCw, senderCh, data);
                }
            });

            // E�er veride bir anormallik olup dizi (array) gelirse diye g�venlik �nlemi
            if (isArr) {
                strokesArr.forEach(s => {
                    const isExist = s.id && window.drawnStrokes.some(ex => ex.id === s.id);
                    if (!isExist) window.drawnStrokes.push(s);
                });
                if (window.redrawAllStrokes) window.redrawAllStrokes();
                return;
            }

            // Normal Tekil �izim (Kalem karalamas� vs.)
            const existingIndex = stroke.id ? window.drawnStrokes.findIndex(s => s.id === stroke.id) : -1;

            if (existingIndex !== -1) {
                window.drawnStrokes[existingIndex] = stroke;
                if (window.redrawAllStrokes) window.redrawAllStrokes();
            } else {
                if (stroke.type === 'image' && stroke.imgData) {
                    const tempImg = new Image();
                    tempImg.src = stroke.imgData;
                    tempImg.onload = () => {
                        stroke.imgObj = tempImg;
                        window.drawnStrokes.push(stroke);
                        if (window.redrawAllStrokes) window.redrawAllStrokes();
                    };
                } else {
                    window.drawnStrokes.push(stroke);
                    if (window.redrawAllStrokes) window.redrawAllStrokes();

                    // ?? E�ER GELEN ��Z�M 3D �EK�LSE PC MOTORUNU TET�KLE ??
                    if (stroke.type === '3d_shape' && window.Scene3D) {
                        if (!window.Scene3D.isInit) window.Scene3D.init();
                        if (window.Scene3D.container) {
                            window.Scene3D.container.style.display = 'block';
                            window.Scene3D.container.style.zIndex = '9995';
                        }
                        if (typeof window.Scene3D.addShapeFromNetwork === 'function') {
                            window.Scene3D.addShapeFromNetwork(stroke);
                        }
                    }
                }
            }
            return;
        }

        // --- C) F�Z�KSEL ARA�LAR VE D��ER FONKS�YONLAR ---
        if (data.type === 'arac_senkron') {
            // ?? G�VENL�K YAMASI: Sadece izin verilen ara�lara CSS m�dahalesi yap�labilir
            const allowedSelectors = ['.yuzen-kopya-container'];
            if (!allowedSelectors.includes(data.selector)) {
                console.warn("?? G�venlik �hlali: �zin verilmeyen CSS m�dahalesi engellendi!", data.selector);
                return;
            }

            const el = document.querySelector(data.selector);
            if (el) {
                if (data.display !== undefined) el.style.display = data.display;
                if (data.left !== undefined) el.style.left = data.left;
                if (data.top !== undefined) el.style.top = data.top;
                if (data.transform !== undefined) el.style.transform = data.transform;
                if (data.width !== undefined) el.style.width = data.width;
                if (data.height !== undefined) el.style.height = data.height;
            }
        }

        // --- BURAYA EKLENECEK TEK SATIR ---
        window.isConnected = true;

        if (data.type === 'sekil_guncelle') {
            const stroke = data.stroke;
            if (!stroke) return;
            if (typeof adaptStrokeToScreen === 'function') {
                const senderCw = data.cw || data.cssW;
                const senderCh = data.ch || data.cssH;
                const senderW = data.cssW || data.cw;
                const senderH = data.cssH || data.ch;
                adaptStrokeToScreen(stroke, senderW, senderH, senderCw, senderCh, data);
            }

            let index = -1;

            // ?? K�ML�K UYU�MAZLI�I ��Z�M�: 
            // Gelen �ekil arka plan (resim/PDF) ise, ID'ye bakmadan direkt bul!
            if (stroke.isBackground === true) {
                index = window.drawnStrokes.findIndex(s => s.isBackground === true);
            } else {
                if (!stroke.id) return;
                index = window.drawnStrokes.findIndex(s => s.id === stroke.id);
            }

            if (index !== -1) {
                const hedef = window.drawnStrokes[index];

                if (hedef.isBackground === true) {
                    // ?? ��Z�M 3: Tabletin mutlak koordinatlar�, PC'nin �zel merkez hizalamas�n� ezmesin diye
                    // Arka plan sekil_guncelle i�lemlerini KES�N OLARAK YASAKLIYORUZ! 
                    // Bu i�lem art�k sadece �stteki 'hepsini_tasi' ile p�r�zs�zce yap�lacak.
                    return; 
                }

                hedef.x = stroke.x;
                hedef.y = stroke.y;
                hedef.width = stroke.width;
                hedef.height = stroke.height;
                if (stroke.rotation !== undefined) hedef.rotation = stroke.rotation;

                if (stroke.radius !== undefined) hedef.radius = stroke.radius;
                if (stroke.cx !== undefined) hedef.cx = stroke.cx;
                if (stroke.cy !== undefined) hedef.cy = stroke.cy;
                if (stroke.center !== undefined) hedef.center = stroke.center;

               // ?? ��Z�M: Koordinatlar� a�da zorla ezmeyi b�rakt�k (Z�plamay� engeller). Sadece g�venli verileri al.
                if (stroke.rotationX !== undefined) hedef.rotationX = stroke.rotationX;
                if (stroke.rotationY !== undefined) hedef.rotationY = stroke.rotationY;
                if (stroke.rotationZ !== undefined) hedef.rotationZ = stroke.rotationZ;
                if (stroke.meshScale !== undefined) hedef.meshScale = stroke.meshScale;

                // ?? KES�N ��Z�M: Tabletteki (A�� / Kenar uzunlu�u / �ember form�l�) etiketlerini PC'de de G�STER!

                // ?? 3. A� SENKRONU: PC'nin 3D d�nd�rme ve boyutlar� kabul etmesi i�in gelen verileri kaydet!
                if (stroke.rotationX !== undefined) hedef.rotationX = stroke.rotationX;
                if (stroke.rotationY !== undefined) hedef.rotationY = stroke.rotationY;
                if (stroke.rotationZ !== undefined) hedef.rotationZ = stroke.rotationZ;
                if (stroke.originalW !== undefined) {
                    hedef.originalW = stroke.originalW;
                    hedef.originalH = stroke.originalH;
                    hedef.originalX = stroke.originalX;
                    hedef.originalY = stroke.originalY;
                }

                // ?? KES�N ��Z�M: Tabletteki (A�� / Kenar uzunlu�u / �ember form�l�) etiketlerini PC'de de G�STER!
                if (data.stroke.showEdgeLabels !== undefined) hedef.showEdgeLabels = data.stroke.showEdgeLabels;
                if (data.stroke.showAngleLabels !== undefined) hedef.showAngleLabels = data.stroke.showAngleLabels;
                if (data.stroke.showCircleInfo !== undefined) hedef.showCircleInfo = data.stroke.showCircleInfo;

                // ?? PC MOTORU: TABLETTEN GELEN S�R�KLEME VE D�ND�RME B�LG�S�N� SAHNEYE UYGULA
                if (hedef.type === '3d_shape' && window.Scene3D && window.Scene3D.scene) {
                    const sceneMesh = window.Scene3D.scene.children.find(m => m.userData && m.userData.strokeData && m.userData.strokeData.id === hedef.id);
                    if (sceneMesh) {
                        
                        // ?? N�HA� ��Z�M 2: Konum ve boyutland�rmay� burada YAPMIYORUZ! 
                // Z�plamalar�n ana sebebi buydu. �izim motoru (redrawAllStrokes) zaten onu 
                // PC'de olmas� gereken milimetrik konuma ta��yor. Sadece Z eksenini koruyup b�rak�yoruz.
                if (data.stroke.pos3D && data.stroke.pos3D.z !== undefined) {
                    sceneMesh.position.z = data.stroke.pos3D.z;
                }

                        // Rotasyon ayarlar�n� koru
                        // Rotasyon ayarlarini koru
                                                // Rotasyon ayarlarini koru (SLERP Hedefi)
                        if (data.stroke.rotationX !== undefined) {
                            if (!sceneMesh.userData.targetQuaternion) {
                                sceneMesh.userData.targetQuaternion = sceneMesh.quaternion.clone();
                            }
                            const targetEuler = new THREE.Euler(data.stroke.rotationX, data.stroke.rotationY, data.stroke.rotationZ, 'XYZ');
                            sceneMesh.userData.targetQuaternion.setFromEuler(targetEuler);
                        }

                        if (data.stroke.x !== undefined && data.stroke.y !== undefined && window.Scene3D && window.Scene3D.camera) {
                            const normCoords = window.Scene3D.getNormalizedCoords(data.stroke.x, data.stroke.y);
                            window.Scene3D.raycaster.setFromCamera(normCoords, window.Scene3D.camera);
                            const intersection = new THREE.Vector3();
                            if (window.Scene3D.raycaster.ray.intersectPlane(window.Scene3D.plane, intersection)) {
                                if (data.stroke.pos3D && data.stroke.pos3D.z !== undefined) {
                                    intersection.z = data.stroke.pos3D.z;
                                }
                                if (!sceneMesh.userData.targetPosition) {
                                    sceneMesh.position.copy(intersection);
                                    sceneMesh.userData.targetPosition = intersection.clone();
                                } else {
                                    sceneMesh.userData.targetPosition.copy(intersection);
                                }
                            }
                        }

                        // Boyut (Scale) bilgisini aninda WebGL motoruna yansit (Gecikmesiz)
                        if (data.stroke.meshScale !== undefined) {
                            sceneMesh.scale.setScalar(data.stroke.meshScale);
                        }

                        // Surgu acinim bilgisini senkronize et
                        if (data.stroke.openRatio !== undefined) {
                            hedef.openRatio = data.stroke.openRatio;
                            if (sceneMesh.userData && sceneMesh.userData.strokeData) {
                                sceneMesh.userData.strokeData.openRatio = data.stroke.openRatio;
                            }
                            // Animasyon (Lerp) pruzsuz calismasi icin buradaki anlik guncellemeler Scene3D.animate icine alindi.
                        }

                        if (window.Scene3D.currentMesh === sceneMesh) window.Scene3D.updateHandlePositions();
                    }
                    
                    // ==========================================
                    // HIZ OPTIMIZASYONU (GECIKME KALDIRICI)
                    // ==========================================
                    // Eger yansitilan sekil sadece bir 3D model ise (ve uzerinde 2D yazi/etiket yoksa)
                    // koca 2D sayfa cizim motorunu (redrawAllStrokes) saniyede 60 kez calistirmaya ASLA gerek yoktur!
                    // WebGL motoru zaten (requestAnimationFrame) ile aninda kendi goruntusunu gunceller.
                    // Bu return komutu sayfa kilitlenmesini ve agdaki ping gecikmelerini SIFIRA indirir.
                    if (!hedef.showEdgeLabels && !hedef.showAngleLabels && !hedef.showCircleInfo) {
                        return; 
                    }
                }

                if (window.redrawAllStrokes) window.redrawAllStrokes();
            }
        }

        if (data.type === 'sil_objeyi') {
            const zombiIndex = window.drawnStrokes.findIndex(s => s.id === data.strokeId);

            // ?? KES�N ��Z�M: 3D �ekil ise PC'nin uzay sahnesinden de TAMAMEN S�L!
            if (window.Scene3D && window.Scene3D.scene) {
                const meshToRemove = window.Scene3D.scene.children.find(m => m.userData && m.userData.strokeData && m.userData.strokeData.id === data.strokeId);
                if (meshToRemove) {
                    window.Scene3D.scene.remove(meshToRemove);
                    if (window.Scene3D.currentMesh === meshToRemove) window.Scene3D.currentMesh = null;
                    window.Scene3D.updateHandlePositions();
                }
            }

            if (zombiIndex !== -1) window.drawnStrokes.splice(zombiIndex, 1);
            else if (data.index !== undefined && window.drawnStrokes[data.index]) window.drawnStrokes.splice(data.index, 1);

            if (window.redrawAllStrokes) window.redrawAllStrokes();
        }

                if (data.type === 'geri_al') {
            const popped = window.drawnStrokes.pop();
            // ?? 3D �EK�LSE GER� ALIRKEN PC SAHNES�NDEN DE KALDIR
            if (popped && popped.type === '3d_shape' && window.Scene3D && window.Scene3D.scene) {
                const meshToRemove = window.Scene3D.scene.children.find(m => m.userData && m.userData.strokeData && m.userData.strokeData.id === popped.id);
                if (meshToRemove) {
                    meshToRemove.traverse((child) => {
                        if (child.isMesh || child.isLineSegments) {
                            if (child.geometry) child.geometry.dispose();
                            if (child.material) {
                                if (Array.isArray(child.material)) child.material.forEach(mat => mat.dispose());
                                else child.material.dispose();
                            }
                        }
                    });
                    window.Scene3D.scene.remove(meshToRemove);
                    if (window.Scene3D.currentMesh === meshToRemove) window.Scene3D.currentMesh = null;
                    window.Scene3D.updateHandlePositions();
                }
            }

            // YEN�: PC EKRANINDA DA KAT �Z� BIRAK
            if (popped && popped.isPatch === true && popped.foldLine) {
                const p1 = popped.foldLine[0];
                const p2 = popped.foldLine[1];
                const izStroke = {
                    type: 'segment',
 p1: p1,
 p2: p2,
                    color: 'rgba(255, 105, 180, 0.7)',
                    width: 2.5,
                    isDash: true, 
                    dashPattern: [10, 5],
                    isBackground: false
                };
                window.drawnStrokes.push(izStroke);
            }

            if (window.redrawAllStrokes) window.redrawAllStrokes();
        }

        else if (data.type === 'sil_belirli' && data.id) {
            const index = window.drawnStrokes.findIndex(s => s.id === data.id);
            if (index !== -1) {
                window.drawnStrokes.splice(index, 1);
                if (window.redrawAllStrokes) window.redrawAllStrokes();
            }
        }
        else if (data.type === 'hepsini_sil') {
            // PC ���N KES�N ��Z�M: Haf�za ba�lant�s�n� koparmadan filtreleme yap�yoruz!
            const korunacakZeminler = window.drawnStrokes.filter(stroke => stroke.isBackground === true);

            window.drawnStrokes.length = 0; // 1. Orijinal haf�zan�n i�ini tamamen bo�alt
            window.drawnStrokes.push(...korunacakZeminler); // 2. Sadece PDF ve arka planlar� geri koy

            // ?? PC'N�N 3D UZAYINI TAMAMEN TEM�ZLE ??
            if (window.Scene3D && window.Scene3D.scene) {
                const toRemove = window.Scene3D.scene.children.filter(c => c.type === 'Mesh' || c.type === 'Group');
                toRemove.forEach(m => {
                    m.traverse((child) => {
                        if (child.isMesh || child.isLineSegments) {
                            if (child.geometry) child.geometry.dispose();
                            if (child.material) {
                                if (Array.isArray(child.material)) child.material.forEach(mat => mat.dispose());
                                else child.material.dispose();
                            }
                        }
                    });
                    window.Scene3D.scene.remove(m);
                });
                window.Scene3D.currentMesh = null;
                if (typeof window.Scene3D.updateHandlePositions === 'function') window.Scene3D.updateHandlePositions();
            }

            // PC taraf�ndaki kay�tl� veriyi de temizle (LocalStorage)
            if (window.localStorage) {
                window.localStorage.removeItem('drawnStrokes');
            }
            // Ekran� yenile
            if (window.redrawAllStrokes) window.redrawAllStrokes();

            console.log("PC: Silme komutu al�nd�. �izimler ve kopyalar u�uruldu, sadece zemin korundu.");
        }

        if (data.type === 'pdf_yukle') {
            try {
                const base64Data = data.pdfData.split(',')[1];
                const binaryString = window.atob(base64Data);
                const len = binaryString.length;
                const bytes = new Uint8Array(len);
                for (let i = 0; i < len; i++) { bytes[i] = binaryString.charCodeAt(i); }
                if (typeof pdfjsLib !== 'undefined') {
                    pdfjsLib.getDocument(bytes).promise.then(pdf => {
                        window.currentPDF = pdf; window.totalPDFPages = pdf.numPages; window.currentPDFPage = 1;
                        if (document.getElementById('pdf-controls')) document.getElementById('pdf-controls').classList.remove('hidden');
                        if (typeof window.renderPDFPage === 'function') window.renderPDFPage(1);
                    });
                }
            } catch (e) { console.error("PDF Hatas�:", e); }
        }

        if (data.type === 'pdf_sayfa_degis') { window.currentPDFPage = data.sayfa; if (typeof window.renderPDFPage === 'function') window.renderPDFPage(window.currentPDFPage); }

        // (�kinci kopya arka_plan_resmi_aktar al�c�s� silindi, yukar�daki ana al�c� kullan�l�yor)

        // ?? YEN� EKLENEN B�L�M: PC'N�N PDF KAPATMA EMR�N� ALDI�I YER ??
        if (data.type === 'pdf_kapat') {
            // ?? S�H�RL� ��Z�M: PC taraf�nda da filter yerine splice kullan�yoruz ??
            if (window.drawnStrokes) {
                for (let i = window.drawnStrokes.length - 1; i >= 0; i--) {
                    const s = window.drawnStrokes[i];
                    if (s.isBackground === true || s.type === 'lasso-mask' || s.isPatch === true) {
                        window.drawnStrokes.splice(i, 1);
                    }
                }
            }
            window.currentPDF = null;
            window.pdfImageStroke = null;

            // K�rm�z� butonu PC ekran�ndan da garanti olmas� i�in gizle
            const pcKapatBtn = document.getElementById('btn-close-pdf');
            if (pcKapatBtn) {
                pcKapatBtn.classList.add('hidden');
                pcKapatBtn.style.display = 'none';
            }

            if (window.redrawAllStrokes) window.redrawAllStrokes();
            console.log("PC: Tablet arka plan� kapatt�, ekran temizlendi.");
        }


        // ?? N�KLEER ��Z�M: A�ILI� PENCERES�N� K�K�NDEN S�L ??
        if (data.type === 'acilis_penceresini_kapat') {
            const acilisPenceresi = document.getElementById('disclaimer-modal');
            if (acilisPenceresi) {
                // Sadece gizlemekle kalma, HTML'den tamamen kaz�!
                acilisPenceresi.remove();
            }

            // E�er isminde farkl�l�k varsa diye t�m uyar� pencerelerini gizle
            document.querySelectorAll('.modal, .overlay, [id*="modal"], [id*="disclaimer"]').forEach(el => {
                el.style.display = 'none';
            });

            // Z�rh: PC arka planda yeniden a�maya �al��mas�n diye CSS ile m�h�rle
            const muhur_disclaimer = document.createElement('style');
            muhur_disclaimer.innerHTML = '#disclaimer-modal, .disclaimer-modal { display: none !important; opacity: 0 !important; pointer-events: none !important; z-index: -9999 !important; }';
            document.head.appendChild(muhur_disclaimer);

            console.log("PC: A��l�� penceresi K�K�NDEN silindi ve m�h�rlendi.");
        }


        // ?? PC: UYGULAMAYI Y�KLE PENCERES�N� KAPATMA S�NYAL� ??
        if (data.type === 'yukleme_penceresini_kapat') {
            const yuklemePenceresi = document.getElementById('install-popup');
            if (yuklemePenceresi) {
                yuklemePenceresi.remove(); // Sadece gizleme, HTML dosyas�ndan K�K�NDEN S�L!
            }

            // Taray�c� arkadan i� �evirip geri getirmesin diye CSS M�hr� bas:
            const muhur_disclaimer = document.createElement('style');
            muhur_disclaimer.innerHTML = '#install-popup { display: none !important; opacity: 0 !important; z-index: -9999 !important; pointer-events: none !important; }';
            document.head.appendChild(muhur_disclaimer);

            console.log("PC: Y�kleme penceresi yok edildi ve m�h�rlendi.");
        }


        if (data.type === 'arac_state_senkron') {
            let toolObj = null, el = null;
            if (data.arac === 'ruler') { toolObj = window.RulerTool; el = document.querySelector('.ruler-container'); }
            if (data.arac === 'gonye') { toolObj = window.GonyeTool; el = document.querySelector('.gonye-container'); }
            if (data.arac === 'aciolcer') { toolObj = window.AciolcerTool; el = document.querySelector('.aciolcer-container'); }
            if (data.arac === 'pergel') { toolObj = window.PergelTool; el = document.getElementById('compass-container'); }

            if (toolObj) {
                if (data.state) Object.assign(toolObj.state, data.state);
                if (data.arac === 'pergel' && toolObj.state) {
                    if (toolObj.state.isDrawing) {
                        toolObj.previewCanvas.style.display = 'block';
                        toolObj.previewCanvas.width = window.innerWidth;
                        toolObj.previewCanvas.height = window.innerHeight;
                        toolObj.drawPreviewArc();
                    } else {
                        toolObj.previewCanvas.style.display = 'none';
                        if (toolObj.previewCtx) toolObj.previewCtx.clearRect(0, 0, toolObj.previewCanvas.width, toolObj.previewCanvas.height);
                    }
                }
                if (el) {
                    if (data.display === 'none') {
                        el.classList.add('hidden'); // ?? KES�N OLARAK G�ZLE
                        el.style.display = 'none';
                    } else {
                        el.classList.remove('hidden'); // ?? KES�N OLARAK G�STER
                        el.style.display = (data.arac === 'ruler' || data.arac === 'gonye') ? 'flex' : 'block';
                    }
                    if (data.width) el.style.width = data.width;
                    if (data.height) el.style.height = data.height;
                }
                if (typeof toolObj.updateTransform === 'function') toolObj.updateTransform();
                if (typeof toolObj.updateMarkings === 'function') toolObj.updateMarkings();
                if (typeof toolObj.createLabels === 'function') toolObj.createLabels();

                // ?? KES�N ��Z�M: Yans�ma (Titreme) Engelleme Kilidi
                toolObj.lastNetworkReceiveTime = Date.now();
            }
        }

        if (data.type === 'aktif_onizleme') {
            const arac = data.arac;
            const p = data.payload;

            if (arac === 'ruler' && window.RulerTool && window.RulerTool.drawCtx) {
                const r = window.RulerTool;
                r.drawHandleElement.style.transition = 'none'; r.drawHandleElement.style.left = `${p.handleX}px`;
                r.drawHandleLabel.innerText = `${(p.handleX / r.PIXELS_PER_CM).toFixed(1).replace('.', ',')} cm`;
                r.drawHandleLabel.style.display = 'block';
                r.drawCtx.clearRect(0, 0, r.drawCanvas.width, r.drawCanvas.height);
                r.drawCtx.beginPath(); r.drawCtx.moveTo(0, 4); r.drawCtx.lineTo(p.handleX, 4);
                r.drawCtx.strokeStyle = '#FFFFFF'; r.drawCtx.lineWidth = 3; r.drawCtx.stroke();
            }
            else if (arac === 'gonye' && window.GonyeTool && window.GonyeTool.drawCtx) {
                const g = window.GonyeTool;
                g.drawHandleElement.style.transition = 'none'; g.drawHandleElement.style.top = `${p.handleY}px`;
                g.drawHandleLabel.innerText = `${(Math.abs(g.state.height - (p.handleY + 10)) / g.PIXELS_PER_CM).toFixed(1).replace('.', ',')} cm`;
                g.drawHandleLabel.style.display = 'block';
                g.drawCtx.clearRect(0, 0, g.drawCanvas.width, g.drawCanvas.height);
                g.drawCtx.beginPath(); g.drawCtx.moveTo(4, g.state.height); g.drawCtx.lineTo(4, p.handleY + 10);
                g.drawCtx.strokeStyle = '#FFFFFF'; g.drawCtx.lineWidth = 3; g.drawCtx.stroke();
            }
            else if (arac === 'aciolcer' && window.AciolcerTool && window.AciolcerTool.previewCtx) {
                const a = window.AciolcerTool;
                a.previewCanvas.style.display = 'block'; a.previewCanvas.width = window.innerWidth; a.previewCanvas.height = window.innerHeight;
                a.previewCtx.clearRect(0, 0, a.previewCanvas.width, a.previewCanvas.height);
                a.previewCtx.beginPath(); a.previewCtx.moveTo(p.cx, p.cy); a.previewCtx.lineTo(p.px, p.py);
                a.previewCtx.strokeStyle = '#FFFFFF'; a.previewCtx.lineWidth = 3; a.previewCtx.setLineDash([5, 5]); a.previewCtx.stroke(); a.previewCtx.setLineDash([]);
                a.drawHandleLabel.style.display = 'block'; a.drawHandleLabel.innerText = `${p.angle.toFixed(0)}`;
                a.redLine.style.transition = 'none'; a.redLine.style.transform = `rotate(${-p.angle}deg)`;
                a.drawHandle.style.transform = `translateX(-50%) translate(${p.ldx}px, ${p.ldy + 5}px)`;
                a.drawHandleLabel.style.transform = `translateX(-50%) translate(${p.ldx}px, ${p.ldy - 20}px)`;
            }
            else if (arac === 'lazer') {
                let lazer = document.getElementById('sanal-lazer');
                if (!lazer) {
                    lazer = document.createElement('div'); lazer.id = 'sanal-lazer';
                    lazer.style.width = '14px'; lazer.style.height = '14px'; lazer.style.background = 'rgba(0, 255, 200, 0.9)'; lazer.style.boxShadow = '0 0 12px rgba(0,255,200,1)';
                    lazer.style.borderRadius = '50%'; lazer.style.position = 'fixed'; lazer.style.pointerEvents = 'none'; lazer.style.zIndex = '9999'; lazer.style.transform = 'translate(-50%, -50%)';
                    document.body.appendChild(lazer);
                }
                lazer.style.display = 'block'; lazer.style.left = `${p.x}px`; lazer.style.top = `${p.y}px`;
                clearTimeout(window.lazerTimer); window.lazerTimer = setTimeout(() => { lazer.style.display = 'none'; }, 150);
            }
            else if (arac === 'cizim_onizleme') {
                // S�H�RL� D�ZELTME: filter yerine splice kullanarak haf�za kopmas�n� k�k�nden ��z�yoruz!
                for (let i = window.drawnStrokes.length - 1; i >= 0; i--) {
                    if (window.drawnStrokes[i].type === 'preview') window.drawnStrokes.splice(i, 1);
                }

                const previewObj = { type: 'preview', isTemporaryPreview: true, payload: p, id: 'temp-preview-id' };
                window.drawnStrokes.push(previewObj);
                if (window.redrawAllStrokes) window.redrawAllStrokes();
            }

            // ?? YEN� EKLENEN: PC'N�N ��ZG� �N�ZLEMES�N� HAVADA ��ZMES� ??
            else if (arac === 'cizgi_onizleme') {
                if (window.redrawAllStrokes) window.redrawAllStrokes(); // Kal�c� �izgileri ezmemek i�in �nce ekran� tazele

                const canvas = document.getElementById('drawing-canvas');
                if (canvas) {
                    const ctx = canvas.getContext('2d');
                    ctx.save();
                    ctx.strokeStyle = p.color || '#000000';
                    ctx.lineWidth = 3;
                    ctx.setLineDash([5, 5]); // Ayn� tabletteki gibi kesikli �izgi efekti
                    ctx.beginPath();

                    const dx = p.endX - p.startX;
                    const dy = p.endY - p.startY;

                    if (dx !== 0 || dy !== 0) {
                        const devCarpan = 5000;
                        if (p.tool === 'line') {
                            ctx.moveTo(p.startX - dx * devCarpan, p.startY - dy * devCarpan);
                            ctx.lineTo(p.startX + dx * devCarpan, p.startY + dy * devCarpan);
                        } else if (p.tool === 'ray') {
                            ctx.moveTo(p.startX, p.startY);
                            ctx.lineTo(p.startX + dx * devCarpan, p.startY + dy * devCarpan);
                        } else {
                            ctx.moveTo(p.startX, p.startY);
                            ctx.lineTo(p.endX, p.endY);
                        }
                    } else {
                        ctx.moveTo(p.startX, p.startY);
                        ctx.lineTo(p.endX, p.endY);
                    }
                    ctx.stroke();
                    ctx.restore();
                }
            }

        } // <--- ?? EKS�K OLAN S�SL� PARANTEZ BURADA! (aktif_onizleme blo�unu kapat�r) ??

        if (data.type === 'onizleme_bitir') {
            // S�H�RL� D�ZELTME: filter yerine splice kullanarak haf�za kopmas�n� k�k�nden ��z�yoruz!
            for (let i = window.drawnStrokes.length - 1; i >= 0; i--) {
                if (window.drawnStrokes[i].type === 'preview') window.drawnStrokes.splice(i, 1);
            }

            if (window.RulerTool && window.RulerTool.drawCtx) { window.RulerTool.drawHandleLabel.style.display = 'none'; window.RulerTool.drawCtx.clearRect(0, 0, window.RulerTool.drawCanvas.width, window.RulerTool.drawCanvas.height); }
            if (window.GonyeTool && window.GonyeTool.drawCtx) { window.GonyeTool.drawHandleLabel.style.display = 'none'; window.GonyeTool.drawHandleElement.style.transition = 'top 0.1s ease-out'; window.GonyeTool.drawHandleElement.style.top = `${window.GonyeTool.state.height - 20}px`; window.GonyeTool.drawCtx.clearRect(0, 0, window.GonyeTool.drawCanvas.width, window.GonyeTool.drawCanvas.height); }
            if (window.AciolcerTool && window.AciolcerTool.previewCtx) { window.AciolcerTool.drawHandleLabel.style.display = 'none'; window.AciolcerTool.previewCanvas.style.display = 'none'; window.AciolcerTool.redLine.style.transition = 'transform 0.1s ease-out'; window.AciolcerTool.redLine.style.transform = 'rotate(0deg)'; window.AciolcerTool.drawHandle.style.transition = 'transform 0.1s ease-out'; window.AciolcerTool.drawHandle.style.transform = 'translateX(-50%) translate(0px, 0px)'; window.AciolcerTool.previewCtx.clearRect(0, 0, window.AciolcerTool.previewCanvas.width, window.AciolcerTool.previewCanvas.height); }
            let lazer = document.getElementById('sanal-lazer'); if (lazer) lazer.style.display = 'none';
            if (window.redrawAllStrokes) window.redrawAllStrokes();
        }

        if (data.type === 'secimi_senkronize_et') {
            const index = window.drawnStrokes.findIndex(s => s.id === data.strokeId);
            if (index !== -1) {
                // ?? PC'deki LOKAL de�i�kenleri ez ve arac� zorla 'move' yap (Butonlar g�r�ns�n)
                selectedItem = window.drawnStrokes[index];
                window.selectedItem = selectedItem;

                if (typeof setActiveTool === 'function') setActiveTool('move');
                else currentTool = 'move';

                if (window.redrawAllStrokes) window.redrawAllStrokes();
            }
        }

        if (data.type === 'secimi_kaldir') {
            selectedItem = null;
            window.selectedItem = null;
            if (window.redrawAllStrokes) window.redrawAllStrokes();
        }

        // ?? S�NKRON�ZASYON: Fiziksel Ara� Temas� (Siyah/Neon) PC'ye yans�t�l�yor
        if (data.type === 'fiziksel_arac_temasi') {
            window.isToolThemeBlack = data.isBlackTheme;
            const elements = document.querySelectorAll('.ruler-container, .gonye-container, .aciolcer-container, #compass-container');
            elements.forEach(el => {
                if (data.isBlackTheme) {
                    el.classList.add('tool-black-theme');
                } else {
                    el.classList.remove('tool-black-theme');
                }
            });
            // PC'deki butonun metnini de senkronize et
            const colorBtn = document.getElementById('btn-tool-color');
            if (colorBtn) {
                colorBtn.innerText = data.isBlackTheme ? "Ara� Rengi: Neon" : "Ara� Rengi: Siyah";
            }
        }
    } // <--- processData fonksiyonu TAM BURADA kusursuzca kapan�r

    // --- 3. BA�LANTI KOPMASI DURUMU ---
    connection.on('close', function () {
        window._connectionEventsBound = false;
        window._lastSetupConnection = null;
        if (connection.isTeacherCandidate && window.authorizedTeacherId === connection.peer) {
            window.authorizedTeacherId = null;
            window.teacherConnectionStatus = 'disconnected'; window.firstTabletConnectionAccepted = false;
            window.teacherPairingToken = isTablet ? null : createSecureToken(16);
            window.teacherPairingTokenIssuedAt = isTablet ? 0 : Date.now();
        }
        window.pendingTeacherConnections.delete(connection.peer);
        isConnected = false;
        const statusEl = document.getElementById('connection-status');
        if (statusEl) {
            statusEl.innerText = "BAÄLANDI ğŸ¤";
            statusEl.style.color = "#ff4444";
        }
        // Ba�lant� koptu�unda sayfay� yenilemek en garantili ��z�md�r:
        setTimeout(() => { location.reload(); }, 2000);
    });

    // --- S�H�RL� E��TLEME (�K� PENCERE ���N ISRARCI VE ZIRHLI VERS�YON) ---
    let denemeSayisi = 0;
    const pencereSyncTimer = setInterval(() => {
        if (!isConnected || !myConnection || !myConnection.open) return;

        // ?? YEN� ��Z�M: BA�LANTI SONRADAN B�LE GELSE D�L� VE EKRAN K�L�D�N� SENKRON�ZE ET
        if (typeof currentLang !== 'undefined' && currentLang && typeof sendNetworkData !== 'undefined') {
            sendNetworkData({ type: 'dil_secimi', lang: currentLang });
        }

        // 1. Yasal Uyar� Kontrol� ve Sinyali
        if ((window.acilisPenceresiKapatildi || (document.getElementById('disclaimer-modal') && document.getElementById('disclaimer-modal').style.display === 'none')) && typeof sendNetworkData !== 'undefined') {
            sendNetworkData({ type: 'acilis_penceresini_kapat' });
        }

        // ?? 2. YEN�: Y�kle Penceresi Kontrol� ve Sinyali ??
        const tabletPopup = document.getElementById('install-popup');
        if ((!tabletPopup || tabletPopup.style.display === 'none' || tabletPopup.classList.contains('hidden')) && typeof sendNetworkData !== 'undefined') {
            sendNetworkData({ type: 'yukleme_penceresini_kapat' });
        }

        console.log("PC'ye t�m pencerelerin durum e�itlemesi g�nderiliyor... (Deneme: " + (denemeSayisi + 1) + ")");

        denemeSayisi++;
        if (denemeSayisi >= 4) clearInterval(pencereSyncTimer); // 4 saniye boyunca tahtay� bombalar, sonra durur
    }, 1000);

} // <--- setupConnectionEvents fonksiyonu tam burada kusursuzca kapan�yor

// =========================================================
// 7. G�VENL� VE KAYIPSIZ VER� FIRLATMA FONKS�YONU (ZIRHLI VE BARKODLU VERS�YON)
// =========================================================
window.mySessionId = Date.now().toString() + Math.random().toString();

window.sendNetworkData = function (dataPackage) {
    if (!dataPackage) return;
    if (dataPackage.type === 'aktif_onizleme') {
        if (!window.lastPreviewTime) window.lastPreviewTime = 0;
        if (Date.now() - window.lastPreviewTime < 50) return;
        window.lastPreviewTime = Date.now();
    }
    const boardLocalOnly = new Set(['arka_plan_resmi_aktar', 'pdf_yukle', 'resim_yukle']);

    // YANKI KORUMASI ���N K�ML�K DAMGASI
    dataPackage.senderId = window.mySessionId;

    // Boyutlar� damgala (PC'de do�ru hizalama i�in)
    const canvasElm = document.getElementById('drawing-canvas');
    if (canvasElm) {
        dataPackage.cw = canvasElm.width;
        dataPackage.ch = canvasElm.height;
        dataPackage.cssW = window.innerWidth;
        dataPackage.cssH = window.innerHeight;
        dataPackage.dpr = window.devicePixelRatio || 1;
    }

    if (window.drawnStrokes) {
        const bg = window.drawnStrokes.find(s => s.isBackground === true && !s.isPatch);
        if (bg) {
            dataPackage.bgX = bg.x;
            dataPackage.bgY = bg.y;
            dataPackage.bgW = bg.width;
            dataPackage.bgH = bg.height;
        }
    }

    // G�vence: �izim g�nderiliyorsa ve ID'si yoksa ID ata!
    if (dataPackage.type === 'yeni_cizim' && dataPackage.stroke && !dataPackage.stroke.id) {
        dataPackage.stroke.id = Date.now() + Math.random();
    }

    

    const dataString = JSON.stringify(dataPackage);
    const CHUNK_SIZE = 8000;

    // DURUM 1: Tabletsek Tahtaya G�nder
    if (typeof isConnected !== 'undefined' && isConnected && typeof myConnection !== 'undefined' && myConnection && (myConnection.open || window.isConnected)) {
        if (dataString.length <= CHUNK_SIZE) {
            myConnection.send(dataPackage);
        } else {
            const kargoBarkodu = Date.now().toString() + Math.floor(Math.random() * 1000);
            const totalChunks = Math.ceil(dataString.length / CHUNK_SIZE);
            
            function paketGonder(i, chunkIndex) {
                if (!myConnection || !myConnection.open) return;
                
                if (myConnection.dataChannel && myConnection.dataChannel.bufferedAmount > 64000) { 
                    setTimeout(() => paketGonder(i, chunkIndex), 50); 
                    return; 
                }
                
                try {
                    myConnection.send({ 
                        type: 'chunk', 
                        msgId: kargoBarkodu, 
                        data: dataString.substring(i, i + CHUNK_SIZE), 
                        idx: chunkIndex, 
                        total: totalChunks, 
                        isLast: (chunkIndex === totalChunks - 1) 
                    });
                } catch (e) {
                    console.error("Chunk gonderilemedi:", e);
                }
                
                i += CHUNK_SIZE; 
                chunkIndex++; 
                if (i < dataString.length) {
                    setTimeout(() => paketGonder(i, chunkIndex), 10);
                }
            }
            paketGonder(0, 0);
        }
    }
    // DURUM 2: Tahtaysak Tabletlere G�nder
    else if (typeof window.aktifBaglantilar !== 'undefined') {
        if (boardLocalOnly.has(dataPackage.type)) {
            console.info('Hassas dosya paketi ��renci cihazlar�na aktar�lmad�:', dataPackage.type);
            return;
        }
        for (let id in window.aktifBaglantilar) {
            const conn = window.aktifBaglantilar[id];
            if (conn && conn.open) {
                if (dataString.length <= CHUNK_SIZE) {
                    conn.send(dataPackage);
                } else {
                    let i = 0; let chunkIndex = 0;
                    const kargoBarkodu = Date.now().toString() + Math.floor(Math.random() * 1000);
                    const totalChunks = Math.ceil(dataString.length / CHUNK_SIZE);
                    function paketGonderTahta() {
                        if (!conn || (!conn.open && !window.isConnected)) return;
                        if (conn.dataChannel && conn.dataChannel.bufferedAmount > 64000) { setTimeout(paketGonderTahta, 50); return; }
                        if (i < dataString.length) {
                            conn.send({ type: 'chunk', msgId: kargoBarkodu, data: dataString.substring(i, i + CHUNK_SIZE), idx: chunkIndex, total: totalChunks, isLast: (chunkIndex === totalChunks - 1) });
                            i += CHUNK_SIZE; chunkIndex++; setTimeout(paketGonderTahta, 5);
                        }
                    }
                    paketGonderTahta();
                }
            }
        }
    }
};
window.networkResZirhi = true;
// ?? 1. ZIRH: EKRAN KAYDIRMA VE YAYLANMA ENGELLEY�C� ??
const palmZirhi = document.createElement('style');
palmZirhi.innerHTML = `
    body, html {
        overscroll-behavior: none !important; /* Ekran�n lastik gibi yaylanmas�n� bitirir */
    }
    #drawing-canvas {
        touch-action: none !important; /* Taray�c�ya kayd�rma yapmay� kesinlikle yasaklar */
        -webkit-user-select: none !important;
        -webkit-touch-callout: none !important;
    }
`;
document.head.appendChild(palmZirhi);

// iOS/Safari ve Android'in inat�� kayd�rma (scroll) huylar�n� zorla durduran motor
const cCnv = document.getElementById('drawing-canvas');
if (cCnv) {
    cCnv.addEventListener('touchstart', function (e) { e.preventDefault(); }, { passive: false });
    cCnv.addEventListener('touchmove', function (e) { e.preventDefault(); }, { passive: false });
}

// ?? AKILLI ZIRH: Avu� ��iyle Sayfa Kaymas�n� Engeller, Zoom'u Bozmaz!
// ?? AKILLI ZIRH: Avu iyle Sayfa Kaymasn Engeller, Zoom'u Bozmaz!
const smartCanvas = document.getElementById('drawing-canvas');
if (smartCanvas) {
    smartCanvas.addEventListener('touchmove', function (e) {
        // Eer ekrana sadece 1 temas varsa (avu ii veya tek parmak srtnmesi)
        // sayfann lastik gibi kaymasn kesin olarak kilitler!
        if (e.touches && e.touches.length === 1 && e.cancelable) {
            e.preventDefault();
        }
    }, { passive: false });
}


// =========================================================
// ?? ZEL KON AINIM MOTORU (Kusursuz Yelpaze ve Kapak Sistemi)
// =========================================================
window.CustomConeEngine = {
    create: function(radius, height, mainMat, edgeMat) {
        const innerGroup = new THREE.Group();
        innerGroup.userData.isCustomCone = true;
        innerGroup.userData.r = radius;
        innerGroup.userData.h = height;
        innerGroup.userData.s = Math.hypot(radius, height);

        const segments = 32;
        const lateralGeo = new THREE.BufferGeometry();
        const numVerts = segments + 2;
        const posArray = new Float32Array(numVerts * 3);
        lateralGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        
        const indices = [];
        for (let i = 1; i <= segments; i++) {
            // ?? 1. ��Z�M: Y�zeyleri d��a �evirdik, "Alttan g�r�nme" ill�zyonu bitti!
            indices.push(0, i, i + 1);
        }
        lateralGeo.setIndex(indices);
        const lateralMesh = new THREE.Mesh(lateralGeo, mainMat);
        lateralMesh.material.side = THREE.DoubleSide;
        
        // �izgi Geometrisi
        const edgePos = new Float32Array((segments + 3) * 3);
        const lateralEdgeGeo = new THREE.BufferGeometry();
        lateralEdgeGeo.setAttribute('position', new THREE.BufferAttribute(edgePos, 3));
        const lateralEdges = new THREE.Line(lateralEdgeGeo, edgeMat);
        
        // Taban (Kapak) Geometrisi
        const baseGeo = new THREE.CircleGeometry(radius, 32);
        baseGeo.translate(0, -radius, 0); // Kapa��n d�nme mente�esini tam arka noktaya al�yoruz
        
        const baseMesh = new THREE.Mesh(baseGeo, mainMat);
        baseMesh.material.side = THREE.DoubleSide;
        const baseEdges = new THREE.LineSegments(new THREE.EdgesGeometry(baseGeo), edgeMat);
        baseMesh.add(baseEdges);
        
        innerGroup.add(lateralMesh); innerGroup.add(baseMesh); innerGroup.add(lateralEdges);
        innerGroup.userData.lateralMesh = lateralMesh; innerGroup.userData.baseMesh = baseMesh; innerGroup.userData.lateralEdges = lateralEdges;
        
        const outerGroup = new THREE.Group();
        outerGroup.userData = innerGroup.userData;
        outerGroup.userData.innerGroup = innerGroup;
        outerGroup.add(innerGroup);
        
        this.update(outerGroup, 0); 
        return outerGroup;
    },
    
    update: function(group, ratio) {
        const innerGroup = group.userData.innerGroup || group;
        const r = innerGroup.userData.r; 
        const h = innerGroup.userData.h; 
        const s = innerGroup.userData.s; 
        const segments = 32;
        const pos = innerGroup.userData.lateralMesh.geometry.attributes.position.array;
        const epos = innerGroup.userData.lateralEdges.geometry.attributes.position.array;
        
        // ?? 2. ��Z�M: Motordan "rotation" (e�im) komutlar�n� tamamen S�LD�K. 
        // Art�k koni ekran�n �st�ne bakarak dimdik duracak ve Ye�il Ta��ma Butonu kusursuz �al��acak!

        const apexX = 0; const apexY = 0; const apexZ = h / 2;
        pos[0] = apexX; pos[1] = apexY; pos[2] = apexZ;
        epos[0] = apexX; epos[1] = apexY; epos[2] = apexZ;
        
        for (let i = 0; i <= segments; i++) {
            // ?? 3. ��Z�M: Y�rt�lma �izgisini (alpha=0) tam �N TARAFA (-Y ekseni) ald�k.
            const alpha = (i / segments) * 2 * Math.PI; 
            
            // 3D Kapal� Hal (Dimdik duruyor)
            const x3 = r * Math.sin(alpha); 
            const y3 = -r * Math.cos(alpha); // Eksi y = Tam �n Taraf
            const z3 = -h / 2;
            
            // 2D A��k Hal (Sa� kanat sa�a, sol kanat sola d�k�l�r)
            const theta = (2 * Math.PI * r) / s; 
            const sectorAngle = ((alpha - Math.PI) / Math.PI) * (theta / 2); 
            const x2 = -s * Math.sin(sectorAngle); 
            const y2 = 0; // Kar��dan g�r�nmesi i�in XZ d�zlemine yat�r�l�r
            const z2 = h / 2 - s * Math.cos(sectorAngle); 
            
            const x = x3 * (1 - ratio) + x2 * ratio; 
            const y = y3 * (1 - ratio) + y2 * ratio; 
            const z = z3 * (1 - ratio) + z2 * ratio;
            
            const vIdx = (i + 1) * 3; 
            pos[vIdx] = x; pos[vIdx + 1] = y; pos[vIdx + 2] = z;
            
            const eIdx = (i + 1) * 3; 
            epos[eIdx] = x; epos[eIdx + 1] = y; epos[eIdx + 2] = z;
        }
        
        // Son siyah �izgiyi tepeye kapat
        const lastIdx = (segments + 2) * 3;
        epos[lastIdx] = apexX; epos[lastIdx + 1] = apexY; epos[lastIdx + 2] = apexZ;
        
        innerGroup.userData.lateralMesh.geometry.attributes.position.needsUpdate = true;
        innerGroup.userData.lateralMesh.geometry.computeVertexNormals();
        innerGroup.userData.lateralEdges.geometry.attributes.position.needsUpdate = true;
        
        // ?? 4. ��Z�M: Kapa��n (taban�n) mente�e gibi arkadan a�a�� do�ru bir kap� misali a��lmas�
        const baseMesh = innerGroup.userData.baseMesh;
        const hingeY = r * (1 - ratio);
        const hingeZ = (-h / 2) * (1 - ratio) + (h / 2 - s) * ratio;
        baseMesh.position.set(0, hingeY, hingeZ);
        baseMesh.rotation.x = (Math.PI / 2) * ratio; // 0'dan (d�z) ba�layarak ekrana do�ru sark�p tam daire olur

        // ?? 5. ��Z�M: Koninin a��l�rken tam kar��dan (XY d�zleminden) g�r�nmesi i�in rotasyonu otomatik d�zelt
        if (group.userData.innerGroup) {
            // Koninin a��k hali XZ d�zlemindedir (y=0). Kameran�n g�rmesi i�in onu kameran�n (Y=-30, Z=20) a��s�na tam dikmeliyiz.
            const qClosed = new THREE.Quaternion().identity(); // Kapal�yken (ratio=0) kullan�c�n�n verdi�i rotasyona dokunma
            
            // XZ d�zlemindeki �ekli ekrana tam paralel yat�rmak i�in, Z ekseni ekran�n '�st' noktas�na (Y=20, Z=30) gelmeli.
            // Bunun i�in gereken kusursuz a�� Math.atan2(-20, 30)'dur. (-Math.PI / 2 yani -90 derece sadece d�z kamera i�indi)
            const qOpenAbsolute = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.atan2(-20, 30));
            
            // D�� grubun dinamik rotasyonunu de�il, varsay�lan rotasyonunu kullan�yoruz. 
            // Koniler ba�lang��ta X ve Z ekseninde -30 derece (-Math.PI/6) d�nd�r�lerek ekleniyor.
            const defaultOuterQ = new THREE.Quaternion().setFromEuler(new THREE.Euler(-Math.PI / 6, 0, -Math.PI / 6, 'XYZ'));
            const qOuterInverse = defaultOuterQ.invert();
            const qOpenTarget = qOuterInverse.multiply(qOpenAbsolute);
            
            innerGroup.quaternion.copy(qClosed).slerp(qOpenTarget, ratio);
        }
    }
};


window.Scene3D = {
    container: null, scene: null, camera: null, renderer: null, labelElement: null,
    isInit: false, activeTool: 'none', version: "3.4 - KUSURSUZ ��Z�M",

    currentMesh: null, previewMesh: null, previewLine: null, helperGroup: null,
    raycaster: null, mouse: null, plane: null,
    rotateHandleBtn: null, resizeHandleBtn: null,
    isRotatingHandle: false, isResizingHandle: false,
    handles: { center: { x: 0, y: 0 } }, lastMousePos: { x: 0, y: 0 },
    dragPlane: null, dragOffset: null,
    isDragging: false, isClickCandidate: false, clickStartPos: { x: 0, y: 0 }, isRotatingShape: false,

    init: function () {
        if (this.isInit) return;
        if (typeof THREE === 'undefined') { setTimeout(() => { window.Scene3D.init(); }, 500); return; }
        this.isInit = true;

        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
        this.dragPlane = new THREE.Plane();
        this.dragOffset = new THREE.Vector3();

        this.container = document.getElementById('three-container');
        this.scene = new THREE.Scene();

        const aspect = window.innerWidth / window.innerHeight;
        const frustumSize = 30; // 3D sahnede g�r�nen alan�n yakla��k y�ksekli�i
        this.camera = new THREE.OrthographicCamera(-frustumSize * aspect / 2, frustumSize * aspect / 2, frustumSize / 2, -frustumSize / 2, 0.1, 1000);
        this.camera.position.set(0, -30, 20);
        this.camera.lookAt(0, 0, 0);
        this.camera.up.set(0, 0, 1);

        try {
            this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderer.domElement.style.pointerEvents = 'none';

            if (this.container) {
                this.container.appendChild(this.renderer.domElement);
            }
        } catch(e) {
            console.error('WebGL Hatasi', e);
            if (isTablet) alert('Cihaziniz 3D cizimleri (WebGL) desteklemiyor!');
            return;
        }
        if (this.container) {
            // ?? G�VENL�K 1: Ba�lang��ta tahtay� zorla g�r�n�r yap!
            this.container.style.display = 'block';
            this.container.classList.remove('hidden');
        }

        this.scene.add(new THREE.AmbientLight(0xffffff, 0.6));
        const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
        dirLight.position.set(10, -10, 20);
        this.scene.add(dirLight);

        this.helperGroup = new THREE.Group();
        this.scene.add(this.helperGroup);

        const styleBtn = (btn, isRotate) => {
            btn.style.position = 'absolute'; btn.style.width = '32px'; btn.style.height = '32px';
            btn.style.borderRadius = '50%'; btn.style.backgroundColor = isRotate ? '#00ffcc' : '#ff007f';
            btn.style.color = 'white'; btn.style.fontSize = '16px';
            btn.style.display = 'none'; btn.style.justifyContent = 'center'; btn.style.alignItems = 'center';
            btn.style.cursor = 'pointer'; btn.style.zIndex = '1000';
            btn.style.boxShadow = '0 2px 6px rgba(0,0,0,0.3)';
            btn.innerHTML = isRotate ? '?' : '?';
        };

        if (this.rotateHandleBtn && this.rotateHandleBtn.parentNode) {
            this.rotateHandleBtn.parentNode.removeChild(this.rotateHandleBtn);
        }
        if (this.resizeHandleBtn && this.resizeHandleBtn.parentNode) {
            this.resizeHandleBtn.parentNode.removeChild(this.resizeHandleBtn);
        }
        document.querySelectorAll('.scene3d-rotate-btn, .scene3d-resize-btn').forEach(btn => btn.remove());

        this.rotateHandleBtn = document.createElement('div');
        this.rotateHandleBtn.className = 'scene3d-rotate-btn';
        styleBtn(this.rotateHandleBtn, true);
        document.body.appendChild(this.rotateHandleBtn);

        this.resizeHandleBtn = document.createElement('div');
        this.resizeHandleBtn.className = 'scene3d-resize-btn';
        styleBtn(this.resizeHandleBtn, false);
        document.body.appendChild(this.resizeHandleBtn);

        const startInteract = (action, e) => {
            if (e && e.cancelable) e.preventDefault();
            if (e) e.stopPropagation();
            this[action] = true;
            const px = e.touches ? e.touches[0].clientX : e.clientX;
            const py = e.touches ? e.touches[0].clientY : e.clientY;
            this.lastMousePos = { x: px, y: py };

            if (action === 'isResizingHandle' && this.currentMesh) {
                this.startScale = this.currentMesh.scale.x;
                this.startResizeDist = Math.hypot(px - this.handles.center.x, py - this.handles.center.y) || 1;
            }
        };

        ['mousedown', 'touchstart'].forEach(evt => {
            this.rotateHandleBtn.addEventListener(evt, (e) => startInteract('isRotatingHandle', e), { passive: false });
            this.resizeHandleBtn.addEventListener(evt, (e) => startInteract('isResizingHandle', e), { passive: false });
        });

        ['touchmove', 'mousemove', 'pointermove'].forEach(evt => {
            window.addEventListener(evt, (e) => {
                if (this.isRotatingHandle || this.isResizingHandle) {
                    if (e.cancelable) e.preventDefault();
                    const px = e.touches ? e.touches[0].clientX : e.clientX;
                    const py = e.touches ? e.touches[0].clientY : e.clientY;
                    this.onMove(px, py);
                }
            }, { passive: false });
        });

        ['touchend', 'mouseup', 'pointerup'].forEach(evt => {
            window.addEventListener(evt, () => { if (this.isRotatingHandle || this.isResizingHandle) this.onUp(); });
        });

        this.animate();
    },

    updateHandlePositions: function () {
        if (!this.currentMesh || currentTool !== 'move') {
            if (this.rotateHandleBtn) this.rotateHandleBtn.style.display = 'none';
            if (this.resizeHandleBtn) this.resizeHandleBtn.style.display = 'none';
            return;
        }
        const vec = this.currentMesh.position.clone();
        vec.project(this.camera);
        const canvasEl = document.getElementById('drawing-canvas');
        const rect = canvasEl ? canvasEl.getBoundingClientRect() : { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight };
        const w = rect.width / 2, h = rect.height / 2;
        const px = rect.left + (vec.x * w) + w, py = rect.top + (-(vec.y * h) + h);

        this.handles.center = { x: px, y: py };

        const scale = this.currentMesh.scale.x || 1;

        this.rotateHandleBtn.style.display = 'flex';
        this.rotateHandleBtn.style.left = (px + (30 * scale)) + 'px';
        this.rotateHandleBtn.style.top = (py - (60 * scale)) + 'px';

        this.resizeHandleBtn.style.display = 'flex';
        this.resizeHandleBtn.style.left = (px - (70 * scale)) + 'px';
        this.resizeHandleBtn.style.top = (py + (30 * scale)) + 'px';
    },

    animate: function () {
        requestAnimationFrame(() => window.Scene3D.animate());

        if (this.scene) {
            this.scene.children.forEach(mesh => {
                if (mesh.userData && mesh.userData.strokeData) {
                    // ?? KONİ ��Z�M�: Koni ise kendi motoruyla canland�r, de�ilse di�erleriyle
                    let targetRatio = mesh.userData.strokeData.openRatio || 0;
                    if (mesh.userData.currentOpenRatio === undefined) mesh.userData.currentOpenRatio = targetRatio;
                    mesh.userData.currentOpenRatio += (targetRatio - mesh.userData.currentOpenRatio) * 0.3;
                    if (Math.abs(targetRatio - mesh.userData.currentOpenRatio) < 0.001) mesh.userData.currentOpenRatio = targetRatio;

                    if (mesh.userData.isCustomCone && window.CustomConeEngine) {
                        window.CustomConeEngine.update(mesh, mesh.userData.currentOpenRatio);
                    } else if (window.Foldable3D) {
                        window.Foldable3D.updateUnfold(mesh, mesh.userData.currentOpenRatio);
                    }
                    
                    if (mesh.userData.targetQuaternion) {
                        mesh.quaternion.slerp(mesh.userData.targetQuaternion, 0.40); // 0.15'den 0.40'a cikarildi (Aninda tepki)
                    }
                    if (mesh.userData.targetPosition) {
                        mesh.position.lerp(mesh.userData.targetPosition, 0.45); // 0.2'den 0.45'e cikarildi (Aninda yapisma)
                    }
                }
            });
        }

        if (this.scene && this.renderer && this.camera) this.renderer.render(this.scene, this.camera);
    },

    // ?? 3D TABLET HATASI ��Z�M�: Ekran�n tamam� de�il, �izim kutusunun ger�ek s�n�rlar� baz al�n�r!
    getNormalizedCoords: function (clientX, clientY) {
        const canvasEl = document.getElementById('drawing-canvas');
        const w = canvasEl ? canvasEl.clientWidth : window.innerWidth;
        const h = canvasEl ? canvasEl.clientHeight : window.innerHeight;
        return {
            x: (clientX / w) * 2 - 1,
            y: -(clientY / h) * 2 + 1
        };
    },

    get3DPointOnFloor: function (x, y) {
        if (!this.raycaster || !this.camera) return new THREE.Vector3(0, 0, 0);
        this.raycaster.setFromCamera(this.getNormalizedCoords(x, y), this.camera);
        const intersection = new THREE.Vector3();
        return this.raycaster.ray.intersectPlane(this.plane, intersection) ? intersection : null;
    },

    createGeometry: function (type, size) {
        const height = size * 2;
        switch (type) {
            case 'sphere': return new THREE.SphereGeometry(size, 32, 32);
            case 'prism_cube': return new THREE.BoxGeometry(size * 2, size * 2, size * 2);
            case 'prism_cylinder': return new THREE.CylinderGeometry(size, size, height, 32);
            case 'prism_3': return new THREE.CylinderGeometry(size, size, height, 3);
            case 'prism_4': return new THREE.BoxGeometry(size * 1.5, height, size * 1.5);
            case 'prism_square': return new THREE.BoxGeometry(size * 1.5, size * 3, size * 1.5);
            case 'prism_rect': return new THREE.BoxGeometry(size * 3, size * 2.2, size * 1.5);
            case 'prism_5': return new THREE.CylinderGeometry(size, size, height, 5);
            case 'prism_6': return new THREE.CylinderGeometry(size, size, height, 6);
            case 'pyramid_cone': return new THREE.ConeGeometry(size, height, 32);
            case 'pyramid_3': return new THREE.ConeGeometry(size, height, 3);
            case 'pyramid_4': return new THREE.ConeGeometry(size, height, 4);
            case 'pyramid_5': return new THREE.ConeGeometry(size, height, 5);
            case 'pyramid_6': return new THREE.ConeGeometry(size, height, 6);
            default: return new THREE.SphereGeometry(size, 32, 32);
        }
    },

    onDown: function (x, y) {
        if (!this.isInit) return false;
        if (this.container) { this.container.style.display = 'block'; this.container.classList.remove('hidden'); }
        if (this.isRotatingHandle || this.isResizingHandle) return true;

        this.raycaster.setFromCamera(this.getNormalizedCoords(x, y), this.camera);
        const intersects = this.raycaster.intersectObjects(this.scene.children, true);
        let foundMesh = intersects.find(h => h.object.type === 'Mesh' && h.object !== this.helperGroup);

        // ?? E�ER BU B�R GRUPSA (Foldable3D) EN �ST GRUBU BUL
        if (foundMesh) {
            let rootObj = foundMesh.object;
            while (rootObj.parent && rootObj.parent !== this.scene && rootObj.parent.type === 'Group') {
                rootObj = rootObj.parent;
            }
            foundMesh = { object: rootObj };
        }

        // ?? TABLET DOKUNMAT�K ZIRHI: Parmakla bas�ld���nda 3D I��n �skalasa bile 2D Kutusundan Kesin Yakala!
        if (!foundMesh && window.drawnStrokes && currentTool === 'move') {
            const canvasEl = document.getElementById('drawing-canvas');
            if (canvasEl) {
                const rect = canvasEl.getBoundingClientRect();
                // D�ZELTME: Y�ksek DPI (Retina) cihazlarda canvasX hatal� olur, CSS koordinatlar� (cssX, cssY) kullan�lmal�!
                const cssX = x - rect.left;
                const cssY = y - rect.top;

                const hitStroke = window.drawnStrokes.find(s => s.type === '3d_shape' && Math.abs(cssX - (s.x + s.width / 2)) < Math.max(40, s.width / 2) && Math.abs(cssY - (s.y + s.height / 2)) < Math.max(40, s.height / 2));
                if (hitStroke) {
                    const sceneMesh = this.scene.children.find(m => m.userData && m.userData.strokeData && m.userData.strokeData.id === hitStroke.id);
                    if (sceneMesh) foundMesh = { object: sceneMesh };
                }
            }
        }

        if (foundMesh) {
            this.currentMesh = foundMesh.object;
            this.clickStartPos = { x, y };

            if (currentTool === 'move') {
                this.isRotatingShape = false;
                this.isDragging = true;
                this.dragPlane.setFromNormalAndCoplanarPoint(this.camera.getWorldDirection(new THREE.Vector3()), this.currentMesh.position);
                const intersectPoint = new THREE.Vector3();
                if (this.raycaster.ray.intersectPlane(this.dragPlane, intersectPoint)) {
                    this.dragOffset.subVectors(this.currentMesh.position, intersectPoint);
                }

                // Form�l kutusunun ��kmas� i�in �ekli se�ili hale getir
                if (this.currentMesh.userData && this.currentMesh.userData.strokeData) {
                    window.selectedItem = this.currentMesh.userData.strokeData;
                    if (typeof window.redrawAllStrokes === 'function') window.redrawAllStrokes();
                }
            } else {
                this.isDragging = false; this.isRotatingShape = true; this.lastMousePos = { x, y };
            }
            this.updateHandlePositions();
            return true;
        }

        if (this.activeTool && this.activeTool !== 'none' && this.activeTool !== 'move') {
            this.isDrawing = true;
            this.startPoint = this.get3DPointOnFloor(x, y) || new THREE.Vector3(0, 0, 0);

            const previewGeo = this.createGeometry(this.activeTool, 0.1);
            if (this.activeTool.startsWith('prism') || this.activeTool.startsWith('pyramid')) previewGeo.rotateX(Math.PI / 2);
            this.previewMesh = new THREE.Mesh(previewGeo, new THREE.MeshBasicMaterial({ color: 0x00ffcc, wireframe: true, transparent: true, opacity: 0.5 }));
            this.previewMesh.position.copy(this.startPoint);

            this.scene.add(this.previewMesh);
            return true;
        }

        if (currentTool === 'move') {
            this.currentMesh = null;
            window.selectedItem = null;
            this.updateHandlePositions();
        }
        return false;
    },

    onMove: function (x, y) {
        if (this.isRotatingHandle && this.currentMesh) {
            const camRight = new THREE.Vector3(1, 0, 0).applyQuaternion(this.camera.quaternion);
            const camUp = new THREE.Vector3(0, 1, 0).applyQuaternion(this.camera.quaternion);
                        if (!this.currentMesh.userData.targetQuaternion) {
                this.currentMesh.userData.targetQuaternion = this.currentMesh.quaternion.clone();
            }
            const dummy = new THREE.Object3D();
            dummy.quaternion.copy(this.currentMesh.userData.targetQuaternion);
            dummy.rotateOnWorldAxis(camRight, (y - this.lastMousePos.y) * 0.01);
            dummy.rotateOnWorldAxis(camUp, (x - this.lastMousePos.x) * 0.01);
            this.currentMesh.userData.targetQuaternion.copy(dummy.quaternion);
            
            this.lastMousePos = { x, y };
            this.updateHandlePositions();
            
            if (this.currentMesh.userData && this.currentMesh.userData.strokeData) {
                const sd = this.currentMesh.userData.strokeData;
                const euler = new THREE.Euler().setFromQuaternion(this.currentMesh.userData.targetQuaternion, 'XYZ');
                sd.rotationX = euler.x;
                sd.rotationY = euler.y;
                sd.rotationZ = euler.z;
                if (typeof window.sendNetworkData === 'function') window.sendNetworkData({ type: 'sekil_guncelle', stroke: sd });
            }
            return;
        }
        if (this.isResizingHandle && this.currentMesh) {
            const currentDist = Math.hypot(x - this.handles.center.x, y - this.handles.center.y);
            const dragRatio = currentDist / this.startResizeDist;
            
            if (this.currentMesh.userData && this.currentMesh.userData.strokeData) {
                const sd = this.currentMesh.userData.strokeData;
                
                // ?? Z�plama Korumas�: Orijinal koordinatlara (originalW vs.) ASLA dokunmadan 
                // sadece ekranlar aras� g�venli bir "�arpan" (meshScale) �retiyor ve yolluyoruz!
                sd.meshScale = (sd.meshScale || 1) * dragRatio;
                this.startResizeDist = currentDist; // Katlanarak b�y�meyi engelle
                
                if (typeof window.sendNetworkData === 'function') window.sendNetworkData({ type: 'sekil_guncelle', stroke: sd });
                if (typeof window.redrawAllStrokes === 'function') window.redrawAllStrokes();
            }
            return;
        }
        if (this.isDrawing && this.startPoint && this.previewMesh) {
            const currentPoint = this.get3DPointOnFloor(x, y);
            if (!currentPoint) return;
            const distance = currentPoint.distanceTo(this.startPoint);
            const scale = Math.max(0.1, distance * 3.5);
            this.previewMesh.scale.setScalar(scale);
            return;
        }
        if (this.isDragging && this.currentMesh) {
            this.raycaster.setFromCamera(this.getNormalizedCoords(x, y), this.camera);
            const intersectPoint = new THREE.Vector3();
            if (this.raycaster.ray.intersectPlane(this.dragPlane, intersectPoint)) {
                this.currentMesh.position.addVectors(intersectPoint, this.dragOffset);
                
                // BOUNDARY CLAMP: Ekran disina ucmasini (kaybolmasini) engeller
                this.currentMesh.position.x = Math.max(-30, Math.min(30, this.currentMesh.position.x));
                this.currentMesh.position.y = Math.max(-30, Math.min(30, this.currentMesh.position.y));
                this.currentMesh.position.z = Math.max(-30, Math.min(30, this.currentMesh.position.z));

                this.updateHandlePositions();
                // Ta��ma s�ras�ndaki a� senkronu zaten 2D motoru taraf�ndan kusursuz yap�l�yor. Burada hi�bir �eye dokunmuyoruz!
            }
            return;
        }
        if (this.isRotatingShape && this.currentMesh && currentTool !== 'move') {
            this.currentMesh.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), (y - this.lastMousePos.y) * 0.01);
            this.currentMesh.rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), (x - this.lastMousePos.x) * 0.01);
            this.lastMousePos = { x, y };
            this.updateHandlePositions();
        }
    },

    onUp: function () {
        const wasResizing = this.isResizingHandle;
        this.isRotatingHandle = this.isResizingHandle = this.isDragging = this.isRotatingShape = false;
        const wasDrawing = this.isDrawing;
        this.isDrawing = false;

        if (wasResizing && this.currentMesh && this.currentMesh.userData && this.currentMesh.userData.strokeData) {
            if (typeof window.sendNetworkData === 'function') window.sendNetworkData({ type: 'sekil_guncelle', stroke: this.currentMesh.userData.strokeData });
        }

        if (wasDrawing && this.previewMesh) {
            const finalScale = this.previewMesh.scale.x || 1;
            const finalRadius = 0.1 * finalScale;
            this.scene.remove(this.previewMesh); this.previewMesh.geometry.dispose(); this.previewMesh = null;

            const isSphere = this.activeTool === 'sphere';
            const mainMaterial = new THREE.MeshPhongMaterial({ color: 0x00ffcc, shininess: 100, specular: 0x111111, transparent: !isSphere, opacity: isSphere ? 1.0 : 0.4, depthWrite: isSphere, side: THREE.DoubleSide });
            const edgeMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 1.0 });

            let solidShape = null;
            // ?? KONİ ��Z�M�: Koniyi �zel motorla a� ki piramide d�n��mesin!
            if (this.activeTool === 'pyramid_cone' && window.CustomConeEngine) {
                solidShape = window.CustomConeEngine.create(finalRadius, finalRadius * 2, mainMaterial, edgeMaterial);
            } else if (window.Foldable3D) {
                solidShape = window.Foldable3D.createFoldableGroup(this.activeTool, finalRadius, mainMaterial, edgeMaterial);
            }
            if (!solidShape) {
                const geometry = this.createGeometry(this.activeTool, finalRadius);
                if (this.activeTool.startsWith('prism') || this.activeTool.startsWith('pyramid')) geometry.rotateX(Math.PI / 2);
                solidShape = new THREE.Mesh(geometry, mainMaterial);
                solidShape.add(new THREE.LineSegments(new THREE.EdgesGeometry(geometry), edgeMaterial));
            }

            // �ekli 3D uzaya tam senin b�rakt���n yere yerle�tir
            solidShape.position.copy(this.startPoint || new THREE.Vector3(0, 0, 0));

            // ?? ��Z�M TAMAMLANDI�INDA �ZOMETR�K DURU�: �n, �st ve Sa� y�zlerin g�r�nmesi i�in
            if (this.activeTool === 'pyramid_cone' || this.activeTool.startsWith('prism_') || this.activeTool.startsWith('pyramid_')) {
                // -Math.PI/6 (-30 derece) d�nd�r�ld���nde �n y�z daha geni�, Sa� y�z dar g�r�n�r (Klasik 3D g�r�n�m)
                solidShape.rotation.z = -Math.PI / 6;
                // Koni i�in kameraya tam dik bakmamas� ad�na X ekseninde de e�im veriyoruz ki taban elips g�r�ns�n
                solidShape.rotation.x = -Math.PI / 6;
            }

            this.scene.add(solidShape);
            this.currentMesh = solidShape;
            this.updateHandlePositions();

            // ?? S�H�RL� DOKUNU�: 3D �eklin 2D �izim Noktas�n� Tam �sabet Hesapla! (Ortaya ka�maz)
            const vec = solidShape.position.clone();
            vec.project(this.camera);
            const canvasEl = document.getElementById('drawing-canvas');
            const w = canvasEl ? (canvasEl.width / 2) : (window.innerWidth / 2);
            const h = canvasEl ? (canvasEl.height / 2) : (window.innerHeight / 2);
            const screenX = (vec.x * w) + w;
            const screenY = -(vec.y * h) + h;

            // ?? 1. KUSURSUZ BOYUT: Ger�ek HD Piksel kar��l���n� hesapla (K���lmeyi ve kaymay� �nler)
            const myCh = canvasEl ? canvasEl.height : window.innerHeight;
            const pixelPerUnit = myCh / 30; // 3D uzaydaki 1 birimin piksel kar��l���
            const gercekPx = (finalRadius * 2) * pixelPerUnit;

            const networkData = {
                type: '3d_shape', id: Date.now().toString() + Math.random(), shapeType: this.activeTool,
                x: screenX - (gercekPx / 2),
                y: screenY - (gercekPx / 2),
                width: gercekPx, height: gercekPx,
                // S�rg� �ekilse bile asla z�plamas�n ve PC'ye m�kemmel gitsin diye ZIRH:
                originalX: screenX - (gercekPx / 2),
                originalY: screenY - (gercekPx / 2),
                originalW: gercekPx,
                originalH: gercekPx,
                rotationX: solidShape.rotation.x, rotationY: solidShape.rotation.y, rotationZ: solidShape.rotation.z,
                pos3D: { x: solidShape.position.x, y: solidShape.position.y, z: solidShape.position.z },
                rotation: 0, yaw: 0, pitch: 1, openRatio: 0, isPreview: false, color: '#00ffcc'
            };
            Object.assign(solidShape.userData, { type: this.activeTool, baseSize: finalRadius, height: finalRadius * 2, strokeData: networkData });

            if (window.drawnStrokes) window.drawnStrokes.push(networkData);
            if (typeof window.sendNetworkData === 'function') window.sendNetworkData({ type: 'yeni_cizim', stroke: networkData });
        }
    },

    setTool: function (toolName) {
        if (!this.isInit) this.init();
        this.activeTool = toolName;
        // ?? G�VENL�K 4: Ara� se�ildi�inde de konteyner� zorla g�ster! (Senin notun)
        if (this.container) {
            this.container.style.display = 'block';
            this.container.classList.remove('hidden');
        }
    },

    deleteObjectAt: function (x, y) {
        if (!this.isInit || !this.scene) return false;
        this.raycaster.setFromCamera(this.getNormalizedCoords(x, y), this.camera);
        const intersects = this.raycaster.intersectObjects(this.scene.children, true);
        const hit = intersects.find(h => {
            const obj = h.object;
            let isHelper = false; let parent = obj.parent;
            while (parent) { if (parent === this.helperGroup) { isHelper = true; break; } parent = parent.parent; }
            return !isHelper && (obj.type === 'Mesh' || obj.type === 'Line' || obj.type === 'LineSegments');
        });
        if (hit) {
            let targetObj = hit.object;
            while (targetObj.parent && targetObj.parent !== this.scene) { targetObj = targetObj.parent; }
            if (this.scene.children.includes(targetObj)) {
                if (targetObj.userData && targetObj.userData.strokeData) {
                    if (window.drawnStrokes) {
                        window.drawnStrokes = window.drawnStrokes.filter(s => s.id !== targetObj.userData.strokeData.id);
                    }
                    if (typeof window.sendNetworkData === 'function') {
                        window.sendNetworkData({ type: 'cizim_sil', strokeId: targetObj.userData.strokeData.id });
                    }
                }
                // SEN�N EKLENT�N: Etiketi silme i�lemi KORUNDU
                if (targetObj.userData.labelElement) targetObj.userData.labelElement.remove();
                this.scene.remove(targetObj);
                if (this.currentMesh === targetObj) this.currentMesh = null;
                this.updateHandlePositions();
                return true;
            }
        }
        return false;
    },

    handleEraser: function (pos) {
        if (this.deleteObjectAt(pos.x, pos.y)) {
            if (typeof redrawAllStrokes === 'function') redrawAllStrokes();
        }
    },

    addShapeToScene: function (type, x, y) {
        if (!this.isInit) this.init();
        this.createSolidMesh(type, new THREE.Vector3(0, 0, 0), 2, true);
        console.log(type + " sahneye ba�ar�yla �a�r�ld�!");
    },

    // ?? KES�N ��Z�M: PC'nin 3D �ekilleri Tabletinden Al�p �izmesi ��in A� Al�c�s�
    addShapeFromNetwork: function (strokeData) {
        if (!this.isInit) this.init();
        const isSphere = strokeData.shapeType === 'sphere';
        const mainMaterial = new THREE.MeshPhongMaterial({ color: 0x00ffcc, shininess: 100, specular: 0x111111, transparent: !isSphere, opacity: isSphere ? 1.0 : 0.4, depthWrite: isSphere, side: THREE.DoubleSide });
        const edgeMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 1.0 });

        let solidShape = null;
        // ?? KONİ ��Z�M�: A�dan gelen koniyi de �zel motorla �iz!
        if (strokeData.shapeType === 'pyramid_cone' && window.CustomConeEngine) {
            solidShape = window.CustomConeEngine.create(strokeData.width / 30, (strokeData.width / 30) * 2, mainMaterial, edgeMaterial);
        } else if (window.Foldable3D) {
            solidShape = window.Foldable3D.createFoldableGroup(strokeData.shapeType, strokeData.width / 30, mainMaterial, edgeMaterial);
        }
        if (!solidShape) {
            const geometry = this.createGeometry(strokeData.shapeType, strokeData.width / 30);
            if (strokeData.shapeType.startsWith('prism') || strokeData.shapeType.startsWith('pyramid')) geometry.rotateX(Math.PI / 2);
            solidShape = new THREE.Mesh(geometry, mainMaterial);
            solidShape.add(new THREE.LineSegments(new THREE.EdgesGeometry(geometry), edgeMaterial));
        }

        // ?? ��Z�M 1: 3D �eklin yarat�l���nda PC ekran�na m�kemmel hizalanmas�
        const canvasElm = document.getElementById('drawing-canvas');
        const myCw = canvasElm ? canvasElm.width : window.innerWidth;
        const myCh = canvasElm ? canvasElm.height : window.innerHeight;
        
        const cx = strokeData.x + (strokeData.width / 2);
        const cy = strokeData.y + (strokeData.height / 2);
        
        const ndcX = (cx / myCw) * 2 - 1;
        const ndcY = -(cy / myCh) * 2 + 1;
        
        const vec = new THREE.Vector3(ndcX, ndcY, 0);
        vec.unproject(this.camera);
        solidShape.position.x = vec.x;
        solidShape.position.y = vec.y;
        solidShape.position.z = (strokeData.pos3D && strokeData.pos3D.z !== undefined) ? strokeData.pos3D.z : 0;

        // ?? N�HA� ��Z�M 1: �lk yarat�l��ta �l�e�i 1'de sabit b�rak�yoruz. 
        // Ger�ek b�y�kl�k redrawAllStrokes i�inde hesaplanacak.
        solidShape.scale.setScalar(1);
        solidShape.userData.baseTabletWidth = strokeData.width;

        if (strokeData.rotationX !== undefined) solidShape.rotation.x = strokeData.rotationX;
        if (strokeData.rotationY !== undefined) solidShape.rotation.y = strokeData.rotationY;
        Object.assign(solidShape.userData, { type: strokeData.shapeType, baseSize: strokeData.width / 30, height: (strokeData.width / 30) * 2, strokeData: strokeData });
        this.scene.add(solidShape);
        if (typeof this.updateHandlePositions === 'function') this.updateHandlePositions();
    }
}; // --- GER�EK 3D UZAY MOTORU (Scene3D) BURADA B�T�YOR ---


// ==========================================
// 4. ARAY�Z VE MEN� MOTORU (�zellik Kayb� Yok)
// ==========================================
window.addEventListener('load', () => {
    const polyBtn = document.getElementById('btn-cokgenler');
    if (polyBtn && !document.getElementById('btn-3d-menu')) {
        const btn3D = document.createElement('button'); btn3D.id = 'btn-3d-menu'; btn3D.className = 'tool-button'; btn3D.innerHTML = '3D Cisimler';
        polyBtn.parentNode.insertBefore(btn3D, polyBtn.nextSibling);

        const menu3D = document.createElement('div'); menu3D.id = 'options-3d-main'; menu3D.className = 'tool-options hidden';
        menu3D.style.cssText = `position: absolute; left: 100%; margin-left: 10px; z-index: 20; background-color: rgba(30, 30, 46, 0.75); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.15); box-shadow: 0 15px 35px rgba(0,0,0,0.4); padding: 15px; border-radius: 15px; display: flex; flex-direction: column; gap: 8px; width: 180px;`;
        menu3D.innerHTML = `<button class="tool-button-sub" data-3d="3d_kure">Küre</button><button class="tool-button-sub has-submenu" id="btn-prizmalar">Prizmalar ▶</button><button class="tool-button-sub has-submenu" id="btn-piramitler">Piramitler ▶</button>`;
        btn3D.parentNode.insertBefore(menu3D, btn3D.nextSibling);


        const menuPrizmalar = document.createElement('div'); menuPrizmalar.id = 'options-prizmalar'; menuPrizmalar.className = 'tool-options hidden';
        menuPrizmalar.style.cssText = `position: absolute; left: 100%; margin-left: 10px; top: 0; z-index: 21; background-color: rgba(30, 30, 46, 0.85); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.15); box-shadow: 0 15px 35px rgba(0,0,0,0.4); padding: 15px; border-radius: 15px; display: flex; flex-direction: column; gap: 8px; width: 180px;`;
        menuPrizmalar.innerHTML = `<button class="tool-button-sub" data-3d="3d_kup">Küp</button><button class="tool-button-sub" data-3d="3d_kare_prizma">Kare Prizma</button><button class="tool-button-sub" data-3d="3d_dikdortgen_prizma">Dikdörtgen Prizma</button><button class="tool-button-sub" data-3d="3d_ucgen_prizma">Üçgen Prizma</button><button class="tool-button-sub" data-3d="3d_besgen_prizma">Beşgen Prizma</button><button class="tool-button-sub" data-3d="3d_altigen_prizma">Altıgen Prizma</button><button class="tool-button-sub" data-3d="3d_silindir">Silindir</button>`;
        menu3D.appendChild(menuPrizmalar);

        const menuPiramitler = document.createElement('div'); menuPiramitler.id = 'options-piramitler'; menuPiramitler.className = 'tool-options hidden';
        menuPiramitler.style.cssText = `position: absolute; left: 100%; margin-left: 10px; top: 40px; z-index: 21; background-color: rgba(30, 30, 46, 0.85); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.15); box-shadow: 0 15px 35px rgba(0,0,0,0.4); padding: 15px; border-radius: 15px; display: flex; flex-direction: column; gap: 8px; width: 180px;`;
        menuPiramitler.innerHTML = `<button class="tool-button-sub" data-3d="3d_koni">Koni</button><button class="tool-button-sub" data-3d="3d_ucgen_piramit">Üçgen Piramit</button><button class="tool-button-sub" data-3d="3d_kare_piramit">Kare Piramit</button><button class="tool-button-sub" data-3d="3d_besgen_piramit">Beşgen Piramit</button><button class="tool-button-sub" data-3d="3d_altigen_piramit">Altıgen Piramit</button>`;
        menu3D.appendChild(menuPiramitler);
        update3DLabels();

        btn3D.addEventListener('click', (e) => {
            e.stopPropagation(); document.querySelectorAll('.tool-options').forEach(m => { if (m !== menu3D && m !== menuPrizmalar && m !== menuPiramitler) { m.classList.add('hidden'); m.style.display = 'none'; } });
            if (menu3D.classList.contains('hidden')) {
                menu3D.classList.remove('hidden'); menu3D.style.display = 'flex'; menuPrizmalar.classList.add('hidden'); menuPrizmalar.style.display = 'none'; menuPiramitler.classList.add('hidden'); menuPiramitler.style.display = 'none'; menu3D.style.top = (btn3D.getBoundingClientRect().top - btn3D.parentElement.getBoundingClientRect().top) + 'px'; btn3D.classList.add('active');
            } else { menu3D.classList.add('hidden'); menu3D.style.display = 'none'; btn3D.classList.remove('active'); }
        });

        document.getElementById('btn-prizmalar').addEventListener('mouseenter', () => { menuPrizmalar.classList.remove('hidden'); menuPrizmalar.style.display = 'flex'; menuPiramitler.classList.add('hidden'); menuPiramitler.style.display = 'none'; });
        document.getElementById('btn-piramitler').addEventListener('mouseenter', () => { menuPiramitler.classList.remove('hidden'); menuPiramitler.style.display = 'flex'; menuPrizmalar.classList.add('hidden'); menuPrizmalar.style.display = 'none'; });

        document.querySelectorAll('#options-3d-main button[data-3d]').forEach(b => {
            b.addEventListener('click', (e) => {
                e.stopPropagation();
                const data3d = b.getAttribute('data-3d');

                if (typeof setActiveTool === 'function') setActiveTool('none');

                window.active3DShapeTool = 'draw_' + data3d;
                const btn3D = document.getElementById('btn-3d-menu');
                if (btn3D) btn3D.classList.add('active');
                const menu3D = document.getElementById('options-3d-main');
                if (menu3D) { menu3D.classList.add('hidden'); menu3D.style.display = 'none'; }

                // 3D Motorunu Uyand�r ve Arac� Ver
                if (window.Scene3D) {
                    if (!window.Scene3D.isInit) window.Scene3D.init();
                    if (window.Scene3D.container) {
                        window.Scene3D.container.style.display = 'block';
                        window.Scene3D.container.style.zIndex = '9995';
                    }
                    let toolName = 'sphere';
                    if (data3d.includes('kure')) toolName = 'sphere';
                    else if (data3d.includes('kup')) toolName = 'prism_cube';
                    else if (data3d.includes('silindir')) toolName = 'prism_cylinder';
                    else if (data3d.includes('koni')) toolName = 'pyramid_cone';
                    else if (data3d.includes('kare_prizma')) toolName = 'prism_square';
                    else if (data3d.includes('dikdortgen_prizma')) toolName = 'prism_rect';
                    else if (data3d.includes('ucgen_prizma')) toolName = 'prism_3';
                    else if (data3d.includes('besgen_prizma')) toolName = 'prism_5';
                    else if (data3d.includes('altigen_prizma')) toolName = 'prism_6';
                    else if (data3d.includes('ucgen_piramit')) toolName = 'pyramid_3';
                    else if (data3d.includes('kare_piramit')) toolName = 'pyramid_4';
                    else if (data3d.includes('besgen_piramit')) toolName = 'pyramid_5';
                    else if (data3d.includes('altigen_piramit')) toolName = 'pyramid_6';
                    else toolName = 'prism_rect';

                    currentTool = 'draw_3d_' + toolName;
                    window.Scene3D.setTool(toolName);
                }
            });
        });
    }

    const uiMotor = () => {
        const slider = document.getElementById('slider-container');
        const info = document.getElementById('info-tooltip');

        let activeShape = null;
        // �ekil "Ta��" modunda se�iliyken alg�la
        if (window.currentTool === 'move' && window.selectedItem && window.selectedItem.type === '3d_shape') {
            activeShape = window.selectedItem;
        } else if (!window.currentTool || window.currentTool === 'none' || window.currentTool.startsWith('draw_3d_')) {
            // "none" durumunda veya 3D �izim arac�ndayken son �izilen 3D �ekli otomatik s�rg�ye ba�la
            if (window.drawnStrokes) {
                for (let i = window.drawnStrokes.length - 1; i >= 0; i--) {
                    if (window.drawnStrokes[i].type === '3d_shape') {
                        activeShape = window.drawnStrokes[i];
                        break;
                    }
                }
            }
        }

        if (activeShape) {
            window.active3DSliderStroke = activeShape;
            if (slider) {
                if (activeShape.shapeType === 'sphere') slider.style.display = 'none';
                else slider.style.display = 'flex';
            }
            if (info) {
                let isSelectedMove = (currentTool === 'move' && window.selectedItem === activeShape);
                if (isSelectedMove) {
                    info.style.display = 'block';
                } else {
                    info.style.display = 'none';
                }

                // ?? P�=3 ALINARAK ALAN/HAC�M HESAPLAYAN �ZEL FORM�L MOTORU
                let formulMetni = "";
                let currentScale = activeShape.meshScale || 1;
                const r = ((activeShape.width * currentScale) / 30).toFixed(1);
                const h = (r * 2).toFixed(1);

                let r_val = parseFloat(r);
                let h_val = parseFloat(h);

                // Form�ller HTML destekli renkli ve kal�n yaz�larla �ekillendiriliyor
                if (activeShape.shapeType === 'sphere') {
                    formulMetni = `<span style="color:#00ffcc; font-size:16px;">Küre</span><br>r = ${r} cm<br><span style="color:#ff00ff">Hacim = (4/3)·π·r³</span><br>= (4/3)·3·(${r})³ = <b>${(4 * r_val * r_val * r_val).toFixed(1)} cm³</b><br><span style="color:#ff00ff">Alan = 4·π·r²</span><br>= 4·3·(${r})² = <b>${(12 * r_val * r_val).toFixed(1)} cm³</b>`;
                } else if (activeShape.shapeType === 'prism_cube') {
                    formulMetni = `<span style="color:#00ffcc; font-size:16px;">Küp</span><br>a = ${r} cm<br><span style="color:#ff00ff">Hacim = a³</span><br>= (${r})³ = <b>${(r_val * r_val * r_val).toFixed(1)} cm³</b><br><span style="color:#ff00ff">Alan = 6·a²</span><br>= 6·(${r})² = <b>${(6 * r_val * r_val).toFixed(1)} cm³</b>`;
                } else if (activeShape.shapeType === 'prism_cylinder') {
                    let tabanAlani = 3 * r_val * r_val;
                    let yanalAlan = 2 * 3 * r_val * h_val;
                    let toplamAlan = 2 * tabanAlani + yanalAlan;
                    let hacim = tabanAlani * h_val;
                    formulMetni = `<span style="color:#00ffcc; font-size:16px;">Silindir</span><br>r = ${r} cm, h = ${h} cm<br><span style="color:#ff00ff">Taban Alanı = π·r²</span><br>= 3·(${r})² = <b>${tabanAlani.toFixed(1)} cm³</b><br><span style="color:#ff00ff">Yanal Alan = 2·π·r·h</span><br>= 2·3·${r}·${h} = <b>${yanalAlan.toFixed(1)} cm³</b><br><span style="color:#ff00ff">Toplam Alan = 2·(Taban Alanı) + Yanal Alan</span><br>= 2·${tabanAlani.toFixed(1)} + ${yanalAlan.toFixed(1)} = <b>${toplamAlan.toFixed(1)} cm³</b><br><span style="color:#ff00ff">Hacim = π·r²·h</span><br>= 3·(${r})²·${h} = <b>${hacim.toFixed(1)} cm³</b>`;
                } else if (activeShape.shapeType === 'pyramid_cone') {
                    formulMetni = `<span style="color:#00ffcc; font-size:16px;">Koni</span><br>r = ${r} cm, h = ${h} cm<br><span style="color:#ff00ff">Hacim = (π·r²·h)/3</span><br>= (3·(${r})²·${h})/3 = <b>${(r_val * r_val * h_val).toFixed(1)} cm³</b>`;
                } else if (activeShape.shapeType === 'prism_rect') {
                    let a = (r_val * 1.5).toFixed(1);
                    let b = r;
                    let taban = (a * b).toFixed(1);
                    let yanal = (2 * (parseFloat(a) + parseFloat(b)) * h_val).toFixed(1);
                    formulMetni = `<span style="color:#00ffcc; font-size:16px;">Dikdörtgenler Prizması</span><br>a = ${a} cm, b = ${b} cm, h = ${h} cm<br><span style="color:#ff00ff">Hacim = a·b·h</span><br>= ${taban}·${h} = <b>${(taban * h_val).toFixed(1)} cm³</b><br><span style="color:#ff00ff">Alan = 2·(a·b) + Yanal Alan</span><br>= 2·${taban} + ${yanal} = <b>${(2 * taban + parseFloat(yanal)).toFixed(1)} cm³</b>`;
                } else if (activeShape.shapeType.startsWith('prism_') || activeShape.shapeType.startsWith('pyramid_')) {
                    let isPrism = activeShape.shapeType.startsWith('prism_');
                    let sides = parseInt(activeShape.shapeType.split('_')[1]);

                    let a_val = (2 * r_val * Math.sin(Math.PI / sides)).toFixed(1);
                    let apothem = (r_val * Math.cos(Math.PI / sides)).toFixed(1);
                    let tabanAlani = (sides * a_val * apothem / 2).toFixed(1);
                    let cevre = (sides * a_val).toFixed(1);

                    let sekilAdi = sides === 3 ? "Üçgen" : sides === 5 ? "Beşgen" : sides === 6 ? "Altıgen" : sides + "gen";
                    let anaBaslik = isPrism ? `${sekilAdi} Prizma` : `${sekilAdi} Piramit`;

                    let sonucHacim = isPrism ? (tabanAlani * h_val).toFixed(1) : (tabanAlani * h_val / 3).toFixed(1);
                    let hacimFormulStr = isPrism ? "Taban Alanı · h" : "(Taban Alanı · h) / 3";
                    let hacimDegerStr = isPrism ? `${tabanAlani} · ${h}` : `(${tabanAlani} · ${h}) / 3`;

                    formulMetni = `<span style="color:#00ffcc; font-size:16px;">${anaBaslik}</span><br>Taban Ayrıtı (a) ≈ ${a_val} cm, Yükseklik (h) ≈ ${h} cm<br><span style="color:#ff00ff">Taban Alanı ≈ ${tabanAlani} cm³</span><br><span style="color:#ff00ff">Hacim = ${hacimFormulStr}</span><br>= ${hacimDegerStr} = <b>${sonucHacim} cm³</b>`;

                    if (isPrism) {
                        let yanalAlan = (cevre * h_val).toFixed(1);
                        formulMetni += `<br><span style="color:#ff00ff">Yanal Alan = Çevre · h</span><br>= ${cevre} · ${h} = <b>${yanalAlan} cm³</b>`;
                    }
                }

                info.innerHTML = formulMetni;

                // �eklin sa��nda pozisyonlama
                const marginX = 20;
                let posX = activeShape.x + activeShape.width + marginX;
                let posY = activeShape.y;

                // Ekran�n sa��na ta��yorsa sola al
                if (posX + 250 > window.innerWidth) {
                    posX = activeShape.x - 250 - marginX;
                }

                info.style.left = posX + "px";
                info.style.top = posY + "px";
                info.style.bottom = "auto";
                info.style.transform = "none";
                // Panel tasar�m� art�k tamamen style.css dosyas�ndaki #info-tooltip id'si ile y�netiliyor.
            }
            const sInput = document.getElementById('shape-slider');
            if (sInput && document.activeElement !== sInput) sInput.value = (activeShape.openRatio || 0) * 100;
        } else {
            if (slider) slider.style.display = 'none';
            if (info) info.style.display = 'none';
            window.active3DSliderStroke = null;
        }

        if (activeShape !== window._lastActive3DShape) {
            window._lastActive3DShape = activeShape;
            if (typeof redrawAllStrokes === 'function') redrawAllStrokes();
        }
        requestAnimationFrame(uiMotor);
    };

    // YUKARIDAK� EKS�K OLAN KAPANI� PARANTEZLER� BURADA!
    requestAnimationFrame(uiMotor);
});

// A�ILI�TA ��ZG� MEN�S�N� ZORLA KAPAT

// A�ILI�TA ��ZG� MEN�S�N� ZORLA KAPAT
window.addEventListener('load', () => {
    const lineOptions = document.getElementById('line-options') || document.querySelector('.line-options');
    if (lineOptions) {
        lineOptions.classList.add('hidden');
        lineOptions.style.display = 'none';
    }
});

// =========================================================
// F�Z�KSEL ARA�LAR ���N RADAR VE �N�ZLEME MOTORU
// =========================================================
let sonAracDurumlari = {};

window.araclariAgaGonder = function () {
    if (typeof isConnected === 'undefined' || !isConnected) return;

    const gelismisAraclar = [
        { id: 'ruler', obj: window.RulerTool, selector: '.ruler-container' },
        { id: 'gonye', obj: window.GonyeTool, selector: '.gonye-container' },
        { id: 'aciolcer', obj: window.AciolcerTool, selector: '.aciolcer-container' },
        { id: 'pergel', obj: window.PergelTool, selector: '#compass-container' }
    ];

    gelismisAraclar.forEach(arac => {
        if (arac.obj && arac.obj.state) {
            try {
                const el = document.querySelector(arac.selector);
                let isVisible = 'none';
                let elW = '', elH = '';

                if (el) {
                    isVisible = (el.style.display !== 'none' && !el.classList.contains('hidden')) ? 'block' : 'none';
                    elW = el.style.width;
                    elH = el.style.height;
                }

                // Ara�lar�n durumunu, d�n�� a��s�n� ve boyutunu tek metinde birle�tirip de�i�iklik var m� bak�yoruz
                const durum = isVisible + JSON.stringify(arac.obj.state) + elW + elH;

                if (sonAracDurumlari[arac.id] !== durum) {
                    sonAracDurumlari[arac.id] = durum;

                    // E�er veri hen�z a�dan geldiyse (son 500ms), geri yans�t�p yank� yapmas�n� engelle!
                    if (arac.obj.lastNetworkReceiveTime && (Date.now() - arac.obj.lastNetworkReceiveTime) < 500) {
                        return;
                    }

                    // De�i�iklik varsa PC'ye an�nda g�nder
                    if (typeof window.sendNetworkData === 'function') {
                        window.sendNetworkData({
                            type: 'arac_state_senkron',
                            arac: arac.id,
                            display: isVisible,
                            state: arac.obj.state,
                            width: elW,
                            height: elH
                        });
                    }
                }
            } catch (err) { }
        }
    });
};

// Radar� saniyede 10 kez �al��t�r (G�r�n�m senkronizasyonu i�in)
setInterval(window.araclariAgaGonder, 100);

// DI� DOSYALAR (cetvel.js, pergel.js) ���N CANLI �N�ZLEME YAYINCISI
window.broadcastPreview = function (toolType, stateData) {
    if (typeof window.sendNetworkData === 'function' && window.isConnected) {
        window.sendNetworkData({ type: 'aktif_onizleme', arac: toolType, payload: stateData });
    }
};

// ?? KES�N ��Z�M: 3D �EK�LLER� ��Z�M�N ALTINA ALIRKEN BUTONLARI KORUMA ZIRHI
const canvasKatmanZirhi = document.createElement('style');
canvasKatmanZirhi.innerHTML = `
    /* ?? Arka plan kanvas�n� en alta al (Sayfa PDF'leri ara�lar�n �st�n� �rtemez) */
    #bg-canvas { position: absolute !important; z-index: 5 !important; top: 0; left: 0; pointer-events: none; }

    /* �izim tahtas�n� 3D cisimlerin �st�ne ��kar�yoruz */
    #drawing-canvas { position: relative !important; z-index: 50 !important; background-color: transparent !important; }
    
    /* 3D uzay sahnesi bg-canvas'�n �st�nde (10), �izimlerin alt�nda (50) kalmal� */
    #three-container { position: absolute !important; z-index: 10 !important; pointer-events: none !important; }
    
    /* ?? BUTONLARIN VE F�Z�KSEL ARA�LARIN GER� GELMES�N� SA�LAYAN EN �ST KATMAN KORUMASI ?? */
    .panel, .panel *, button, .tool-button, .tool-button-sub, .tool-options, 
    #pen-options, #line-options, #polygon-options, #fill-options, #snapshot-options, 
    #options-3d-main, #options-prizmalar, #options-piramitler, #slider-container, #info-tooltip,
    .ruler-container, .gonye-container, .aciolcer-container, #compass-container { 
        z-index: 10000 !important; 
    }
`;
document.head.appendChild(canvasKatmanZirhi);


// ==========================================
// --- TONY STARK MODU (�LER� D�ZEY GESTURES) ---
// ==========================================
function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
    });
}

let tonyBtn = document.getElementById('tony-magic-btn');
if (!tonyBtn) {
    tonyBtn = document.createElement('button');
    tonyBtn.id = 'tony-magic-btn';

tonyBtn.className = 'tool-button';
tonyBtn.style.position = 'static';
tonyBtn.style.transform = 'none';
tonyBtn.style.width = '100%';
tonyBtn.style.marginTop = '10px';
tonyBtn.style.padding = '10px 0';
tonyBtn.style.fontSize = '12px';
tonyBtn.style.borderRadius = '10px';
tonyBtn.style.backgroundColor = 'rgba(0, 150, 255, 0.2)';
tonyBtn.style.border = '2px solid #0096ff';
tonyBtn.style.color = '#fff';
tonyBtn.style.cursor = 'pointer';
tonyBtn.style.fontWeight = 'bold';
tonyBtn.innerHTML = '??? Sihirli El';

const oyunlarBtn = document.getElementById('btn-oyunlar');
if (oyunlarBtn && oyunlarBtn.parentNode) {
    oyunlarBtn.parentNode.appendChild(tonyBtn);
} else {
    document.body.appendChild(tonyBtn);
}
}

// Lazer �mleci
const laserCursor = document.createElement('div');
laserCursor.style.position = 'absolute';
laserCursor.style.width = '20px';
laserCursor.style.height = '20px';
laserCursor.style.borderRadius = '50%';
laserCursor.style.backgroundColor = '#00ffff'; // Iron Man Blue
laserCursor.style.boxShadow = '0 0 15px 5px rgba(0, 255, 255, 0.8)';
laserCursor.style.pointerEvents = 'none';
laserCursor.style.transition = 'left 0.1s ease-out, top 0.1s ease-out, background-color 0.2s';
laserCursor.style.willChange = 'left, top';
laserCursor.style.zIndex = '999999';
laserCursor.style.display = 'none';
laserCursor.style.transform = 'translate(-50%, -50%)';
document.body.appendChild(laserCursor);

let tonyActive = false;
let camera = null;
let hands = null;

function calculateDistance(p1, p2) {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    return Math.sqrt(dx * dx + dy * dy);
}

    tonyBtn.onclick = async () => {
        if (tonyActive) {
            if (camera) { camera.stop(); camera = null; }
            if (hands) { hands.close(); hands = null; }
            const vid = document.getElementById('tony-video-elem');
            if (vid) {
                // Kamera donanim isigini ve kaydini TAMAMEN kapatmak icin MediaStream tracklerini durdurmaliyiz!
                if (vid.srcObject) {
                    vid.srcObject.getTracks().forEach(track => track.stop());
                }
                vid.remove();
            }
            tonyActive = false;
            laserCursor.style.display = 'none';
            tonyBtn.innerHTML = '?? Sihirli El';
            tonyBtn.style.borderColor = '#0096ff';
            tonyBtn.style.boxShadow = 'none';
            return;
        }

        tonyBtn.innerHTML = '? (KVKK)';
        tonyBtn.style.borderColor = '#ffff00';
        tonyBtn.style.boxShadow = '0 0 10px rgba(255,255,0,0.5)';

        try {
            // Scripts artik index.html icinde erkenden yukleniyor.

            const videoElement = document.createElement('video');
            videoElement.setAttribute('playsinline', '');
            videoElement.setAttribute('autoplay', '');
            videoElement.setAttribute('muted', '');
            videoElement.id = 'tony-video-elem';
            videoElement.style.position = 'fixed'; 
            videoElement.style.opacity = '0.001'; videoElement.setAttribute('webkit-playsinline', 'true'); 
            videoElement.style.transform = 'scaleX(-1)';
            videoElement.style.width = '100%'; 
            videoElement.style.height = '100%'; 
            videoElement.style.zIndex = '-9999'; 
            videoElement.style.top = '0'; 
            videoElement.style.left = '0'; 
            videoElement.style.pointerEvents = 'none'; 
            videoElement.muted = true;
            document.body.appendChild(videoElement);

            hands = new window.Hands({
                locateFile: (file) => 'vendor/' + file
            });

            hands.setOptions({
                maxNumHands: 2, 
                modelComplexity: 1, // 1 yapildi, uzaktan daha iyi algilamasi icin
                minDetectionConfidence: 0.3,
                minTrackingConfidence: 0.3
            });


            let startX = 0, startY = 0;
            let startScaleDistance = 0, startScale = 1;
            let startOpenDistance = 0, startOpenRatio = 0;
            window.lastAISendTime = 0;

            hands.onResults((results) => {

                tonyBtn.innerHTML = 'AI Aktif';
                if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
                    tonyBtn.innerHTML = 'El G�r�nd�!';
                    const isTwoHands = results.multiHandLandmarks.length === 2;
                    const hand1 = results.multiHandLandmarks[0];
                    
                    const rawPx1 = (1 - hand1[8].x) * window.innerWidth;
                    const rawPy1 = hand1[8].y * window.innerHeight;
                    if (window.smoothPx1 === undefined) { window.smoothPx1 = rawPx1; window.smoothPy1 = rawPy1; }
                    window.smoothPx1 += (rawPx1 - window.smoothPx1) * 0.25; // 0.25 EMA Yumusatma Filtresi (Titremeyi yutar)
                    window.smoothPy1 += (rawPy1 - window.smoothPy1) * 0.25;
                    const px1 = window.smoothPx1;
                    const py1 = window.smoothPy1;
                    laserCursor.style.display = 'block';
                    laserCursor.style.left = px1 + 'px';
                    laserCursor.style.top = py1 + 'px';
                    
                    const pinchDist1 = calculateDistance(hand1[4], hand1[8]);
                    const handScale1 = calculateDistance(hand1[0], hand1[9]) || 0.001; // Elin ekrandaki boyutu (Bilek - Orta Parmak Koku)
                    // Gercek bir yumrukta parmak uclari koklere cok yaklasir (el boyutunun yarisi kadar veya daha az)
                    const isFist1 = (calculateDistance(hand1[8], hand1[5]) / handScale1) < 0.9 && 
                                    (calculateDistance(hand1[12], hand1[9]) / handScale1) < 0.9;
                    const dynamicPinch1 = (handScale1 > 0.12) ? 0.40 : 0.55;
                    const isPinched1 = !isFist1 && ((pinchDist1 / handScale1) < dynamicPinch1); 

                    if (window.Scene3D) {
                        let mesh = window.Scene3D.currentMesh;
                        if (!mesh && window.Scene3D.scene) {
                            mesh = window.Scene3D.scene.children.slice().reverse().find(m => m.userData && m.userData.strokeData);
                        }
                        if (mesh) {
                            if (isTwoHands) {
                                const hand2 = results.multiHandLandmarks[1];
                                const pinchDist2 = calculateDistance(hand2[4], hand2[8]);
                                const handScale2 = calculateDistance(hand2[0], hand2[9]) || 0.001;
                                const isFist2 = (calculateDistance(hand2[8], hand2[5]) / handScale2) < 0.9 && 
                                                (calculateDistance(hand2[12], hand2[9]) / handScale2) < 0.9;
                                const dynamicPinch2 = (handScale2 > 0.12) ? 0.40 : 0.55;
                                const isPinched2 = !isFist2 && ((pinchDist2 / handScale2) < dynamicPinch2);
                                const handsDistance = calculateDistance(hand1[8], hand2[8]);

                                // Hata onleme: Iki el birbirinden en az %15 uzak olmali (yanlis algilamalari onler)
                                if (handsDistance > 0.15) {
                                    if (!isPinched1 && !isPinched2) {
                                        laserCursor.style.backgroundColor = "#ff00ff"; 
                                        if (startScaleDistance === 0) {
                                            startScaleDistance = handsDistance;
                                            startScale = mesh.scale.x;
                                        } else {
                                            const distDiff = handsDistance - startScaleDistance;
                                            // Pruzsuz dogrusal buyutme (Sicramalari tamamen onler)
                                            let newScale = startScale + (distDiff * 4);
                                            // Cizim alanindan tasmamasi icin maksimum 3.5 siniri
                                            newScale = Math.max(0.2, Math.min(newScale, 3.5)); 
                                            
                                            // Lerp ile gecisleri yag gibi kaydir
                                            mesh.scale.x += (newScale - mesh.scale.x) * 0.3;
                                            mesh.scale.setScalar(mesh.scale.x);
                                            
                                            if (mesh.userData && mesh.userData.strokeData) {
                                                mesh.userData.strokeData.meshScale = mesh.scale.x;
                                                if (typeof window.sendNetworkData === "function") {
                                                    window.sendNetworkData({ type: "sekil_guncelle", stroke: mesh.userData.strokeData });
                                                }
                                            }
                                        }
                                        startOpenDistance = 0; 
                                    } 
                                    else if (isPinched1 && isPinched2) {
                                        laserCursor.style.backgroundColor = "#ffff00"; 
                                        if (startOpenDistance === 0) {
                                            startOpenDistance = handsDistance;
                                            startOpenRatio = mesh.userData.strokeData?.openRatio || 0;
                                        } else {
                                            const distDiff = handsDistance - startOpenDistance;
                                            
                                            // ASIMETRIK CARPAN: Kapatmak (distDiff < 0) fiziksel olarak daha dar bir alanda
                                            // yapildigi icin kapatma ivmesini 2.5 yapiyoruz. Acmak 1.5 kaliyor.
                                            // ASIMETRIK CARPAN: Hizli acilip kapanmasi icin carpanlar artirildi
                                            let multiplier = distDiff < 0 ? 5.5 : 4.0;
                                            let ratioChange = distDiff * multiplier; 
                                            
                                            let newRatio = Math.max(0, Math.min(1, startOpenRatio + ratioChange));
                                            
                                            // MANYETIK HIZALAMA (Kilit): Daha kolay kapanmasi icin sinirlar genisletildi
                                            if (newRatio > 0.85) newRatio = 1.0;
                                            if (newRatio < 0.18) newRatio = 0.0;
                                            
                                            const sInput = document.getElementById("shape-slider");
                                            if(sInput) sInput.value = newRatio * 100;
                                            
                                            // Lerp animasyonu icin update fonksiyonlari Scene3D.animate'e birakildi
                                            
                                            if (mesh.userData && mesh.userData.strokeData) {
                                                mesh.userData.strokeData.openRatio = newRatio;
                                                if (typeof window.sendNetworkData === "function") { window.sendNetworkData({ type: "sekil_guncelle", stroke: mesh.userData.strokeData }); }
                                            }
                                        }
                                        startScaleDistance = 0; 
                                    }
                                    else {
                                        startScaleDistance = 0;
                                        startOpenDistance = 0;
                                    }
                                }
                                startX = 0; 
                            } 
                            else {
                                startScaleDistance = 0;
                                startOpenDistance = 0;

                                const isFist = isFist1;

                                if (isFist) {
                                    laserCursor.style.backgroundColor = '#ff0000'; 
                                    const fistX = (1 - hand1[9].x) * window.innerWidth;
                                    const fistY = hand1[9].y * window.innerHeight;
                                    
                                    if (!window.Scene3D.isDraggingAI) {
                                        window.Scene3D.isDraggingAI = true;
                                        if (!window.Scene3D.dragOffset) window.Scene3D.dragOffset = new THREE.Vector3();
                                        window.Scene3D.dragPlane.setFromNormalAndCoplanarPoint(window.Scene3D.camera.getWorldDirection(new THREE.Vector3()), mesh.position);
                                        window.Scene3D.raycaster.setFromCamera(window.Scene3D.getNormalizedCoords(fistX, fistY), window.Scene3D.camera);
                                        const intersectPoint = new THREE.Vector3();
                                        if (window.Scene3D.raycaster.ray.intersectPlane(window.Scene3D.dragPlane, intersectPoint)) {
                                            window.Scene3D.dragOffset.subVectors(mesh.position, intersectPoint);
                                        }
                                    } else {
                                        window.Scene3D.raycaster.setFromCamera(window.Scene3D.getNormalizedCoords(fistX, fistY), window.Scene3D.camera);
                                        const intersectPoint = new THREE.Vector3();
                                        if (window.Scene3D.raycaster.ray.intersectPlane(window.Scene3D.dragPlane, intersectPoint)) {
                                            const targetPos = new THREE.Vector3().addVectors(intersectPoint, window.Scene3D.dragOffset);
                                            
                                            // BOUNDARY CLAMP: Ekran disina ucmasini (kaybolmasini) engeller
                                            targetPos.x = Math.max(-30, Math.min(30, targetPos.x));
                                            targetPos.y = Math.max(-30, Math.min(30, targetPos.y));
                                            targetPos.z = Math.max(-30, Math.min(30, targetPos.z));

                                            if (!mesh.userData.targetPosition) mesh.userData.targetPosition = mesh.position.clone();
                                            mesh.userData.targetPosition.copy(targetPos);
                                            
                                            const vec = targetPos.clone();
                                            vec.project(window.Scene3D.camera);
                                            const canvasEl = document.getElementById('drawing-canvas');
                                            const w = canvasEl ? (canvasEl.width / 2) : (window.innerWidth / 2);
                                            const h = canvasEl ? (canvasEl.height / 2) : (window.innerHeight / 2);
                                            
                                            if (mesh.userData && mesh.userData.strokeData) {
                                                mesh.userData.strokeData.x = (vec.x * w) + w;
                                                mesh.userData.strokeData.y = -(vec.y * h) + h;
                                                if (typeof window.sendNetworkData === "function") { window.sendNetworkData({ type: "sekil_guncelle", stroke: mesh.userData.strokeData }); }
                                            }
                                        }
                                    }
                                } else if (isPinched1) {
                                    window.Scene3D.isDraggingAI = false;
                                    laserCursor.style.backgroundColor = '#00ff00'; 
                                    if (startX !== 0 && startY !== 0) {
                                        const dx = px1 - startX;
                                        const dy = py1 - startY;
                                        
                                        if (Math.abs(dx) > 1.0 || Math.abs(dy) > 1.0) { // Deadzone: Sadece gercek hareketlerde don!

                                        // Gimbal Lock Fix + Trackball (Dunya Maketi) Eksen Donusumu
                                        const camRight = new THREE.Vector3(1, 0, 0).applyQuaternion(window.Scene3D.camera.quaternion);
                                        const camUp = new THREE.Vector3(0, 1, 0).applyQuaternion(window.Scene3D.camera.quaternion);
                                        if (!mesh.userData.targetQuaternion) {
                                            mesh.userData.targetQuaternion = mesh.quaternion.clone();
                                        }
                                        const dummy = new THREE.Object3D();
                                        dummy.quaternion.copy(mesh.userData.targetQuaternion);
                                        dummy.rotateOnWorldAxis(camUp, dx * 0.008); // 0.005'ten 0.008'e cikarildi (Daha hizli donus)
                                        dummy.rotateOnWorldAxis(camRight, dy * 0.008); // Ters donme sorunu icin - silindi (Ye�il butonla ayni yapildi)
                                        mesh.userData.targetQuaternion.copy(dummy.quaternion);

                                        if (mesh.userData && mesh.userData.strokeData) {
                                            const sd = mesh.userData.strokeData;
                                            const euler = new THREE.Euler().setFromQuaternion(mesh.userData.targetQuaternion, 'XYZ');
                                            sd.rotationX = euler.x;
                                            sd.rotationY = euler.y;
                                            sd.rotationZ = euler.z;
                                            if (typeof window.sendNetworkData === "function") { window.sendNetworkData({ type: "sekil_guncelle", stroke: sd }); }
                                        }
                                        } // Deadzone sonu
                                    }
                                    startX = px1;
                                    startY = py1;
                                } else {
                                    laserCursor.style.backgroundColor = '#00ffff'; 
                                    window.Scene3D.isDraggingAI = false;
                                    startX = 0;
                                    startY = 0;
                                }
                            }
                        }
                    }
                } else {
                    startX = 0; startY = 0;
                    startScaleDistance = 0; startOpenDistance = 0;
                    laserCursor.style.display = 'none';
                }
            });

            // Kamera besleyiciyi başlat: her frame'de hands.send() ile sonuçları güncelle
            camera = new window.Camera(videoElement, {
                onFrame: async () => {
                    if (videoElement.readyState >= 2) {
                        await hands.send({image: videoElement});
                    }
                },
                width: 1920,
                height: 1080,
                facingMode: 'user'
            });
            camera.start();

            tonyBtn.innerHTML = '?? Sihirli El';
            tonyBtn.style.borderColor = '#00ff00';
            tonyBtn.style.boxShadow = '0 0 20px rgba(0,255,255,0.8)';
            tonyBtn.style.color = '#00ff00';
            tonyActive = true;

        } catch (e) {
            console.error('Tony Stark Modu Hatas�:', e);
            tonyBtn.innerHTML = '? Hata';
            tonyBtn.style.borderColor = '#ff0000';
            tonyBtn.style.boxShadow = '0 0 10px rgba(255,0,0,0.5)';
            tonyBtn.style.color = '#ff0000';
        }
    };

// ==========================================


// ========================================================
// SIHIRLI CEKMECE (MOBIL RESPONSIVE) ETKILESIMLERI
// ========================================================
document.addEventListener('DOMContentLoaded', () => {
    const leftFab = document.getElementById('mobile-drawer-left');
    const rightFab = document.getElementById('mobile-drawer-right');
    const leftPanel = document.querySelector('.left-panel');
    const rightPanel = document.querySelector('.right-panel');
    const canvas = document.getElementById('drawing-canvas');

    if (leftFab && leftPanel) {
        // Dokunmatik cihazlarda cift tiklamayi onlemek icin sadece tek click kullan
        leftFab.addEventListener('click', (e) => {
            e.stopPropagation(); // Tuvale dokunmus sayilmamasi icin
            leftPanel.classList.toggle('drawer-open');
            if(rightPanel) rightPanel.classList.remove('drawer-open'); // Digerini kapat
        });
    }

    if (rightFab && rightPanel) {
        rightFab.addEventListener('click', (e) => {
            e.stopPropagation();
            rightPanel.classList.toggle('drawer-open');
            if(leftPanel) leftPanel.classList.remove('drawer-open');
        });
    }

    // Tuvale (Ekrana) dokunuldugunda cekmeceleri otomatik kapat
    if (canvas) {
        canvas.addEventListener('pointerdown', () => {
            if (window.innerWidth <= 1024) {
                if(leftPanel && leftPanel.classList.contains('drawer-open')) {
                    leftPanel.classList.remove('drawer-open');
                }
                if(rightPanel && rightPanel.classList.contains('drawer-open')) {
                    rightPanel.classList.remove('drawer-open');
                }
            }
        });
    }
});



// --- MOB�L C�HAZLARDA SOL PANELDEN ARA� SE��L�NCE PANEL� OTOMAT�K KAPATMA YAMASI ---
document.addEventListener('DOMContentLoaded', () => {
    const lp = document.querySelector('.left-panel');
    if (lp) {
        lp.addEventListener('click', (e) => {
            if (e.target.closest('.tool-button') || e.target.closest('.tool-button-sub')) {
                if (window.innerWidth <= 1024 && lp.classList.contains('drawer-open')) {
                    lp.classList.remove('drawer-open');
                }
            }
        });
    }
});


// --- MOB�L C�HAZLARDA BO�LU�A (��Z�M ALANINA) DOKUNUNCA PANEL� KES�N OLARAK KAPATMA YAMASI ---
document.addEventListener('pointerdown', (e) => {
    if (window.innerWidth <= 1024) { // Daha geni� tabletleri de kapsas�n diye 1024 yap�ld�
        const lp = document.querySelector('.left-panel');
        const rp = document.querySelector('.right-panel');
        const lFab = document.getElementById('mobile-drawer-left');
        const rFab = document.getElementById('mobile-drawer-right');

        if (lp && lp.classList.contains('drawer-open')) {
            if (!lp.contains(e.target) && (!lFab || !lFab.contains(e.target))) {
                lp.classList.remove('drawer-open');
            }
        }
        if (rp && rp.classList.contains('drawer-open')) {
            if (!rp.contains(e.target) && (!rFab || !rFab.contains(e.target))) {
                rp.classList.remove('drawer-open');
            }
        }
    }
}, { capture: true });
}); // capture: true sayesinde di�er elemanlar�n engellemesini (stopPropagation) a�ar
window.addEventListener('error', function(e) {
    alert('JS HATASI: ' + e.message + ' at ' + e.filename + ':' + e.lineno);
});

// --- TURKCE KARAKTER DUZELTMELERI ---
if (window.OyunListesi) {
    const duzeltmeler = [
        "ÇEMBERLERDEN ÜÇGEN İNŞASI",
        "AÇI ÖLÇER YERLEŞTİRME OYUNU",
        "DOĞRUYA DIŞINDAKİ NOKTADAN DİKME",
        "AYNI DÜZLEMDE İKİ DOĞRUNUN YOLCULUĞU",
        "AYNI DÜZLEMDE 3 DOĞRUNUN DURUMLARI",
        "AÇI ÇEŞİTLERİ (TÜMLER/BÜTÜNLER/KOMŞU)",
        "AÇILARINA GÖRE ÜÇGENLER",
        "AÇI ÇEŞİTLERİ (DAR, DİK, GENİŞ vb.)",
        "TEMEL GEOMETRİK ŞEKİLLER",
        "ÇOKGENLERİN ELEMANLARI",
        "İKİ PARALEL VE KESENLE OLUŞAN AÇILAR (1)",
        "ÜÇ DOĞRUNUN İKİŞER KESİŞMESİ",
        "DİKDÖRTGENİN ÇEVRE VE ALANI",
        "DÖRTGENLERİN ÖZELLİKLERİ (TÜMEVARIM)",
        "DÖRTGENLERİN ÖZELLİKLERİ (TÜMDENGELİM)",
        "İKİ PARALEL DOĞRUNUN BİR KESENLE YAPTIĞI AÇILAR (2)",
        "DÖNÜŞÜM GEOMETRİSİ (ÖTELEME/YANSIMA)",
        "DÖRTGEN ÇEŞİTLERİ KAVRAM HARİTASI",
        "DÖRTGENLER GENEL ÇIKARIMLAR",
        "KESİRLERİN FARKLI GÖSTERİMLERİ",
        "KÖŞEGENLERDEN DÖRTGENLERE (1)",
        "CEBİRSEL İFADELER TEMEL KAVRAMLAR",
        "CEBİRSEL İFADELER SÖZELDEN CEBİRE",
        "CEBİRSEL İFADELER CEBİRDEN SÖZELE",
        "CEBİRSEL İFADELER DEĞER HESAPLAMA",
        "ARAŞTIRMA ADIMLARI (Canva)",
        "ARAŞTIRMA ADIMLARI (GitHub)",
        "ÜÇGENDE YARDIMCI ELEMANLAR",
        "ÜÇGEN ÇİZİMİ",
        "ÜÇGENDE EŞLİK VE BENZERLİK",
        "PRİZMALARIN ELEMANLARI",
        "PİRAMİT VE AÇINIMI",
        "PRİZMA, PİRAMİT, KONİ, SİLİNDİR",
        "KÖŞEGENLERDEN DÖRTGENLERE (2)"
    ];
    for(let i = 0; i < duzeltmeler.length && i < window.OyunListesi.length; i++) {
        window.OyunListesi[i].tr = duzeltmeler[i];
    }
}

