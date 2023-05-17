import { TableDataType } from '@/types/table-data-type';

export type VehicleType = 'car' | 'motorcycle';

export interface VehicleModel {
  type: VehicleType;
  plateNumber: string;
}

export interface VehicleTableDataType extends VehicleModel, TableDataType {}
