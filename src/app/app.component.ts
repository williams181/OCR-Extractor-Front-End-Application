import { Component, Input, Output } from '@angular/core';
import { NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CustomAdapter } from './shared/datePickerCustomAdapter.service';
import { CustomDateParserFormatter } from './shared/datePickerCustomDateParserFormatter.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Data } from '@angular/router';
import {Observable, of , from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { empty } from 'rxjs';

interface Alert {
  type: string;
  message: string;
}

const ALERTS: Alert[] = [{
  type: 'success',
  message: 'This is an success alert',
}, {
  type: 'info',
  message: 'This is an info alert',
}, {
  type: 'warning',
  message: 'This is a warning alert',
}, {
  type: 'danger',
  message: 'This is a danger alert',
}, {
  type: 'primary',
  message: 'This is a primary alert',
}, {
  type: 'secondary',
  message: 'This is a secondary alert',
}, {
  type: 'light',
  message: 'This is a light alert',
}, {
  type: 'dark',
  message: 'This is a dark alert',
}
];


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }
  ]
})
export class AppComponent {

  nomeHospital: string;
  cnpj: string;
  nomePaciente: string;
  nomeProcedimento: number;
  acomodacao: string;
  nomeConvenio: string;
  dataEvento: string;
  medico: string;
  crm: number;
  registroAnestesico: File;
  mensagem: string;
  errorMensagem: String;

  title = 'angular-template';

  data: Article;

  error: any;

  model: NgbDateStruct;

  alerts: Alert[];

  constructor(private http: HttpClient) {
    this.reset();
  }

  close(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

  reset() {
    this.alerts = Array.from(ALERTS);
  }

  onClickGETolaMundo() {
    // const headers = new HttpHeaders()
    const headers = { '': '' };
    // const body = { title: '' };
    this.http.get<any>('', { headers }).subscribe(data => { console.log(data) });

  }

  intFileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      const headers = { '': '' };
      this.http.post<Article>('', formData, { headers })
        .subscribe(datas => { this.data = datas; console.log(datas)}, 
                  respos => { this.errorMensagem = respos.error.mensagem; console.log(respos) })

    }
  }

  resetar() {
    console.log("função reset...")

  }

  cadastrar() {
    console.log("função cadastrar...")

  }

  transferir() {
    console.log("transferencia...")
    console.log(this.nomeHospital);
    console.log(this.cnpj);
    console.log(this.nomeConvenio);
    console.log(this.nomePaciente);
    console.log(this.nomeProcedimento);
    console.log(this.dataEvento);
    console.log(this.medico);
    console.log(this.crm);
    console.log(this.acomodacao);
    console.log(this.registroAnestesico);
    console.log(this.mensagem);
    console.log(this.error.mensagem)
    this.limparCampos();
  }

  limparCampos(){
    this.data.acomodacao = null;
    this.data.cnpj = null;
    this.data.crm = null;
    this.data.dataEvento = null; 
    this.data.medico = null;
    this.data.nomeConvenio = null;
    this.data.nomeHospital = null;
    this.data.nomePaciente = null;
    this.data.nomeProcedimento = null;
    this.registroAnestesico = null;
    this.data.mensagem = null;
    this.error.mensagem = null;
  }

}

interface Article {
  nomeHospital: string;
  cnpj: string;
  nomePaciente: string;
  nomeProcedimento: number;
  acomodacao: string;
  nomeConvenio: string;
  dataEvento: string;
  medico: string;
  crm: number;
  mensagem: String;
}

