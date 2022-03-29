import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatDividerModule } from '@angular/material/divider';
import { SignUpComponent } from './signed-out/sign-up/sign-up.component';
import { HomeComponent } from './shared/home/home.component';
import { MenuComponent } from './signed-in/menu/menu.component';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './signed-out/homepage/homepage.component';
import { LoginComponent } from './signed-out/login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from 'src/environments/environment';
import { MainUserService } from './SDK/users/main-user.service';
import { MainpageComponent } from './signed-in/mainpage/mainpage.component';
import { MainpageContentComponent } from './signed-in/mainpage-content/mainpage-content.component';
import { SystemNotificationService } from './SDK/notifications/system-notification-service';
import { LadderCardsComponent } from './signed-in/mainpage-content/ladder-cards/ladder-cards.component';
import { LadderService } from './SDK/ladders/ladder.service';
import { ChallengeService } from './SDK/challenge/challenge.service';
import { ChallengeCardsComponent } from './signed-in/mainpage-content/challenge-cards/challenge-cards.component';
import { LadderUserService } from './SDK/users/ladder-user.service';
import { LadderPageComponent } from './signed-in/ladder/ladder-page/ladder-page.component';
import { LadderModalComponent } from './signed-in/ladder/ladder-modal/ladder-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AvatarModule } from 'ngx-avatar';
import { SettingsComponent } from './signed-in/ladder/settings/settings.component'
import { MatTabsModule } from '@angular/material/tabs';
import { MainSettingsTabComponent } from './signed-in/ladder/settings/tabs/main-settings-tab/main-settings-tab.component';
import { CurrentLadderService } from './signed-in/ladder/current-ladder.service';
import { AdminTabComponent } from './signed-in/ladder/settings/tabs/admin-tab/admin-tab.component';
import { UserCardComponent } from './signed-in/ladder/settings/user-card/user-card.component';
import { UserTabComponent } from './signed-in/ladder/settings/tabs/user-tab/user-tab.component';
import { InvitesTabComponent } from './signed-in/ladder/settings/tabs/invites-tab/invites-tab.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { AppStateService } from './shared/app-state.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CreateComponent } from './signed-in/create/create.component';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import { FindUserModalComponent } from './shared/find-user-modal/find-user-modal.component';
import { UserAdderComponent } from './shared/find-user-modal/user-adder/user-adder.component';
import { ChallengePageComponent } from './signed-in/challenge/challenge-page/challenge-page.component';
import { CurrentChallengeService } from './signed-in/challenge/current-challenge-service';
import { OneOtherUserToComfirmComponent } from './signed-in/challenge/challenge-page/actions/one-other-user-to-comfirm/one-other-user-to-comfirm.component';
import { TwoMainUserToConfirmComponent } from './signed-in/challenge/challenge-page/actions/two-main-user-to-confirm/two-main-user-to-confirm.component';
import { ThreeAwaitingAcceptionComponent } from './signed-in/challenge/challenge-page/actions/three-awaiting-acception/three-awaiting-acception.component';
import { FourMainUserToAcceptComponent } from './signed-in/challenge/challenge-page/actions/four-main-user-to-accept/four-main-user-to-accept.component';
import { FivePlayOutComponent } from './signed-in/challenge/challenge-page/actions/five-play-out/five-play-out.component';
import { AuthGuard } from './auth-guard.service';


@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    HomeComponent,
    MenuComponent,
    LoginComponent,
    HomepageComponent,
    MainpageComponent,
    MainpageContentComponent,
    LadderCardsComponent,
    ChallengeCardsComponent,
    LadderPageComponent,
    LadderModalComponent,
    SettingsComponent,
    MainSettingsTabComponent,
    AdminTabComponent,
    UserCardComponent,
    UserTabComponent,
    InvitesTabComponent,
    CreateComponent,
    FindUserModalComponent,
    UserAdderComponent,
    ChallengePageComponent,
    OneOtherUserToComfirmComponent,
    TwoMainUserToConfirmComponent,
    ThreeAwaitingAcceptionComponent,
    FourMainUserToAcceptComponent,
    FivePlayOutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    FlexLayoutModule,
    MatCardModule,
    FormsModule,
    HttpClientModule,
    AngularFireAuthModule,
    AngularFireModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    NgbModule,
    AvatarModule,
    MatTabsModule,
    NgxSpinnerModule,
    MatSnackBarModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDialogModule,
    MatTooltipModule
  ],
  providers: [ MainUserService,
    SystemNotificationService,
    LadderService,
    ChallengeService,
    LadderUserService,
    CurrentLadderService, 
    AppStateService,
    CurrentChallengeService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
