import SvgIcon from '@/components/icons/SvgIcon';
import { useThemeToken } from '@/hooks/themeToken';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Row } from 'antd';

const index = memo(() => {
  const { t } = useTranslation();
  const { colorPrimary } = useThemeToken();
  return (
    <div>
      <div className="font-bold text-2xl my-2">Sup Bro,</div>
      <div className="font-bold text-6xl mb-9">Welcome back!</div>
      {/* <div className="flex">
        <div>
          <div></div>
        </div>
        <div></div>
      </div> */}
      <Row gutter={25} className="h-96">
        <Col span={5}>
          <div className="bg-red-500 h-full rounded-3xl">
            <SvgIcon icon="dashboard" size="200" color={colorPrimary}></SvgIcon>
          </div>
        </Col>
        <Col span={7}>
          <div className="bg-black h-full">col-8</div>
        </Col>
        <Col span={12}>
          <div className="bg-red-500 h-full">col-8</div>
        </Col>
      </Row>
      {t('hello_world')}
      <div></div>
    </div>
  );
});

export default index;
