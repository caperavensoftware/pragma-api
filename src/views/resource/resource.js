import {bindable, inject} from 'aurelia-framework';
import {OnKeyApi} from "../../api/onkey-api";
import {ViewBase} from "../view-base";
import {Router} from "aurelia-router";

@inject(OnKeyApi, Router)
export class Resource extends ViewBase {

    @bindable resourceMetadata = [];
    @bindable model;
    resourceId;


    constructor(onKeyApi, router) {
        super(router);
        this.onKeyApi = onKeyApi;
        this.JUMA_ID = '5000001001';
        this.resourceId = null;
    }
    activate(args) {
        this.resourceName = args.name;
        this.resourceId = args.id ? args.id : this.JUMA_ID;

        //GET THE METADATA AND MODEL IN A SINGLE CALL
        this.onKeyApi.getResource(this.resourceName, this.resourceId)
            .then((response) => {
                this.resourceMetadata = response.metadata;
                this.model = response.model;
            }).catch(error => {
            console.log('error fetching resource metadata & data: ' + error);
        });
    }

    saveModel() {
        this.onKeyApi.saveResourceData(this.resourceName, this.model, this.resourceId)
            .then(() => {
                alert("save call completed");
            }).catch(error => {
            alert("Error" + error);
        });
    }

}
