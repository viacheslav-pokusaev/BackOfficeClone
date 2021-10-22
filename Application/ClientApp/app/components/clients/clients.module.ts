import { NgModule } from '@angular/core';
import { ClientsListComponent } from './clients-list/clients-list.component';
import { ClientsEditComponent } from './clients-edit/clients-edit.component';
import { ClientsProjectsByClientComponent } from './clients-projects-by-client/clients-projects-by-client.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../modules/shared.module';
import { ClientsRoutingModule } from './clients-routing.module';
import { ProjectsModule } from '../projects/projects.module';

@NgModule({
    declarations: [
        ClientsListComponent,
        ClientsEditComponent,
        ClientsProjectsByClientComponent,
    ],
    imports: [ 
        ClientsRoutingModule,
        SharedModule,
        ProjectsModule ],
    exports: [RouterModule],
    providers: [],
})
export class ClientsModule {}