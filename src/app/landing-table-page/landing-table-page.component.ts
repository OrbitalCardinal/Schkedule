import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-landing-table-page",
  templateUrl: "./landing-table-page.component.html",
  styleUrls: ["./landing-table-page.component.scss", "../../styles.scss"],
})
export class LandingTablePageComponent implements OnInit {
  user: any;
  modalActive = false;
  deleteModalActive = false;
  actualTable = null;
  data: any[] = [];

  constructor(private router: Router, private http: HttpClient) {}

  isLoading = true;

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
      this.user = JSON.parse(localStorage.getItem('user') || '{}');
      this.fetchTables();
      ;
    }, 500);
  }

  fetchTables() {
    this.http
        .get(`http://localhost:3000/tablas?id_usuario=${this.user["id"]}`)
        .subscribe((result: any) => {
          this.data = result;
        })
  }

  projectSelect(project: any) {
    this.router.navigate(["/main-page/table-page"],  { state: { project: project } });
  }

  createTable(data: NgForm) {
    let newTable = {
      id_usuario: this.user!["id"],
      nombre: data.value['nombre'],
      created_at: new Date()
    };

    this.http.post("http://localhost:3000/tablas", newTable).subscribe((response) => {
      this.modalActive = !this.modalActive;
      this.fetchTables();
    });
  }

  formatDate(date: string) {
    let dateFormat = new Date(date);
    return dateFormat.toLocaleDateString();
  }

  deleteTable() {
    this.http.delete(`http://localhost:3000/tablas?id=${this.actualTable!['id']}`).subscribe((response) => {
      this.data = this.data.filter((element) => element['id'] != this.actualTable!['id']); 
      this.deleteModalActive = !this.deleteModalActive;
    });

  }
}
