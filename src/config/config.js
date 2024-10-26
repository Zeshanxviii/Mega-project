const config = {
    appwrite_url : String(import.meta.env.VITE_APPWRITE_URL),
    project_id : String(import.meta.env.VITE_PROJECT_ID),
    database_id : String(import.meta.env.VITE_DATABASE_ID),
    collection_id : String(import.meta.env.VITE_COLLECTION_ID),
    bucket_id : String(import.meta.env.VITE_BUCKET_ID),
    Api_key : String(import.meta.env.VITE_TINY_MCE_API)
}

export default config; 