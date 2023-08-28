import { ResidentTypes } from '@/constants/residents-constants';
import { DocumentType } from '@/types/document-type';
import { TableDataType } from '@/types/table-data-type';

export type ResidentType = keyof typeof ResidentTypes;

export interface ResidentModel {
  id: string;
  name: string;
  apartmentNumber: string;
  documentType?: DocumentType;
  documentNumber?: string;
  email?: string;
  cellphone?: string;
  residentType?: ResidentType;
}

export interface ResidentModelTableDataType
  extends ResidentModel,
    TableDataType {}

export interface CreateOrUpdateResidentModel {
  id?: string;
  name: string;
  apartmentNumber: string;
  documentType?: DocumentType;
  documentNumber?: string;
  email?: string;
  cellphone?: string;
  residentType?: ResidentType;
}

export interface GetResidentsQuery {
  name?: string;
  documentType?: DocumentType;
  documentNumber?: string;
  email?: string;
  cellphone?: string;
  residentType?: ResidentType;
  apartmentNumber?: string;
}

export interface ResidentTableDataType extends ResidentModel, TableDataType {}
