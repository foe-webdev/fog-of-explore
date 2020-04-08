import { Component } from '@angular/core';
import { Platform } from '@angular/cdk/platform';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
<<<<<<< HEAD
export class AppComponent {

    constructor(
        public platform: Platform
    ) { }

    isMobile(): boolean {
        return this.platform.ANDROID || this.platform.IOS;
    }
}
=======
export class AppComponent {}
>>>>>>> added button to open discovery drawer
