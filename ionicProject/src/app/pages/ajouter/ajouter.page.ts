import { Component, OnInit } from '@angular/core';
import { Formation } from '../../model/formation';
import { ActivatedRoute, Router } from '@angular/router';
import { BdService } from '../../service/bd.service';
import { FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-ajouter',
  templateUrl: './ajouter.page.html',
  styleUrls: ['./ajouter.page.scss'],
})
export class AjouterPage implements OnInit {

   infoGeneral: FormGroup;
  formation: Formation={
    docid:"",
    date :"",
    prix:"",
    description:"",
    nom:""
  };
  constructor(  public bdService:BdService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    public router:Router,
) { }
    get date() {
      return this.infoGeneral.get('date');
    }
    get prix() {
      return this.infoGeneral.get('prix');
    }
    get description() {
      return this.infoGeneral.get('description');
    }
    get nom() {
      return this.infoGeneral.get('nom');
    }

    ngOnInit() {
      this.infoGeneral = this.fb.group({
        date:[''],
        prix:[''],
        description:[''],
        nom:['']
      });
    }
  add(){
    this.bdService.add(this.infoGeneral.value);
    this.router.navigateByUrl('home');

  }

}
