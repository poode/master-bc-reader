import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): {
        message: string;
    };
    readRepo(name: string): Promise<any>;
    getChapter(param: any): Promise<any>;
}
