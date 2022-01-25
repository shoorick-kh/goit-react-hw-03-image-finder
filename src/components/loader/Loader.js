import { TailSpin } from 'react-loader-spinner';
import s from './Loader.module.css';

const Loader = () => {
  return (
    <div className={s.spinner}>
      <TailSpin color="#00BFFF" height={420} width={260} />
    </div>
  );
};
export default Loader;
