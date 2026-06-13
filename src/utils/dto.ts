 interface ICreateArticleDto{
    
        title: string,
        description: string,
}
 interface IUpdateArticleDto{
     
        title?: string,
         description?: string,   
}

 interface ICreateRegisterDto{
     
        email : string,
       username: string,  
         password : string,   
}
 interface ICreateLoginDto{
     
        email : string,
       username: string,  
         password : string,   
}
 interface UpdateUserDto {
    username?: string;
    email?: string;
    password?: string;
}
 interface ICreatCommeent{
       text:string,
       articleId:number
 }
  interface IUpdateCommeent{
       text:string,
       
 }
export type{ICreateArticleDto,IUpdateArticleDto,ICreateRegisterDto,ICreateLoginDto,UpdateUserDto,ICreatCommeent,IUpdateCommeent}