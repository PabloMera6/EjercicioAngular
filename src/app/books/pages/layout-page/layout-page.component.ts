import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: [
  ]
})
export class LayoutPageComponent {

  public sidebarItems = [
    { label: 'Filtrar', icon: 'label', url: './filter' },
    { label: 'Añadir', icon: 'add', url: './new-book' },

  ]

}
