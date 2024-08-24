import SvgIcon from './components/icons/SvgIcon';
import Iconify from './components/icons/Iconify';
import IButton from './components/IButton';
function App() {
  return (
    <>
      你在干嘛
      <SvgIcon icon="setting" />
      fi
      <Iconify icon="icon-park:scan-setting" />
      <IButton>
        <Iconify icon="icon-park:scan-setting" />
      </IButton>
      <div className="flex justify-center items-center w-full h-24 bg-red-800">哈哈哈</div>
    </>
  );
}

export default App;
