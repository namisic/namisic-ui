import { Divider, Space } from 'antd';

export interface ColumnActionsSplittedProps extends React.PropsWithChildren {}

export const ColumnActionSplitted: React.FC<ColumnActionsSplittedProps> = ({
  children,
}) => <Space split={<Divider type="vertical" />}>{children}</Space>;

export default ColumnActionSplitted;
