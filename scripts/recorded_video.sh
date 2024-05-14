#!/bin/bash 

cd /var/www/html

mkdir downloads

cd downloads

echo "$(cat /home/ubuntu/bucket_object_url.txt)" > index.html

cd /var/www/html

machine_ip=$(curl ipconfig.io)

sed -i "s/EC2-INSTANCE-IP/$machine_ip/g" index.html


rm -rf /home/ubuntu/bucket_object_url.txt
