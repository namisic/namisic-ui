import { TableDataType } from '@/types/table-data-type';

export type VehicleType = 'car' | 'motorcycle';

export interface VehicleModel {
  type: VehicleType;
  plateNumber: string;
}

export interface CreateOrUpdateVehicleModel extends VehicleModel {
  residentId: string;
  initialPlateNumber?: string;
}

export interface DeleteVehicleModel  {
  ResidentId: string;
  PlateNumber: string;
}

export interface VehicleTableDataType extends VehicleModel, TableDataType {}
