FROM node
 
WORKDIR /app

RUN npm install --global http-server

CMD ["bash"]