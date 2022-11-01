import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-table-page',
  templateUrl: './landing-table-page.component.html',
  styleUrls: ['./landing-table-page.component.scss', '../../styles.scss']
})
export class LandingTablePageComponent implements OnInit {
  

  data = [
    {
      'id': 1,
      'nombre': 'Proyecto 1',
      'createdAt': '10/10/10',
      'updatedAt': '10/10/10'
    },
    {
      'id': 2,
      'nombre': 'Proyecto 1',
      'createdAt': '10/10/10',
      'updatedAt': '10/10/10'
    },
    {
      'id': 3,
      'nombre': 'Proyecto 1',
      'createdAt': '10/10/10',
      'updatedAt': '10/10/10'
    },
    {
      'id': 4,
      'nombre': 'Proyecto 1',
      'createdAt': '10/10/10',
      'updatedAt': '10/10/10'
    },
    {
      'id': 5,
      'nombre': 'Proyecto 1',
      'createdAt': '10/10/10',
      'updatedAt': '10/10/10'
    }
  ];

  constructor(private router: Router) { }

  isLoading = true;

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  projectSelect(id: number) {
    this.router.navigate(['/main-page/table-page'], { queryParams: {id: id}});
  }

  projectDelete(id: number) {
    console.log(`Deleted ${id}`);
  }

}
