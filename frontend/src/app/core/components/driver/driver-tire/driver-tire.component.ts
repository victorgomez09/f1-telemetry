import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Stint } from '../../../models/stint.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-driver-tire',
  imports: [CommonModule],
  templateUrl: './driver-tire.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DriverTireComponent implements OnInit {
  @Input({ required: true })
  stints!: Stint[];

  stops!: number;
  currentStint!: Stint | null;
  unknownCompound!: boolean;

  ngOnInit(): void {
    this.stops = this.stints ? this.stints.length - 1 : 0;
    this.currentStint = this.stints
      ? this.stints[this.stints.length - 1]
      : null;
    this.unknownCompound = ![
      'soft',
      'medium',
      'hard',
      'intermediate',
      'wet',
    ].includes(this.currentStint?.Compound?.toLowerCase() ?? '');
  }
}
