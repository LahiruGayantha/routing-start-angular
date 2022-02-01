import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: { id: number, name: string };

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.user = {id: this.route.snapshot.params['id'], name: this.route.snapshot.params['name']};

    // Params are observables
    this.route.params
      .subscribe((params) => {
        this.user = {id: params['id'], name: params['name']};
      });
  }

}
