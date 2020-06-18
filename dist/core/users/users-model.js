"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var api_config_1 = require("./../../config/api-config");
var mongoose = __importStar(require("mongoose"));
var bcrypt = __importStar(require("bcrypt"));
var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 60,
        minlength: 3,
    },
    email: {
        type: String,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    gender: {
        type: String,
        required: false,
        enum: ['Male', 'Female']
    }
});
userSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')) {
        next();
    }
    else {
        bcrypt.hash(user.password, api_config_1.config.security)
            .then(function (hash) {
            user.password = hash;
            next();
        }).catch(next);
    }
});
userSchema.pre('findOneAndUpdate', function (next) {
    var _this = this;
    if (!this.getUpdate().password) {
        next();
    }
    else {
        bcrypt.hash(this.getUpdate().password, api_config_1.config.security)
            .then(function (hash) {
            _this.getUpdate().password = hash;
            next();
        }).catch(next);
    }
});
exports.User = mongoose.model('User', userSchema);
