"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const rest_1 = require("@octokit/rest");
const common_1 = require("@nestjs/common");
const constants_1 = require("./constants");
let AppService = class AppService {
    constructor() {
        this.octokit = new rest_1.Octokit();
    }
    getHello() {
        return {
            message: 'server is up and running!',
        };
    }
    async readRepo(repoName) {
        return this.octokit.request(constants_1.readmeAPI, {
            headers: {
                accept: 'application/vnd.github.VERSION.raw',
            },
            owner: repoName,
            repo: repoName,
        });
    }
    assertBookType(name) {
        const bookType = constants_1.bookMap[name];
        if (!bookType)
            return {
                message: 'Only param `btc`, or `eth` tickers ara available to get the book',
            };
        return bookType;
    }
    async parseResponse(name) {
        const assertion = this.assertBookType(name);
        if (assertion.message)
            return assertion;
        const { repoName } = assertion;
        const { data } = await this.readRepo(repoName);
        const regx = new RegExp(`https:\/\/github\\.com\\/${repoName}\\/${repoName}\\/blob\\/develop\\/(ch\\d+)?(\\d+\\S+)?\\.asciidoc`, 'gmi');
        return data.match(regx);
    }
    serveZero(number) {
        if (number < 9)
            return `0${number}`;
        return `${number}`;
    }
    async parseChapterResponse(tickerName, chapterNumber) {
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
};
AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map