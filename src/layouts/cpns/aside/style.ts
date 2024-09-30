import styled from 'styled-components';

export const HorizontalWrapped = styled.div`
  height: 100%;
  .ant-menu {
    .ant-menu-item,
    .ant-menu-submenu-title {
      .ant-menu-item-icon {
        vertical-align: middle !important;
      }
    }
  }
`;
export const VerticalWrapped = styled.span`
  //submenu样式
  .ant-menu-sub.ant-menu-inline {
    background: none !important;
  }
  .ant-menu-inline-collapsed > .ant-menu-item,
  .ant-menu-inline-collapsed > .ant-menu-submenu > .ant-menu-submenu-title {
    padding: 0 10px;
  }
  .ant-menu-root {
    padding: 0 20px !important;
  }
`;
