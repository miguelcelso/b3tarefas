import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TarefaRetornoResponse } from './models/tarefas/tarefa-retorno-response';
import { Observable } from 'rxjs';
import TarefaCreate from './models/tarefas/tarefa-create';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private SERVER_URL = "https://localhost:8081/Tarefa";

 constructor(private httpClient: HttpClient) { }

  public get():Observable<TarefaRetornoResponse[]>{  
    return this.httpClient.get<TarefaRetornoResponse[]>(this.SERVER_URL);  
  } 

  public post(tarefa:TarefaCreate):Observable<any>{  
    debugger;
    return this.httpClient.post<any>(this.SERVER_URL,tarefa);
  } 
}
