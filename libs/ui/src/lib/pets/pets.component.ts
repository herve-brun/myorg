import { Component, OnDestroy, OnInit } from '@angular/core';
import { Pet, PetService, PetStatusEnum } from '@myorg/api2-lib';
import { iif, Observable, of, Subject, switchMap, tap } from 'rxjs';

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
        of([])
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
    const newStatus = (e.target as HTMLSelectElement).value;
    this.petStatusToSearch$.next(
      Object.values(PetStatusEnum).find(
        (_enumValue, index, arr) =>
          arr[index] == newStatus
      )
    );
  }
}
