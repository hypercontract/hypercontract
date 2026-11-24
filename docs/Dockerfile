FROM nginx@sha256:c35c59a6a083b2557aaf6e0740b2f4f9fe0e0226544e121498a67d2ec4d14ac9
WORKDIR /usr/share/nginx/html
# docker build is expected to be run with the root of the repository as the build context
COPY ./docs .
EXPOSE 80
