import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/observable';
import {ServersService} from '../servers.service';
import {Injectable} from '@angular/core';

export interface IServer {
  id: number;
  name: string;
  status: string;
}

@Injectable()
export class ServerResolverService implements Resolve<IServer> {

  constructor(private serverService: ServersService) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<IServer> | Promise<IServer> | IServer {
    return this.serverService.getServer(+route.params['id']);
  }
}
