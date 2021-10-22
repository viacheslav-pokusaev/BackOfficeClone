import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'; 
import { Observable } from 'rxjs/Observable';
import { Feedback } from '../models/feedback.model';

@Injectable()
export class FeedbackService { 

    constructor(private http: HttpClient) { }

    public addFeedback(feedback: Feedback): Observable<any> {
        return this.http.post<any>('api/feedback/add', feedback);
    }

    public updateFeedback(newFeedback: Feedback): Observable<any> {
        return this.http.put<any>('api/feedback/update', newFeedback);
    }

    public removeFeedback(id: number): Observable<any> {
        return this.http.delete<any>('api/feedback/remove/' + id);
    }

    public getById(id: number): Observable<Feedback> {
        return this.http.get<Feedback>('/api/feedback/' + id);
    }

    public getByUserId(id: number): Observable<Feedback[]> {
        return this.http.get<Feedback[]>('/api/feedback/user/' + id);
    }
}