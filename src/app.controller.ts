import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): { message: string } {
    return this.appService.getHello();
  }

  @Get('/book/ticker/:name')
  async readRepo(@Param('name') name: string): Promise<any> {
    return this.appService.parseResponse(name);
  }

  @Get('/book/ticker/:tickerName/chapter/:chapterNumber')
  async getChapter(@Param() param): Promise<any> {
    return this.appService.parseChapterResponse(
      param.tickerName,
      param.chapterNumber,
    );
  }
}
