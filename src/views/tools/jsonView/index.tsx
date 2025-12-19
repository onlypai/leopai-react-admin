import { memo, useState } from 'react';
import ReactJson from 'react-json-view';
import { Input, message } from 'antd';
import { debounce } from 'lodash';
import { useAppSelector } from '@/hooks/redux';
import { useThemeToken } from '@/hooks/themeToken';

import { ETheme } from '@/enum';

//https://www.npmjs.com/package/react-json-view
const { TextArea } = Input;
const index = memo(() => {
  const { colorPrimary, colorBgElevated } = useThemeToken();
  const [jsonObject, setJsonObject] = useState({});
  const { theme } = useAppSelector((state) => state.settings);
  return (
    <div className="flex h-[calc(100vh-105px)] gap-3">
      <TextArea
        style={{
          width: '384px',
          height: '100%',
        }}
        allowClear
        onChange={debounce((e) => {
          if (e.target.value) {
            try {
              setJsonObject(JSON.parse(e.target.value));
            } catch (err) {
              console.log(err);
              message.error('JSON格式不正确，请检查后重新输入');
            }
          } else {
            setJsonObject({});
          }
        }, 500)}
      />
      <div
        className={`p-4 border rounded-md h-full flex-1 overflow-auto`}
        style={{ borderColor: colorPrimary }}
      >
        <ReactJson
          src={jsonObject}
          theme={theme === ETheme.Dark ? 'shapeshifter' : 'rjv-default'}
          iconStyle="square"
          name={false}
          style={{
            background: colorBgElevated,
          }}
        />
      </div>
    </div>
  );
});

export default index;
