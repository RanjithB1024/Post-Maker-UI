"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
const BASE_URL = 'https://post-maker-api-4.onrender.com/api';

export default function HomePage() {
    const [posts, setPosts] = useState([]);
    const [content, setContent] = useState('');
    const fetchPosts = async () => {
        const res = await fetch(`${BASE_URL}/posts`);
        const data = await res.json();
        console.log(data);
        setPosts(data);
    };

    useEffect(() => {
        (async () => {
            await fetchPosts();
        })();
    }, []);
    const createPost = async () => {
        alert("api")
        if (!content.trim()) return;
        await fetch(`${BASE_URL}/posts`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content })
        });
        setContent('');
        fetchPosts();
    };

    const likePost = async (id: string) => {
        await fetch(`${BASE_URL}/posts/${id}/like`, {
            method: 'POST'
        });
        fetchPosts();
    };

    const commentPost = async (id: string, comment: string) => {
        if (!comment.trim()) return;
        await fetch(`${BASE_URL}/posts/${id}/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ comment })
        });
        fetchPosts();
    };

    const renderPreviewContent = (url: string) => {
        if (!url) return null;

        if (url.endsWith('.pdf')) {
            return (
                <embed
                    src={url}
                    type="application/pdf"
                    className="w-full h-100 rounded-lg mt-2"
                />
            );
        } else if (url.match(/\.(jpeg|jpg|png|gif)$/)) {
            return (
                <img
                    src={url}
                    alt="Preview"
                    className="w-full h-full object-cover mt-2 rounded-lg"
                />
            );
        } else {
            return (
                <p className="text-gray-500 mt-2">
                    {url}
                </p>
            );
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow-md py-4 fixed top-0 left-0 w-full z-10">
                <div className="max-w-6xl mx-auto flex items-center justify-center">
                    <Image
                        src="https://www.innovapptive.com/hubfs/innovapptive-logo.svg"
                        alt="Company Logo"
                        width={100} // Specify width
                        height={40} // Specify height
                    />
                </div>
            </header>
            <div className="bg-white shadow-sm rounded-lg p-4 mb-6 mt-8 max-w-2xl mx-auto">
                <textarea
                    className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="What's on your mind?"
                    value={content || ''}
                    onChange={(e) => setContent(e.target.value)}
                />
                <button
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                    onClick={createPost}
                >
                    Post
                </button>
            </div>

            <div className="font-medium text-gray-700 mb-4">
                Total Posts: {posts?.length || 0}
            </div>
            {posts.length === 0 ? (
                <p>Loading...</p>
            ) : (
                <>
                    <div className="max-w-2xl mx-auto pt-20 mt-5">


                        {posts.map((post: any) => (
                            <div key={post.id} className="bg-white shadow-sm rounded-lg p-4 mb-6">
                                {post.content && renderPreviewContent(post.content)}

                                {post.preview && (
                                    <div className="border rounded-lg p-3 mb-3 hover:shadow-md transition">
                                        <h3 className="font-semibold text-blue-600">{post.preview.title}</h3>
                                        <p className="text-sm text-gray-600">{post.preview.description}</p>
                                        {renderPreviewContent(post.content)}
                                    </div>
                                )}

                                <div className="flex gap-4 items-center mb-3 mt-7">
                                    <button
                                        onClick={() => likePost(post.id)}
                                        className="text-blue-600 hover:underline"
                                    >
                                        👍 {post.likes}
                                    </button>
                                    <span className="text-gray-600">
                                        {post.comments.length} comments
                                    </span>
                                </div>

                                <div className="mt-2">
                                    {post.comments.map((c: any, i: number) => (
                                        <div key={i} className="flex justify-start mb-2">
                                            <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-2xl max-w-xs">
                                                {c.comment}
                                            </div>
                                        </div>
                                    ))}

                                    <input
                                        type="text"
                                        placeholder="Write a comment..."
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                commentPost(post.id, e.currentTarget.value);
                                                e.currentTarget.value = '';
                                            }
                                        }}
                                        className="mt-3 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
