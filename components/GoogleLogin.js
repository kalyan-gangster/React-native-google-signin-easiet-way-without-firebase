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