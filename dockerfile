FROM node:8.12.0

# Use wget to download file *.tar.gz
# RUN apt-get update && apt-get install -y wget

ENV DOCKERIZE_VERSION v0.5.0
ENV IS_DOCKER true
ENV ES_HOST elasticsearch

COPY ./resource/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz .

RUN tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install --verbos
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

RUN npm run build

EXPOSE 3000

CMD dockerize -wait tcp://elasticsearch:9200 -timeout 5m && \
    npm run elastic:init && \
    npm run production