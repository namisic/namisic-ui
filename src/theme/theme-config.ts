// theme/themeConfig.ts
import type { ThemeConfig } from 'antd';

const theme: ThemeConfig = {
  components: {
    Menu: {
      darkItemBg: '#240a34',
          itemSelectedColor: '#fff',
      controlHeight: 600
    },
  },
  token: {
    fontSize: 16,
    colorPrimary: '#891652',
  },
};

export default theme;
