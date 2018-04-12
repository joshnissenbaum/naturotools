import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

import {LaunchReview} from '@ionic-native/launch-review';
import {EmailComposer} from '@ionic-native/email-composer';

/**
 * Generated class for the HelpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-help',
    templateUrl: 'help.html',
})
export class HelpPage {

    constructor(public navCtrl: NavController, public navParams: NavParams, private launchReview: LaunchReview, private emailComposer: EmailComposer) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad HelpPage');
    }

    feedbackRating() {
        const appId: string = '1014815805';
        this.launchReview.launch(appId)
            .then(() => console.log('Successfully launched store app'));
    }

    emailFeedback() {
        let email = {
            to: 'support@herbalpro.info',
            subject: 'Herbal Pro (App) Feedback',
            body: '',
            isHtml: false
        };

        // Send a text message using default options
        this.emailComposer.open(email);
    }

}
