import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { ProjectComponent } from './project.component';
import { TableViewComponent } from './table-view/table-view.component';
import { DashboardViewComponent } from './dashboard-view/dashboard-view.component';

import { DemandManageComponent } from './demand-manage/demand-manage.component';
import { DevSetManageComponent } from './dev-set-manage/dev-set-manage.component';
import { TestManageComponent } from './test-manage/test-manage.component';
import { TestSetManageComponent } from './test-set-manage/test-set-manage.component';
import { BugManageComponent } from './bug-manage/bug-manage.component';

import { DemandDetailComponent } from './demand-manage/demand-detail/demand-detail.component';
import { DevSetDetailComponent } from './dev-set-manage/dev-set-detail/dev-set-detail.component';
import { TestCaseDetailComponent } from './test-manage/test-case-detail/test-case-detail.component';
import { TestSetDetailComponent } from './test-set-manage/test-set-detail/test-set-detail.component';
import { BugDetailComponent } from './bug-manage/bug-detail/bug-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: ProjectComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardViewComponent,
        data: { isShowNav: true, isShowSidebar: true }
      },
      {
        path: 'demand',
        component: DemandManageComponent,
        children: [
          {
            path: '',
            component: TableViewComponent,
            data: { type: 'demand' }
          },
          {
            path: ':id',
            component: DemandDetailComponent,
          },
          {
            path: 'new',
            component: DemandDetailComponent,
          },
          { path: '', redirectTo: '', pathMatch: 'full' }
        ],
        data: { isShowNav: true, isShowSidebar: true }
      },
      {
        path: 'devSet',
        component: DevSetManageComponent,
        children: [
          {
            path: '',
            component: TableViewComponent,
            data: { type: 'devSet' }
          },
          {
            path: ':id',
            component: DevSetDetailComponent,
          },
          {
            path: 'new',
            component: DevSetDetailComponent,
          },
          { path: '', redirectTo: '', pathMatch: 'full' }
        ],
        data: { isShowNav: true, isShowSidebar: true }
      },
      {
        path: 'testCase',
        component: TestManageComponent,
        children: [
          {
            path: '',
            component: TableViewComponent,
            data: { type: 'testCase' }
          },
          {
            path: ':id',
            component: TestCaseDetailComponent,
          },
          {
            path: 'new',
            component: TestCaseDetailComponent,
          },
          { path: '', redirectTo: '', pathMatch: 'full' }
        ],
        data: { isShowNav: true, isShowSidebar: true }
      },
      {
        path: 'testSet',
        component: TestSetManageComponent,
        children: [
          {
            path: '',
            component: TableViewComponent,
            data: { type: 'testSet' }
          },
          {
            path: ':id',
            component: TestSetDetailComponent,
          },
          {
            path: 'new',
            component: TestSetDetailComponent,
          },
          { path: '', redirectTo: '', pathMatch: 'full' }
        ],
        data: { isShowNav: true, isShowSidebar: true }
      },
      {
        path: 'bug',
        component: BugManageComponent,
        children: [
          {
            path: '',
            component: TableViewComponent,
            data: { type: 'bug' }
          },
          {
            path: ':id',
            component: BugDetailComponent,
          },
          {
            path: 'new',
            component: BugDetailComponent,
          },
          { path: '', redirectTo: '', pathMatch: 'full' }
        ],
        data: { isShowNav: true, isShowSidebar: true }
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
