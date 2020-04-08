import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import db from '../../../../srv/mock/db.json';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class MapService {

    constructor(
        private http: HttpClient
    ) { }

    getSelectedPackages(): Observable<any> {
        // this.http.get('/packages');
        return of(db.packages).pipe(
            map((data: any) => {
                const features: any[] = [];
                for (const [_, val] of Object.entries(data)) {
                    const feature: any = val;
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

    getDirections(profile: string, coordinates: string): Observable<any> {
        const options = `geometries=geojson&access_token=${environment.MAP_KEY}`;
        return this.http.get(`https://api.mapbox.com/directions/v5/${profile}/${coordinates}?${options}`);
    }
}
