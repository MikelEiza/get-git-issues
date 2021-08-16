import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable()
export class CustomMatPaginatorIntl extends MatPaginatorIntl {
  getRangeLabel = (page: number, pageSize: number, length: number) => {
    return (1 + page) + '/' + length / pageSize
  }
}