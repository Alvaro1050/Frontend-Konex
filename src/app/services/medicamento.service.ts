import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

const { MICROSERVICE_URL } = environment;

@Injectable({
    providedIn: 'root'
})
export class MedicamentoService {

    url = `${MICROSERVICE_URL}`;
    constructor(private http: HttpClient) { }

    getAllMedicamentos() {
        return this.http.get<any>(this.url + 'medicamento/find', {headers: {'Access-Control-Allow-Origin': '*'}})
    }
    
    getMedicamento(id: any) {
        return this.http.get<any>(this.url + 'medicamento/find/' + id, {headers: {'Access-Control-Allow-Origin': '*'}})
    }

    saveMedicamento(postData: any) {
        return this.http.post(this.url + 'medicamento/create', postData);
    }
    
    updateMedicamento(changes: any, id: string) {
        return this.http.put(this.url + 'medicamento/update/' + id, changes);
    }
    
    deleteMedicamento(id: String) {
        return this.http.delete(this.url + 'medicamento/delete?idMedicamento=' + id);
    }
}
