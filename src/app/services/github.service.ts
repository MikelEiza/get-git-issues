import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor(private http: HttpClient) { }

  getNewIssuesPageFromRepository(repositoryUrl: string, pageSize: number): Observable<any> {
    let issueUrl = repositoryUrl.replace('github.com', 'api.github.com/repos').concat('/issues');
    return this.getIssuesPage(issueUrl, pageSize, 1)
  }

  getIssuesPage(issueUrl: string, pageSize: number, pageIndex: number): Observable<any> {
    let url = issueUrl + '?per_page=' + pageSize + '&page=' + pageIndex
    return this.http.get<any>(url, { observe: 'response' })
      .pipe(
        catchError((err) => { // TODO Manejar el error
          return throwError(err);
        }),
        map((resp) => {
          let linkHeader = resp.headers.get('link')
          return {
            totalPages: this.getTotalPages(linkHeader, pageIndex),
            issuePageUrl: this.getUrl(linkHeader, issueUrl),
            issues: resp.body,
          }
        })
      )
  }

  getTotalPages(linkHeader: string | null, pageIndex: number): number {
    if (linkHeader != null) {
      let match = linkHeader.match(/&page=([0-9]*)>; rel="last"/)
      if (match != null) {
        return Number(match[1])
      }
      return pageIndex;
    }
    return 1;
  }

  getUrl(linkHeader: string | null, defaultUrl: string): string {
    if (linkHeader != null) {
      let match = linkHeader.match(/^<(.*?)\?per_page/)
      if (match != null) {
        return match[1]
      }
    }
    return defaultUrl;
  }

}
