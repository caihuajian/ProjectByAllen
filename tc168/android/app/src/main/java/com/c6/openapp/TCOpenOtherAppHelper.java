package com.c6.openapp;

import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.widget.Toast;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Created by Allen on 2016/12/30.
 */

public class TCOpenOtherAppHelper extends ReactContextBaseJavaModule {
    private Context context;

    public TCOpenOtherAppHelper(ReactApplicationContext reactContext) {
        super(reactContext);
        this.context = reactContext;
    }

    @Override
    public String getName() {
        return "TCOpenOtherAppHelper";
    }



    @ReactMethod
    public void openWeiXin() {
        try {
            PackageManager packageManager = context.getApplicationContext().getPackageManager();
            Intent intent = packageManager.getLaunchIntentForPackage("com.tencent.mm");
            context.startActivity(intent);
        } catch (Exception e) {
            Toast.makeText(context,"请安装微信应用!",Toast.LENGTH_SHORT).show();
        }
    }

    @ReactMethod
    public void openAlipay() {
        try {
            PackageManager packageManager = context.getApplicationContext().getPackageManager();
            Intent intent = packageManager.getLaunchIntentForPackage("com.eg.android.AlipayGphone");
            context.startActivity(intent);
        } catch (Exception e) {
            Toast.makeText(context,"请安装支付宝应用!",Toast.LENGTH_SHORT).show();
        }
    }
}
