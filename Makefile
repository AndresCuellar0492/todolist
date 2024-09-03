PLATFORM_DIR=./platforms/android

TARGET_ANDROID_DEVICE := RF8TA16CGVA#192.168.80.12:3333 #RF8TA16CGVA

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


build-android:
ifeq ($(wildcard $(PLATFORM_DIR)),)
	@echo "No se encontró la plataforma Android. Agregando..."
	ionic cordova platform add android
else
	@echo "Plataforma Android encontrada."
endif
	ionic cordova build android
	ionic cordova run android --device


external-android:
	ionic cordova run android --livereload --external --target=$(TARGET_ANDROID_DEVICE)
