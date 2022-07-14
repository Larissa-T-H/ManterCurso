import { Categoria } from "./Categoria";

export class Curso{

    cursoId: number = 0;
    descricao!: string;
    dataInicio!: Date;
    dataTermino!: Date;
    quantidade: number = 0;
    isStatus: boolean = true;
    categoriaId!: string;
    categoria!: Categoria;
}