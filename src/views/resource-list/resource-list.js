

import {bindable, inject} from 'aurelia-framework';
import {OnKeyApi} from "../../api/onkey-api";
import {ViewBase} from "../view-base";
import {Router} from "aurelia-router";


@inject(OnKeyApi, Router)
export class ResourceList extends ViewBase {
    @bindable resourceList = [];
    @bindable selectedId = null;

    constructor(onKeyApi, router) {
        super(router);
        this.onKeyApi = onKeyApi;
    }

    activate(args) {
        this.resourceName = args.name;
        //GET THE METADATA AND MODEL IN A SINGLE CALL
        this.fetchResourceList();
    }

    fetchResourceList() {

        this.onKeyApi.getResourceList(this.resourceName, null)
            .then((response) => {
                this.resourceList = response.items.slice(0, 20); //only the first 20 records
                if (this.resourceList.length > 0) {
                    this.selectedId = this.resourceList[0].properties.id;
                }
                console.log(`VIEW: fetched ${this.resourceList.length} resources`);
            })
            .catch(error => {
                console.log('VIEW: error fetching assets: ' + error);
            });
    }

    viewResource() {
        this.navigateWithArgs("resource", {name: this.resourceName, id: this.selectedId});
    }
}