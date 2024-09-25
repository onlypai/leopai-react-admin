import { memo } from 'react';
import { Layout } from 'antd';
import { shallowEqual } from 'react-redux';

import Nprogress from '@/components/Nprogress';
import Main from './cpns/main';
import Header from './cpns/header';
import TagsView from './cpns/tagsView';
import AsideVertical from './cpns/aside/AsideVertical';

import { useAppSelector } from '@/hooks/redux';
import { useThemeToken } from '@/hooks/themeToken';

import { ELayout, ESize } from '@/enum';

const { Sider } = Layout;

const index = memo(() => {
  const { layout, tagsView } = useAppSelector((state) => state.settings, shallowEqual);
  const { colorBorderSecondary, colorBgElevated } = useThemeToken(); //colorBgElevated背景色
  const { ASIDE_WIDTH, ASIDE_COLLAPSED_WIDTH } = ESize;
  return (
    <>
      <Nprogress />
      <Layout
        style={{
          backgroundColor: colorBgElevated,
        }}
        className={`h-screen overflow-hidden`}
      >
        <Sider
          style={{
            borderRight: `1px solid ${colorBorderSecondary}`,
            background: 'inherit',
          }}
          className="hidden md:block"
          width={ASIDE_WIDTH}
          collapsedWidth={ASIDE_COLLAPSED_WIDTH}
          trigger={null}
          collapsible
          collapsed={layout === ELayout.Mini}
          theme="light"
        >
          <AsideVertical />
        </Sider>
        <Layout style={{ background: 'inherit' }}>
          <Header />
          {tagsView ? <TagsView /> : null}
          <Main />
        </Layout>
      </Layout>
    </>
  );
});

export default index;
