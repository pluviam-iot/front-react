FROM nginx:stable
MAINTAINER Pluviam <nava.mataeus@gmail.com>

RUN apt-get update && apt-get install -y

COPY ./build /usr/share/nginx/html

RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

EXPOSE 80
