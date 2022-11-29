import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss'],
})
export class TemplateFormComponent implements OnInit {
  usuario: any = {
    nome: null,
    email: null,
  };

  onSubmit(form: any) {
    console.log(form);
    console.log(this.usuario);
  }

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  verificaValidTouched(campo: { valid: any; touched: any }) {
    return !campo.valid && campo.touched;
  }

  aplicaCssErro(campo: { valid: any; touched: any }) {
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo),
    };
  }

  consultaCEP(cep: any) {
    cep = cep.replace(/\D/g, '');
    if (cep != null && cep !== '') {
      let validacep = /^[0-9]{8}$/;

      if (validacep.test(cep)) {
        this.http
          .get(`//viacep.com.br/ws/${cep}/json/`)
          .pipe(map((dados: any) => dados))
          .subscribe((dados) => console.log(dados));
      }
    }
  }
  /*  consultaCEP(cep: any) {
    cep = cep.replace(/\D/g,'');
    if (cep!==''){
      this.http
      .get(`//viacep.com.br/ws/${cep}/json/`)
      .subscribe(dados=>console.log(dados));
    }
  } */
}
