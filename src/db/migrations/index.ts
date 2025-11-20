import * as migration_20251120_071658_inital from './20251120_071658_inital';

export const migrations = [
  {
    up: migration_20251120_071658_inital.up,
    down: migration_20251120_071658_inital.down,
    name: '20251120_071658_inital'
  },
];
