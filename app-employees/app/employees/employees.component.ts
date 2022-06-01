import {
  Component,
  EventEmitter,
  OnInit
} from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/compat/firestore';
import {
  FormBuilder,
  FormGroup,
  NgForm,
  Validators
} from '@angular/forms';
import {
  Router
} from '@angular/router';
import {
  ToastrService
} from 'ngx-toastr';
import {
  Observable
} from 'rxjs';
import {
  Emplooyees
} from './employees.model';
import {
  EmployeesService
} from './employees.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  load=true;
  employees: Emplooyees[] = [];
  id: string | null = "";
  modalSwitch: boolean = false;

  constructor(private router: Router,
    private employeeService: EmployeesService,
    private toastr: ToastrService,
    private firestore: AngularFirestore,
    )
  {}

  ngOnInit(): void {   
    this.getEmployees();
  }


  getEmployees() {
    this.employeeService.getEmployees().subscribe((data: any) => {
      this.employees = data.map((obj: any) => {
        this.load=false;
        return {
          id: obj.payload.doc.id,
          ...obj.payload.doc.data()
        }
      })
    })
  }

  addEmployee(event: any) {
    return this.employeeService.addEmployee(event.employee)
      .then(() => {
        this.modalSwitch = false;
      })
      .then(() => {
        this.toastr.success('Empleado agregado exitosamente');
      })
      .catch((err) => {
        this.toastr.error('Error al registrar empleado');
      });
  }

  onCancel(event: boolean) {
    this.modalSwitch = event;
  }

  buttonAddEmployee() {
    this.modalSwitch = true;
  }

  closeModal(event: Event) {
    let elementId: string = (event.target as Element).id;
    if (elementId == 'modal') {
      this.modalSwitch = false;
    }
  }
}
