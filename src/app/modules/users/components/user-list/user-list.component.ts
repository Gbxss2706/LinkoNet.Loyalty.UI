import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../../../shared-modules/models/user-model';
import { MatDialog } from '@angular/material/dialog';
import { TypeEvent } from '../../enums/type-event';
import { UsersService } from '../../services/users.service';
import { AssociatePOSTypeEvent } from '../../../../shared-modules/enums/asocciate-pos-event.enum';
import { UserTypeEvent } from '../../../../shared-modules/models/user-type-event';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit{

  @Input() typeEventValue: string = '';
  @Input() POSId: number = 0;
  @Output() userTypeEvent: EventEmitter<UserTypeEvent> = new EventEmitter<UserTypeEvent>();

  public users: User[] = [];

  constructor(private usersService: UsersService, private dialog: MatDialog) {

  }
  ngOnInit(): void {
    this.getAllUsers();
    console.log(this.isDialogPOSEvent());
  }

  private getAllUsers(): void {
    this.usersService.getAllUsers().subscribe(usersResponse => {
      this.users = usersResponse;
    });
  }

  public updateUser(user : User): void {
    const userTypeEventValue : UserTypeEvent = { typeEvent: TypeEvent.Edit, userData: user};
    this.userTypeEvent.emit(userTypeEventValue);
  }

  public isDialogPOSEvent():boolean{
    return this.typeEventValue == AssociatePOSTypeEvent.AssociatePOSType;
  }

  public associateUser(userId: number){
    this.usersService.associateUser(this.POSId, userId).subscribe(usersResponse => {
      this.users = usersResponse;
      window.location.reload();
    });
  }
}
