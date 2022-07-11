import { Component, OnDestroy, OnInit } from '@angular/core';
import { Pet, PetService, PetStatusEnum } from '@myorg/api2-lib';
import {
  from,
  iif,
  Observable,
  Subject,
  switchMap, tap
} from 'rxjs';

@Component({
  selector: 'myorg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'todos';
  
}
