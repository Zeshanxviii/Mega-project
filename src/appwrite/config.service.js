import {Client, ID, Databases, Storage, Query} from 'appwrite'
import config from '../config/config'
import authService from './auth.service';

export class Service {
    client = new Client();
    databases;
    buckets;
    constructor()
    {
        this.client
            .setEndpoint(config.appwrite_url)
            .setProject(config.project_id)
        this.databases = new Databases(this.client)
            // .createDocument(config.database_id,config.collection_id)
        this.buckets = new Storage(this.client)
            // .listFiles(config.bucket_id)
    }
    // define createpost methods

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                config.database_id,
                config.collection_id,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }

    // updatepost method
    async updatePost(slug,{title, content, featuredImage, status})
    {
        try {
            return await this.databases.updateDocument(
                config.database_id,
                config.collection_id,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log('Appwrite update post error: ', error);
            
        }
    }
    // deletepost method

    async deletePost(slug)
    {
        try {
            await this.databases.deleteDocument(
                config.database_id,
                config.collection_id,
                slug
            )
            return true
        } catch (error) {
            console.log("Appwrite delete post error",error);
            return false
        }
    }
    async getUserPosts() {
        try {
            const currentUser = await authService.getCurrentUser(); // Get the current user
            const userId = currentUser.$id; // Get the user ID

            // Fetch posts created by the user
            const userPosts = await databaseService.listDocuments(
                config.collection_id, [
                Appwrite.Query.equal('userId', userId),
            ]);

            return userPosts.documents; // Return the array of user posts
        } catch (error) {
            console.error("Error fetching user posts:", error);
            return []; // Return an empty array on error
        }
    }

    //get all post method
    async getALlPost(qurries = [Query.equal('status','Active')])
    {
        try {
            return await this.databases.listDocuments(
                config.database_id,
                config.collection_id,
                qurries
            )
        } catch (error) {
            console.log('Appwrite error in getting all post',error);
            return false            
        }
    }

    //file upload service using buckects variable
    async fileUpload(file)
    {
        try {
            return await this.buckets.createFile(
                config.bucket_id,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log('Appwrite fileupload error',error);
            return false
        }
    }
    // file delete method
    async deleteFile(fileID)
    {
        try {
            await this.buckets.deleteFile(
                config.bucket_id,
                fileID
            )
            return true
        } catch (error) {
            console.log("Appwrite delete file error", error);
            return false
        }
    }
    //get file preview method
    getfilePreview(fileID)
    {
        try {
        return this.buckets.getFilePreview(
                config.bucket_id,
                fileID
            )
        } catch (error) {
            console.log("Appwrite file preview error");
            return false
        }
    }
}

const service = new Service; 
export default service;