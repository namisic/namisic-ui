import { Popconfirm, Typography } from 'antd';
import { SharedColumnActionProps } from './shared-column-action-props';

export interface ColumnActionDeleteProps extends SharedColumnActionProps {
  confirmationTitle: React.ReactNode;
  confirmationDescription?: React.ReactNode;
}

export const ColumnActionDelete: React.FC<ColumnActionDeleteProps> = ({
  confirmationDescription,
  confirmationTitle,
  record,
  text,
  onActionClick,
}) => {
  const onConfirm = () => {
    if (typeof onActionClick === 'function') onActionClick(record);
  };

  return (
    <Popconfirm
      cancelText="Cancelar"
      okText="Confirmar"
      description={confirmationDescription}
      title={confirmationTitle}
      onConfirm={onConfirm}
    >
      <Typography.Link>{text}</Typography.Link>
    </Popconfirm>
  );
};

export default ColumnActionDelete;
