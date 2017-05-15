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

    it("getResourceAll_callResourceApi_returnsValueFromResourceApi", function() {
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


});


