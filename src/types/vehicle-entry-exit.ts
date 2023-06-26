import { TableDataType } from './table-data-type';

export interface VehicleEntryExitTableModel {
  id: string;
  plateNumber: string;
  type: string;
  remarks: string | null;
  creationDate: Date | string;
  createdBy: string;
  vehicleType: string | null;
}

export interface CreateVehicleEntryExitModel {
  plateNumber: string;
  type: string;
  remarks: string;
}

export interface FilterVehicleEntryExitModel {
  plateNumber: string;
  type: string;
  beginCreationDate: Date | string;
  endCreationDate: Date | string;
  createdBy: string;
  currentUser: boolean;
}

export interface VehicleEntryExitTableDataType
  extends VehicleEntryExitTableModel,
    TableDataType {}
