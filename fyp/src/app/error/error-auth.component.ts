import { Component,Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from '@angular/material';


@Component({
  templateUrl:'./error-auth.component.html'
})

export class ErrorAuthComponent{
  constructor(@Inject(MAT_DIALOG_DATA) public data:{message:string}){}

}
