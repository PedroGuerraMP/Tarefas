export interface Tarefa {
    id?: number;
    titulo?: string;
    descricao?: string;
    data_vencimento?: any;
    status?: statusTarefa; 
}

enum statusTarefa {
    pendente = 0,
    em_andamento = 1,
    concluida = 2
}