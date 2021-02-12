export const API_URL = 'http://127.0.0.1:8000';

export const SEL_TYPES = [
  {value: 'rws', label: 'Рулетка'},
  {value: 'tournament_2', label: 'Турнір 2'},
  {value: 'tournament_4', label: 'Турнір 4'},
];

export const INIT_TYPES = [
  {value: 'all_0', label: 'Всі нулі'},
  {value: 'normal', label: 'Нормальний розподіл (Гауса)'},
];

export const ESTIM_TYPES = [
  {value: 'all_l', label: 'Статична функція здоров\'я'},
  {value: 'on_split_locuses', label: 'Змінна функція здоров\'я'},
];

export const DYNAMIC_L_TYPES = [
  {value: 'type_1', label: 'Type 1 (first 10 steps **2)'},
  {value: 'type_2', label: 'Type 2 (first 80 steps *1.1)'},
  {value: 'type_3', label: 'Type 3 (*1.005)'},
  {value: 'type_4', label: 'Type 4 (+1 by 2000)'},
  {value: 'type_3_init_200', label: 'Type 3 (*1.005), init size 200'},
  {value: 'type_3_i_200_px10', label: 'Type 3 (*1.005), init size 200 px*10'},
  {value: 'type_3_i_200_px0_1', label: 'Type 3 (*1.005), init size 200 px/10'},
  {value: 'type_3_i_200_if_500', label: 'Type 3 (*1.005), init size 200, static size first 500 iter'},
];
