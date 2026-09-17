$appJsBytes = [System.IO.File]::ReadAllBytes('c:\Users\bekir demirel\Desktop\-geobek\app.js')
$appendJsBytes = [System.IO.File]::ReadAllBytes('c:\Users\bekir demirel\Desktop\-geobek\append.js')
$combined = New-Object byte[] ($appJsBytes.Length + $appendJsBytes.Length)
$appJsBytes.CopyTo($combined, 0)
$appendJsBytes.CopyTo($combined, $appJsBytes.Length)
[System.IO.File]::WriteAllBytes('c:\Users\bekir demirel\Desktop\-geobek\app.js', $combined)
Write-Output "Success"
