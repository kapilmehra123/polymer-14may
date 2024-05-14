
environment=withpaidfunnel
signup_method=email

cd /home/ubuntu/newcode                                      ## newcode is github repo name 

export DISPLAY=:10.0
echo "$DISPLAY"
sudo chmod 777 /home/ubuntu/newcode/mochawesome-reports      ## new code is github repo name 
sudo chown ubuntu:ubuntu mochawesome-reports
sudo chown ubuntu:ubuntu mochawesome-reports/*

record_start () { 
 kazam --silent &> /dev/null & 
 sleep 1 
 xdotool key 'Super+Ctrl+r'; 
}

record_stop () { 
#  kazam --silent &> /dev/null & 
#  sleep 1 
 xdotool key 'Super+Ctrl+f'; 
}

chrome_stop () {
  xdotool key 'Ctrl+shift+w';
}

record_start


# npm test -- --testcaseMethod ${environment} --signupMethod ${signup_method} || true

npm test || true

chrome_stop

record_stop

kill $(jobs -p) 




