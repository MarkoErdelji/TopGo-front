export interface UserNoteListDTO {
    totalCount: number;
    results: NoteResponseDTO[];
}

export interface NoteResponseDTO {
    id: number;
    message: string;
    date: Date;
}