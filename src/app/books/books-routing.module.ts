import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { FilterPageComponent } from './pages/filter-page/filter-page.component';
// import { ListPageComponent } from './pages/list-page/list-page.component';
// import { HeroPageComponent } from './pages/hero-page/hero-page.component';


// localhost:4200/books
const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: 'new-book', component: NewPageComponent },
      { path: 'filter', component: FilterPageComponent },
      { path: 'edit/:id', component: NewPageComponent },
      // { path: 'list', component: ListPageComponent },
      // { path: ':id', component: HeroPageComponent },
      //{ path: '**', redirectTo: 'list' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule { }
