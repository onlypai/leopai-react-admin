import { theme } from 'antd';
import { useMemo } from 'react';
// import { GlobalToken } from 'antd'; token类型：GlobalToken

export const useThemeToken = () => {
  //https://ant-design.antgroup.com/docs/react/customize-theme-cn#seedtoken
  const { token } = theme.useToken();
  return useMemo(() => token, [token]);
};
