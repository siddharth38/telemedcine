1 - `uuidgen` : generates random uuid id
2 - `date -u '+%Y-%m-%dT%H:%M:%S.%3NZ'` : generates time stamp of given format

3 - If nginx webserver is using port and you want to stop it
    
    (i) To find the process that's using port 80 -         sudo lsof -i :80
    (ii) You can stop the Nginx web server to free up port you want to use by using the following command -  sudo systemctl stop nginx

