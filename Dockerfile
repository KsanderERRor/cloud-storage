FROM node:latest

 RUN mkdir -p /app
 WORKDIR /app
 
 COPY package.json /app
 COPY src/ /app
 RUN npm install

 COPY . /app

 EXPOSE 5200:5200
 
 ENTRYPOINT ["node"]

 CMD ["app.js"]