
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
