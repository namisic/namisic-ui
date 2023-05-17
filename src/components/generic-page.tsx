import { Button, Table } from 'antd';
import { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { ColumnConfig } from '@/configs/shared-config';

export interface GenericPageProps {
  title?: string;
  columns: ColumnConfig<any>[];
  data?: object[];
  paginationConfig?: false | TablePaginationConfig;
  onAddClick?: () => void;
}

const GenericPage: React.FC<GenericPageProps> = ({
  columns,
  data,
  paginationConfig = false,
  title,
  onAddClick,
}) => {
  const onclick = async () => {
    if (typeof onAddClick === 'function') {
      onAddClick();
    }
  };

  return (
    <article>
      {typeof title === 'string' && (
        <h1 className="text-xl font-bold mb-4 mt-0 font-sans">{title}</h1>
      )}
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
