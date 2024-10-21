import {Client, ID, Databases, Storage, Query} from 'appwrite'
import config from '../config/config'

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
    async createPost({title, slug, content, featuredimage, status, userId})
    {
        try {
            return await this.databases.createDocument(
                config.database_id,
                config.collection_id,
                slug,
                {
                    title,
                    slug,
                    content,
                    featuredimage,
                    status,
                    userId
                }
            )   
        } catch (error) {
            console.log('Appwrite create post error: ', error);
            
        }
    }

    // updatepost method
    async updatePost(slug,{title, content, featuredimage, status})
    {
        try {
            return await this.databases.updateDocument(
                config.database_id,
                config.collection_id,
                slug,
                {
                    title,
                    content,
                    featuredimage,
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

    //get post method
    async getpost(slug)
    {
        try {
            return await this.databases.getDocument(
                config.database_id,
                config.collection_id,
                slug
            )
            
        } catch (error) {
            console.log("Appwrite getPost error",error);
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