Remove-Item .\dist\ -Recurse -Force

npm run build -- hypershop --prod
npm run build -- hypercontract --prod

docker build -t hypercontract/docs:latest -f .\Dockerfile.docs .
docker tag hypercontract/docs hypercontract.azurecr.io/docs
docker push hypercontract.azurecr.io/docs

docker build -t hypercontract/hypercontract:latest -f .\Dockerfile.hypercontract .
docker tag hypercontract/hypercontract hypercontract.azurecr.io/hypercontract
docker push hypercontract.azurecr.io/hypercontract

docker build -t hypercontract/hypershop:latest -f .\Dockerfile.hypershop .
docker tag hypercontract/hypershop hypercontract.azurecr.io/hypershop
docker push hypercontract.azurecr.io/hypershop
