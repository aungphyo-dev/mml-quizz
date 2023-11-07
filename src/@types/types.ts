export interface timerTypes {
    start : number,
    end : number,
    checked : boolean,
    callBack : (b:boolean)=>void
}

export interface RootQuestion {
    questions : Question[]
}

export interface Question {
    _id?: string
    question?: string
    answers?: string[]
    correct_index?: number
    categoryLabel?: string
    createdBy?: string
    created_at?: string
    updated_at?: string
    __v?: number
}