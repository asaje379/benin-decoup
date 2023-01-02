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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const benin_json_1 = __importDefault(require("./benin.json"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.get('/departments', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const departments = benin_json_1.default.map((item) => ({
        id: item.id_dep,
        label: item.lib_dep,
    }));
    res.status(200).json(departments);
}));
app.get('/communes/:dep', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dep = req.params.dep;
    const department = benin_json_1.default.find((item) => item.id_dep === +dep || item.lib_dep === dep);
    const communes = department === null || department === void 0 ? void 0 : department.communes;
    const $communes = communes === null || communes === void 0 ? void 0 : communes.map((item) => ({
        id: item.id_com,
        label: item.lib_com,
    }));
    res.status(200).json($communes);
}));
app.get('/arrondissements/:com', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const com = req.params.com;
    let commune;
    for (const dep of benin_json_1.default) {
        const res = dep.communes.find((item) => item.id_com === +com || item.lib_com === com);
        if (res) {
            commune = res;
            break;
        }
    }
    const arrs = commune === null || commune === void 0 ? void 0 : commune.arrondissements;
    const $arrs = arrs === null || arrs === void 0 ? void 0 : arrs.map((item) => ({
        id: item.id_arrond,
        label: item.lib_arrond,
    }));
    res.status(200).json($arrs);
}));
app.get('/quartiers/:arr', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const arr = req.params.arr;
    let arrondissement;
    for (const dep of benin_json_1.default) {
        for (const com of dep.communes) {
            const res = com.arrondissements.find((item) => item.id_arrond === +arr || item.lib_arrond === arr);
            if (res) {
                arrondissement = res;
            }
        }
    }
    const quartiers = arrondissement === null || arrondissement === void 0 ? void 0 : arrondissement.quartiers.map((item) => ({
        id: item.id_quart,
        label: item.lib_quart,
    }));
    res.status(200).json(quartiers);
}));
app.listen(3011, () => console.log('Server is running'));
//# sourceMappingURL=index.js.map