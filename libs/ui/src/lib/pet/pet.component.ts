import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'myorg-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.css'],
})
export class PetComponent {}

@NgModule({
  imports: [CommonModule],
  declarations: [PetComponent],
  exports: [PetComponent],
})
export class PetComponentModule {}
