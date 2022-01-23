import { TailSpin } from 'react-loader-spinner';
import s from './Loader.module.css';

const Loader = () => {
  return (
    <TailSpin color="#00BFFF" height={420} width={260} className={s.spinner} />
  );
};
export default Loader;
