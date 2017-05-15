import {expect, assert} from 'chai';
import * as sinon from 'sinon';
import {ResourceApi} from './../../../src/api/resources/resource-api.js';
import {ResourceDefaultActions} from "./../../../src/api/resources/resource-actions";
import {ResourceMetadataCache} from './../../../src/api/resources/resource-metadata-cache.js';
import {HttpClientFactory} from './../../../src/api/http/http-client-factory.js';
import {HttpClient} from "aurelia-fetch-client";
import {ResourceApiStubs} from "./Stubs/resource-api-stubs";
import {HttpStubs} from "./Stubs/http-stubs.js";
let chai = require("chai");
let chaiAsPromised = require("chai-as-promised");

describe("OnKeyApiTests", () => {
    const sandbox = sinon.sandbox.create();
    let api;
    let cacheStub;
    let httpClientFactoryStub;
    let httpClientStub;

    chai.use(chaiAsPromised);

    beforeEach(() => {
        cacheStub = sandbox.stub(ResourceMetadataCache.prototype);
        httpClientFactoryStub = sandbox.stub(HttpClientFactory.prototype);
        httpClientStub = sandbox.stub(HttpClient.prototype);
        httpClientFactoryStub.create.returns(httpClientStub);
        api = new ResourceApi(httpClientFactoryStub, cacheStub);
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('test_constructor', () => {
        expect(api).to.not.be.null;
        expect(cacheStub).to.not.be.undefined;
    });

    it('constructor', () => {
        expect(api).to.have.property('cache');
    });

    it('getResourceRegistry_cacheRegistryIsPopulated_returnsCacheRegistryItems', () => {
        //ARRANGE
        cacheStub.registryPopulated.returns(true);
        const registryItemsStub = ['Star Wars', 'The Matrix', 'Forrest Gump'];
        cacheStub.registryItems.returns(registryItemsStub);

        //ACT
        const promiseResponse = api.getResourceRegistry();

        //ASSERT
        assert(cacheStub.registryPopulated.calledOnce);
        assert(cacheStub.registryItems.calledOnce);
        return expect(promiseResponse).to.eventually.equal(registryItemsStub, "Expected correct registry values");

    });

    it('getResourceRegistry_cacheRegistryNotPopulated_returnsRegistryItemsFromServer', () => {
        //ARRANGE
        cacheStub.registryPopulated.returns(false);
        const fetchPromiseResponse = HttpStubs.PROMISE_RESPONSE(ResourceApiStubs.RESOURCE_LIST());
        const registryItemsStub = ResourceApiStubs.RESOURCE_LIST().items;
        httpClientStub.fetch.returns(fetchPromiseResponse);

        //ACT
        const promiseResponse = api.getResourceRegistry();

        //ASSERT
        assert(httpClientFactoryStub.create.calledOnce);
        assert(cacheStub.registryPopulated.calledOnce);
        assert(httpClientStub.fetch.calledOnce);
        return expect(promiseResponse).to.eventually.deep.equal(registryItemsStub, "Expected correct registry values")
            .then( () => {
                assert(cacheStub.setRegistry.calledWith(registryItemsStub));
            });

    });

    it('getResourceRegistry_fetchThrowsError_promiseRejected', () => {
        //ARRANGE
        cacheStub.registryPopulated.returns(false);
        const fetchPromiseResponse = HttpStubs.PROMISE_RESPONSE_REJECT();
        httpClientStub.fetch.returns(fetchPromiseResponse);

        //ACT
        const promiseResponse = api.getResourceRegistry();

        //ASSERT
        assert(httpClientStub.fetch.calledOnce);
        return expect(promiseResponse).to.eventually.be.rejected;
    });

    it('getResourceMetadata_allInCache_returnsCachedMetadata', () => {
        //ARRANGE
        const resourceName = "GOLD";
        const metadataResponse = ResourceApiStubs.GET_METADATA();
        cacheStub.registryPopulated.returns(true);
        cacheStub.get.withArgs(resourceName).returns(metadataResponse);

        //ACT
        const promiseResponse = api.getResourceMetadata(resourceName);

        //ASSERT
        return expect(promiseResponse).to.eventually.equal(metadataResponse, "Expected correct metadata response")
            .then( () => {
                assert(cacheStub.get.calledOnce);
            });
    });

    it('mergeResourceMetadata_merge_updatePropertiesMergedIntoGetProperties', () => {
        //ARRANGE
        const getMetadata = ResourceApiStubs.GET_METADATA();
        const updateMetadata = ResourceApiStubs.UPDATE_METADATA();

        //ACT
        const mergedMetadata = api.mergeResourceMetadata(getMetadata, updateMetadata);

        //ASSERT
        assert.isNotNull(mergedMetadata);
        assert.property(mergedMetadata, 'properties');
        assert.equal(getMetadata.properties.length, mergedMetadata.properties.length);
        const updateCodeProperty = updateMetadata.properties.find( (x) => x.name === 'Code');
        const mergedCodeProperty = mergedMetadata.properties.find( (x) => x.name === 'Code');
        assert.isNotNull(updateCodeProperty);
        assert.isNotNull(mergedCodeProperty);
        assert.deepEqual(updateCodeProperty, mergedCodeProperty);
    });


    it('getResourceMetadata_registryNotYetPopulated_callsGetRegistryFirst', () => {
        //ARRANGE
        let getResourceRegistryStub = sandbox.stub(api, 'getResourceRegistry').returns(Promise.resolve());

        const resourceName = "GOLD";
        const metadataResponse = ResourceApiStubs.GET_METADATA();
        cacheStub.registryPopulated.returns(false);
        cacheStub.get.withArgs(resourceName).returns(metadataResponse);

        //ACT
        const promiseResponse = api.getResourceMetadata(resourceName);

        //ASSERT
        return expect(promiseResponse).to.eventually.equal(metadataResponse, "Expected correct metadata response")
            .then( () => {
                assert(getResourceRegistryStub.calledOnce);
                assert(cacheStub.get.calledOnce);
            });
    });

    it('getResourceActionMetadata_fetchMergedMetadataForEdit_returnsMergedUpdateAndGet', () => {
        //TODO: Complete
        //ARRANGE
        const resourceName = "GOLD";
        const updateResourceName = "UpdateGold";
        const resourceActionLink = { resource: updateResourceName};
        const metadataResponse = ResourceApiStubs.GET_METADATA();
        const updateMetadataResponse = ResourceApiStubs.UPDATE_METADATA();
        const mergedMetadataResponse = { "type" : "test", "name": "test_name"};

        let getResourceMetadataStub = sandbox.stub(api, 'getResourceMetadata');
        getResourceMetadataStub.withArgs(resourceName).returns(Promise.resolve(metadataResponse));
        getResourceMetadataStub.withArgs(updateResourceName).returns(Promise.resolve(updateMetadataResponse));
        let findResourceActionStub = sandbox.stub(api, 'findResourceAction').returns(resourceActionLink);
        let mergeResourceMetadataStub = sandbox.stub(api, 'mergeResourceMetadata');
        mergeResourceMetadataStub.withArgs(metadataResponse, updateMetadataResponse).returns(mergedMetadataResponse);

        //ACT
        const promiseResponse = api.getResourceActionMetadata(resourceName, ResourceDefaultActions.METHOD_PATCH());

        //ASSERT
        return expect(promiseResponse).to.eventually.equal(mergedMetadataResponse, "Expected correct metadata response")
            .then( () => {
                assert(getResourceMetadataStub.calledWith(resourceName));
                assert(getResourceMetadataStub.calledWith(updateResourceName));
                assert(findResourceActionStub.calledOnce);
            });
    });

    it('findResourceAction_forMethodAndType_returnsResourceAction', () => {
        //ARRANGE
        const getMetadata = ResourceApiStubs.GET_METADATA();
        const method = ResourceDefaultActions.METHOD_PATCH();
        const type = ResourceDefaultActions.TYPE_DEFAULT_ACTION();
        const patchResourceAction = getMetadata.actions.find(x => x.method == method && x.type == type);

        //ACT
        const findResponse = api.findResourceAction(getMetadata, method, type);

        //ASSERT
        assert.deepEqual(patchResourceAction, findResponse);
    });

});