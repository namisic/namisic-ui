import { TableDataType } from '@/types/table-data-type';

export interface ResidentModel {
  id: 'string';
  name: 'string';
  apartmentNumber: 'string';
}

export interface ResidentTableDataType extends ResidentModel, TableDataType {}
