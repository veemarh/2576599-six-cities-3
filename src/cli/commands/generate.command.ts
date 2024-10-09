import got from 'got';
import {appendFile} from 'node:fs';
import {Command} from './command.interface.js';
import {MockServerData} from '../../shared/types/index.js';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {TSVOfferGenerator} from '../../shared/libs/offer-generator/index.js';

export class GenerateCommand implements Command {
  private initialData: MockServerData;

  private async load(url: string) {
    try {
      this.initialData = await got.get(url).json();
    } catch {
      throw new Error(`Can't load data from ${url}`);
    }
  }

  private async write(filepath: string, offerCount: number) {
    const tsvOfferGenerator = new TSVOfferGenerator(this.initialData);
    for (let i = 0; i < offerCount; i++) {
      appendFile(
        filepath,
        `${tsvOfferGenerator.generate()}\n`,
        {encoding: 'utf8'},
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      );
    }
  }

  public getName(): string {
    return '--generate';
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [count, filepath, url] = parameters;
    const offerCount = Number.parseInt(count, 10);

    try {
      await this.load(url);
      await this.write(filepath, offerCount);
      console.info(`File ${filepath} was created!`);
    } catch (error: unknown) {
      console.error('Can\'t generate data');

      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }
}
