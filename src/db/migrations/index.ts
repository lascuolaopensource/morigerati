import * as migration_20251120_071658_inital from './20251120_071658_inital';
import * as migration_20261016_083700_localize_residenze_short_description from './20261016_083700_localize_residenze_short_description';

export const migrations = [
  {
    up: migration_20251120_071658_inital.up,
    down: migration_20251120_071658_inital.down,
    name: '20251120_071658_inital'
  },
  {
    up: migration_20261016_083700_localize_residenze_short_description.up,
    down: migration_20261016_083700_localize_residenze_short_description.down,
    name: '20261016_083700_localize_residenze_short_description'
  },
];
