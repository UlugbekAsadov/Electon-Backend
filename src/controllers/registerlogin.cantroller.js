import { hash, compare } from "bcrypt"
import userdb from "../models/userdb.js"
class RegisterLogin{
    signuppage(req, res){
        res.status(201).json({message:'go to registration.'})
    }
    signinpage(req, res){
        console.log(req.session)
        res.status(200).json({message:'enter login'})
    }


        //  {
        //  "firstName":"Obiljon", 
        //  "lastName":"rahimov", 
        //  "password":"1234qwer", 
        //  "age":25, 
        //  "status":"activ", 
        //  "role":"user", 
        //  "phoneNumber":"888888888" 
        //  }

    async signup(req, res){
        try {
            const { firstName, lastName, password, age, status, role, phoneNumber } = req.body
            const passwordhash = await hash(password, 10)
            const user = await userdb.create({firstName, lastName, password:passwordhash, age, status, role, phoneNumber})
            res.status(201).json({ message: "User created" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error during user registration.' });
        }
    }


            //  {
            //  "firstName":"Obiljon", 
            //  "lastName":"rahimov", 
            //  "password":"1234qwer", 
            //  }

    async signin(req, res){
        try {
            const {firstName, lastName, password} = req.body;
            const user = await userdb.findOne({"firstName":firstName, "lastName":lastName}); 
            if(await compare(password, user.password) || user){
                const {firstName, lastName, age, status, role, phoneNumber} = user;
                req.session.user = {firstName, lastName, age, status, role, phoneNumber };
                return res.status(200).json({ message: "User logged in" });
            }
            res.status(400).json({ message: "Incorrect login or password." });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error during user login.' });
        }
    }
}


export default new RegisterLogin()