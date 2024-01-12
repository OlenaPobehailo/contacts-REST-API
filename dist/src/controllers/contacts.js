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
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactsController = void 0;
const contact_1 = require("../models/contact");
const helpers_1 = require("../helpers");
const decorators_1 = require("../decorators");
const getAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id: owner } = req.user || {};
    const { page = 1, limit = 20, favorite } = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    const filter = { owner, favorite: favorite === "true" };
    const result = yield contact_1.Contact.find(filter, "-createdAt -updatedAt", {
        skip,
        limit: Number(limit),
    }).populate("owner", "email subscription");
    res.json(result);
});
const getById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { contactId } = req.params;
    const result = yield contact_1.Contact.findById(contactId);
    if (!result) {
        throw (0, helpers_1.HttpError)(404, `Contact with id=${contactId} not found`);
    }
    res.json(result);
});
const createContact = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id: owner } = req.user || {};
    const result = yield contact_1.Contact.create(Object.assign(Object.assign({}, req.body), { owner }));
    res.status(201).json(result);
});
const deleteById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { contactId } = req.params;
    const result = yield contact_1.Contact.findByIdAndDelete(contactId);
    if (!result) {
        throw (0, helpers_1.HttpError)(404, `Contact with id=${contactId} not found`);
    }
    res.json({
        message: "contact deleted",
    });
});
const updateById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { contactId } = req.params;
    const result = yield contact_1.Contact.findByIdAndUpdate(contactId, req.body, {
        new: true,
    });
    if (!result) {
        throw (0, helpers_1.HttpError)(404, "Not found");
    }
    res.json(result);
});
const updateFavorite = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const updateStatusContact = (contactId, favorite) => __awaiter(void 0, void 0, void 0, function* () {
        return yield contact_1.Contact.findByIdAndUpdate(contactId, { favorite }, {
            new: true,
        });
    });
    const { contactId } = req.params;
    const { favorite } = req.body;
    const result = yield updateStatusContact(contactId, favorite);
    if (!result) {
        throw (0, helpers_1.HttpError)(404, "Not found");
    }
    res.json(result);
});
exports.contactsController = {
    getAll: (0, decorators_1.ctrlWrapper)(getAll),
    getById: (0, decorators_1.ctrlWrapper)(getById),
    createContact: (0, decorators_1.ctrlWrapper)(createContact),
    deleteById: (0, decorators_1.ctrlWrapper)(deleteById),
    updateById: (0, decorators_1.ctrlWrapper)(updateById),
    updateFavorite: (0, decorators_1.ctrlWrapper)(updateFavorite),
};
