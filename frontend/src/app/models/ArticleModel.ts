
export class ArticleModel {
    _id: string;
    title: String;
    short_description: String;
    long_description: String;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
    authors: string[];
}