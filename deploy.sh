docker kill hypercontract
docker kill hypershop

docker build -t hypercontract/hypercontract:latest -f ./Dockerfile.hypercontract .
docker container rm hypercontract
docker run -d -p 127.0.0.1:8081:80 --name hypercontract --restart always hypercontract/hypercontract:latest

docker build -t hypercontract/hypershop:latest -f ./Dockerfile.hypershop .
docker container rm hypershop
docker run -d -p 127.0.0.1:8082:80 --name hypershop --restart always hypercontract/hypershop:latest

docker images prune
docker container prune