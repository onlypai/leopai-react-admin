import { memo } from 'react';
import { Button } from 'antd';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

const index = memo(() => {
  const navigate = useNavigate();
  const btnClick = () => {
    navigate('/');
  };
  return (
    <div className="w-dvw h-dvh flex justify-center items-center">
      <Helmet>
        <title>404页面不存在</title>
      </Helmet>
      <div className="text-center">
        <h3>404 页面不存在</h3>
        <Button type="primary" onClick={btnClick}>
          go home
        </Button>
      </div>
    </div>
  );
});

export default index;
