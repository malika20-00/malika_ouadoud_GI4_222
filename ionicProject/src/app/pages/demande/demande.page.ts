import { Component, OnInit } from '@angular/core';
import { BdService } from '../../service/bd.service';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-demande',
  templateUrl: './demande.page.html',
  styleUrls: ['./demande.page.scss'],
})
export class DemandePage implements OnInit {

  tableauFormations = [];
  x = {
    docid: "",
    nom: "",
    date: "",
    description: "",
    prix: ""
  };
  noFormation: number = 0;
  formationReserved: any;
  constructor(public bdService: BdService,
    public storage: Storage,
    public router: Router) {


    this.storage.get('idCurrentUser').then((val) => {
      this.bdService.getFormationsReserved(val).subscribe(res => {
        try {
          this.tableauFormations = res.data()['formations'];

        } catch (e) {
          this.noFormation = 1;
        }
        if (this.noFormation == 0) {
          this.formationReserved = [];
          if (this.tableauFormations != null){
            this.tableauFormations.map(e => {

              return this.bdService.getFormationById(e).subscribe(r => {


                this.x.docid = e;
                this.x.nom = r.data()['nom'];
                this.x.date = r.data()['date'];
                this.x.description = r.data()['description'];
                this.x.prix = r.data()['prix'];
                console.log(this.x);
                this.formationReserved.push(this.x);


              });



            });}
        }



      })
    });
  }

  ngOnInit() {
  }
  async annuler(id: string) {
    this.storage.get('idCurrentUser').then((val) => {


      this.bdService.annulerReservation(id, val);

    });
    this.router.navigateByUrl('home');






  }
  versPageDetails(id: string) {
    this.router.navigateByUrl('details/' + id);
  }

}
