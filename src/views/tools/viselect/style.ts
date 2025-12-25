import styled from 'styled-components';
import Color from 'color';

export const Wrapper = styled.div<{ $style: { colorPrimary: string } }>`
  .container {
    border: 1px solid #ccc;
    padding: 10px;
    height: 500px;
    overflow-y: scroll;
    margin: 15px 0;
    border-radius: 4px;
  }
  /* 选择区域样式 */
  .selection-area {
    background: rgba(46, 115, 252, 0.11);
    border: 1px solid rgba(98, 155, 255, 0.85);
    border-radius: 0.15em;
  }

  /* item */
  .selectable {
    padding: 1px 3px;
    margin-bottom: 5px;
    user-select: none;
    /* border: 1px solid rgba(98, 155, 255, 0.85); */
    width: 70%;
    display: flex;
    justify-content: space-between;
    transition: all 0.3s;
    border-radius: 2px;
    &:hover {
      background: ${(props) => Color(props.$style.colorPrimary).alpha(0.05).toString()};
    }
  }

  /* 选中item */
  .selected {
    background: ${(props) => Color(props.$style.colorPrimary).alpha(0.2).toString()};
    &:hover {
      background: ${(props) => Color(props.$style.colorPrimary).alpha(0.2).toString()};
    }
  }
`;
