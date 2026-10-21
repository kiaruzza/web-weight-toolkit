import { measureSite, printReport, writeReport } from './page-weight.mjs';

const root = process.argv[2] ?? 'dist';
try {
  const report = await measureSite(root);
  const output = await writeReport(report);
  printReport(output);
  console.log('\nReport written to reports/page-weight.json');
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
