import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

const { MICROSERVICE_URL } = environment;

@Injectable({
    providedIn: 'root'
})
export class VentaService {

    url = `${MICROSERVICE_URL}`;
    constructor(private http: HttpClient) { }

    getAllVentas() {
        return this.http.get<any>(this.url + 'venta/find', {headers: {'Access-Control-Allow-Origin': '*'}})
    }
    
    getVenta(id: any) {
        return this.http.get<any>(this.url + 'venta/find/' + id, {headers: {'Access-Control-Allow-Origin': '*'}})
    }

    saveVenta(postData: any) {
        return this.http.post(this.url + 'venta/create', postData);
    }
    
    updateVenta(changes: any, id: string) {
        return this.http.put(this.url + 'venta/update/' + id, changes);
    }
    
    deleteVenta(id: String) {
        return this.http.delete(this.url + 'venta/delete?idVenta=' + id);
    }
}
