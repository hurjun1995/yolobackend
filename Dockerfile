FROM node:10

## give ownership of the application to the user: joon (and group: joon)
RUN groupadd -g 999 appuser && \
  useradd -r -u 999 -g appuser appuser

ENV HOME=/home/appuser

RUN mkdir -p ${HOME}/yolobackend/node_modules && \
  chown -R appuser:appuser ${HOME}/yolobackend

## user should be root when installing mysql-client
RUN set -ex; \
  apt-get update; \
  apt-get install -y --no-install-recommends \
  mysql-client

USER appuser

## Docker's caching mechanism will help skip reinstalling our node modules
## if package.json isn't modified
COPY package.json ./
COPY yarn.lock ./

## switch user from root to user before running yarn install
##USER joon

## set the working directory
WORKDIR ${HOME}/yolobackend

RUN yarn install

## set env variables
ENV APP=dev
ENV PORT=8080

ENV DB_DIALECT=mysql
ENV DB_HOST=db
ENV DB_PORT=3306
ENV DB_NAME=yolotestdatabase
ENV DB_USER=joon_admin
ENV DB_PASSWORD=DevUser123!#

ENV JWT_ENCRYPTION=SgVkYp3s6v9y$B?E(H+MbQeThWmZq4t7
ENV JWT_EXPIRATION=10000

## copy the application code with the appropriate permission
COPY --chown=appuser:appuser . .

EXPOSE 8080

USER root

CMD ["./docker_entrypoint.sh"]
