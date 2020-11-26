import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { AuthData } from './auth-data.model';
import { Router } from '@angular/router';
import { SignupAuthData } from './signup-data.model';
import { Subject } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({providedIn :"root"})
export class AuthService{

  private token:string;
  private isAuthenticated =false;
  private tokenTimer:any;
  private authStatusListener = new Subject<boolean>();

  constructor(private http:HttpClient,private router: Router){}

  getToken(){
    return this.token;
  }
  getIsAuth(){
    return this.isAuthenticated;
  }
  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }

  createUser(LecturerName:string,username:string,password:string){
    const authData:SignupAuthData = {LecturerName:LecturerName,username:username,password:password};
    this.http.post("http://localhost:3000/api/user/signup",authData)
    .subscribe(response=>{
      console.log(response);
      // this.router.navigate(["/login"]);

      this.router.navigate["/"];
    },error =>{
      this.authStatusListener.next(false);
    });
  }


  login(username:string,password:string){
    const authData:AuthData = {username:username,password:password};
    this.http.post<{token:string,expiresIn:number}>("http://localhost:3000/api/user/login",authData)
    .subscribe(response =>{
      const token =response.token;
      this.token=token;
      if(token){
        const expiresInDuration = response.expiresIn;
        // console.log(expiresInDuration);
        this.setAuthTimer(expiresInDuration);
        this.isAuthenticated =true;
        this.authStatusListener.next(true);
        const now =new Date();
        const expirationDate=new Date(now.getTime() + expiresInDuration*1000)
        console.log(expirationDate)
        this.saveAuthData(token,expirationDate);
        this.router.navigate(['/list']);
      }

    },error=>{
      this.authStatusListener.next(false);
    });
  }

  autoAuthUser(){
    const authInformation=this.getAuthData();
    if(!authInformation){
      return;
    }
    const now=new Date();
    const expiresIn = authInformation.expirationDate.getTime()-now.getTime();
    if(expiresIn>0){
      this.token=authInformation.token;
      this.isAuthenticated=true;
      this.setAuthTimer(expiresIn/1000)
      this.authStatusListener.next(true);
    }
  }

  logout(){
      this.token=null;

      this.isAuthenticated =false;
      this.authStatusListener.next(false);
      clearTimeout(this.tokenTimer);
      this.clearAuthData();
      this.router.navigate(['/']);
  }

  private saveAuthData(token:string,expirationDate:Date){
    localStorage.setItem('token',token);
    localStorage.setItem('expiration',expirationDate.toISOString())
  }

  private setAuthTimer(duration:number){
    console.log("setting timer: "+duration)
    this.tokenTimer=setTimeout(()=> {
      this.logout();
    },duration*1000);

  }
  private clearAuthData(){
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
  }

  private getAuthData(){
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration")
    if(!token || !expirationDate){
      return;
    }
    return{
      token:token,
      expirationDate:new Date(expirationDate)
    }
  }

}
