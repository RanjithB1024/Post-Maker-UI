import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
const baseUrl = 'http://localhost:1030/v0.1';


@Injectable({
  providedIn: 'root'
})
export class SocialPostService {

  constructor(private http: HttpClient) { }

  postDetails(details: object) {
    return this.http.post(`${baseUrl}` + '/upload/add-post', details);
  }

  fetchingPostDetails() {
    return this.http.get(`${baseUrl}` + '/upload/fetch');
  }


  fetchingComments() {
    return this.http.get(`${baseUrl}` + '/upload/comment');
  }


}
