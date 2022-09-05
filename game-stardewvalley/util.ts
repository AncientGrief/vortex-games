import { fs, util } from 'vortex-api';
import { parse } from 'relaxed-json';
import { ISDVModManifest } from './types';

export async function parseManifest(manifestFilePath: string): Promise<ISDVModManifest> {
  try {
    const manifestData = await fs.readFileAsync(manifestFilePath, { encoding: 'utf-8' });
    const manifest: ISDVModManifest = parse(util.deBOM(manifestData)) as ISDVModManifest;
    if (!manifest) {
      throw new util.DataInvalid('Manifest file is invalid');
    }
    return manifest;
  } catch (err) {
    return Promise.reject(err);
  }
}