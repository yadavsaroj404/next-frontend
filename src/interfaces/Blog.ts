interface Blog {
  id: string;
  title: string;
  url: string;
  matadata: string;
  summary: string;
  content: string;
  imageURL: string;
  keywords: string;
  author: string;
  authorInfo: string;
}
export interface BlogCard {
  _id: string;
  imgUrl: string;
  author?: string;
  date?: string;
  title: string;
  blogUrl: string;
  summary: string;
}

export default Blog;
