import { mapboxgl } from '../../node_modules/mapbox-gl';
import { MapboxGeocoder } from '@mapbox/mapbox-gl-geocoder';
import { Http } from './http.class';
import { PositionOptions } from 'mapbox-gl';

export class Geolocation {
    async getCurrentLocation(): Promise<Coordinates> {
        navigator.geolocation.getCurrentPosition(function (pos) {
            var p = document.getElementById("coordinates");
            p.textContent = "Latidude: " + pos.coords.latitude + ". Longitude: " + pos.coords.longitude
                + " (accuracy: " + pos.coords.accuracy + ")";
        }, function (error) {
            var p = document.getElementById("coordinates");
            switch (error.code) {
                case error.PERMISSION_DENIED: // User didn't allow the web page to retrieve location
                    p.textContent = "User denied the request for Geolocation."
                    break;
                case error.POSITION_UNAVAILABLE: // Couldn't get the location
                    p.textContent = "Location information is unavailable."
                    break;
                case error.TIMEOUT: // The maximum amount of time to get location information has passed
                    p.textContent = "The request to get user location timed out."
                    break;
            }
        });
        return;
    }
}
