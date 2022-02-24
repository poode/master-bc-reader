import { Octokit } from '@octokit/rest';
import { Injectable } from '@nestjs/common';

import { readmeAPI, bookMap } from './constants';

@Injectable()
export class AppService {
  private readonly octokit = new Octokit();

  getHello(): { message: string } {
    return {
      message: 'server is up and running!',
    };
  }

  async readRepo(repoName: string): Promise<any> {
    return this.octokit.request(readmeAPI, {
      headers: {
        accept: 'application/vnd.github.VERSION.raw',
      },
      owner: repoName,
      repo: repoName,
    });
  }

  assertBookType(name: string): { repoName?: string; message?: string } {
    const bookType = bookMap[name];
    if (!bookType)
      return {
        message:
          'Only param `btc`, or `eth` tickers ara available to get the book',
      };

    return bookType;
  }

  async parseResponse(name: string): Promise<string[] | { message?: string }> {
    const assertion = this.assertBookType(name);
    if (assertion.message) return assertion;
    const { repoName } = assertion;
    const { data } = await this.readRepo(repoName);
    const regx = new RegExp(
      `https:\/\/github\\.com\\/${repoName}\\/${repoName}\\/blob\\/develop\\/(ch\\d+)?(\\d+\\S+)?\\.asciidoc`,
      'gmi',
    );
    return data.match(regx);
  }

  serveZero(number: number): string {
    if (number < 9) return `0${number}`;
    return `${number}`;
  }

  async parseChapterResponse(
    tickerName: string,
    chapterNumber: string,
  ): Promise<{ chapterUrl?: string; message?: string }> {
    const result = await this.parseResponse(tickerName);
    const strNumber = this.serveZero(Number(chapterNumber));
    if (result instanceof Array) {
      const chptr = result.find((chapterStr) => chapterStr.includes(strNumber));
      if (chptr)
        return {
          chapterUrl: chptr,
        };
      return { message: 'Chapter not found' };
    }

    return result;
  }
}
