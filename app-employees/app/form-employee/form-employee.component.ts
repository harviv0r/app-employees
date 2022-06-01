import {
  Component,
  OnInit,
  Output
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  EventEmitter
} from '@angular/core';
import {
  Emplooyees
} from '../employees/employees.model';
import {
  EmployeesService
} from '../employees/employees.service';
import {
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'app-form-employee',
  templateUrl: './form-employee.component.html',
  styleUrls: ['./form-employee.component.css']
})
export class FormEmployeeComponent implements OnInit {

  load=true;
  employeeForm!: FormGroup;
  employeeData!: Emplooyees;
  id: any;
  addEditText: string = "Añadir"
  cancelDeleteText: string = "Cancelar";
  isEdit = false;



  @Output() deleteEvent: EventEmitter < string > = new EventEmitter();
  @Output() cancelEvent: EventEmitter < boolean > = new EventEmitter();
  @Output() addEmployeeEvent: EventEmitter < {
    employee: Emplooyees,
    isEdit: boolean,
    id: string
  } > = new EventEmitter();
  @Output() editEmployeeEvent: EventEmitter < {
    employee: Emplooyees,
    isEdit: boolean,
    id: string
  } > = new EventEmitter();

  constructor(private fb: FormBuilder, private employeeService: EmployeesService,
    private aRoute: ActivatedRoute) {
    this.load=false;

    this.employeeForm = this.fb.group({
      surname: ['', [Validators.required, Validators.pattern(/^[A-Z][A-z]+$/)]],
      name: ['', [Validators.required, Validators.pattern(/^[A-Z][A-z]+$/)]],
      email: ['', [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
      numberId: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      advances: ['', [Validators.required]],
      payments: ['', [Validators.required]],
      fines: ['', [Validators.required]],
      receivable: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
   
    this.id = this.aRoute.snapshot.paramMap.get('id');
    if (this.id) {
      this.load=true;
      this.isEdit = true;
      this.addEditText = "Actualizar";
      this.cancelDeleteText = "Eliminar Usuario"
      
      this.employeeService.getEmployee(this.id).subscribe(
        data => {
          this.load=false;
          return this.employeeForm.setValue({
            surname: data.payload.data()['surname'],
            name: data.payload.data()['name'],
            email: data.payload.data()['email'],
            numberId: data.payload.data()['numberId'],
            advances: data.payload.data()['advances'],
            payments: data.payload.data()['payments'],
            fines: data.payload.data()['fines'],
            receivable: data.payload.data()['receivable'],
          })
        })
    }
  }


  addEdit() {
    if (this.isEdit === true) {
      this.employeeData = this.employeeForm.value;
      this.editEmployeeEvent.emit({
        employee: this.employeeData,
        isEdit: this.isEdit,
        id: this.id
      });
      this.isEdit = false;
    } else {
      this.employeeData = this.employeeForm.value;
      this.addEmployeeEvent.emit({
        employee: this.employeeData,
        isEdit: this.isEdit,
        id: this.id
      });
      this.isEdit = false;
    }
  }

  cancelDelete() {
    if (this.isEdit === true) {
      this.deleteEvent.emit(this.id);
      this.isEdit = false;
    } else {
      this.cancelEvent.emit(false);
      this.isEdit = false;
    }
  }

}
