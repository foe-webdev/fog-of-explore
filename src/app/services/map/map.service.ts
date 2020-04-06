import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class MapService {

    constructor(
        private http: HttpClient
    ) { }

    getSelectedPackages(): Observable<any> {
        return this.http.get('http://localhost:3000/packages').pipe(
            map(data => {
                const features: any[] = [];
                for (const [_, feature] of Object.entries(data)) {
                    features.push({
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: feature.coordinates
                        },
                        properties: {
                            id: feature.id,
                            title: feature.title,
                            description: feature.description,
                            icon: feature.icon,
                        }
                    });
                }
                return features;
            })
        );
    }
}
