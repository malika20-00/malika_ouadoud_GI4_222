import { Component, OnInit } from '@angular/core';
import {BdService } from '../../service/bd.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Profile } from '../../model/profile';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  infoGeneral: FormGroup;
  userP: Profile;
  public emaill:any;
  public passwordd:any;
  public namee:any;
  constructor(
    public router:Router,
    public bdService: BdService,
    private fb: FormBuilder,
    private alertController: AlertController,
    private  storage:Storage

  ) { }
  get email() {
    return this.infoGeneral.get('email');
  }
  get password() {
    return this.infoGeneral.get('password');
  }
  get prenom() {
    return this.infoGeneral.get('prenom');
  }
  get etablissement() {
    return this.infoGeneral.get('etablissement');
  }
  get specialite() {
    return this.infoGeneral.get('specialite');
  }

  get nom() {
    return this.infoGeneral.get('nom');
  }
  signup(){
    this.bdService.signup(this.infoGeneral.value).then(res=>{

      if(res.user.uid){
        this.storage.set('idCurrentUser', res.user.uid);

        let data = {
          email:  this.infoGeneral.controls['email'].value,
          password:this.infoGeneral.controls['password'].value,
          prenom:this.infoGeneral.controls['prenom'].value,
          nom: this.infoGeneral.controls['nom'].value,
          uid:res.user.uid,
          etablissement: this.infoGeneral.controls['etablissement'].value,
         specialite: this.infoGeneral.controls['specialite'].value,
        }
        this.bdService.complementSignUp(data).then(res=>{
             this.router.navigateByUrl('/home', { replaceUrl: true });

        },err=>{
    this.showAlert('l\'inscription a été échoué', 'Veuillez réssayer!');
        })
      }
    },err=>{
    this.showAlert('l\'inscription a été échoué', 'Veuillez réssayer!');

      console.log(err);
    })
  }


  ngOnInit() {


    this.infoGeneral = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
       nom: ['', [Validators.required, Validators.minLength(2)]],
       specialite: ['', [Validators.required, Validators.minLength(2)]],
       etablissement: ['', [Validators.required, Validators.minLength(2)]],  });
  }
  async showAlert(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
  signIn(){
    this.router.navigateByUrl('/login', { replaceUrl: true });

  }
}
