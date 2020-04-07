import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    {
        path: 'explore',
        loadChildren: () => import('./pages/explore/explore.module').then(m => m.ExploreModule)
    },
    {
        path: 'discover',
        loadChildren: () => import('./pages/discover/discover.module').then(m => m.DiscoverModule)
    },
    {
        path: 'profile',
        loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule)
    },
    { path: '**', redirectTo: 'explore' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
