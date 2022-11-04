import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-gantt-page',
  templateUrl: './landing-gantt-page.component.html',
  styleUrls: ['./landing-gantt-page.component.scss']
})
export class LandingGanttPageComponent implements OnInit {

  isLoading = false;

  // Modal variables
  modalActive = false;
  deleteModalActive = false;

  // Data variables
  data: any = [];
  user: any = null;
  actualGantt: any = null;
  

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.fetchGantt();
  }

  async fetchGantt() {
    await this.http.get('http://localhost:3000/diagramas_gantt').subscribe(response => {
      this.data = response;
    });
  }

  formatDate(date: string) {
    let dateFormat = new Date(date);
    return dateFormat.toLocaleDateString();
  }

  projectSelect(project: any) {
    this.router.navigate(["/main-page/gantt-page"],  { state: { project: project } });
  }

  createGantt(data: NgForm) {
    let newGantt = {
      id_usuario: this.user!["id"],
      nombre: data.value['nombre'],
      fecha_inicial: data.value['fecha_inicial'],
      semanas: data.value['semanas']
    };

    this.http.post("http://localhost:3000/diagramas_gantt", newGantt).subscribe((response) => {
      this.modalActive = !this.modalActive;
      this.fetchGantt();
    });
  }

  deleteGantt() {
    this.http.delete(`http://localhost:3000/diagramas_gantt?id=${this.actualGantt!['id']}`).subscribe((response) => {
      this.data = this.data.filter((element) => element['id'] != this.actualGantt!['id']); 
      this.deleteModalActive = !this.deleteModalActive;
    });
  }

}
