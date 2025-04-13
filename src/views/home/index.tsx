import SvgIcon from '@/components/icons/SvgIcon';
import { useThemeToken } from '@/hooks/themeToken';
import { memo } from 'react';
import { Col, Row, Avatar } from 'antd';

const index = memo(() => {
  const { colorPrimary, colorFillQuaternary } = useThemeToken();
  //产品列表
  const productList = [
    { id: 1, label: 'Error result', icon: 'card1' },
    { id: 2, label: 'Opportunities', icon: 'card2' },
    { id: 3, label: '$5 Prize card', icon: 'card3' },
    { id: 4, label: 'Idd Coupon', icon: 'card4' },
    { id: 5, label: 'Prize card', icon: 'card5' },
    { id: 6, label: 'Prize pool', icon: 'card6' },
    { id: 7, label: 'Prize card', icon: 'card7' },
    { id: 8, label: 'Correct result', icon: 'card8' },
  ];
  const libraryList = [
    {
      avatar: 'https://img.youhuipianyi.com/uploads/allimg/2020031310/shqmjtwucez.jpeg',
      title: 'James - Husky & Engaging',
      content:
        'A slightly husky and bassy voice with a standard American accent,in free societies, people are better able to ...',
    },
    {
      avatar: 'https://img.youhuipianyi.com/uploads/allimg/2020031310/uxytrnhj0d4.jpeg',
      title: 'Benjamin - Deep, Warm, CalmingA ',
      content:
        'calm British, thirty-something, gentle and warm Middle Age American voice to soothe and rela...',
    },
    {
      avatar: 'https://img.youhuipianyi.com/uploads/allimg/2020031310/pcstsxit411.jpeg',
      title: 'Danielle-Canadian Narrator',
      content:
        'Over the past several centuries, the world has seen the many ways in which an active free market spurs material and... ',
    },
    {
      avatar: 'https://img.youhuipianyi.com/uploads/allimg/2020031310/04qr0f3cvba.jpeg',
      title: 'Archer',
      content: 'Conversational, calm British, thirty-something, perfect for an Al...',
    },
    {
      avatar: 'https://img.youhuipianyi.com/uploads/allimg/2021051909/jdue1tnreb1.jpg',
      title: 'Mark -Natural Conversations',
      content:
        'A casual, young-adult speaking in a natural manner. We perfect most likely causal should look for an explanation...',
    },
  ];
  const libraryList2 = [
    {
      pic: 'https://cdn.dribbble.com/userupload/42898436/file/original-34c4f7a3fa2e20c2c3317d800721a583.png?resize=1504x1128&vertical=center',
      title: 'Flat Swap Mobile App Design',
      content:
        'Here’s a fresh take on travel with Kaza Swap, a home exchange app for the modern explorer. This UI design highlights ease of use, strong community vibes, and real savings — making it a smarter alternative to Airbnb....',
    },
    {
      pic: 'https://cdn.dribbble.com/userupload/16293220/file/original-0d61b423ca45357a1c8d30e7778fb2fd.png?resize=1504x1128&vertical=center',
      title: 'Smartify - Smart Home App',
      content:
        'UI exploration for Smartify Smart Home App where users can control their smart home appliances from smartphones, UI exploration for Smartify Smart Home App where users can control their smart home appliances from smartphones....',
    },
  ];
  return (
    <div>
      <div className="font-bold text-2xl my-2">Sup Bro,</div>
      <div className="font-bold text-6xl mb-9">Welcome back!</div>
      <div className="flex-cb h-72">
        {productList.map((item) => {
          return (
            <div key={item.id} className="h-full w-[12%]">
              <div
                style={{ backgroundColor: colorFillQuaternary }}
                className="flex-cc h-[85%] rounded-3xl shadow-lg"
              >
                <SvgIcon icon={item.icon} size="170" color={colorPrimary}></SvgIcon>
              </div>
              <div className="mt-2 text-center font-semibold">{item.label}</div>
            </div>
          );
        })}
      </div>
      <Row gutter={25}>
        <Col span={12}>
          <div className="h-full">
            <div className="font-bold">Latest from the library</div>
            {libraryList.map((item) => {
              return (
                <div key={item.title} className="flex items-center mt-3">
                  <Avatar size={64} src={item.avatar} />
                  <div className="ml-4">
                    <div className="font-bold">{item.title}</div>
                    <div className="text-sm text-gray-500">{item.content}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </Col>
        <Col span={12}>
          <div className="h-full">
            <div className="font-bold">Create or clone a voice</div>
            {libraryList2.map((item, index) => {
              return (
                <div key={item.title} className="flex mt-3">
                  <img src={item.pic} className="h-44 rounded-lg" alt="" />
                  <div className="ml-4">
                    <div>FAQ{index + 1}</div>
                    <div className="font-bold text-xl mb-2">{item.title}</div>
                    <div className="text-sm text-gray-500">{item.content}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </Col>
      </Row>
    </div>
  );
});

export default index;
