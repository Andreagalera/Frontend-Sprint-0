import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
  urlUser: string = "http://localhost:8080/api/v1";

  
}
