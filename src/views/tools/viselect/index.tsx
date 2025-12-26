import { useEffect, useRef, useState } from 'react';
import SelectionArea, { SelectionEvent } from '@viselect/vanilla';
import { Tag } from 'antd';
import { useThemeToken } from '@/hooks/themeToken';
import { Wrapper } from './style';

export const App = () => {
  const { colorPrimary, colorTextQuaternary } = useThemeToken();

  const container = useRef<HTMLDivElement>(null);
  const instance = useRef<SelectionArea | undefined>();
  const [selected, setSelected] = useState<Set<number>>(() => new Set());

  const extractIds = (els: Element[]): number[] =>
    els
      .map((v) => v.getAttribute('data-key'))
      .filter(Boolean)
      .map(Number);

  const onStart = ({ event, selection }: SelectionEvent) => {
    if (!event?.ctrlKey && !event?.metaKey) {
      selection.clearSelection();
      setSelected(() => new Set());
    }
  };

  const onMove = ({
    store: {
      changed: { added, removed },
    },
  }: SelectionEvent) => {
    setSelected((prev) => {
      const next = new Set(prev);
      extractIds(added).forEach((id) => next.add(id));
      extractIds(removed).forEach((id) => next.delete(id));
      // console.log('选项', next);

      return next;
    });
  };
  const handleBlankClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;

    if (target.closest('.selectable')) return;

    // 左键 + 非组合键
    if (e.button === 0 && !e.ctrlKey && !e.metaKey) {
      setSelected(new Set());
    }
  };

  useEffect(() => {
    if (container.current) {
      instance.current?.destroy();
      instance.current = new SelectionArea({
        boundaries: container.current,
        container: container.current,
        selectables: '.selectable',
        // scroll: {
        //   container: container.current, // 可滚动的容器
        //   speed: 10, // 滚动速度 px/frame
        //   margin: 40, // 当鼠标靠近边缘多少 px 开始滚动
        // },
        // ...your options
      });

      instance.current.on('start', onStart);
      instance.current.on('move', onMove);
    }

    return () => instance.current?.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper $style={{ colorPrimary }}>
      单选，Ctrl 多选，Shift 连选，拖拽框多选，点击空白取消选择
      <div
        ref={container}
        className="container"
        onMouseDown={handleBlankClick}
        style={{ borderColor: colorTextQuaternary }}
      >
        {new Array(20).fill(0).map((_, index) => (
          <div
            className={selected.has(index) ? 'selected selectable' : 'selectable'}
            data-key={index}
            key={index}
          >
            <span>选项下标：{index}</span>
            <span>2025/12/19 10:30</span>
            <span>1KB</span>
          </div>
        ))}
      </div>
      <div>
        打印选中下标:{' '}
        {Array.from(selected).map((e) => {
          return (
            <Tag color={colorPrimary} key={e}>
              {e}
            </Tag>
          );
        })}
      </div>
    </Wrapper>
  );
};
export default App;
