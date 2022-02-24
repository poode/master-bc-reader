export declare class AppService {
    private readonly octokit;
    getHello(): {
        message: string;
    };
    readRepo(repoName: string): Promise<any>;
    assertBookType(name: string): {
        repoName?: string;
        message?: string;
    };
    parseResponse(name: string): Promise<string[] | {
        message?: string;
    }>;
    serveZero(number: number): string;
    parseChapterResponse(tickerName: string, chapterNumber: string): Promise<{
        chapterUrl?: string;
        message?: string;
    }>;
}
