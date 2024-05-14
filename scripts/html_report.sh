#! /bin/bash


cd 
sudo rm -rf /var/www/html/*
sudo cp -r /home/ubuntu/newcode/*  /var/www/html/    ## newcode is github repo name 



cd /var/www/html
sudo mv mochawesome-reports/ reports
cd reports/
sudo mv mochawesome.html index.html

