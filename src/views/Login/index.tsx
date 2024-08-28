import { memo, useEffect } from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { loginThunk } from '@/store/modules/user';
import { shallowEqual } from 'react-redux';
import localCache from '@/utils/localCache';
import { EStorage } from '@/enum';

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

const App = memo(() => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
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
        message.success('登录成功');
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
    <div className="flex items-center justify-center w-screen h-screen">
      <Form
        className="w-96 !p-5 box-border"
        name="login"
        //labelCol 标签布局
        labelCol={{ span: 0 }}
        //输入控件设置布局样式
        wrapperCol={{ span: 24 }}
        initialValues={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div className="font-cursive flex items-center justify-center text-2xl h-16 mb-6">
          Leopai Admin
        </div>
        <span className="text-gray-500 text-xs">admin admin123456</span>
        <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
          <Input placeholder="用户名" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
          <Input.Password placeholder="密码" />
        </Form.Item>
        {/* valuePropName="checked" 子节点的值的属性，如 Switch 的是 'checked' */}
        <Form.Item name="remember" valuePropName="checked">
          <Checkbox className="text-gray-100">记住密码</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
});

export default App;
