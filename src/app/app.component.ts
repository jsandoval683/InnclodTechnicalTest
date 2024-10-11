import { Component, computed, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./shared/components/navbar/navbar.component";
import { FooterComponent } from "./shared/components/footer/footer.component";
import { AlertService } from './shared/services/alert.service';
import { LoadingComponent } from './shared/components/loading/loading.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, LoadingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  
  #alertService = inject(AlertService);
  protected isLoading = computed<boolean>(() => this.#alertService.isLoading());
  protected notify = computed(() => this.#alertService.notify());

  constructor() {
    effect((OnCleanup) => {
      if(this.notify()?.status){
        const timer = setTimeout(() => this.closeNotify(), 4000);
        OnCleanup(() => clearTimeout(timer))
      }
    });
  }

  closeNotify = () => this.#alertService.notify.update(x => ({ ...x, status: false }));
}