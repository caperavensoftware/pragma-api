import {NavigationRoutes} from "./views/navigation-routes";

export class App {
    router = null;

    configureRouter(config, router) {
        config.title = 'Pragma Products';
        config.map([
            {route: ['', 'welcome'], name: 'welcome', moduleId: 'views/welcome/welcome', nav: true, title: 'Welcome'},
            {route: NavigationRoutes.Resources(), name: NavigationRoutes.Resources(), moduleId: 'views/resources/resources', title: 'Resources'},
            {route: NavigationRoutes.ResourceList(), name: NavigationRoutes.ResourceList(), moduleId: 'views/resource-list/resource-list', title: 'Resource List'},
            {route: `${NavigationRoutes.Resource()}/:name`, name: NavigationRoutes.Resource(), moduleId: 'views/resource/resource', title: 'Resource'},
        ]);

        this.router = router;
    }
}