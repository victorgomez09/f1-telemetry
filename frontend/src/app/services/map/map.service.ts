import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Map } from '../../core/models/map.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private httClient = inject(HttpClient);

  fetchMap(circuitKey: number): Observable<any> {
    const year = new Date().getFullYear();

    // const mapRequest = await fetch(
    //   `https://api.multiviewer.app/api/v1/circuits/${circuitKey}/${year}`
    // );
    // return mapRequest.json();

    return this.httClient.get<any>(
      `https://api.multiviewer.app/api/v1/circuits/${circuitKey}/${year}`
    );
  }
}
