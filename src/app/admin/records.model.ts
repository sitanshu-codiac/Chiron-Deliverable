export interface Records {
  session_id: number;
  date: Date;
  exercise_id: number;
  user_id: number;
  series: [
    { 'serie': number,
      'weight': number,
      'repetitions': [
      { 'repetition': number,
        'phases': [
        { 'phase_id': number,
          'time': number,
          'amplitude': number,
          'symmetry': number
        }
      ]}
    ]}
  ];
}
