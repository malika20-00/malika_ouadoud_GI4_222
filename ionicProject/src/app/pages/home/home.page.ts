import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {BdService } from '../../service/bd.service';
import {  Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  listFormations = [];
  tableauFormations = [];





  constructor(
    public bdService: BdService,
    public router:Router,
    public storage: Storage
   ) {

    this.bdService.getFormations().subscribe(res => {
      this. listFormations = res.map(e => {
      return {
        docid: e.payload.doc.id,
        nom: e.payload.doc.data()["nom"],
        date: e.payload.doc.data()["date"],
        prix: e.payload.doc.data()["prix"],
        description: e.payload.doc.data()["description"]
      }
      })


    },(err:any) => {
      console.log(err)
    })

    }
    mesCommandes(){
      this.router.navigateByUrl('demande');

     }

      reserve(data){
        this.storage.get('idCurrentUser').then((val) => {
          console.log(val);
          console.log(data);

        this.bdService.reserver(data,val);
        this.router.navigateByUrl('home');
      });
      }

      signOut(){
        this.bdService.signOut().then(()=>{
          this.router.navigateByUrl('login');

        });
      }
      versPageDetails(docid){
        this.router.navigateByUrl('details/' + docid);
      }
}
