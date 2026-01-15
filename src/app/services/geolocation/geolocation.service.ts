import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

/**
 * Response model from ipapi.co API.
 */
interface IpApiResponse {
  city: string;
  country_name: string;
}

/**
 * Simplified location data returned by the service.
 */
export interface LocationData {
  city: string;
  country: string;
}

/**
 * Service for retrieving user geolocation based on IP address.
 * Uses ipapi.co for IP-based geolocation lookup (free HTTPS access).
 */
@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  private readonly apiUrl = 'https://ipapi.co/json/';

  constructor(private http: HttpClient) {}

  /**
   * Retrieves the user's location based on their IP address.
   * @returns Observable with city and country, or 'Unknown' values on error
   */
  getLocation(): Observable<LocationData> {
    return this.http.get<IpApiResponse>(this.apiUrl).pipe(
      map((response) => ({
        city: response.city || 'Unknown',
        country: response.country_name || 'Unknown',
      })),
      catchError((error) => {
        console.error('Geolocation error:', error);
        return of({ city: 'Unknown', country: 'Unknown' });
      })
    );
  }

  /**
   * Retrieves the user's location as a formatted string.
   * @returns Observable with location string in "City, Country" format
   */
  getLocationString(): Observable<string> {
    return this.getLocation().pipe(map((location) => `${location.city}, ${location.country}`));
  }
}
