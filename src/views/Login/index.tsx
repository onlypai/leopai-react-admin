import { memo, useEffect } from 'react';
import { Button, Checkbox, Form, Input, App } from 'antd';
import { useNavigate } from 'react-router-dom';

import SvgIcon from '@/components/icons/SvgIcon';
import Iconify from '@/components/icons/Iconify';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { useThemeToken } from '@/hooks/themeToken';
import { loginThunk } from '@/store/modules/user';
import { shallowEqual } from 'react-redux';
import localCache from '@/utils/localCache';
import { EStorage } from '@/enum';
import { NAME } from '@/utils/config';
import { useTranslation } from 'react-i18next';

interface IForm {
  username: string;
  password: string;
  remember: boolean;
}
type localAccount = Omit<IForm, 'remember'> & { expiry: number };

const accountInfo: localAccount = localCache.getCache(EStorage.Account) || ({} as localAccount);
//初始化表单
const form: IForm = {
  username: Date.now() <= accountInfo.expiry ? accountInfo.username : '',
  password: Date.now() <= accountInfo.expiry ? accountInfo.password : '',
  remember: true,
};

const index = memo(() => {
  const { message } = App.useApp();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { colorPrimary, colorTextSecondary } = useThemeToken();
  const { token } = useAppSelector((state) => state.user, shallowEqual);

  useEffect(() => {
    if (token.accessToken) {
      navigate('/');
    }
  }, [navigate, token.accessToken]);

  //表单提交失败
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  //提交表单
  const onFinish = async (values: IForm) => {
    const { username, password, remember } = values;
    if (remember) {
      const timeStamp = 3600 * 24 * 7 * 1000;
      localCache.setCache(EStorage.Account, { username, password, expiry: Date.now() + timeStamp }); //保存7天
    } else {
      localCache.removeCache(EStorage.Account);
    }
    try {
      //执行登录逻辑
      //成功 失败结果是loginThunk中手动rejectWithValue抛出
      const { type } = await dispatch(loginThunk({ username, password }));
      if (type === 'user/login/fulfilled') {
        message.success(t('login.login_success'));
        navigate('/', { replace: true });
      } else {
        // 使用接口返回信息
      }
    } catch (error) {
      //msw总是返回成功，不会到这里
      console.log(error);
    }
  };

  return (
    <div className="flex-cc w-screen h-screen bg-[url('@/assets/images/loginBg.svg')] bg-cover bg-center">
      <div className="flex w-2/3 h-5/6 rounded-[36px] overflow-hidden bg-[#ecfeffb0] backdrop-opacity-60">
        <div className="flex-cc flex-col flex-1 h-full">
          <Form
            className="w-96 !p-5 box-border"
            initialValues={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
            size="large"
          >
            <div className="text-center">
              <SvgIcon icon="logo" color={colorPrimary} size="5em"></SvgIcon>
            </div>
            <div className="flex-cc font-mono font-bold text-nowrap text-blue-900 text-4xl h-16 mb-6">
              {NAME}
            </div>
            {/* <span className="text-gray-500 text-xs">admin admin123456</span> */}
            <Form.Item
              name="username"
              label={<span className="text-blue-900 font-bold">{t('login.username')}</span>}
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <Input placeholder="用户名" />
            </Form.Item>
            <Form.Item
              name="password"
              label={<span className="text-blue-900 font-bold">{t('login.password')}</span>}
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password placeholder="密码" />
            </Form.Item>
            {/* valuePropName="checked" 子节点的值的属性，如 Switch 的是 'checked' */}
            <Form.Item name="remember" valuePropName="checked">
              <Checkbox className="text-blue-900">{t('login.remember')}</Checkbox>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="w-full">
                {t('login.login')}
              </Button>
            </Form.Item>
          </Form>
          <div className="text-center" style={{ color: colorTextSecondary }}>
            {t('login.other_login')}
          </div>
          <div className="flex justify-around w-2/3 text-2xl mt-5 cursor-pointer">
            <Iconify icon="carbon:logo-wechat" color="#07c160" />
            <Iconify icon="carbon:logo-google" color="#2d7cee" />
            <Iconify icon="ion:logo-github" />
            <Iconify icon="carbon:logo-x" />
          </div>
        </div>
        <div className="hidden xl:flex-cc flex-[1.5] h-full">
          <SvgIcon icon="login" size="95%" />
        </div>
      </div>
    </div>
  );
});

export default index;
