export const createInterval = ({ cb, time }: { cb: any; time: number }) => {
  return setInterval(cb, time);
};
