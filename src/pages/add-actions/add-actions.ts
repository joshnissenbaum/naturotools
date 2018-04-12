import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController, ViewController} from 'ionic-angular';

import {DispensaryProvider} from '../../providers/dispensary/dispensary';

/**
 * Generated class for the AddActionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-add-actions',
    templateUrl: 'add-actions.html',
})
export class AddActionsPage {

    actions: any = [];

    constructor(public navCtrl: NavController,
                public  navParams: NavParams,
                public viewCtrl: ViewController,
                public toastCtrl: ToastController,
                public dispensaryProvider: DispensaryProvider)
    {
        this.actions = this.navParams.get('actions');
    }

    ionViewDidLoad() {

    }

    close() {
        this.viewCtrl.dismiss(this.actions);
    }

    addAction(id, name) {
        this.actions.push(id);
        this.toastCtrl.create({
            message: name + ' has been added to the search.',
            duration: 1000,
            position: 'bottom'
        }).present();
    }
}
