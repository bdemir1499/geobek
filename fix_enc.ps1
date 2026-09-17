$text = [System.IO.File]::ReadAllText('app.js', [System.Text.Encoding]::GetEncoding(1254))
[System.IO.File]::WriteAllText('app.js', $text, [System.Text.Encoding]::UTF8)
