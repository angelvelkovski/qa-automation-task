import { allure } from 'allure-playwright';

export interface TestDoc {
  /** Top-level grouping in the report (e.g. "UI", "API"). */
  epic: string;
  /** Area under test (e.g. "Checkout"). */
  feature: string;
  /** What this test proves, in one sentence (shown as the test description). */
  description: string;
  severity?: 'blocker' | 'critical' | 'normal' | 'minor' | 'trivial';
  /** Extra filter tags, e.g. "smoke". */
  tags?: string[];
  /** Known defect text; shown prominently so an expected failure is never mistaken for a bug in the suite. */
  knownDefect?: string;
}

/** Attaches report metadata to the running test. Call once at the top of a test. */
export async function documentTest(doc: TestDoc): Promise<void> {
  await allure.epic(doc.epic);
  await allure.feature(doc.feature);
  await allure.severity(doc.severity ?? 'normal');
  for (const tag of doc.tags ?? []) await allure.tag(tag);
  const defect = doc.knownDefect
    ? `\n\n**Known defect (expected failure):** ${doc.knownDefect}\nThis test is marked \`test.fail\`: it stays visible, and turns red if the defect gets fixed so the marker can be removed.`
    : '';
  await allure.description(doc.description + defect);
  if (doc.knownDefect) await allure.tag('known-defect');
}
