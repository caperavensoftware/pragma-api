import {Router} from "aurelia-router";
import {inject} from "aurelia-dependency-injection";

@inject(Router)
export class ViewBase {

    constructor(router) {
        this.router = router;
        this.start = null;
        this.end = null;
    }

    navigate(routeName) {
        this.router.navigateToRoute(routeName);
    }

    navigateWithArgs(routeName, args) {
        this.router.navigateToRoute(routeName, args);
    }

    endTimer() {
        this.end = performance.now();
        console.log('PERF:', (this.end - this.start).toFixed(4), 'milliseconds ');
    }

    startTimer() {
        this.start = performance.now();
    }

}
