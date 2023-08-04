import { TableDataType } from '@/types/table-data-type';

export interface SharedColumnActionProps<
  RecordType extends TableDataType = any
> {
  record: RecordType;
  text: string;
  onActionClick?: (record: RecordType) => void;
}
