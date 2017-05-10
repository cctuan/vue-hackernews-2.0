FROM node:boron

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN \
    npm install -g bower && \
    npm install && \
    bower install --allow-root

# Bundle app source
CMD [ "npm", "build" ]

EXPOSE 8080
CMD [ "npm", "start" ]
