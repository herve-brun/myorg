import { Component, OnDestroy, OnInit } from '@angular/core';
import { PetStatusEnum, Pet, PetService } from '@myorg/api2-lib';
import { Subject, Observable, tap, switchMap, iif, from } from 'rxjs';

@Component({
  selector: 'myorg-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css'],
})
export class PetsComponent implements OnInit, OnDestroy {
  readonly statuses = Object.values(PetStatusEnum);

  petStatusToSearch$: Subject<PetStatusEnum | undefined> = new Subject();
  destroy$: Subject<void> = new Subject();
  loading = false;

  pets$: Observable<Pet[]> = this.petStatusToSearch$.pipe(
    tap(() => (this.loading = true)),
    switchMap((status) =>
      iif(
        () => status != undefined,
        this.petSvc.findPetsByStatus(status),
        from([])
      )
    ),
    tap(() => (this.loading = false))
  );

  constructor(private petSvc: PetService) {}

  ngOnDestroy(): void {
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.petStatusToSearch$.next(PetStatusEnum.Available);
  }

  onChangeStatus(e: Event) {
    this.petStatusToSearch$.next(
      Object.values(PetStatusEnum).find(
        (_enumValue, index, arr) =>
          arr[index] == (e.target as HTMLSelectElement).value
      )
    );
  }
}
