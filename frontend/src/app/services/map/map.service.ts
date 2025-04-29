import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Map } from '../../core/models/map.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private httClient = inject(HttpClient);

  fetchMap(circuitKey: number): Observable<Map> {
    const year = new Date().getFullYear();

    return this.httClient.get<Map>(
      `https://api.multiviewer.app/api/v1/circuits/${circuitKey}/${year}`
    );
  }
}
