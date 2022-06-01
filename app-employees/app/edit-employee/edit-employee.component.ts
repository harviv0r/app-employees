import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  ToastrService
} from 'ngx-toastr';
import {
  EmployeesService
} from '../employees/employees.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {


  constructor(private router: Router,
    private employeeService: EmployeesService,
    private toastr: ToastrService, ) {}

  ngOnInit(): void {}

  deleteEmployee(event: string) {
    return this.employeeService.deleteEmployee(event)
      .then(() => {
        this.router.navigate(["/dashboard/employees"])
      })
      .then(() => {
        this.toastr.info('Empleado eliminado exitosamente')
      })
      .catch((err) => {
        console.log(err);
        this.toastr.error('Error al eliminar empleado');
      })
  }

  editEmployee(event: any) {
    return this.employeeService.updateEmployee(event.id, event.employee)
      .then(() => {
        this.router.navigate(["/dashboard/employees"]);
      })
      .then(() => {
        this.toastr.success('Empleado actualizado exitosamente');
      })
      .catch((err) => {
        console.log(err);
        this.toastr.error('Error al registrar empleado 96');
      })
  }
}
