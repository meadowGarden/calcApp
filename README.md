# own cost calculation app

## description
This application is for calculating product material cost.

## deployment
It is assumed that machine which will run application runs on linux. What is more docker should be installed. To chech run commands `docker -v`. If command informs that application is missing run `docker i`.

Steps of application deployment:
- Create folder named **calcApp**, inside it clone repository https://github.com/meadowGarden/calcApp.git
- From folder **templates** move files _.env_, _.env.production_, _deploy.sh_ to parent folder of **calcApp** folder. For  _deploy.sh_ it is neccessacry to update application directory. For server side, _.env_ you need to put proper secret key - 256 bit encryption key and password of database. For client side, _.env.production_ you will need to put your server.
- Change your directory to parent one and use command `bash deploy.sh`.

It should be noted that docker will expose only port 3000 and map it to port 80. If there is a need to expose other ports in can be easily done by uncommenting them in _calcApp.yaml_ file.

## building and runnig a local version
Development version runs on posgresql that means that you need to have it running. Application will run otherwise.
