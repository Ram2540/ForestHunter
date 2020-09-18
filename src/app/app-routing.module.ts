import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeftSideHeroComponent } from './components/left-side-hero/left-side-hero.component';
import { LeftSideQuestsComponent } from './components/left-side-quests/left-side-quests.component';
import { MercenariesScreenComponent } from './components/mercenaries-screen/mercenaries-screen.component';
import { RatingsComponent } from './components/ratings/ratings.component';

// I need implement guards
const appRoutes: Routes = [
    { path: '', component: MercenariesScreenComponent },
    { path: 'hero', component: LeftSideHeroComponent },
    { path: 'mercenaries', component: MercenariesScreenComponent },
    { path: 'guild', component: LeftSideHeroComponent },
    { path: 'quests', component: LeftSideQuestsComponent },
    { path: 'ratings', component: RatingsComponent },
    { path: '**', redirectTo: '' },
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {

}
