import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import reactHooks from 'eslint-plugin-react-hooks'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import globals from 'globals'

// Règles de dépendance entre dossiers (architecture §9). Toute violation fait échouer la CI.
const FEATURES = ['catalog', 'draft', 'submit', 'share', 'results', 'admin']
const ADMIN_ONLY = ['@supabase/supabase-js', 'papaparse']

const featureIsolation = FEATURES.map((feature) => ({
  files: [`src/features/${feature}/**/*.{ts,tsx}`],
  rules: {
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: FEATURES.filter((f) => f !== feature).flatMap((f) => [
              `**/features/${f}`,
              `**/features/${f}/**`,
            ]),
            message: 'Une feature n’importe pas une autre feature (architecture §9).',
          },
          // Cette règle remplace celle de src/** : on y répète l'interdit sur worker/.
          { group: ['**/worker', '**/worker/**'], message: 'src/ n’importe jamais worker/.' },
          ...(feature === 'admin'
            ? []
            : [
                {
                  group: ADMIN_ONLY,
                  message: 'Réservé au module admin (ADR-007).',
                },
              ]),
        ],
      },
    ],
  },
}))

export default tseslint.config(
  {
    ignores: [
      'dist/',
      'node_modules/',
      '.wrangler/',
      'coverage/',
      'playwright-report/',
      'test-results/',
      'supabase/',
      'archive/',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.strict,
  {
    files: ['src/**/*.{ts,tsx}', 'tests/unit/**/*.{ts,tsx}', 'tests/fixtures/**/*.ts'],
    languageOptions: { globals: globals.browser },
    plugins: { 'react-hooks': reactHooks, 'jsx-a11y': jsxA11y },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.flatConfigs.strict.rules,
    },
  },
  {
    files: ['worker/**/*.ts', 'tests/worker/**/*.ts'],
    languageOptions: { globals: globals.serviceworker },
  },
  {
    files: ['*.config.{ts,js}', 'scripts/**/*.ts', 'tests/e2e/**/*.ts'],
    languageOptions: { globals: globals.node },
  },
  // src/ (hors admin) : jamais supabase-js ni papaparse, jamais worker/.
  {
    files: ['src/**/*.{ts,tsx}'],
    ignores: ['src/pages/admin/**', 'src/features/admin/**'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            { group: ADMIN_ONLY, message: 'Réservé au module admin (ADR-007).' },
            { group: ['**/worker', '**/worker/**'], message: 'src/ n’importe jamais worker/.' },
          ],
        },
      ],
    },
  },
  ...featureIsolation,
  // shared/ : aucun DOM, aucune dépendance hormis Zod.
  {
    files: ['shared/**/*.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['**/src', '**/src/**', '**/worker', '**/worker/**'],
              message: 'shared/ n’importe ni src/ ni worker/.',
            },
            {
              // Tout paquet autre que Zod (les imports relatifs internes restent permis).
              regex: '^(?!zod$|\\.{1,2}/)',
              message: 'shared/ n’importe que Zod.',
            },
          ],
        },
      ],
    },
  },
  // worker/ : importe shared/, jamais src/ ni React.
  {
    files: ['worker/**/*.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            { group: ['**/src', '**/src/**'], message: 'worker/ n’importe jamais src/.' },
            { group: ['react', 'react-*', ...ADMIN_ONLY], message: 'Interdit dans le Worker.' },
          ],
        },
      ],
    },
  },
)
