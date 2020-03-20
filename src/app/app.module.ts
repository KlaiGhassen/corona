import { AuthenticationService } from "./main/authentication/authentication.service";
import { AdministratorGuard } from "./main/authentication/administrator.guard";
import { LoginComponent } from "./main/authentication/login/login.component";
import { DeclarationsModule } from "./main/declarations/declarations.module";
import { NgModule, APP_INITIALIZER } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule, Routes } from "@angular/router";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MatButtonModule, MatIconModule } from "@angular/material";
import { TranslateModule } from "@ngx-translate/core";
import "hammerjs";

import { FuseModule } from "@fuse/fuse.module";
import { FuseSharedModule } from "@fuse/shared.module";
import {
    FuseProgressBarModule,
    FuseSidebarModule,
    FuseThemeOptionsModule
} from "@fuse/components";

import { fuseConfig } from "app/fuse-config";

import { AppComponent } from "app/app.component";
import { LayoutModule } from "app/layout/layout.module";

import { LOCALE_ID } from "@angular/core";
import { registerLocaleData } from "@angular/common";
import localeFr from "@angular/common/locales/fr";
import localeFrExtra from "@angular/common/locales/extra/fr";

registerLocaleData(localeFr, "fr-FR", localeFrExtra);

import { GloablService } from "./gloabl.service";
import { Error404pageModule } from "./components/error404page/error404page.module";
import { TokenInterceptorService } from "./main/authentication/token-interceptor.service";
import { AuthenticationGuard } from "./main/authentication/authentication.guard";

export function GlobalServiceFactory(provider: GloablService) {
    return () => provider.load();
}

const appRoutes: Routes = [
    {
        path: "authentication",
        loadChildren:
            "./main/authentication/authentication.module#AuthenticationModule"
    },
    {
        path: "declarations",
        loadChildren:
            "./main/declarations/declarations.module#DeclarationsModule",
        canActivate: [AuthenticationGuard]
    },
    {
        path: "administrator",
        loadChildren:
            //   "./main/declarations/declarations.module#DeclarationsModule"
            "./main/administrator/administrator.module#AdministratorModule",
        canActivate: [AdministratorGuard]
    },
    {
        path: "",
        redirectTo: "declarations",
        pathMatch: "full"
    },
    {
        path: "**",
        redirectTo: "error-404",
        pathMatch: "full"
    }
    // {
    //     path: "**",
    //     redirectTo: "declarations/1",
    //     pathMatch: "full"
    // }
    // {
    //     path: "",
    //     c:
    //         "./main/declarations/declarations.module#DeclarationsModule"
    // }

    // {
    //     path: "**",
    //     redirectTo: "authentication",
    //     pathMatch: "full"
    // }
];

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),

        TranslateModule.forRoot(),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
        Error404pageModule
        //DeclarationsModule
    ],
    bootstrap: [AppComponent],
    providers: [
        AuthenticationGuard,
        AdministratorGuard,
        GloablService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptorService,
            multi: true
        },
        {
            provide: APP_INITIALIZER,
            useFactory: GlobalServiceFactory,
            deps: [GloablService],
            multi: true
        },
        { provide: LOCALE_ID, useValue: "fr-FR" } //replace "en-US" with your locale
        //otherProviders...
    ]
})
export class AppModule {}
