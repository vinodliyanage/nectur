export interface UserComment {
  id: number;
  belongTo: string;
  message: string;
  createdAt: number;
  upvotes: number;
  downvotes: number;
  replies: UserComment[];
}

export interface Comments {
    [key: string]: UserComment[]
}