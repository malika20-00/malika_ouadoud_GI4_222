import { Injectable } from '@angular/core';
import { AngularFireAuth,  } from "@angular/fire/compat/auth";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import firebase from "firebase/compat/app";
import { Formation } from '../model/formation';
import { Profile} from '../model/Profile';

@Injectable({
  providedIn: 'root'
})
export class BdService {





  constructor(

    public firestore: AngularFirestore,
    public auth: AngularFireAuth
  ) { }
  async signin(data) {

    try {
      const user = await this.auth.signInWithEmailAndPassword(data.email, data.password);
      return user;
    }
    catch (e) {
      return null;
    }
  }


  async signup(user: Profile) {

    try {

      const userP = await this.auth.createUserWithEmailAndPassword(user.email, user.password);

      return userP;

    }
    catch (e) {
      return null;
    }

  }

  complementSignUp(data) {
    return this.firestore.collection("users").doc(data.uid).set(data);
  }



  getFormationsReserved(id:string) {
    return this.firestore.collection("users").doc(id).get();
  }


 getFormationById(id:string){
  return  this.firestore.collection("formations").doc(id).get();

 }



 signOut(){
  return this.auth.signOut();
 }

 getFormations(){
  return this.firestore.collection("formations").snapshotChanges();

}

reserver(data,id:string) {
  const user = this.firestore.collection("users").doc(id)
  user.update({
    formations: firebase.firestore.FieldValue.arrayUnion(data)
  })
}
annulerReservation(idFormation: string,id:string){
  const user = this.firestore.collection("users").doc(id)
  user.update({
    formations: firebase.firestore.FieldValue.arrayRemove(idFormation)
  })
}

add(formation:Formation){
  const formationRef = this.firestore.collection('formations');
  formationRef.add(formation);
}

update(formation : Formation,id:string){
  const formationRef = this.firestore.collection("formations").doc(id);
  formationRef.update(formation);
}
delete(id:string){
  const formationRef = this.firestore.collection("formations").doc(id);
      formationRef.delete();
}


}
