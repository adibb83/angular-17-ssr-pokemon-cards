import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { SnakbarModel } from '@models/snak-bar';
import { LoggerService } from '@services/logger/logger.service';
import { SnackbarService } from '@services/snack-bar/snackbar.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(
    private snackBar: SnackbarService,
    private loggerService: LoggerService,
    private zone: NgZone
  ) { }

  // ng zone is for executing work outside of the Angular zone.
  // type should be enum for more varsity of options
  handleError(error: Error) {
    this.zone.run(() =>
      this.snackBar.append({
        message: 'Oops Something went wrong',
        type: 'error',
      })
    );

    this.loggerService.debug(error.message);
  }
}
