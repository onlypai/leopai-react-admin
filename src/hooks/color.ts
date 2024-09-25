import Color from 'color';

export const useColor = () => {
  const aplhaColor = (color: string, alpha: number) => Color(color).alpha(alpha).toString();
  return { aplhaColor };
};
