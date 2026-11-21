FROM nginx@sha256:84f7876d21d154885f99554d7ae325d8c2213f9169726ea7ab60642f2573a787
WORKDIR /usr/share/nginx/html
# docker build is expected to be run with the root of the repository as the build context
COPY ./docs .
EXPOSE 80
