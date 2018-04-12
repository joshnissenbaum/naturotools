import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the DispensaryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DispensaryProvider {

    apiURL: string = 'http://app.naturopathictools.com.au/api/';
    herbs: any = [];
    actions: any = [];
    brands: any = [];

    constructor(public http: Http) {
        if (this.herbs.length == 0) {
            this.loadHerbs();
        }

        if (this.actions.length == 0) {
            this.loadActions();
        }

        if (this.brands.length == 0) {
            this.loadBrands();
        }
    }

    loadHerbs() {
        return new Promise((resolve) => {
            this.http.get(this.apiURL + 'herbs')
                .map(res => res.json())
                .subscribe((data) => {
                    this.herbs = data;
                    resolve();
                });
        });
    }

    loadActions() {
        return new Promise((resolve) => {
            this.http.get(this.apiURL + 'actions')
                .map(res => res.json())
                .subscribe((data) => {
                    this.actions = data;
                    resolve();
                });
        });
    }

    loadBrands() {
        return new Promise((resolve) => {
            this.http.get(this.apiURL + 'brands')
                .map(res => res.json())
                .subscribe((data) => {
                    this.brands = data;
                    resolve();
                });
        });
    }

    searchDispensary(brands, actions) {
        let postData = {};

        postData['brands'] = brands;
        postData['actions'] = actions;

        return new Promise((resolve) => {
            this.http.post(this.apiURL + 'search/dispensary', postData)
                .map(res => res.json())
                .subscribe((data) => {
                    resolve(data);
                });
        });
    }
}
