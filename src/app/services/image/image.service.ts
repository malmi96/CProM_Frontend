import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private http: HttpClient) {}

  getImages(projectid: string, stageid: string): Observable<any> {
    return this.http.get<any>(
      `http://localhost:5000/api/image/get/${projectid}/${stageid}`
    );
  }

  getImageByStageName(stageNameN: string): Observable<any> {
    const stage = {
      stageName: stageNameN,
    };
    return this.http.post<any>(
      'http://localhost:5000/api/image/stageName',
      stage
    );
  }

  addImage(
    imageName: string,
    image: File,
    projectName: string,
    stageName: string
  ): Observable<any> {
    const postData = new FormData();
    postData.append('imageName', imageName);
    postData.append('image', image, imageName);
    postData.append('projectName', projectName);
    postData.append('stageName', stageName);
    return this.http.post<{ message: string }>(
      'http://localhost:5000/api/image/add',
      postData
    );
  }

  deleteImage(id: string): Observable<any> {
    return this.http.delete<any>(`http://localhost:5000/api/image/${id}`);
  }
}
