import { FormBuilder, FormControl, NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { QueryBuilderClassNames, QueryBuilderConfig } from '../../lib';

@Component({
  selector: 'app-root',
  template: `
  <h2>Bootstrap</h2>
  <br>
  <form #f="ngForm" (ngSubmit)="onSubmit(f)" novalidate>
  <query-builder name="queryBuilder" [(ngModel)]='query' [classNames]='bootstrapClassNames' [config]='currentConfig' [allowRuleset]='allowRuleset' [allowCollapse]='allowCollapse' [operatorMap]="operatorMap">
    <div class="col-auto" *queryInput="let field=field; let rule; type: 'textarea'">
      <textarea [name]="field.name" class="form-control" [(ngModel)]="rule.value"
        placeholder="Custom Textarea" required></textarea>
    </div>
    <div class="col-auto" *queryInput="let field=field; let rule; type: 'string'">
      <input type="text" [name]="field.name" class="form-control" [(ngModel)]="rule.value"
        placeholder="Custom Text" required/>
    </div>
    <div class="col-auto" *queryInput="let field=field; let rule; type: 'number'">
      <input type="number" [name]="field.name" class="form-control" [(ngModel)]="rule.value"
        placeholder="Custom Number" required/>
    </div>
    <div class="col-auto" *queryInput="let field=field; let rule; type: 'date'">
      <input type="date" [name]="field.name" class="form-control" [(ngModel)]="rule.value"
        placeholder="Custom Date" required/>
    </div>
    <div class="col-auto" *queryInput="let field=field; let rule; type: 'boolean'">
      <input type="checkbox" [name]="field.name" class="form-control" [(ngModel)]="rule.value" required/>
    </div>
    <div class="col-auto" *queryInput="let field=field; let options=options; let rule; type: 'category'">
      <select [name]="field.name" class="form-control" [(ngModel)]="rule.value" required>
        <option *ngFor="let opt of options" [value]="opt.value">{{ opt.name }}</option>
      </select>
    </div>
    <div class="col-auto" *queryInput="let field=field; let options=options; let rule; type: 'multiselect'">
      <select multiple [name]="field.name" class="form-control" [(ngModel)]="rule.value" required>
        <option *ngFor="let opt of options" [value]="opt.value">{{ opt.name }}</option>
      </select>
    </div>
  </query-builder>
  <button>Submit</button>
  </form>
  `,
  styles: [`
  /deep/ html {
    font: 14px sans-serif;
    margin: 30px;
  }

  .mat-icon-button {
    outline: none;
  }

  .mat-arrow-icon {
    outline: none;
    line-height: 32px;
  }

  .mat-form-field {
    padding-left: 5px;
    padding-right: 5px;
  }

  .text-input {
    padding: 4px 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }

  .text-area {
    width: 300px;
    height: 100px;
  }

  .output {
    width: 100%;
    height: 300px;
  }
  `]
})
export class AppComponent {
  public queryCtrl: FormControl;

  public operatorMap: { [key: string]: string[] } = {
    string: ['=', '!=', 'contains'],
    number: ['=', '!=', '>', '>=', '<', '<='],
    time: ['=', '!=', '>', '>=', '<', '<='],
    date: ['=', '!=', '>', '>=', '<', '<='],
    category: ['=', '!=', 'in', 'not in'],
    boolean: ['=']
  };


  public bootstrapClassNames: QueryBuilderClassNames = {
    removeIcon: 'fa fa-minus',
    addIcon: 'fa fa-plus',
    arrowIcon: 'fa fa-chevron-right px-2',
    button: 'btn',
    buttonGroup: 'btn-group',
    rightAlign: 'order-12 ml-auto',
    switchRow: 'd-flex px-2',
    switchGroup: 'd-flex align-items-center',
    switchRadio: 'custom-control-input',
    switchLabel: 'custom-control-label',
    switchControl: 'custom-control custom-radio custom-control-inline',
    row: 'row p-2 m-1',
    rule: 'border',
    ruleSet: 'border',
    invalidRuleSet: 'alert alert-danger',
    emptyWarning: 'text-danger mx-auto',
    operatorControl: 'form-control',
    operatorControlSize: 'col-auto pr-0',
    fieldControl: 'form-control',
    fieldControlSize: 'col-auto pr-0',
    entityControl: 'form-control',
    entityControlSize: 'col-auto pr-0',
    inputControl: 'form-control',
    inputControlSize: 'col-auto'
  };

  public query = {
    condition: 'and',
    rules: [
      {field: 'age', operator: '<=', entity: 'physical'},
      {field: 'birthday', operator: '=', value: new Date(), entity: 'nonphysical'},
      {
        condition: 'or',
        rules: [
          {field: 'gender', operator: '=', entity: 'physical'},
          {field: 'occupation', operator: 'in', entity: 'nonphysical'},
          {field: 'school', operator: 'is null', entity: 'nonphysical'},
          {field: 'notes', operator: '=', entity: 'nonphysical'}
        ]
      }
    ]
  };

  public entityConfig: QueryBuilderConfig = {
    entities: {
      physical: {name: 'Physical Attributes'},
      nonphysical: {name: 'Nonphysical Attributes'}
    },
    fields: {
      age: {name: 'Age', type: 'number', entity: 'physical'},
      gender: {
        name: 'Gender',
        entity: 'physical',
        type: 'category',
        options: [
          {name: 'Male', value: 'm'},
          {name: 'Female', value: 'f'}
        ]
      },
      name: {name: 'Name', type: 'string', entity: 'nonphysical'},
      notes: {name: 'Notes', type: 'textarea', operators: ['=', '!='], entity: 'nonphysical'},
      educated: {name: 'College Degree?', type: 'boolean', entity: 'nonphysical'},
      birthday: {name: 'Birthday', type: 'date', operators: ['=', '<=', '>'],
        defaultValue: (() => new Date()), entity: 'nonphysical'
      },
      school: {name: 'School', type: 'string', nullable: true, entity: 'nonphysical'},
      occupation: {
        name: 'Occupation',
        entity: 'nonphysical',
        type: 'category',
        options: [
          {name: 'Student', value: 'student'},
          {name: 'Teacher', value: 'teacher'},
          {name: 'Unemployed', value: 'unemployed'},
          {name: 'Scientist', value: 'scientist'}
        ]
      }
    }
  };

  public config: QueryBuilderConfig = {
    fields: {
      age: {name: 'Age', type: 'number'},
      gender: {
        name: 'Gender',
        type: 'category',
        options: [
          {name: 'Male', value: 'm'},
          {name: 'Female', value: 'f'}
        ]
      },
      name: {name: 'Name', type: 'string'},
      notes: {name: 'Notes', type: 'textarea', operators: ['=', '!=']},
      educated: {name: 'College Degree?', type: 'boolean'},
      birthday: {name: 'Birthday', type: 'date', operators: ['=', '<=', '>'],
        defaultValue: (() => new Date())
      },
      school: {name: 'School', type: 'string', nullable: true},
      occupation: {
        name: 'Occupation',
        type: 'category',
        options: [
          {name: 'Student', value: 'student'},
          {name: 'Teacher', value: 'teacher'},
          {name: 'Unemployed', value: 'unemployed'},
          {name: 'Scientist', value: 'scientist'}
        ]
      }
    }
  };

  public currentConfig: QueryBuilderConfig;
  public allowRuleset: boolean = true;
  public allowCollapse: boolean;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.queryCtrl = this.formBuilder.control(this.query);
    this.currentConfig = this.config;
  }

  switchModes(event: Event) {
    this.currentConfig = (<HTMLInputElement>event.target).checked ? this.entityConfig : this.config;
  }

  changeDisabled(event: Event) {
    (<HTMLInputElement>event.target).checked ? this.queryCtrl.disable() : this.queryCtrl.enable();
  }

  onSubmit(f: NgForm) {
    console.log(f);
    console.log(f.value);
    console.log(f.valid);
  }
}
