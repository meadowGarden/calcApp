# own cost calculation app



## deployment
It is assumed that machine which will run application runs on linux. What is more nginx and docker should be installed. To chech run commands 'nginx -v', 'systemctl nginx status'  and 'docker -v'. If either of those commands informs that application is missing run 'nginx i' for nginx and 'docker i' for docker.

Steps of application deployment:
- Create folder named **calcApp**, inside it clone repository https://github.com/meadowGarden/calcApp.git
- From folder **templates** move files _.env_, _.env.production_, _deploy.sh_ to parent folder of **calcApp** folder. For  _deploy.sh_ it is neccessacry to update application directory. For server side, _.env_ you need to put proper secret key - 256 bit encryption key and password of database. For client side, _.env.production_ you will need to put your server.
- Edit calcApp.conf file in the templates folder. After that move it with command 'mv calcApp.conf /etc/nginx/sites-available/appCalc'
- There will be nginx configuration template file _myapp_ in folder **templates**. 
- Run command 'ls -s /etc/nginx/sites-enabled'
- Change your directory to parent one and use command 'bash deploy.sh'.

## 

## building and runnig a local version
Development version runs on posgresql that means that you need to have it running.




