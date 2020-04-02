package com.briantv;

import android.content.Intent;
import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;

public class SplashActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // for fcm getting onNotificationOpen handlers
        // forwards the intent given to Splash Activity to Main Activity
        Intent fcmIntent = this.getIntent();
        Bundle bundle = fcmIntent.getExtras();

        Intent intent = new Intent(this, MainActivity.class);
        intent.putExtras(fcmIntent);
        startActivity(intent);
        finish();
    }
}
