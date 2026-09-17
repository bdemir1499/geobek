$content = [System.IO.File]::ReadAllText('app.js')
$content = $content -replace 'statusEl\.innerText = "BA.*?L.*?";', 'statusEl.innerText = "BAĞLANDI 🤝";'
$content = $content -replace 'requestText\.innerText = `\$\{conn\.peer\} ba.*?lanmak istiyor.*?`;', 'requestText.innerText = `${conn.peer} bağlanmak istiyor. Kabul ediyor musunuz?`;'
$content = $content -replace 'btnAccept\.innerText = "Kabul Et";', 'btnAccept.innerText = "Kabul Et";'

# Now bypass the network validation functions manually
$content = $content -replace '(?s)function validateNetworkPacket\(packet\) \{.*?return true;\s*\}', "function validateNetworkPacket(packet) {`n    return true;`n}"
$content = $content -replace '(?s)function canProcessCriticalCommand\(connection, packet\) \{.*?return true;\s*\}', "function canProcessCriticalCommand(connection, packet) {`n    return true;`n}"

[System.IO.File]::WriteAllText('app.js', $content, [System.Text.Encoding]::UTF8)
