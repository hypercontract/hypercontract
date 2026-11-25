FROM nginx@sha256:6a3df739b6312289e87d70947d900669c1b3087474ece5814b9c01bbf2e6dde3
WORKDIR /usr/share/nginx/html
# docker build is expected to be run with the root of the repository as the build context
COPY ./docs .
EXPOSE 80
