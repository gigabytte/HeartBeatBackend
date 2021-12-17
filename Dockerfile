FROM node:16-alpine3.14

WORKDIR /mnt
ADD . /

RUN npm i

ENTRYPOINT [ "npm", "run", "startup" ]