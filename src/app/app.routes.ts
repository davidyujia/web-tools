import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UriEncodeDecodeComponent } from './uri-encode-decode/uri-encode-decode.component';
import { Base64EncodeDecodeComponent } from './base64-encode-decode/base64-encode-decode.component';
import { ShaEncodeComponent } from './sha-encode/sha-encode.component';
import { BrowserNotificationApiComponent } from './browser-notification-api/browser-notification-api.component';
import { InfoComponent } from './info/info.component';

function titleFormat(s: string): string {
  return s ? `${s} - Web Tools` : 'Web Tools'
}
export const routes: Routes = [
  {
    path: 'uri-encode-decode',
    title: titleFormat('URI Encode/Decode'),
    component: UriEncodeDecodeComponent,
    children: []
  },
  {
    path: 'base64-encode-decode',
    title: titleFormat('Base64 Encode/Decode'),
    component: Base64EncodeDecodeComponent,
    children: []
  },
  {
    path: 'sha-encode',
    title: titleFormat('SHA-1/SHA-128/SHA-256/SHA-512 Encode'),
    component: ShaEncodeComponent,
    children: []
  },
  {
    path: 'browser-notification-api',
    title: titleFormat('Browser Notification API Test'),
    component: BrowserNotificationApiComponent,
    children: []
  },
  {
    path: 'info',
    title: titleFormat('Browser & Application Info'),
    component: InfoComponent,
    children: []
  },
  {
    path: '',
    title: titleFormat(''),
    component: HomeComponent,
    children: []
  },
  {
    path: '**',
    title: 'Page Not Found',
    component: PageNotFoundComponent
  }
];
