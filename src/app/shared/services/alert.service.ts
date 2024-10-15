import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  isLoading = signal<boolean>(false);
  notify = signal({
    title: 'title',
    msg: '',
    status: false
  });

  loadingStatus = (value: boolean = false): void => this.isLoading.set(value);

  error(message?: string): void {
    this.notify.set({
      title: 'Error',
      msg: message ?? 'Ha ocurrido un error',
      status: true
    });
  }

  success(message?: string): void {
    this.notify.set({
      title: 'Success',
      msg: message ?? 'Proceso exitoso',
      status: true
    });
  }

  info(message: string): void {
    this.notify.set({
      title: 'Info',
      msg: message,
      status: true
    });
  }
}