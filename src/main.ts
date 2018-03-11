import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./app/app.module";
import { checkDatabases } from "./app/services/matrix/databases";

// depending on the env mode, enable prod mode or add debugging modules
//noinspection TypeScriptUnresolvedVariable
if (process.env.ENV === "build") {
    enableProdMode();
}

export async function main(): Promise<any> {
    await checkDatabases();
    return platformBrowserDynamic().bootstrapModule(AppModule);
}

if (document.readyState === "complete") {
    // noinspection JSIgnoredPromiseFromCall
    main();
} else {
    document.addEventListener("DOMContentLoaded", main);
}

(<any>String.prototype).hashCode = function () {
    let hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
        chr = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};

// HACK: Work around .opener not being available
if (!window.opener && window.parent) window.opener = window.parent;
