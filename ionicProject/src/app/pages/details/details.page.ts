import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Storage } from '@ionic/storage';
import { BdService } from 'src/app/service/bd.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  data: string;
  voirPlus: any

  constructor(
    private activatedRoute: ActivatedRoute,
    public bdService:BdService,
    public router:Router,

   public storage: Storage

  ) {
    this.data = this.activatedRoute.snapshot.paramMap.get('idFormation')
    this.bdService.getFormations().subscribe(res => {
      res.map(e => {
        if( e.payload.doc.id === this.data ){
          this.voirPlus = {
            docid: e.payload.doc.id,
            nom: e.payload.doc.data()["nom"],
            date: e.payload.doc.data()["date"],
            prix: e.payload.doc.data()["prix"],
            description: e.payload.doc.data()["description"]
          }
        }

      })
      console.log(this.voirPlus);

    },(err:any) => {
      console.log(err)
    })
  }
  reserve(data){
    this.storage.get('idCurrentUser').then((val) => {


    this.bdService.reserver(data,val);
    this.router.navigateByUrl('home');
  });
  }

  ngOnInit() {
  }

}
