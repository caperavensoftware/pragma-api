import {HttpClient} from "aurelia-fetch-client";

export class HttpClientFactory {
    create(serverUrl) {
        const httpClient = new HttpClient();

        httpClient.configure(config => {
            config.withBaseUrl(serverUrl);
    });

        //this.httpInterceptor.addErrorResponseHandler(httpClient);

        return httpClient;
    }
}