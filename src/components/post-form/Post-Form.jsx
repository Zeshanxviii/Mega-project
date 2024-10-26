import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import service from '../../appwrite/config.service'
import { Button, RTE, Input, LogoutBtn , Select } from '../index'

import React from 'react'
import { useCallback } from 'react'
import { useEffect } from 'react'

function PostForm({ post }) {
    const navigate = useNavigate()
    const { register, handleSubmit, watch, setValue, control , getValues } = useForm({
        defaultValues: {
            title: post?.title || '',
            content: post?.content || '',
            slug: post?.slug || '',
            status: post?.slug || 'active  '
        }
    })
    const userData = useSelector((state) => state.auth.userData)

    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await service.fileUpload(data.image[0]) : null;

            if (file) {
                service.deleteFile(post.featuredImage);
            }

            const dbPost = await service.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const file = await service.fileUpload(data.image[0]);

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await service.createPost({ ...data, userId: userData.$id });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if(value&& typeof value === 'string')
        {
            return value
            .trim()
            .toLowerCase()
            .replace(/^[a-zA-Z\d\s]/g,'_')
            .replace(/\s/g,'_')
        }
        return ''
    },[])

    useEffect(() => {
        const subcription = watch((value,{name}) => {
            if(name == 'title')
            {
                setValue('slug',slugTransform(value.title,
                    {shouldValidate:true}
                ))
            }
        })
        return () => {
            subcription.unsubscribe()
        }
    },[watch ,slugTransform ,setValue])
    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
        <div className="w-2/3 px-2">
            <Input
                label="Title :"
                placeholder="Title"
                className="mb-4"
                {...register("title", { required: true })}
            />
            <Input
                label="Slug :"
                placeholder="Slug"
                className="mb-4"
                {...register("slug", { required: true })}
                onInput={(e) => {
                    setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                }}
            />
            <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
        </div>
        <div className="w-1/3 px-2">
            <Input
                label="Featured Image :"
                type="file"
                className="mb-4"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("image", { required: !post })}
            />
            {post && (
                <div className="w-full mb-4">
                    <img
                        src={service.getfilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-lg"
                    />
                </div>
            )}
            <Select
                options={["active", "inactive"]}
                label="Status"
                className="mb-4"
                {...register("status", { required: true })}
            />
            <Button type="submit" bgColor={post ? "bg-green-500" : undefined} classname="w-full">
                {post ? "Update" : "Submit"}
            </Button>
        </div>
    </form>
    );
}

export default PostForm