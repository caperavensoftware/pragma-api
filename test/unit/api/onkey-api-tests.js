import {expect, assert} from 'chai';
import * as sinon from 'sinon';
import {OnKeyApi} from './../../../src/api/onkey-api.js';
import {ResourceApi} from './../../../src/api/resources/resource-api.js';
let chai = require("chai");
let chaiAsPromised = require("chai-as-promised");


describe("OnKeyApiTests", () => {
    const sandbox = sinon.sandbox.create();
    let api;
    let resourceStub;

    chai.use(chaiAsPromised);

    beforeEach(() => {
        resourceStub = sandbox.stub(ResourceApi.prototype);
        api = new OnKeyApi(resourceStub);
    });

    afterEach( ()=> {
        sandbox.restore();
    });

    it('test_constructor', () => {
        expect(api).to.not.be.null;
        expect(resourceStub).to.not.be.undefined;
    });

    it('constructor', () => {
        expect(api).to.have.property('resources');
    });

    it("getResourceRegistry_callResourceApi_returnsValueFromResourceApi", () => {
        // Arrange
        let stubbedValue = ['Star Wars', 'The Matrix', 'Forrest Gump'];
        let promise = new Promise(resolve => { resolve(stubbedValue); });
        resourceStub.getResourceRegistry.returns(promise);

        //Act
        let promiseResponse = api.getResourceRegistry();

        //assert
        assert(resourceStub.getResourceRegistry.calledOnce, "getResourceRegistry should be called once");
        return expect(promiseResponse).to.eventually.equal(stubbedValue, "Expected correct registry values");

    });

    it("getResourceMetadata_callResourceApi_returnsValueFromResourceApi", function() {
        // Arrange
        let stubbedValue = ['Star Wars', 'The Matrix', 'Forrest Gump'];
        let promise = new Promise(resolve => { resolve(stubbedValue); });
        const resourceName = "bitcoin";
        resourceStub.getResourceMetadata.withArgs(resourceName).returns(promise);

        //Act
        let promiseResponse = api.getResourceMetadata(resourceName);

        //assert
        assert(resourceStub.getResourceMetadata.calledOnce, "getResourceMetadata should be called once");
        return expect(promiseResponse).to.eventually.equal(stubbedValue, "Expected correct registry values");

    });

    it("getResourceItemData_callResourceApi_returnsValueFromResourceApi", function() {
        // Arrange
        let stubbedValue = ['Star Wars', 'The Matrix', 'Forrest Gump'];
        let promise = new Promise(resolve => { resolve(stubbedValue); });
        const resource = "BatmanResource";
        const id = "42";
        resourceStub.getResourceItemData.withArgs(resource, id).returns(promise);

        //Act
        let promiseResponse = api.getResourceItemData(resource, id);

        //assert
        assert(resourceStub.getResourceItemData.calledOnce, "getResourceMetadata should be called once");
        return expect(promiseResponse).to.eventually.equal(stubbedValue, "Expected correct registry values");

    });

    it("getResource_callResourceApi_returnsDataAndSchemaFromResourceApi", function() {
        // Arrange
        const metadataStub = ['Star Wars', 'The Matrix', 'Lord of the Rings'];
        const itemDataStub = ['Brave', 'Cars', 'The Incredibles'];

        const metadataResult = new Promise(resolve => { resolve(metadataStub); });
        const itemDataResult = new Promise(resolve => { resolve(itemDataStub); });

        const resource = "BatmanResource";
        const id = "42";
        resourceStub.getResourceActionMetadata.withArgs(resource).returns(metadataResult);
        resourceStub.getResourceItemData.withArgs(resource, id).returns(itemDataResult);

        //Act
        let promiseResponse = api.getResource(resource, id);

        //assert
        return Promise.all( [
            expect(promiseResponse).to.eventually.be.fulfilled,
            expect(promiseResponse).to.eventually.have.property('model', itemDataStub),
            expect(promiseResponse).to.eventually.have.property('metadata', metadataStub)
        ]);

    });

    it("getResourceList_callResourceApi_returnsValuesFromResourceApi", () => {
        // Arrange
        let stubbedValues = ['Star Wars', 'The Matrix', 'Forrest Gump'];
        let listStub = { items: stubbedValues};
        let promise = new Promise(resolve => { resolve(listStub); });
        const resourceName = "BatmanResource";
        const query = "?BadGuy=TheRiddler";
        resourceStub.getResourceListData.withArgs(resourceName, query).returns(promise);

        //Act
        let promiseResponse = api.getResourceList(resourceName, query);

        //assert
        assert(resourceStub.getResourceListData.calledOnce, "getResourceListData should be called once");
        return expect(promiseResponse).to.eventually.equal(listStub, "Expected correct list values");

    });

    it("saveResourceData_callResourceApi_CallsResourceApi", () => {
        // Arrange
        let promise = new Promise(resolve => { resolve(true); });
        const resourceName = "BatmanResource";
        const resourceData = { name: "Bruce Wayne"};
        const id = 827329;
        resourceStub.saveResourceItemData.withArgs(resourceName, resourceData, id).returns(promise);

        //Act
        let promiseResponse = api.saveResourceData(resourceName, resourceData, id);

        //assert
        assert(resourceStub.saveResourceItemData.calledOnce, "saveResourceItemData should be called once");
        return expect(promiseResponse).to.eventually.equal(true, "Expected correct list values");
    });
});


