import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../../api.service';
import { TarefaRetornoResponse } from '../../models/tarefas/tarefa-retorno-response';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import TarefaCreate from '../../models/tarefas/tarefa-create';

export interface PeriodicElement {
  descricao: string;
  dataTarefa: string;
  status: string;
}

const ELEMENT_DATA: any = [
  { descricao: 'Hydrogen', dataTarefa: '22-08-2024', status: 'H' },
  { descricao: 'Helium', dataTarefa: '22-08-2024', status: 'He' },
  { descricao: 'Lithium', dataTarefa: '22-08-2024', status: 'Li' },
  { descricao: 'Beryllium', dataTarefa: '22-08-2024', status: 'Be' },
  { descricao: 'Carbon', dataTarefa: '22-08-2024', status: 'C' },
  { descricao: 'Nitrogen', dataTarefa: '22-08-2024', status: 'N' },
  { descricao: 'Oxygen', dataTarefa: '22-08-2024', status: 'O' },
  { descricao: 'Fluorine', dataTarefa: '22-08-2024', status: 'F' },
  { descricao: 'Neon', dataTarefa: '22-08-2024', status: 'Ne' },
];
@Component({
  selector: 'app-tarefa',
  templateUrl: './tarefa.component.html',
  styleUrl: './tarefa.component.css'
})

export class TarefaComponent implements OnInit {
  constructor(private apiService: ApiService) { }
  profileForm = new FormGroup({
    descricao: new FormControl('', Validators.maxLength(500)),
  });

  ngOnInit(): void {


  }
  displayedColumns: string[] = ['descricao', 'dataTarefa', 'status'];
  public dataSource = new MatTableDataSource<TarefaRetornoResponse>();

  public retonarTarefas(): void {
    this.apiService.get().subscribe(resp => {
      if (resp) {
        this.dataSource.data = resp
      }
    });
  }
  public createTarefa(): void {
    debugger;
    const tarefa = new TarefaCreate()
    tarefa.status = 'A';
    tarefa.descricao = this.profileForm.value.descricao!;
    tarefa.dataTarefa = new Date();
    this.apiService.post(tarefa).subscribe(resp => {
      this.retonarTarefas();
    });
  }
}
