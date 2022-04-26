import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import {BdService } from '../../service/bd.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage  {

  listFormations = [];
  tableauFormations = [];





  constructor(

    public bdService: BdService,

    public router: Router,
    public storage: Storage) {


    this.bdService.getFormations().subscribe(res => {
      this.listFormations = res.map(e => {
        return {
          docid: e.payload.doc.id,
          description: e.payload.doc.data()["description"],
          nom: e.payload.doc.data()["nom"],
          date: e.payload.doc.data()["date"],
          prix: e.payload.doc.data()["prix"]
        }
      })

    }, (err: any) => {
      console.log(err)
    })
  }
  delete(index, idFormation: string) {
    this.listFormations.splice(index, 1);
    this.bdService.delete(idFormation);
  }
  add() {
    this.router.navigateByUrl('ajouter');

  }

  versPageDetails(docid) {
    this.router.navigateByUrl('details/' + docid);
  }
  update(idFormation:string) {
    this.router.navigateByUrl('modifier/'+idFormation);

  }
  async printFormationsReserved() {




    this.storage.get('idCurrentUser').then((val) => {
      this.bdService.getFormationsReserved(val).subscribe(res => {
        this.tableauFormations = res.data()['formations'];
        for (var i = 0; i < this.tableauFormations.length; i++) {
          this.bdService.getFormationById(res.data()['formations'][i]).subscribe(r => {
          });
        }
      })
    });


  }
 


}
