export class Images {
    constructor (
        public readonly id: string,
        public readonly subtitle: string,
        public readonly author: string,
        public readonly date: string,
        public readonly file: string,
        public readonly collection: string
    ) {}
}

export interface inputImageDTo {
    subtitle: string,
    author: string,
    file: string,
    collection: string
}