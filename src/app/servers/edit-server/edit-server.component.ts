import {Component, OnInit} from '@angular/core';

import {ServersService} from '../servers.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CanDeactivated} from './can-deactivated-guard.service';
import {Observable} from 'rxjs/observable';
import {setTypeScriptVersionForTesting} from '@angular/compiler-cli/src/typescript_support';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanDeactivated {
  server: { id: number, name: string, status: string };
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changesServed = false;

  constructor(private serversService: ServersService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.server = this.serversService.getServer(+id);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
    this.route.queryParams
      .subscribe(queryParams => {
        this.allowEdit = +queryParams['allowEdit'] === 1;
      });
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesServed = true;
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  canDeactivateMethod(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.allowEdit) {
      return true;
    }
    if ((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changesServed) {
      return confirm('Do You want to discard the changes?');
    } else {
      return true;
    }
  }

}
