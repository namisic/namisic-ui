import { createOptionsFromConstantObject } from '@/utils/common-utils';

export const ResidentTypes = {
  owner: 'Propietario',
  tenant: 'Arrendatario',
  resident: 'Residente',
};

export const ResidentTypesOptions =
  createOptionsFromConstantObject(ResidentTypes);
