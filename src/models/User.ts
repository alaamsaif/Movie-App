export interface User {
  uid?:string,
  email: string;
  password: string;
  username: string;
  favorites?:[];
  likes?:[];
  comments?:{
    content:string;
    movieId:number
  }[]
}
