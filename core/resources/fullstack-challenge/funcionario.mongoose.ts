import { IFuncionario } from './funcionario.model';
import * as mongoose from 'mongoose'

const fsSchema: mongoose.Schema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        maxlength: 60,
        minlength: 3,
    },

    sobrenome: {
        type: String,
        required: true,
        maxlength: 60,
        minlength: 3,
    },

    participacao: {
        type: Number,
        required: true
    }
})

export const Funcionario = mongoose.model<IFuncionario>('Funcionario', fsSchema)