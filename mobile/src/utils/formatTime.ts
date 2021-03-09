import  { format } from 'date-fns';

const formatTime = (time: Date) => {
  return format(time, 'HH:mm');
};

export default formatTime;