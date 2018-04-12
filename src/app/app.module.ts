import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';

import {HomePage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {DispensaryProvider} from '../providers/dispensary/dispensary';
import {FormulaProvider} from '../providers/formula/formula';

import {EmailComposer} from '@ionic-native/email-composer';
import {LaunchReview} from '@ionic-native/launch-review';

import {HttpModule} from "@angular/http";
import { NewsProvider } from '../providers/news/news';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        TabsPage
    ],
    imports: [
        BrowserModule,
        HttpModule,
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        TabsPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        DispensaryProvider,
        FormulaProvider,
        EmailComposer,
        LaunchReview,
    NewsProvider
    ]
})
export class AppModule {
}
