FROM python:3.8.3-alpine

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

USER root

# create the appropriate directories
RUN mkdir /app
RUN mkdir -p /app/backend/
RUN mkdir -p /app/docker/
WORKDIR /app

COPY ./backend/requirements.txt /app/backend/
COPY ./docker /app/docker
COPY ./backend /app/backend
COPY ./docker/backend/entrypoint.sh /app/backend/
# COPY ./docker/backend/wsgi-entrypoint.sh /app/backend

RUN pip install --upgrade pip

RUN apk update \
    && apk add postgresql-dev gcc python3-dev musl-dev libjpeg jpeg-dev zlib-dev openjpeg-dev freetype-dev lcms2-dev \
                libxml2 libxml2-dev libxslt libxslt-dev g++
RUN apk add --update --no-cache --virtual .tmp-build-deps \
            postgresql-client \
            libffi-dev \
            # libxml2-dev \
            # libxslt-dev \
            build-base \
            zlib \
            tiff-dev \
            tk-dev \
            tcl-dev \
            harfbuzz-dev \
            fribidi-dev \
            libpq \
            libc-dev \
            linux-headers

RUN pip install -r backend/requirements.txt
RUN apk del .tmp-build-deps
RUN pip install gunicorn
RUN chmod +x /app/backend/entrypoint.sh
RUN chown -R root:root /app/
# that the user can do everything so the owner can do everything
# with the directory can read execute from the directory
RUN chmod -R 755 /app/

# run entrypoint.prod.sh
ENTRYPOINT ["/app/backend/entrypoint.sh"]