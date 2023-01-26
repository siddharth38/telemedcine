# Telemedicine
Telemedicine portal modified for the project with Dr. Sumit Kalra at IIT Jodhpur

Staging servers : `ubuntu@3.13.75.55`, `34.131.129.247`

Production server : `3.135.245.234`

Mongodb uri : `mongodb://localhost:27017/covid`

Mongodb shell : `mongosh`

Frontend port : `3001`

Backend port for chat : `3000`

Admin username and passwordd for default should be `admin` and `pass` respectively.

In `frontent/package.json` set `"proxy": "http://localhost:3000"` at the bottom of the file if chatbox does not load on home screen

To connect with staging server `ssh -i path_to_.ssh/id_rsa ubuntu@3.13.75.55` usually path to .ssh is `C:\Users\user\`

To connect with 2nd staging server `ssh -i manik_aws_1.pem ec2-user@ec2_instance_dns` from the directory.

### How do I get set up?
* **Summary of set up**
1. Install MongoDB
2. Insall NodeJS - v16.15.1
3. Install nginx on server
4. Install pm2 on server
5. Install redis
6. **Start them**

* **Dependencies**
1. In package.json
2. MongoDB
3. nginx
4. nodejs
5. pm2
6. redis

### Deployment instructions
**Backend**
1. On local machine, go to 'backend/' and run `scp -i path_to_.ssh/id_rsa -r ./app.js ./bin ./chat ./data ./helper ./models ./routes ./package.json ./package-lock.json ubuntu@3.13.75.55:sync` to move the backend files to the sync folder on the staging server.
2. Manually backup the respective folders from `server/` to `server-bkp` 
3. Manually move the new files from `sync` to `server` after deleting only the respective old code files from `server/`.
4. Empty the contents of `sync`
5. Only for starting fresh, use `pm2 --name ent start npm -- start`.
6. Run `pm2 list` to show the running processes. This is project is process `ent` and should be running at id `3`.
7. Run `pm2 restart 3` to restart the process and for updates. 
8. A similar method can be used to deploy from staging to production server.

**Frontend**
1. On local machine, go to `frontend/`
2. If needed, remove ` && del build\static\js\*.map build\static\css\*.map` form the `scripts/build` in the `package.json`
3. In `frontent/package.json` set `"proxy": ""` at the bottom of the file
4. Build the `frontend` using `npm run build` on windows and `npm run build-linux` on linux
5. Push the contents of the `./build` to `sync/` using `scp -i path_to_.ssh/id_rsa -r ./build/* ubuntu@3.13.75.55:sync`. Make sure that `sync` is empty before this.
6. Move the contents from `sync` to `/var/www/html/` using `sudo cp -r sync/* /var/www/html/`. This is the default lookup location for nginx.
7. Stop nginx using `sudo systemctl stop nginx`
8. Setup `/etc/nginx/sites-available/default`. **Note:** Don't copy the entire default file, only the relevant content
9. Run `sudo systemctl daemon-reload` to delete the previous configuration created by generators, re-run all generators, and cause systemd to reload units from disk
10. `sudo systemctl start nginx`


### How to run tests
1. On local machine, go to `backend/` and run using `package.json` or by using `backend/bin/www` whichever works for you.
2. On local machine, go to `frontend/` and run using `package.json` or by building the `frontend` using `npm run build`.
3. For logs refer to `~/.pm2/logs/www-error-0.log` and `~/.pm2/logs/www-out-0.log`

# Routes, links and ports
1. Backend : 3000
2. Development frontend : 3001
3. APIs : 3000/api
4. /doctor/
5. /api/questions
6. /api/hits
7. /admin_dashboard (frontend)
8. /admin/ (backend)
