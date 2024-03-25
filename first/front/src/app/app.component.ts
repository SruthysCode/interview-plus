import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'front';

  constructor(private http: HttpClient, private router: Router) {}
  ngOnInit(): void {
    this.http
      .get<string>('http://localhost:3000/api/data')
      .subscribe((res: any) => {
        
        this.title = res.data;
      });
  }

  register() {
    this.router.navigate(['/register']);
  }

  login() {
    this.router.navigate(['/login']);
  }
}
