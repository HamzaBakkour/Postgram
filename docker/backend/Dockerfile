# docker/backend/Dockerfile

FROM python:3.10-alpine

WORKDIR /app
ADD ./backend/server/requirements.txt /app/backend/


RUN pip install --upgrade pip
RUN pip install gunicorn
RUN pip install -r backend/requirements.txt

ADD ./docker /app/docker
ADD ./backend /app/backend

USER root
RUN chmod 701 /app/docker/backend/wsgi-entrypoint.sh
