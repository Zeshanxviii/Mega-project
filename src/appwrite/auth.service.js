import { Client, Account, ID} from 'appwrite';
import config from '../config/config';

export class AuthService {
    client = new Client();
    account;

    constructor()
    {
        this.client
            .setEndpoint(config.appwrite_url)
            .setProject(config.project_id)
        this.account = new Account(this.client)
    }

    //define methods
    async createAccount({email,password,name})
    {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if(userAccount)
            {
                //call another method
                return this.login({email, password});
            }
            else
            {
                return userAccount
            }
        } catch (error) {
            throw error
        }
    }

    //login method
    async login({email,password}){
        try {
            return await this.account.createEmailPasswordSession(email,password)
        } catch (error) {
            throw error
        }
    }

    //check currentUser

    async getCurrentUser() {
        try {
            const currentUser = await this.account.get();
            return currentUser; // Explicitly returning the current user data
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }
    
        return null; // Return null if there's an error
    }
    

    // logout method

    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }

    // Create session
    async createSession() {
        try {
            return await this.account.createSession(ID.unique(), "SeCrEt");
        } catch (error) {
            console.log("Create session error: ", error);
        }
    }
}

const authService = new AuthService()
export default authService;