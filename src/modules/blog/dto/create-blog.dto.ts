import { ICreateBlog } from "../interfaces";

export class CreateBlogDto implements ICreateBlog {
    title: string;
    description: string;
    image: string;
}
