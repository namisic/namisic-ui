import { Button, Space, Table } from 'antd';
import { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { ColumnConfig } from '@/configs/shared-config';
import { ReactNode } from 'react';
import PageTitle from './page-title';

export interface GenericPageProps {
  title?: string;
  columns: ColumnConfig<any>[];
  data?: object[];
  paginationConfig?: false | TablePaginationConfig;
  customTopButtons?: ReactNode;
  loading?: boolean;
  hideFilters?: true;
  onAddClick?: () => void;
  onFilterClick?: () => void;
}

const Page: React.FC<GenericPageProps> = ({
  columns,
  customTopButtons,
  data,
  paginationConfig = false,
  title,
  loading,
  hideFilters,
  onAddClick,
  onFilterClick,
}) => {
  return (
    <article>
      <PageTitle title={title} />
      {customTopButtons !== undefined ? (
        customTopButtons
      ) : (
        <Space wrap>
          <Button type="primary" onClick={onAddClick}>
            Nuevo registro
          </Button>
          {!hideFilters ? (
            <Button type="default" onClick={onFilterClick}>
              Mostrar filtros
            </Button>
          ) : null}
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

export default Page;
