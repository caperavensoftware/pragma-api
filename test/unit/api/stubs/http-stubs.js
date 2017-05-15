export class HttpStubs {
    static PROMISE_RESPONSE (body) {
        return new Promise( resolve => {
            resolve({
                json: () => Promise.resolve(body)
            })
        });
    }

    static PROMISE_RESPONSE_REJECT () {
        return new Promise((resolve, reject) => { reject("error!")});
    }
}