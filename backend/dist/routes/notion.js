"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios = require('axios');
var express = require('express');
var Client = require('@notionhq/client').Client;
var router = express.Router();
require('dotenv').config();
var notion = new Client({ auth: process.env.NOTION_API_KEY });
var fetchNotionPage = function (pageId) { return __awaiter(void 0, void 0, void 0, function () {
    var response, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                console.log("in function");
                return [4 /*yield*/, notion.pages.retrieve({ page_id: pageId, type: "link_to_page" })];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response];
            case 2:
                err_1 = _a.sent();
                console.log("Error: ", err_1);
                return [2 /*return*/, {}];
            case 3: return [2 /*return*/];
        }
    });
}); };
var fetchBlockFromPage = function (pageId) { return __awaiter(void 0, void 0, void 0, function () {
    var response, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Block Id:", pageId);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, notion.blocks.children.list({
                        block_id: pageId,
                        page_size: 50
                    })
                    //console.log("Block Response: ", response)
                ];
            case 2:
                response = _a.sent();
                //console.log("Block Response: ", response)
                return [2 /*return*/, response];
            case 3:
                err_2 = _a.sent();
                console.log("Error: ", err_2);
                return [2 /*return*/, {}];
            case 4: return [2 /*return*/];
        }
    });
}); };
function FilterAllLinks(rootPageId) {
    return __awaiter(this, void 0, void 0, function () {
        var link_array, queue_array, current_pageid, worked_with_api, i, cur_block_obj, cur_rich_text, mention_dict, href, new_page_id;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    link_array = [];
                    queue_array = [rootPageId];
                    _b.label = 1;
                case 1:
                    if (!(queue_array.length > 0)) return [3 /*break*/, 3];
                    current_pageid = queue_array[0];
                    console.log("Current Pageid: ", current_pageid);
                    return [4 /*yield*/, fetchBlockFromPage(current_pageid)];
                case 2:
                    worked_with_api = _b.sent();
                    worked_with_api = worked_with_api['results'];
                    for (i = 0; i <= worked_with_api.length; i++) {
                        cur_block_obj = worked_with_api[i];
                        if (cur_block_obj === undefined) {
                            continue;
                        }
                        else {
                            cur_rich_text = cur_block_obj['paragraph']['rich_text'];
                            if (Object.keys(cur_rich_text).length >= 2) {
                                mention_dict = cur_rich_text['0'];
                                href = mention_dict['href'];
                                new_page_id = href.split('/')[3];
                                link_array.push((_a = {}, _a["https:www.notion.so/".concat(current_pageid)] = href, _a));
                                queue_array.push(new_page_id);
                            }
                            else {
                                continue;
                            }
                        }
                    }
                    queue_array = queue_array.slice(1);
                    return [3 /*break*/, 1];
                case 3:
                    console.log("Link Array: ", link_array);
                    return [2 /*return*/, link_array];
            }
        });
    });
}
router.get('/page/:page_id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user_page_id, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user_page_id = req.params['page_id'];
                console.log("User page Id: ", user_page_id);
                return [4 /*yield*/, fetchNotionPage(user_page_id)];
            case 1:
                result = _a.sent();
                if (Object.keys(result).length > 0) {
                    res.status(200).json(result);
                }
                else {
                    res.status(200).json({});
                }
                return [2 /*return*/];
        }
    });
}); });
router.get('/page/block/:block_id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user_page_id, filteredResult;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user_page_id = req.params['block_id'];
                return [4 /*yield*/, FilterAllLinks(user_page_id)];
            case 1:
                filteredResult = _a.sent();
                if (filteredResult.length > 0) {
                    res.status(200).json(filteredResult);
                }
                else
                    [
                        res.status(200).json([])
                    ];
                return [2 /*return*/];
        }
    });
}); });
module.exports = router;
//# sourceMappingURL=notion.js.map