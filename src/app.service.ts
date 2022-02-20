import { Octokit } from '@octokit/rest';
import { Injectable } from '@nestjs/common';

import constants from './constants';

@Injectable()
export class AppService {
  private readonly octokit = new Octokit();

  getHello(): { message: string } {
    return {
      message: 'server is up and running!',
    };
  }

  async readRepo(): Promise<any> {
    return this.octokit.request(constants.readmeUrl, {
      headers: {
        accept: 'application/vnd.github.VERSION.raw',
      },
      owner: 'bitcoinbook',
      repo: 'bitcoinbook',
    });
  }

  async parseResponse(): Promise<null | string[]> {
    const { data } = await this.readRepo();
    return data.match(
      /https:\/\/github\.com\/bitcoinbook\/bitcoinbook\/blob\/develop\/ch\d+\.asciidoc/gim,
    );
  }
}
