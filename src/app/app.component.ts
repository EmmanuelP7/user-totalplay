import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormularioComponent } from './formulario/formulario.component';
import { UsersListComponent } from './users-list/users-list.component';
import { FormUpdateComponent } from './form-update/form-update.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormularioComponent, UsersListComponent, FormUpdateComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent
{
  title = 'user-totalplay';

  activeNav = "registros";

  changeActiveNav(nav: string)
  {
    this.activeNav = nav;
  }


}
