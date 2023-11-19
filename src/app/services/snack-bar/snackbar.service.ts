import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnakbarModel } from '../../models/snak-bar';

@Injectable({ providedIn: 'root' })
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  append(snakbarModel: SnakbarModel) {
    this.snackBar.open(snakbarModel.message, snakbarModel.type, {
      duration: 4000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
    });
  }
}
