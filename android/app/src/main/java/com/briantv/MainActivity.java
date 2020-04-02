package com.briantv;

import android.content.Intent;
import com.facebook.react.ReactActivity;
import android.os.Bundle; // for react-native-splash-screen
import org.devio.rn.splashscreen.SplashScreen; // for react-native-splash-screen

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "briantv";
  }

  /**
   * Handle Receiving Intent from SplashActivity
   */
  @Override
  public void onNewIntent(Intent intent) {
    super.onNewIntent(intent);
    setIntent(intent);
  }

  /**
   * For react-native-splash-screen
   */
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    SplashScreen.show(this, R.style.SplashTheme);  // here
    super.onCreate(savedInstanceState);
    // super.onCreate(null);
  }
}
