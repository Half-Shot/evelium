import { ApplicationRef, ErrorHandler, Injector, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
import { routing } from "./app.routing";
import { createNewHosts, removeNgStyles } from "@angularclass/hmr";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { UiSwitchModule } from "angular2-ui-switch";
import { ToasterModule } from "angular2-toaster";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BootstrapModalModule } from "ngx-modialog/plugins/bootstrap";
import { ModalModule } from "ngx-modialog";
import { LocatorService } from "./services/locator.service";
import { LandingComponent } from "./views/landing/landing.component";
import { SpinnerComponent } from "./elements/spinner/spinner.component";
import { LoggedInComponent } from "./views/logged-in/logged-in.component";
import { LoginComponent } from "./views/login/login.component";
import { MatrixAuthService } from "./services/matrix/auth.service";
import { MatrixHomeserverService } from "./services/matrix/homeserver.service";
import { HttpClientModule } from "@angular/common/http";
import { MatrixSyncService } from "./services/matrix/sync.service";
import { MatrixRoomService } from "./services/matrix/room.service";
import { RoomListComponent } from "./views/room-list/room-list.component";
import { RoomListTagComponent } from "./views/room-list/tag/tag.component";
import { RoomListTileComponent } from "./views/room-list/tile/tile.component";
import { MatrixAccountService } from "./services/matrix/account.service";
import { MatrixMediaService } from "./services/matrix/media.service";
import {
    PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface,
    PerfectScrollbarModule
} from 'ngx-perfect-scrollbar';
import { RoomComponent } from "./views/room/room.component";
import { RoomAvatarComponent } from "./elements/avatar/room/room.component";
import { RoomHeaderComponent } from "./views/room/header/header.component";
import { RoomMessageComposerComponent } from "./views/room/composer/composer.component";
import { MatrixEventService } from "./services/matrix/event.service";
import { MessageEventTileComponent } from "./elements/event-tiles/message/message.component";
import { RoomMemberAvatarComponent } from "./elements/avatar/room-member/room-member.component";
import { EventTileComponent } from "./elements/event-tiles/event-tile.component";
import { MemberEventTileComponent } from "./elements/event-tiles/member/member.component";
import { AppErrorHandler } from "./app.error-handler";
import { RoomInterfaceComponent } from "./views/logged-in/room-interface/room-interface.component";
import { HomepageComponent } from "./views/logged-in/homepage/homepage.component";

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {};

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        routing,
        NgbModule.forRoot(),
        UiSwitchModule,
        ToasterModule,
        BrowserAnimationsModule,
        ModalModule.forRoot(),
        BootstrapModalModule,
        PerfectScrollbarModule,
    ],
    declarations: [
        AppComponent,
        LandingComponent,
        SpinnerComponent,
        LoggedInComponent,
        LoginComponent,
        RoomListComponent,
        RoomListTagComponent,
        RoomListTileComponent,
        RoomComponent,
        RoomAvatarComponent,
        RoomHeaderComponent,
        RoomMessageComposerComponent,
        MessageEventTileComponent,
        RoomMemberAvatarComponent,
        EventTileComponent,
        MemberEventTileComponent,
        RoomInterfaceComponent,
        HomepageComponent,

        // Vendor
    ],
    providers: [
        {provide: Window, useValue: window},
        {provide: Storage, useValue: localStorage},
        {provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG},
        {provide: ErrorHandler, useClass: AppErrorHandler},
        MatrixAuthService,
        MatrixHomeserverService,
        MatrixSyncService,
        MatrixRoomService,
        MatrixAccountService,
        MatrixMediaService,
        MatrixEventService,

        // Vendor
    ],
    bootstrap: [AppComponent],
    entryComponents: [
        // Event tiles
        MessageEventTileComponent,
        MemberEventTileComponent,
    ]
})
export class AppModule {
    constructor(public appRef: ApplicationRef, injector: Injector) {
        LocatorService.injector = injector;
    }

    hmrOnInit(store) {
        console.log("HMR store", store);
    }

    hmrOnDestroy(store) {
        let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
        // recreate elements
        store.disposeOldHosts = createNewHosts(cmpLocation);
        // remove styles
        removeNgStyles();
    }

    hmrAfterDestroy(store) {
        // display new elements
        store.disposeOldHosts();
        delete store.disposeOldHosts;
    }
}
