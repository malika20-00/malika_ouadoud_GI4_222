import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage-angular';
import {BdService } from '../../service/bd.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: FormGroup;

  public emaill:any;
  public passwordd:any;
  constructor(
    private fb: FormBuilder,
    private alertController: AlertController,
    public router:Router,
    public bdService:BdService,
    private  storage:Storage
  ) {

  }
  get email() {
    return this.credentials.get('email');
  }
  get password() {
    return this.credentials.get('password');
  }
  async ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],

    });


  }


  async login() {
    this.bdService.signin(this.credentials.value).then(res=>{
      if(res.user.uid){
        /*********************************admin******************************/
         if(res.user.uid== 'kiG54RCrShRPUQ996QNhzZAzkIF2'){
          this.router.navigateByUrl('/admin', { replaceUrl: true });
      }else{
        this.storage.set('idCurrentUser', res.user.uid);
   this.router.navigateByUrl('/home', { replaceUrl: true });

        }
      }else {
          this.showAlert('la Connection a été échoué', 'Veuillez réssayer');

        }

    },err=>{
      console.log(err);
    });

   }
   async showAlert(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  signup(){
    this.router.navigateByUrl('register');
  }
}
