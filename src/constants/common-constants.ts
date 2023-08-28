import { createOptionsFromConstantObject } from '@/utils/common-utils';

export const DocumentTypes = {
  cc: 'Cédula de Ciudadanía',
  ce: 'Cédula de Extranjería',
  ti: 'Tarjeta de Identidad',
};

export const DocumentTypesOptions =
  createOptionsFromConstantObject(DocumentTypes);
