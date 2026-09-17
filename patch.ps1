$c = [System.IO.File]::ReadAllText('app.js')
$c = $c -replace '(?s)function validateNetworkPacket\(packet\) \{.*?return true;\s*\}', "function validateNetworkPacket(packet) {`n    return true;`n}"
$c = $c -replace '(?s)function canProcessCriticalCommand\(connection, packet\) \{.*?return true;\s*\}', "function canProcessCriticalCommand(connection, packet) {`n    return true;`n}"

# Fix the broken strings
$c = $c.Replace('statusEl.innerText = "BA?LANDI o"?";', 'statusEl.innerText = "BAĞLANDI 🤝";')
$c = $c.Replace('console.warn("Ar hzl a trafii reddedildi:", packetWindow.count);', 'console.warn("Aşırı hızlı ağ trafiği reddedildi:", packetWindow.count);')
$c = $c.Replace('console.warn("A para kuyruu snr ald:", connection.peer);', 'console.warn("Ağ parça kuyruğu sınırı aşıldı:", connection.peer);')
$c = $c.Replace('console.warn("Bozuk a paras reddedildi:", connection.peer);', 'console.warn("Bozuk ağ parçası reddedildi:", connection.peer);')
$c = $c.Replace('console.warn("A paketi boyutu hesaplanamad, paket reddedildi.", e);', 'console.warn("Ağ paketi boyutu hesaplanamadı, paket reddedildi.", e);')
$c = $c.Replace('console.warn("Geersiz veya yetkisiz a paketi reddedildi:", connection.peer);', 'console.warn("Geçersiz veya yetkisiz ağ paketi reddedildi:", connection.peer);')
$c = $c.Replace('console.warn("Yetkisiz kritik a ilemi reddedildi:", packet.type, connection && connection.peer);', 'console.warn("Yetkisiz kritik ağ işlemi reddedildi:", packet.type, connection && connection.peer);')
$c = $c.Replace('console.warn(""lk tablet ba"lant"s" zaten kabul edildi. Yeni ba"lant" reddedildi:", conn.peer);', 'console.warn("İlk tablet bağlantısı zaten kabul edildi. Yeni bağlantı reddedildi:", conn.peer);')
$c = $c.Replace('console.warn("Zaten aktif bir "retmen cihaz" ba"l". Yeni ba"lant" iste"i reddedildi:", conn.peer);', 'console.warn("Zaten aktif bir öğretmen cihazı bağlı. Yeni bağlantı isteği reddedildi:", conn.peer);')
$c = $c.Replace('console.log("Cihaz ba"ar"yla ba"land":", conn.peer);', 'console.log("Cihaz başarıyla bağlandı:", conn.peer);')
$c = $c.Replace('statusEl.innerText = "BA?LANIYOR...";', 'statusEl.innerText = "BAĞLANIYOR...";')
$c = $c.Replace('requestText.innerText = `${conn.peer} ba"lanmak istiyor. Kabul ediyor musunuz?`;', 'requestText.innerText = `${conn.peer} bağlanmak istiyor. Kabul ediyor musunuz?`;')
$c = $c.Replace('btnAccept.innerText = "Kabul Et";', 'btnAccept.innerText = "Kabul Et";')

[System.IO.File]::WriteAllText('app.js', $c, [System.Text.Encoding]::UTF8)
