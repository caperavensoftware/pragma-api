export class ResourceMetadataCache {

    static instance;

    constructor() {
        //TODO MJ: Should actually be registered as singleton with DI
        if(this.instance){
            return this.instance;
        }

        this.registryCache = new Map();
        this.metadataCache = new Map();
        this.instance = this;
    }

    getRegistryItem(key) {
        if (this.registryCache.has(key)) {
            return this.registryCache.get(key);
        }
        return false;
    }



    setRegistry(registry) {
        for (let item of registry) {
            this.registryCache.set(item.properties.Name, item);
        }
    }

    get(key) {
        if (this.metadataCache.has(key)) {
            return this.metadataCache.get(key);
        }
        return false;
    }

    set(key, value) {
        this.metadataCache.set(key, value);
    }

    registryItems() {
        return Array.from(this.registryCache.values());
    }

    items() {
        return Array.from(this.metadataCache.values());
    }

    registryPopulated() {
        return this.registryCache.size > 0;
    }

    fetchServiceRoute(resourceName){
        const resource = this.getRegistryItem(resourceName);

        if (!resource)
            return false;
        else //TODO MJ: look for rel: ResourceSchema & Method GET
            return resource.links[0].href;
    }

};

