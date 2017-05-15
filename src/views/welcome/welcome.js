import {ViewBase} from "../view-base";
import {NavigationRoutes} from "../navigation-routes";

export class Welcome extends ViewBase {
    navigateAssets() {
        this.navigate("assets");
    }

    navigateMetadata() {
        this.navigate(NavigationRoutes.Resources());
    }

    navigateResource() {
        const name = "StaffMember";
        const JUMA_ID = "5000001001";
        //this.navigateWithArgs("resource", {name: name, id: JUMA_ID});
        this.navigateWithArgs(NavigationRoutes.Resource(), {name: name});
    }
}