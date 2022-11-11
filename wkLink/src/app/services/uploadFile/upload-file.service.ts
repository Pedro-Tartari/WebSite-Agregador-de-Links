import { Injectable } from '@angular/core';
import { getDownloadURL, ref, Storage } from '@angular/fire/storage';
import { uploadBytes } from 'firebase/storage';
import { from, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private storage: Storage) { }

  uploadFile(file: File, path: string): Observable<string>{
    // const metadata = {
    //   contentType: 'application/zip'
    // };
    const storageRef = ref(this.storage, path);
    const uploadTask = from(uploadBytes(storageRef, file));
    return uploadTask.pipe(
      switchMap((result) => getDownloadURL(result.ref))
    );
  }
}
