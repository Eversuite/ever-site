#!/bin/bash

API_TOKEN="l3HaoP8CW1oMK1Rdr_Cjy4a_CpfItifczODT4c1H"

uploadFile() {
  filePath="$1"
  fileName="$(basename "$filePath")"
  fileStream="$(cat "$filePath")"

  curl -X POST \
    "https://api.cloudflare.com/client/v4/accounts/3071e5b64f2ee42efd45179dc42fd884/images/v1" \
    -H "Authorization: Bearer $API_TOKEN" \
    -H "Content-Type: multipart/form-data" \
    -F "file=@$filePath" \
    -F "id=$fileName"

  echo "Uploaded $fileName"
}

uploadFiles() {
  dirPath="$1"

  for file in "$dirPath"/*; do
    if [ -d "$file" ]; then
      uploadFiles "$file"
    else
      uploadFile "$file"
    fi
  done
}

uploadFiles "./static"