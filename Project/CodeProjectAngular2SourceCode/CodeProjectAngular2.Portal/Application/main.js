///<reference path="../typings/browser.d.ts"/>
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var application_component_1 = require("./application.component");
var application_routes_1 = require("./application-routes");
var core_1 = require("@angular/core");
core_1.enableProdMode();
platform_browser_dynamic_1.bootstrap(application_component_1.AppComponent, [application_routes_1.applicationRouterProviders]);
//# sourceMappingURL=main.js.map