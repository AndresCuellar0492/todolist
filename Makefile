PLATFORM_DIR_ANDROID=./platforms/android
PLATFORM_DIR_IOS=./platforms/ios

TARGET_ANDROID_DEVICE := RF8TA16CGVA#192.168.80.12:3333 #RF8TA16CGVA


clean-all:
	ionic cordova platform rm android
	ionic cordova platform rm ios
	npm cache clean --f
	rm -rf ./node_modules
	rm -rf ./package-lock.json
	rm -rf ./www
	npm i --f


build-android:
ifeq ($(wildcard $(PLATFORM_DIR_ANDROID)),)
	@echo "No se encontró la plataforma Android. Agregando..."
	ionic cordova platform add android
else
	@echo "Plataforma Android encontrada."
endif
	ionic cordova build android
	ionic cordova run android --device


build-ios:
ifeq ($(wildcard $(PLATFORM_DIR_IOS)),)
	@echo "No se encontró la plataforma ios. Agregando..."
	ionic cordova platform add ios
else
	@echo "Plataforma ios encontrada."
endif
	ionic cordova build ios

external-android:
	ionic cordova run android --livereload --external --target=$(TARGET_ANDROID_DEVICE)
