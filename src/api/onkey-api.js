import {ApiBase} from "./api-base";
import {inject} from 'aurelia-framework';
import {ResourceApi} from "./resources/resource-api";
import {ResourceDefaultActions} from "./resources/resource-actions";

/**
 * mediator api class for the UI to consume REST services from the On Key Server
 * Primary Api:
 * getResource: gets metadata merged from get and update + data for record with id
 *              if id null, then merges get and create with empty data model
 * saveResource: saves record by resource name and id
 *               if no id, Post is used, else patch resource call
 * getResourceList: TBD
 */
@inject(ResourceApi)
export class OnKeyApi extends ApiBase {

    constructor(resourcesApi) {
        super();
        this.resources = resourcesApi;
    }

    getResourceRegistry() {
        return this.resources.getResourceRegistry();
    }

    getResourceMetadata(name) {
        return this.resources.getResourceMetadata(name);
    }

    getResourceList(resourceName, query) {
        return this.resources.getResourceListData(resourceName, query);
    }

    /**
     * Single-entry api method to get a resource data, and the meta-data that describes the validation rules for each
     * property.
     * @param resourceName: The name of the resource as per the resource registry
     * @param id: The id of the resource. If empty, Create / POST action is assumed
     * @returns {Promise}: composite class with a model property (for the data) and a metadata property
     */
    getResource(resourceName, id) {
        let resources = this.resources;
        return new Promise( (resolve, reject) => {
            //TODO MJ: delete scenario??
            const defaultAction = id === null ? ResourceDefaultActions.METHOD_POST() : ResourceDefaultActions.METHOD_PATCH();
            resources.getResourceActionMetadata(resourceName, defaultAction)
                .then((response) => {
                    return response;
                })
                .then((metadata) => {
                    //NOTE: model will be empty if id is empty (TODO: need to generate empty model??)
                    if (defaultAction === ResourceDefaultActions.METHOD_PATCH()) {
                        resources.getResourceItemData(resourceName, id)
                            .then((model) => {
                                resolve({model: model, metadata: metadata});
                            });
                    } else {
                        // const createModel = self.generateModelFromMetadata(metadata);
                        resolve( {model: null, metadata: metadata});
                    }
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    saveResourceData(resourceName, resourceData, id) {
        return this.resources.saveResourceItemData(resourceName, resourceData, id);
    }

    getResourceItemData(resourceName, id) {
        return this.resources.getResourceItemData(resourceName, id);
    }

    // getTemplate(resourceName, profileId) {
    //     //TODO: Implement
    //     return null;
    // }
    //
    // saveTemplate(resourceName, templateName, profileId) {
    //     //TODO: Implement
    //     return null;
    // }

}
