FROM ubuntu:focal as build

WORKDIR /home/node/app

COPY --chown=node ./ ./

RUN apt-get update && apt-get upgrade -y && apt-get install curl -y
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash - 
RUN curl -s https://install.speedtest.net/app/cli/install.deb.sh | bash
RUN apt-get install nodejs speedtest -y
RUN npm i -g yarn
RUN yarn install

CMD [ "node", "index.js" ]
