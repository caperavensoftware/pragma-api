import {HttpClientFactory} from "./http/http-client-factory";

export class ApiBase {

    constructor(clientFactory) {
        this.httpClientFactory = clientFactory;
    }
    httpClientFactory = new HttpClientFactory();

    createHttpClient() {
        return this.httpClientFactory.create(ApiBase.BASEURL_GET());
    }

    //TODO MJ: These Urls need to be retrieved as part of the login
    static BASEURL_GET() {
        return this.HOSTURL_GET().concat( "api/clients/Contoso/Test/");
    }

    static HOSTURL_GET() {
        return "http://localhost:5000/";
    }

}
