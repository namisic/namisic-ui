import { Button, Table } from 'antd';
import { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { ColumnConfig } from '@/configs/shared-config';

export interface GenericPageProps {
  title: string;
  columns: ColumnConfig<any>[];
  data?: object[];
  paginationConfig?: false | TablePaginationConfig;
  onAddClick?: Promise<void>;
}

const GenericPage = ({
  columns,
  data,
  paginationConfig = false,
  title,
  onAddClick,
}: GenericPageProps) => {
  const onclick = async () => {
    if (onAddClick !== undefined) {
      await onAddClick;
    }
  };

  return (
    <article>
      <h1 className="text-xl font-bold mb-4 mt-0 font-sans">{title}</h1>
      <Button type="primary" onClick={onclick}>
        Agregar
      </Button>
      <Table
        className="mt-4"
        columns={columns as ColumnsType<any>}
        dataSource={data}
        pagination={paginationConfig}
      />
    </article>
  );
};

export default GenericPage;
