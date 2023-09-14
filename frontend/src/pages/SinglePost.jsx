//src/pages/SinglePost.jsx
import React from "react";
import Layout from "../components/Layouts";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../helpers/axios";
import Post from "../components/posts/Post";
import CreateComment from "../components/comments/CreateComment";
import Comment from "../components/comments/Comment";


function SinglePost() {
    const { postId } = useParams();
    const {data: post, mutate: postMutate} = useSWR(`https://postgram.hamzabakkour.se/api/post/${postId}/`, fetcher);
    const {data: comments, mutate: commentMutate} = useSWR(`https://postgram.hamzabakkour.se/api/post/${postId}/comment/`, fetcher);


    return (
        <Layout hasNavigationBack>
        {post ? (
                        <Row className="justify-content-center">
                            <Col sm={8}>
                                <Post
                                post={post}
                                refresh={postMutate}
                                isSinglePost />
                                    <CreateComment
                                    postId={post.id}
                                    refresh={commentMutate} />
                                    {comments &&
                                        comments.results.map((comment, index) => (
                                            <Comment
                                            key={index}
                                            postId={post.id}
                                            comment={comment}
                                            refresh={commentMutate}
                                            />))
                                    }
                            </Col>
                        </Row>
                    ) : (<div>Loading...</div>)
        }
    </Layout>
    );
}

export default SinglePost;
