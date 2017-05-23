package com.tc168;

import com.facebook.react.ReactApplication;
import com.zmxv.RNSound.RNSoundPackage;
import com.microsoft.codepush.react.CodePush;

import android.app.Application;

import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.jadsonlourenco.RNShakeEvent.RNShakeEventPackage;
import com.remobile.toast.RCTToastPackage;
import com.tc168.jxhelper.JXHelperPackage;
import com.tc168.marqueeLabel.RCTMarqueeLabelPackage;
import com.tc168.openapp.OpenAppPackage;
import com.umeng.analytics.MobclickAgent;

import java.util.Arrays;
import java.util.List;

import cn.jpush.android.api.JPushInterface;
import fr.greweb.reactnativeviewshot.RNViewShotPackage;

public class MainApplication extends Application implements ReactApplication {


    @Override
    public void onCreate() {
        super.onCreate();
        JPushInterface.setDebugMode(true);
        JPushInterface.init(this);
    }


    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

        @Override
        protected String getJSBundleFile() {
            return CodePush.getJSBundleFile();
        }


        @Override
        protected boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }


        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
                    new RNSoundPackage(),
                    new CodePush("VRDcHlSRokyHDWJdm3fX33Sg7ck1EySDzvaNz", getApplicationContext(), BuildConfig.DEBUG),
                    new RNViewShotPackage(),
                    new RNShakeEventPackage(),
                    new RCTToastPackage(),
                    new OpenAppPackage(),
                    new RCTMarqueeLabelPackage(),
                    new JXHelperPackage()
            );
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

}
