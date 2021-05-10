import { USERS } from '../userLogins';

const compare =(username,password) => 
     USERS.users.filter((fl) => {
        return fl.userLogin === username && fl.password === password
    });

export const validateUser =(account= '') => {
 try{
    const buff = Buffer.from(account, 'base64');
    const text = buff.toString('ascii');
    // split the token to extract username password
    const [userName = '', password= ''] = text.split(':');
        return compare(userName, password);
 }catch(err){
     throw new Error('error occured at validateUser');
 }
}

