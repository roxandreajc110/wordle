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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTopWords = exports.getTopPlayers = exports.findAllByUserId = exports.getValidGame = exports.updateGameById = exports.createGame = void 0;
const sequelize_1 = __importDefault(require("sequelize"));
const game_model_1 = __importDefault(require("../models/game.model"));
const appConstants_1 = require("../utils/appConstants");
const createGame = (game) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield game_model_1.default.create(game);
    return result.dataValues;
});
exports.createGame = createGame;
const updateGameById = (id, paramsUpdate) => __awaiter(void 0, void 0, void 0, function* () {
    yield game_model_1.default.update(paramsUpdate, {
        where: { id }
    });
});
exports.updateGameById = updateGameById;
const getValidGame = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield game_model_1.default.findOne({
        where: {
            id,
            status: appConstants_1.GAME_STATES.STARTED
        }
    });
    return result === null || result === void 0 ? void 0 : result.dataValues;
});
exports.getValidGame = getValidGame;
const findAllByUserId = (userId, filter) => __awaiter(void 0, void 0, void 0, function* () {
    return yield game_model_1.default.findAll({
        where: Object.assign({ userId }, filter)
    });
});
exports.findAllByUserId = findAllByUserId;
const getTopPlayers = (top) => __awaiter(void 0, void 0, void 0, function* () {
    return yield game_model_1.default.findAll({
        attributes: [
            "userId",
            [sequelize_1.default.fn("COUNT", sequelize_1.default.col("id")), "victories"],
        ],
        where: { status: appConstants_1.GAME_STATES.FINISHED, result: appConstants_1.GAME_RESULTS.WIN },
        group: 'userId',
        order: [['victories', 'DESC']],
        limit: top
    });
});
exports.getTopPlayers = getTopPlayers;
const getTopWords = (top) => __awaiter(void 0, void 0, void 0, function* () {
    return yield game_model_1.default.findAll({
        attributes: [
            "word",
            [sequelize_1.default.fn("COUNT", sequelize_1.default.col("id")), "count"],
        ],
        where: { status: appConstants_1.GAME_STATES.FINISHED, result: appConstants_1.GAME_RESULTS.WIN },
        group: 'word',
        order: [['count', 'DESC']],
        limit: top
    });
});
exports.getTopWords = getTopWords;
//# sourceMappingURL=game.controller.js.map