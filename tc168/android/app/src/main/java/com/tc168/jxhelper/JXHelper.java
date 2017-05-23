package com.tc168.jxhelper;

import android.content.Context;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.telephony.TelephonyManager;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.tc168.util.UpdateManager;

import java.io.UnsupportedEncodingException;
import java.util.UUID;

/**
 * Created by Allen on 2017/2/20.
 */

public class JXHelper extends ReactContextBaseJavaModule {
    Context context;

    public JXHelper(ReactApplicationContext reactContext) {
        super(reactContext);
        this.context = reactContext;
    }

    @Override
    public String getName() {
        return "JXHelper";
    }

    @ReactMethod
    public void getCFUUID(Callback resultCallback) {
        TelephonyManager TelephonyMgr = (TelephonyManager) context.getSystemService(Context.TELEPHONY_SERVICE);
        String szImei = TelephonyMgr.getDeviceId();
        String res = null;
        try {
            res = UUID.nameUUIDFromBytes(szImei.getBytes("utf8")).toString();
        } catch (Exception e) {
        }
        if (res == null) {
            res = UUID.randomUUID().toString();
        }

        resultCallback.invoke("deviceId", res);
    }

    @ReactMethod
    public void getVersionCode(Callback resultCallback) {
        String versionName = getPackageInfo(context).versionName;
        if (versionName != null && versionName != "") {
            resultCallback.invoke(versionName);
        }
    }

    private static PackageInfo getPackageInfo(Context context) {
        PackageInfo pi = null;

        try {
            PackageManager pm = context.getPackageManager();
            pi = pm.getPackageInfo(context.getPackageName(),
                    PackageManager.GET_CONFIGURATIONS);

            return pi;
        } catch (Exception e) {
            e.printStackTrace();
        }

        return pi;
    }

    @ReactMethod
    public void updateApp(String url) {
        UpdateManager updateManager = new UpdateManager(getCurrentActivity());
        updateManager.setUrl(url);
        updateManager.update();
    }
}
