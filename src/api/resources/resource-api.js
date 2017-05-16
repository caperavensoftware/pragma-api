import {ApiBase} from "../api-base";
import {ResourceMetadataCache} from "./resource-metadata-cache";
import {inject} from 'aurelia-framework';
import {HttpClientFactory} from "./../http/http-client-factory.js";
import {ResourceDefaultActions} from "./resource-actions";

@inject(HttpClientFactory, ResourceMetadataCache)
export class ResourceApi extends ApiBase {

    constructor(httpClientFactory, metadataCache) {
        super(httpClientFactory);
        this.cache = metadataCache;
    }

    getResourceRegistry() {
        const self = this;

        if (this.cache.registryPopulated()) {
            return new Promise(function (resolve) {
                console.log("ResourceApi: registry from CACHE");
                resolve(self.cache.registryItems());
            });
        }
        else {
            return new Promise((resolve, reject) => {

                const httpClient = this.createHttpClient();
                const serviceRoute = ApiBase.BASEURL_GET().concat("resources");

                httpClient.fetch(serviceRoute)
                    .then(response => {
                        response.json().then((resourceList) => {
                            console.log("completed ResourceApi.getResourceRegistry");
                            self.cache.setRegistry(resourceList.items);
                            console.log("ResourceApi: registry from SERVER");
                            resolve(resourceList.items);
                        });
                    })
                    .catch(error => {
                        console.log(`error in ResourcesApi.getResources call: ${error}`);
                        reject(error);
                    });
            });
        }
    }

    /**
     * Gets metadata for a resource action (create, update or delete)
     * Merges the GET metadata with the metadata from PATCH (update) or POST (create)
     * @param name
     * @param defaultAction
     * @returns {Promise}
     */
    getResourceActionMetadata(name, defaultAction) {
        const self = this;
        return new Promise( (resolve, reject) => {
            self.getResourceMetadata(name)
                .then((response) => {
                    return response;
                })
                .then((getMetadata) => {
                    const resourceLink = self.findResourceAction(getMetadata, defaultAction, ResourceDefaultActions.TYPE_DEFAULT_ACTION());
                    if (!resourceLink) {
                        console.log('No default action for get resource could be found - just returning the get meta data');
                        resolve(getMetadata);
                    }

                    const resourceName = resourceLink.resource;
                    self.getResourceMetadata(resourceName)
                        .then((writeMetadata) => {
                            //NOTE: UI needs a merged view of readonly properties from get resource,
                            // and editable properties from the create / update resource
                            const mergedMetadata = self.mergeResourceMetadata(getMetadata, writeMetadata);
                            resolve(mergedMetadata);
                        });
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    mergeResourceMetadata(readMetadata, writeMetadata) {
        let retMerged = readMetadata;

        //replace all matching get properties with update properties
        for (let updateProperty of writeMetadata.properties) {
            retMerged.properties = readMetadata.properties.map( (a) => {
                return updateProperty.name === a.name ? updateProperty : a;
            });
        }

        return retMerged;
    }

    findResourceAction(metadata, method, type) {
        let action = null;
        if (metadata != null && metadata.actions.length > 0) {
            action = metadata.actions.find(x => x.method == method && x.type == type);
        }
        return action;
    }

    getResourceMetadata(name) {
        const self = this;

        const fetchRegistry = !this.cache.registryPopulated();

        return (fetchRegistry ? this.getResourceRegistry() : Promise.resolve()).then( () => {

            const metadata = self.cache.get(name);

            if (metadata) {
                return new Promise(function (resolve) {
                    console.log("ResourceApi: metadata from CACHE");
                    resolve(metadata);
                });
            }
            else {
                return new Promise((resolve, reject) => {
                    if (!self.cache.getRegistryItem(name)) {
                        reject("resource could not found in registry - make sure resource registry has been initialized");
                    }

                    const httpClient = self.createHttpClient();
                    const route = self.cache.fetchServiceRoute(name);
                    const serviceRoute = ApiBase.HOSTURL_GET().concat(route);

                    httpClient.fetch(serviceRoute)
                        .then(response => {
                            response.json().then((metadata) => {
                                console.log("completed ResourceApi.getResourceMetadata");
                                self.cache.set(name, metadata);
                                resolve(metadata);
                            });
                        })
                        .catch(error => {
                            console.log(`error in ResourcesApi.getResourceMetadata call: ${error}`);
                            reject(error);
                        });
                    ;
                });
            }
        });
    }

    getResourceListData(name, query) {
        const self = this;

        return new Promise( (resolve, reject) => {

            this.getResourceMetadata(name)
                .then(metaData => {
                    let route = metaData.endpoint.href;
                    const replaceId = '{id:long}';
                    route = route.replace(replaceId, '');
                    const serviceRoute = ApiBase.HOSTURL_GET().concat(route);

                    const httpClient = self.createHttpClient();

                    httpClient.fetch(serviceRoute)
                        .then(response => {
                            response.json().then((data) => {
                                console.log("completed ResourceApi.getResourceListData");
                                resolve(data);
                            });
                        });
                }).catch(error => {
                console.log(`error in ResourcesApi.getResourceListData call: ${error}`);
                reject(error);
            });
        });
    }

    getResourceItemData(name, id) {
        const self = this;

        return new Promise( (resolve, reject) => {

            this.getResourceMetadata(name)
                .then(metaData => {
                    let route = metaData.endpoint.href;
                    const replaceId = '{id:long}';
                    route = route.replace(replaceId, id);
                    const serviceRoute = ApiBase.HOSTURL_GET().concat(route);
                    const httpClient = self.createHttpClient();

                    httpClient.fetch(serviceRoute)
                        .then(response => {
                            response.json().then((data) => {
                                console.log("completed ResourceApi.getResourceItemData");
                                resolve(data);
                            });
                        });
                }).catch(error => {
                console.log(`error in ResourcesApi.getResourceItemData call: ${error}`);
                reject(error);
            });

        });

    }

    saveResourceItemData(resourceName, resourceData, id) {
        //TODO: Implement
        return new Promise(function (resolve) {
            console.log("ResourceApi: saveResourceItemData");
            resolve(null);
        });
    }

}