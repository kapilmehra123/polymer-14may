#/bin/bash

set -x

year=$(date +%Y)
month=$(date +%m)
day=$(date +%e | tr -d " ")
hour=$(date +%k | tr -d " ")
timestamp=$(date +%d-%M-%Y_%R)

mv /home/ubuntu/Videos/*.movie /home/ubuntu/Videos/Automated_Run_$timestamp.mp4 || mv /home/ubuntu/Videos/*.mp4 /home/ubuntu/Videos/Automated_Run_$timestamp.mp4

aws s3 cp /home/ubuntu/Videos/*.mp4 s3://polymar-testcase-recordings/$year/$month/$day/$hour/

echo "<a href="https://polymar-testcase-recordings.s3.amazonaws.com/$year/$month/$day/$hour/Automated_Run_$timestamp.mp4"><h1>testcase_automation_result_video</h1></a>" > /home/ubuntu/bucket_object_url.txt

rm -rf /home/ubuntu/Videos/*






