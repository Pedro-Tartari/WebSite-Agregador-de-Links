import { Injectable } from '@angular/core';
import { getDownloadURL, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';
import { uploadBytes } from 'firebase/storage';
import { from, Observable, switchMap } from 'rxjs';
import { HotToastService } from '@ngneat/hot-toast';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private storage: Storage, private toast: HotToastService) { }

  uploadFile(file: File, path: string){
    const storageRef = ref(this.storage, 'atualizadores/' + path);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed', 
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      this.toast.info('Upload is ' + progress + '% done');
      
    }, 
    (error) => {
      // Handle unsuccessful uploads
    }, 
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        // console.log('File available at', downloadURL);
        this.toast.success('Enviado!')
        return downloadURL;
      });
    }
  );
  }
}
