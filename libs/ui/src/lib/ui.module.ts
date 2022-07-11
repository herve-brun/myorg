import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PetstoreApiModule } from '@myorg/api2-lib';
import { FormsModule } from '@angular/forms';
import { PetsComponent } from './pets/pets.component';

@NgModule({
  imports: [CommonModule, HttpClientModule, PetstoreApiModule, FormsModule],
  declarations: [PetsComponent],
  exports: [PetsComponent],
})
export class UiModule {}
