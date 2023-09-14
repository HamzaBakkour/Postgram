//src/pages/Profile
import React from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layouts";
import ProfileDetails from "../components/profile/ProfileDetail";
import useSWR from "swr";
import { fetcher } from "../helpers/axios";
import Post from "../components/posts/Post";
import { Row, Col } from "react-bootstrap";
import LoadingSpinner from "../components/LoadingSpinner";


function Profile() {
    const { profileId } = useParams();
    const {data: user} = useSWR(`https://postgram.hamzabakkour.se/api/user/${profileId}/`, fetcher);
    const {data: posts, mutate: postmutate} = useSWR(`https://postgram.hamzabakkour.se/api/post/?author__public_id=${profileId}`,
                            fetcher,
                            {refreshInterval: 20000,});

    console.log("user: ", user)
    console.log("posts: ", posts)


    if ( (typeof posts === 'undefined') ||  (typeof user === 'undefined')){
        return <LoadingSpinner />
    }


    return (
        <Layout hasNavigationBack>
            <Row className="justify-content-evenly">
                <Col sm={9}>
                    <ProfileDetails user={user} />
                        <div>
                            <Row className="my-4">
                                {posts.results.map((post, index) => (
                                <Post key={index} post={post} refresh={postmutate} />
                                ))}
                            </Row>
                        </div>
                </Col>
            </Row>
        </Layout>
    );
}

export default Profile;

