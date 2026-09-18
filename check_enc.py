import chardet
with open('C:/Users/bekir demirel/Desktop/geobek/app.js', 'rb') as f:
    result = chardet.detect(f.read())
print(result)
