package com.c6;

import com.c6.jxhelper.JXHelperPackage;
import com.c6.marqueeLabel.RCTMarqueeLabelPackage;
import com.c6.openapp.OpenAppPackage;
import com.facebook.react.ReactApplication;

import fr.greweb.reactnativeviewshot.RNViewShotPackage;

import com.jadsonlourenco.RNShakeEvent.RNShakeEventPackage;
import com.microsoft.codepush.react.CodePush;
import com.remobile.toast.RCTToastPackage;

import fr.greweb.reactnativeviewshot.RNViewShotPackage;

import com.jadsonlourenco.RNShakeEvent.RNShakeEventPackage;
import com.microsoft.codepush.react.CodePush;
import com.remobile.toast.RCTToastPackage;
import com.microsoft.codepush.react.CodePush;

import android.app.Application;

import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.jadsonlourenco.RNShakeEvent.RNShakeEventPackage;
import com.remobile.toast.RCTToastPackage;
import com.tendcloud.tenddata.TCAgent;
import com.umeng.analytics.MobclickAgent;
import com.zmxv.RNSound.RNSoundPackage;

import java.util.Arrays;
import java.util.List;

import cn.jpush.android.api.JPushInterface;
import fr.greweb.reactnativeviewshot.RNViewShotPackage;

public class MainApplication extends Application implements ReactApplication {

    private static CodePush codePush;

    @Override
    public void onCreate() {
        super.onCreate();
        JPushInterface.setDebugMode(true);
        JPushInterface.init(this);
        TCAgent.LOG_ON = true;
        TCAgent.init(this);
        // 如果已经在AndroidManifest.xml配置了App ID和渠道ID，调用TCAgent.init(this)即可；或与AndroidManifest.xml中的对应参数保持一致。
        TCAgent.setReportUncaughtExceptions(true);
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
                    new RNViewShotPackage(),
                    new RNShakeEventPackage(),
                    CodePush.getCodePush(getApplicationContext().getString(R.string.code_push_key), getApplicationContext(), BuildConfig.DEBUG, getApplicationContext().getString(R.string.code_push_server)),
                    new RCTToastPackage(),
                    new OpenAppPackage(),
                    new RCTMarqueeLabelPackage(),
                    new JXHelperPackage(),
                    new RNSoundPackage()
            );
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

}
