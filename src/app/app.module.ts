import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeadingTitleComponent } from './components/heading-title/heading-title.component';
import { LogoComponent } from './components/logo/logo.component';
import { TransactionsFormComponent } from './components/transactions-form/transactions-form.component';
import { TransactionsListComponent } from './components/transactions-list/transactions-list.component';
import { TransactionsComponent } from './containers/transactions/transactions.component';

@NgModule({
  declarations: [
    AppComponent,
    LogoComponent,
    TransactionsFormComponent,
    HeadingTitleComponent,
    TransactionsListComponent,
    TransactionsComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
