import { TableDataType } from '@/types/table-data-type';

export interface ResidentTableDataType extends TableDataType {
  id: 'string';
  name: 'string';
  apartmentNumber: 'string';
}
