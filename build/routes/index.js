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
        while (_) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var imgtransform_1 = __importDefault(require("../utilities/imgtransform"));
var routes = express_1.default.Router();
// (/api route)
routes.get('/', function (req, res) {
    res.send('Welcome to the api');
});
// (/api/images route )
routes.get('/images', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var filename, width, height, checkParams, resizedimg, imgProcessed;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.query) return [3 /*break*/, 4];
                filename = req.query.filename;
                width = Number(req.query.width);
                height = Number(req.query.height);
                checkParams = function (width, height) {
                    if (isNaN(width)) {
                        express_1.default.response.send("Width and Height Parameters are not numbers");
                    }
                };
                checkParams(width, height);
                resizedimg = path_1.default.join(__dirname, '../', '../', 'images/', 'resized/', filename) +
                    "-".concat(width, "x").concat(height, ".jpg");
                if (!fs_1.default.existsSync(resizedimg)) return [3 /*break*/, 1];
                res.sendFile(resizedimg);
                return [3 /*break*/, 3];
            case 1: return [4 /*yield*/, (0, imgtransform_1.default)(filename, width, height)];
            case 2:
                imgProcessed = _a.sent();
                if (!String(imgProcessed).includes('Error')) {
                    res.sendFile(imgProcessed);
                }
                else {
                    res.send("There has been an Error Processing your image. Kindly check {Filename , Width and Height parameters.");
                }
                _a.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                res
                    .status(500)
                    .send('invalid url (filename, width and height are mandatory also width and height must be numbers).');
                _a.label = 5;
            case 5: return [2 /*return*/];
        }
    });
}); });
exports.default = routes;
