import 'qunit';
import { allBabelVersions, runDefault } from './helpers';
import { GlobalConfig } from '..';
const { test, skip } = QUnit;

allBabelVersions(function (transform: (code: string) => string, config: GlobalConfig) {
  QUnit.module(`getConfig`, function() {

    test(`returns correct value for own package's config`, function(assert) {
      config.setConfig(__filename, '@embroider/macros', () => ({ beverage: 'coffee' }));
      let code = transform(`
      import { getConfig } from '@embroider/macros';
      export default function() {
        return getConfig('@embroider/macros');
      }
      `);
      assert.deepEqual(runDefault(code), { beverage: 'coffee' });
    });

    skip('import gets removed', function(assert) {
      let code = transform(`
      import { dependencySatisfies } from '@embroider/macros';
      export default function() {
        return dependencySatisfies('not-a-real-dep', '1');
      }
      `);
      assert.ok(!/dependencySatisfies/.test(code), `dependencySatisfies should not be in the output: ${code}`);
    });

  });
});
