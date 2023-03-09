export interface UserComment {
  belongTo: string;
  content: string;
  id: number;
  createdAt: number;
  likes: number;
  dislikes: number;
}


export interface Comments {
    [key: string]: UserComment[]
}