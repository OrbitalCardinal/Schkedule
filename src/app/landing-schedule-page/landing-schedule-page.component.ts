import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-schedule-page',
  templateUrl: './landing-schedule-page.component.html',
  styleUrls: ['./landing-schedule-page.component.scss']
})
export class LandingSchedulePageComponent implements OnInit {
  isLoading = true;
  // Modal Variables
  modalActive = false;
  deleteModalActive = false;

  data: any = [];
  actualSchedule: any = null;
  user: any = null;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.user = JSON.parse(localStorage.getItem('user'));
      this.fetchSchedule();
      this.isLoading = !this.isLoading;
    }, 500);
  }

  async fetchSchedule() {
    await this.http.get(`http://localhost:3000/horarios?id_usuario=${this.user['id']}`).subscribe(response => {
      this.data = response;
    });
  }

  formatDate(date: string) {
    let dateFormat = new Date(date);
    return dateFormat.toLocaleDateString();
  }

  projectSelect(project: any) {
    this.router.navigate(["/main-page/schedule-page"],  { state: { project: project } });
  }

  createSchedule(data: NgForm) {
    let newSchedule = {
      id_usuario: this.user!["id"],
      nombre: data.value['nombre']
    };

    this.http.post("http://localhost:3000/horarios", newSchedule).subscribe((response) => {
      this.modalActive = !this.modalActive;
      this.fetchSchedule();
    });
  }

  deleteSchedule() {
    this.http.delete(`http://localhost:3000/horarios?id=${this.actualSchedule!['id']}`).subscribe((response) => {
      this.data = this.data.filter((element) => element['id'] != this.actualSchedule!['id']); 
      this.deleteModalActive = !this.deleteModalActive;
    });
  }

}
