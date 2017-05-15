import {bindable, inject} from 'aurelia-framework';
import {OnKeyApi} from "../../api/onkey-api";
import {ViewBase} from "../view-base";
import {Router} from "aurelia-router";
import {NavigationRoutes} from "../navigation-routes";


@inject(OnKeyApi, Router)
export class Resources extends ViewBase {
    @bindable resourceList = [];

    constructor(onKeyApi, router) {
        super(router);
        this.onKeyApi = onKeyApi;
    }

    activate() {
        this.fetchResourceRegistry();
    }

    fetchResourceRegistry() {
        this.onKeyApi.getResourceRegistry()
            .then((response) => {
                this.resourceList = response;
                console.log(`VIEW: fetched ${this.resourceList.length} resources`);
            })
            .catch(error => {
                console.log('VIEW: error fetching assets: ' + error);
            });
    }

    viewResourceList(name) {
        const route = NavigationRoutes.ResourceList();
        this.navigateWithArgs(route, {name: name});
    }
}
