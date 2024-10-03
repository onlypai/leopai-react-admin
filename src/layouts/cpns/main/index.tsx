import { memo, useMemo } from 'react';
import { Outlet } from 'react-router-dom';

import { ESize } from '@/enum';
import { useAppSelector } from '@/hooks/redux';

const index = memo(() => {
  const { tagsView } = useAppSelector((state) => state.settings);
  const { HEADER_HEIGHT, LAYOUT_GAP, TAGS_VIEW_HEIGHT } = ESize;

  const height = useMemo(() => {
    const tags = tagsView ? TAGS_VIEW_HEIGHT : 0;
    return `calc(100vh - ${HEADER_HEIGHT}px - ${LAYOUT_GAP * 2}px - ${tags}px)`;
  }, [tagsView, TAGS_VIEW_HEIGHT, HEADER_HEIGHT, LAYOUT_GAP]);

  return (
    <div
      className="overflow-y-auto"
      style={{
        // background: 'red',
        height,
        width: `calc(100% - ${LAYOUT_GAP}px)`,
      }}
    >
      <Outlet />
    </div>
  );
});

export default index;
