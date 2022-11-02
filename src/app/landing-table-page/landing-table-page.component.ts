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
  user = {};
  modalActive = false;
  data: any[] = [];

  constructor(private router: Router, private http: HttpClient) {}

  isLoading = true;

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
      this.user = JSON.parse(localStorage.getItem("user"));

      this.http
        .get(`http://localhost:3000/tablas?id_usuario=${this.user["id"]}`)
        .subscribe((result: any[]) => {
          this.data = result;
        });
    }, 0);
  }

  projectSelect(project: any) {
    this.router.navigate(["/main-page/table-page"],  { state: { project: project } });
  }

  projectDelete(id: number) {
    console.log(`Deleted ${id}`);
  }

  createTable(data: NgForm) {
    let newTable = {
      id_usuario: this.user["id"],
      nombre: data.value['nombre'],
      created_at: new Date()
    };

    this.http.post("http://localhost:3000/tablas", newTable).subscribe((response) => {
      this.modalActive = !this.modalActive;
      this.data.push(response);
    });
  }

  formatDate(date: string) {
    let dateFormat = new Date(date);
    return dateFormat.toLocaleDateString();
  }
}
