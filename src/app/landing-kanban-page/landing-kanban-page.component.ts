import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-kanban-page',
  templateUrl: './landing-kanban-page.component.html',
  styleUrls: ['./landing-kanban-page.component.scss']
})
export class LandingKanbanPageComponent implements OnInit {
  
  isLoading = true;
  modalActive = false;
  deleteModalActive = false;
  actualKanban: any = null;
  user: any = null;
  data: any = [];

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.user = JSON.parse(localStorage.getItem('user') || '{}');
      this.isLoading = !this.isLoading;
      this.fetchKanban();
    }, 500);
  }

  fetchKanban() {
    this.http
        .get(`http://localhost:3000/tableros_kanban?id_usuario=${this.user["id"]}`)
        .subscribe((result: any) => {
          this.data = result;
        })
  }

  projectSelect(project: any) {
    this.router.navigate(["/main-page/kanban-page"],  { state: { project: project } });
  }

  createKanban(data: NgForm) {
    let newKanban = {
      id_usuario: this.user!["id"],
      nombre: data.value['nombre'],
      created_at: new Date()
    };

    this.http.post("http://localhost:3000/tableros_kanban", newKanban).subscribe((response) => {
      this.modalActive = !this.modalActive;
      this.fetchKanban();
    });
  }

  deleteKanban() {
    this.http.delete(`http://localhost:3000/tableros_kanban?id=${this.actualKanban!['id']}`).subscribe((response) => {
      this.data = this.data.filter((element) => element['id'] != this.actualKanban!['id']); 
      this.deleteModalActive = !this.deleteModalActive;
    });

  }

  formatDate(date: string) {
    let dateFormat = new Date(date);
    return dateFormat.toLocaleDateString();
  }

}
