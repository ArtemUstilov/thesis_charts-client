export const API_URL = 'http://127.0.0.1:8000';

export const SEL_TYPES = [
  {value: 'rws', label: 'Рулетка'},
  {value: 'roulette_linear', label: 'Рулетка (лінійна)'},
  {value: 'roulette_power', label: 'Рулетка (степенева)'},
  {value: 'roulette_sigma', label: 'Рулетка (сигма - відтинання)'},
  {value: 'roulette_destroy', label: 'Рулетка (руйнівна)'},
  {value: 'roulette_mixed', label: 'Рулетка (змішана)'},
  {value: 'tournament', label: 'Турнір'},
  {value: 'tournament_without_return_gen', label: 'Турнір без повернення'},
  {value: 'sus', label: 'SUS'},
  {value: 'cutting_selection', label: 'Відтинання (кількість особин)'},
  {value: 'linear_rang', label: 'Лінійний за рангом 1 < β < 2)'},
  {value: 'not_linear_rang', label: 'Не лінійний за рангом 0<α<β' },
  {value: 'exp_rang', label: 'Експоненційний за рангом 0<c<1'},
  {value: 'uniform', label: 'Рівномірний за здоров\'ям'},
];

export const INIT_TYPES = [
  {value: 'all_0', label: 'Всі нулі'},
  {value: 'all_1', label: 'Всі одиниці'},
  {value: 'half_1_half_0', label: 'Половина одиниці, половина нулі'},
  {value: 'normal', label: 'Біноміальний розподіл (р=0,5)'},
  {value: 'normal_with_ideal', label: 'Бін розподіл (р=0,5) та 1 ідеал'},
];

export const ESTIM_TYPES = [
  {value: 'all_l', label: 'Константа'},
  {value: 'sigma', label: 'Дельта'},
  {value: 'two_const', label: 'Дві константи'},
  {value: 'hamming', label: 'Відстань Гемінга'},
  {value: 'inv_hamming', label: 'Інвертована відстань Гемінга'},
];

// export const DYNAMIC_L_TYPES = [
//   {value: 'type_1', label: 'Type 1 (first 10 steps **2)'},
//   {value: 'type_2', label: 'Type 2 (first 80 steps *1.1)'},
//   {value: 'type_3', label: 'Type 3 (*1.005)'},
//   {value: 'type_4', label: 'Type 4 (+1 by 2000)'},
//   {value: 'type_3_init_200', label: 'Type 3 (*1.005), init size 200'},
//   {value: 'type_3_i_200_px10', label: 'Type 3 (*1.005), init size 200 px*10'},
//   {value: 'type_3_i_200_px0_1', label: 'Type 3 (*1.005), init size 200 px/10'},
//   {value: 'type_3_i_200_if_500', label: 'Type 3 (*1.005), init size 200, static size first 500 iter'},
// ];
