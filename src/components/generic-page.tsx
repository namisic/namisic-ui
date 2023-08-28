import { Button, Space, Table } from 'antd';
import { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { ColumnConfig } from '@/configs/shared-config';
import { ReactNode } from 'react';

export interface GenericPageProps {
  title?: string;
  columns: ColumnConfig<any>[];
  data?: object[];
  paginationConfig?: false | TablePaginationConfig;
  customTopButtons?: ReactNode;
  loading?: boolean;
  onAddClick?: () => void;
  onFilterClick?: () => void;
}

const GenericPage: React.FC<GenericPageProps> = ({
  columns,
  customTopButtons,
  data,
  paginationConfig = false,
  title,
  loading,
  onAddClick,
  onFilterClick,
}) => {
  return (
    <article>
      {typeof title === 'string' && (
        <h1 className="text-xl font-bold mb-4 mt-0 font-sans">{title}</h1>
      )}
      {customTopButtons !== undefined ? (
        customTopButtons
      ) : (
        <Space wrap>
          <Button type="primary" onClick={onAddClick}>
            Nuevo registro
          </Button>
          <Button type="default" onClick={onFilterClick}>
            Mostrar filtros
          </Button>
        </Space>
      )}
      <Table
        className="mt-4"
        columns={columns as ColumnsType<any>}
        dataSource={data}
        pagination={paginationConfig}
        loading={loading}
      />
    </article>
  );
};

export default GenericPage;
