#!/bin/bash

last_dname=""
for file in $(find src/ -type f -iname '*.ts')
do
  dname=$(dirname $file)
  fname=$(basename $file)
  fname=${fname::-3}

  if [ "$dname" != "$last_dname" ]; then
    index_file="$dname/index.ts"
    > $index_file
    last_dname=$dname
  fi

  if [ "$fname" != "index" ]; then 
    echo "export * from './$fname'" >> $index_file
  fi
done
