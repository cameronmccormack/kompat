import { z } from 'zod';
import { Browser } from '../../types/browser';
import { ClientError } from '../../errors/client-error';

// The schema below is linked directly from the README.
// Please update the README link and/or line reference if modifying this file.
const BrowsersSchema = z.array(
  z.object({
    identifier: z.enum([
      'chrome',
      'chrome_android',
      'deno',
      'edge',
      'firefox',
      'firefox_android',
      'ie',
      'nodejs',
      'oculus',
      'opera',
      'opera_android',
      'safari',
      'safari_ios',
      'samsunginternet_android',
      'webview_android',
    ]),
    version: z.number(),
  }),
);

export const getValidatedBrowserConfig = (rawConfig: unknown): Browser[] => {
  const parsedConfig = BrowsersSchema.safeParse(rawConfig);

  if (!parsedConfig.success) {
    throw new ClientError(`Malformed browser config: ${parsedConfig.error}`);
  }

  const browserSlugs = parsedConfig.data.map((item) => item.identifier);
  const duplicateSlugs = browserSlugs.filter(
    (slug, index) => browserSlugs.indexOf(slug) !== index,
  );

  if (duplicateSlugs.length > 0) {
    throw new ClientError(
      `Duplicate browsers in config. Duplicates: ${Array.from(
        new Set(duplicateSlugs),
      ).join(', ')}.`,
    );
  }

  return parsedConfig.data;
};
