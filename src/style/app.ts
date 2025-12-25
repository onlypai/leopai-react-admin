import styled from 'styled-components';
import { ETheme } from '@/enum';

export const AppWrapped = styled.div<{ $theme?: ETheme }>`
  ::-webkit-scrollbar {
    width: 3px;
    height: 3px;
  }

  /* ::-webkit-scrollbar-track {
    border-radius: 3px;
    background: ${(props) => (props.$theme === ETheme.Dark ? 'transparent' : '#d8d8e1')};
  } */

  ::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background: ${(props) => (props.$theme === ETheme.Dark ? '#c0c0c0' : '#8b8b8b')};
  }
`;
