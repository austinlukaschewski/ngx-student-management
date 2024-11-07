import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
    private readonly _http = inject(HttpClient);

    #BASE_URL = '/api';

    get<T = any>(path: string): Observable<T> {
        return this._http.get<T>(this.joinPaths(path));
    }

    post<T = any, D = any>(path: string, body?: D): Observable<T> {
        return this._http.post<T>(this.joinPaths(path), body);
    }

    put<T = any, D = any>(path: string, body?: D): Observable<T> {
        return this._http.put<T>(this.joinPaths(path), body);
    }

    private joinPaths = (...paths: string[]): string => `${this.#BASE_URL}/${paths.join('/')}`;
}
