import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  templateUrl:'./errorweight.component.html'
})

export class WeightErrorComponent{
  constructor(@Inject(MAT_DIALOG_DATA) public data:{message:string,total:string}){}

}
