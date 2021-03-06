import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Validators } from '@angular/forms';

import { DynamicFormComponent } from 'src/app/dynamic-form/containers/dynamic-form/dynamic-form.component';
import { FieldConfig } from 'src/app/dynamic-form/models/field-config.interface';
import { RestService } from 'src/app/services/rest.service';
import { lastNameValidator } from 'src/app/shared/last-name-validator.directive';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-curso',
  templateUrl: './agregar-curso.component.html',
  styleUrls: ['./agregar-curso.component.scss']
})
export class AgregarCursoComponent {
  @ViewChild('form1') form: DynamicFormComponent;

  submitted = false;
  isActive = false;
  disabled = true;
  formPersonValid = false;

  config: FieldConfig[] = [
    {
      type: 'input',
      label: 'Código del curso',
      placeholder: 'Código del curso',
      name: 'code',
      validation: [Validators.required]
    },
    {
      type: 'input',
      label: 'Nombre del curso',
      placeholder: 'Nombre del curso',
      name: 'name',
      validation: [Validators.required]
    },
    {
      type: 'selectModel',
      label: 'Intructores',
      placeholder: 'Instructores',
      name: 'teachers',
      validation: [Validators.required]
    }
  ];

  constructor(private rest: RestService, private router: Router) {
    this.rest.findAll('teacher').subscribe(res => {
      res['teacherListed'].forEach((teacher) => {
        teacher.fullName = teacher.personalData;
      });

      this.config[2].options = res['teacherListed'];
    });
   }

  ngAfterViewInit(): void {
    let previousValid = this.form.valid;
    this.form.changes.subscribe(() => {
      if (this.form.valid !== previousValid) {
        previousValid = this.form.valid;
        this.form.setDisabled('submit', !previousValid);
      }

      this.formPersonValid = this.form.valid;
      this.disabled = !this.form.valid;
    });
  }

  submit(value: { [name: string]: any }) {
    if (this.form.valid) {
      this.rest.push('courses', this.form.value).subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/curso/listar']);
        },
        err => {
          console.log(err);
        }
      );
    }
  }

}
