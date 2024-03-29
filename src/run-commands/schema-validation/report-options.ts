import { z } from 'zod';
import { ReportOptions } from '../../types/report-options';
import { ClientError } from '../../errors/client-error';

// The schema below is linked directly from the README.
// Please update the README link and/or line reference if modifying this file.
const ReportOptionsSchema = z.object({
  includePerFeatureSummary: z.boolean().default(true),
  outputReportFiles: z
    .array(z.object({ type: z.enum(['html', 'json']), location: z.string() }))
    .default([]),
});

const DEFAULT_REPORT_OPTIONS = {
  includePerFeatureSummary: true,
  outputReportFiles: [],
};

export const getValidatedReportOptions = (
  rawConfig: unknown,
): ReportOptions => {
  if (rawConfig === undefined) {
    return DEFAULT_REPORT_OPTIONS;
  }

  const parsedConfig = ReportOptionsSchema.safeParse(rawConfig);

  if (parsedConfig.success) {
    return parsedConfig.data;
  }

  throw new ClientError(
    `Malformed report options config: ${parsedConfig.error}`,
  );
};
