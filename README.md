# React-Native Google Sign-in guide (easiest way) without Firebase
## Getting Web Client Id
**1. go to [cloud google](https://console.cloud.google.com "cloud google") next create a oAuth Constant screen**

**2. next Navigate to Credentials and Create Credentials in the oAuth client id choose web Client id and do rest**
## Coding part
## **installing the dependecies**
- **using yarn**
  `yarn add react-native-google-signin`
-  **using npm**
    `npm i --save react-native-google-signin`
## 	Rest
**go to `./android/settings.gradle`**
**and update this**
   `
	 include ':react-native-google-signin', ':app'
	 `
   
  **go to `./android/build.gradle`**
	 **and update this**
   
     buildscript {
      ext {
        buildToolsVersion = "29.0.3"
        minSdkVersion = 21
        compileSdkVersion = 29
        targetSdkVersion = 29
        ndkVersion = "20.1.5948944"
        googlePlayServicesAuthVersion = "17.0.0"// <-- update This
      }
### I am using this as a component
	 
	import React, { useState, useEffect } from 'react';
	import {
	  GoogleSignin,
	  GoogleSigninButton,
	  statusCodes,
	} from 'react-native-google-signin';

	export default function GoogleLogin() {
	  const [user, setuser] = useState({});

	  useEffect(() => {
	    GoogleSignin.configure({
	      webClientId: '', // update your own webClient id
	      offlineAccess: true,
	      forceCodeForRefreshToken: true,
	    });
	    isSignedIn();
	  }, []);

	  const signIn = async () => {
	    try {
	      await GoogleSignin.hasPlayServices();
	      const userInfo = await GoogleSignin.signIn();
	      setuser(userInfo);
	    } catch (error) {
	      console.log(error.message);
	      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
		console.log('user cancelled sign in');
	      } else if (error.code === statusCodes.IN_PROGRESS) {
		console.log('Sign In');
	      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
		console.log('PLAY_SERVICES_NOT_AVAILABLE');
	      } else {
		console.log(error);
	      }
	    }
	  };
	  const getCurrentUserInfo = async () => {
	    try {
	      const userInfo = await GoogleSignin.signInSilently();
	      this.setState({ userInfo });
	      console.log(user);
	    } catch (error) {
	      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
		console.log('SIGN_IN_REQUIRED');
	      } else {
		console.log(error);
	      }
	    }
	  };
	  const signOut = async () => {
	    try {
	      await GoogleSignin.revokeAccess();
	      await GoogleSignin.signOut();
	      this.setState({ user: null });
	    } catch (error) {
	      console.error(error);
	    }
	  };

	  const isSignedIn = async () => {
	    const isSignedIn = await GoogleSignin.isSignedIn();
	    if (!!!isSignedIn) {
	      getCurrentUserInfo();
	    }
	    this.setState({ isLoginScreenPresented: !isSignedIn });
	  };
	  return (
	    <View>
	      <GoogleSigninButton
		style={{ width: 192, height: 48 }}
		size={GoogleSigninButton.Size.Wide}
		color={GoogleSigninButton.Color.Dark}
		onPress={signIn}
	      />
	    </View>
	  );
	}
	
## my App.js code
	
	import React from 'react';
	import { View } from 'react-native';
	import GoogleLogin from './components/GoogleLogin';

	export default function App() {
	  return (
	    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
	      <GoogleLogin />
	    </View>
	  );
	}
