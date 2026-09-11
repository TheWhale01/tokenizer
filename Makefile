NETWORK=bscTestnet
CODE_PATH=code
DEPLOYMENT_PATH=deployment

all: compile test

compile:
	cd code && npx hardhat compile

test:
	cd code && npx hardhat test

deploy: compile
	ln -fs ${PWD}/${CODE_PATH}/* deployment
	ln -fs ${PWD}/${CODE_PATH}/.env deployment
	cd ${DEPLOYMENT_PATH} && npx hardhat run ./deploy.ts --network ${NETWORK}

verify:
	cd code && npx hardhat verify --network ${NETWORK} $(ADDR)

clean:
	rm -rf ${CODE_PATH}/artifacts ${CODE_PATH}/cache
	rm -rf ${DEPLOYMENT_PATH}/artifacts ${DEPLOYMENT_PATH}/cache

clean_deploy:
	rm ${DEPLOYMENT_PATH}/.env
	find ${DEPLOYMENT_PATH}/* ! -name 'deploy.ts' -print -delete

.PHONY: all compile test deploy verify clean
