import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Map } from '../../core/models/map.model';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private httClient = inject(HttpClient);

  map$: WritableSignal<Map> = signal({} as Map);

  fetchMap(circuitKey: number): void {
    const year = new Date().getFullYear();

    // const mapRequest = await fetch(
    //   `https://api.multiviewer.app/api/v1/circuits/${circuitKey}/${year}`
    // );
    // return mapRequest.json();

    this.httClient
      .get<Map>(
        `https://api.multiviewer.app/api/v1/circuits/${circuitKey}/${year}`
      )
      .subscribe((data) => this.map$.set(data));
  }
}
