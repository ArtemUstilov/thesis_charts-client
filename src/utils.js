import moment from 'moment';
import 'moment/locale/uk';
import {ESTIM_TYPES, INIT_TYPES, SEL_TYPES} from "./constants";

moment.locale('uk');

const flatToObj = array => array.reduce((acc, item) => {
  acc[item.value] = item.label;
  return acc;
}, {});

export const getNamePyParams = run => {
  const {
    created_date,
    estim,
    run_id,
    iters,
    sel_type,
    n,
    l,
    init,
    title,
  } = run;
  return `${title} ${moment(created_date).format('D MMM HH:mm:ss')} 
    ${flatToObj(INIT_TYPES)[init]} ${flatToObj(ESTIM_TYPES)[estim]} ${flatToObj(SEL_TYPES)[sel_type]} довжина ${l} ксть ${n} прогін ${run_id+1}ий  ${iters}ітрц`;
};
