import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp({
      "projectId":
        "tambola-xyz", "appId": "1:628428357020:web:3d4601c12c4893231d1c59",
      "databaseURL": "https://tambola-xyz-default-rtdb.firebaseio.com",
      "storageBucket": "tambola-xyz.appspot.com",
      "apiKey": "AIzaSyDgh5K-HHBXK6zBIxRvJZEt4SmOTKtux54",
      "authDomain": "tambola-xyz.firebaseapp.com",
      "messagingSenderId": "628428357020",
      "measurementId": "G-QBEGQK1517"
    })),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
