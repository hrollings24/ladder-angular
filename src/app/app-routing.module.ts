import { NgModule } from '@angular/core';
import { OutletContext, RouterModule, Routes } from '@angular/router';
import { ChallengePageComponent } from './signed-in/challenge/challenge-page/challenge-page.component';
import { CreateComponent } from './signed-in/create/create.component';
import { LadderPageComponent } from './signed-in/ladder/ladder-page/ladder-page.component';
import { SettingsComponent } from './signed-in/ladder/settings/settings.component';
import { MainpageContentComponent } from './signed-in/mainpage-content/mainpage-content.component';
import { MainpageComponent } from './signed-in/mainpage/mainpage.component';
import { HomepageComponent } from './signed-out/homepage/homepage.component';
import { LoginComponent } from './signed-out/login/login.component';
import { SignUpComponent } from './signed-out/sign-up/sign-up.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/compat/auth-guard';
import { NotificationMainPageComponent } from './signed-in/notifications/notification-main-page/notification-main-page.component';
import { FindLadderComponent } from './signed-in/find-ladder/find-ladder.component';
import { AccountComponent } from './signed-in/account/account.component';

const redirectUnauthorizedToHome = () => redirectUnauthorizedTo(['/home']);

const routes: Routes = [
  {path: 'signup', component: SignUpComponent},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomepageComponent},
  {path: 'main', component: MainpageComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToHome },
    children: [
      {
        path: 'notifications',
        component: NotificationMainPageComponent,
      },
      {
        path: 'account',
        component: AccountComponent,
      },
      {
        path: 'find',
        component: FindLadderComponent,
      },
      {
        path: 'ladder/:id/settings',
        component: SettingsComponent,
      },
      {
        path: 'ladder/:id',
        component: LadderPageComponent,
      },
      {
        path: 'challenge/:id',
        component: ChallengePageComponent,
      },
      {
        path: 'create',
        component: CreateComponent,
      },
      {
        path: '',
        component: MainpageContentComponent
      }
    ]
  },
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
