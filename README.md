## User Data
```Shell
#!/bin/bash
yum install -y git docker 
systemctl enable --now docker
ssh-keyscan github.com >> ~/.ssh/known_hosts
git clone https://github.com/Coldot/group-chat-single.git
docker build -t chat ./group-chat-single
docker run -d -p 80:3000 --name chat chat
```
