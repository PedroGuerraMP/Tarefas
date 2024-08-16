export interface Tarefa {
    id: number;
    titulo?: string;
    descricao?: string;
    data_vencimento?: any;
    status?: EnumStatusTarefa; 
}

export enum EnumStatusTarefa {
    "Pendente",
    "Em andamento",
    "Concluída"
}