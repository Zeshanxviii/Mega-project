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
            const userAccount = await this.account.create(ID.unique(),email,password,name)
            if(userAccount)
            {
                //call another method
                this.account.login({email,password})
                this.account.createSession()
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

    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            throw error
        }
    }

    // logout method

    async logout() {
        try {
            const session = await this.account.getSessions(); // Retrieve the current session
            if (session.length > 0) {
                const sessionId = session[0].$id; // Use the correct session ID
                return await this.account.deleteSession(sessionId);
            } else {
                throw new Error("No active session found");
            }
        } catch (error) {
            throw error;
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