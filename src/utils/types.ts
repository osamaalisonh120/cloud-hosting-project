import { Article, Comment, User } from "@prisma/client";


export type CommentWithUser=Comment&{user:User}

// {
//   "id": 5,
//   "text": "Nice article",
//   "userId": 12,
//   "user": {
//     "id": 12,
//     "username": "osama",
//     "email": "osama@mail.com"
//   }
// }


export type SingleArticle=Article&{comments:CommentWithUser[]}
// {
//   "id": 26,
//   "title": "Javascript",
//   "description": "Javascript is a programming language",
//   "createdAt": "2026-01-20T15:05:59.112Z",
//   "updatedAt": "2026-01-20T15:05:59.112Z",
//   "comments": [
//     {
//       "id": 14,
//       "text": " if not username or not password:return None   ",
//       "createdAt": "2026-01-20T19:36:57.104Z",
//       "updatedAt": "2026-01-20T19:36:57.104Z",
//       "articleId": 26,
//       "userId": 12,
//       "user": {
//         "username": "osamamosa"
//       }
//     }
//   ]
// }



export  interface IJWTpaylods{
  
    id: number;
    isAdmin: boolean;
    username: string;
}

