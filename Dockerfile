FROM node:latest  
 
WORKDIR /app
 
COPY "./client/package.json" package.json
 
RUN npm install
 
COPY ./client .
 
CMD [ "npm", "run", "dev" ]