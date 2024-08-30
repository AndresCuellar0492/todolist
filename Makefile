rm-platforms:
	rm -rf ./platforms

clean-all:
	ionic cordova platform rm android
	ionic cordova platform rm ios
#make rm-platforms
	npm cache clean --f
	rm -rf ./node_modules
	rm -rf ./package-lock.json
	rm -rf ./www
	npm i --f
