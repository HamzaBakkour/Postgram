//src/pages/Home.jsx
import React from "react";
import Layout from "../components/Layouts";
import { Row, Col, Image } from "react-bootstrap";
import useSWR from "swr";
import { fetcher } from "../helpers/axios";
import { getUser } from "../hooks/user.actions";
import CreatePost from "../components/posts/CreatePost";
import ProfileCard from "../components/profile/ProfileCard";
import Post from "../components/posts/Post";
import LoadingSpinner from "../components/LoadingSpinner";
import { useNavigate } from "react-router-dom";


function Home(){

    const { data: posts, mutate: postmutate } = useSWR("https://postgram.hamzabakkour.se/api/post", fetcher, {
        refreshInterval: 60000,
    });

    const { data: profiles } = useSWR("https://postgram.hamzabakkour.se/api/user/?limit=5", fetcher);

    const user = getUser();
    if(!user){
        return <LoadingSpinner />
    }

    if ( typeof posts === 'undefined' || typeof profiles === 'undefined'){
        return <LoadingSpinner />
    }

    return (
        <Layout>
            <Row className = "justify-content-evenly">
                <Col sm = {7}>
                    <Row className = "border rounded align-items-center">                        
                        <Col className = "flex-shring-1">
                            <Image
                            src = { user.avatar}
                            roundedCircle
                            width = {52}
                            height = {52}
                            className = "my-2"/>
                        </Col>
                        <Col sm = {10} className = "flex-grow-1">
                            <CreatePost refresh = {postmutate}/>
                        </Col>
                    </Row>
                    <Row className = "my-4">
                        {posts.results.map((post, index) => (
                            <Post key = {index} post = {post} refresh = {postmutate}/>
                        ))}
                    </Row>
                </Col>
                <Col sm = {3} className = "border rounded py-4 h-50">
                    <h4 className = "font-weight-bold text-center">
                        Suggested people
                    </h4>
                    <div className = "d-flex flex-column">
                        {profiles.results && profiles.results.map(
                            function (profile, index) {
                                                return (<ProfileCard key={index} user={profile} />);
                                }
                            )
                        }
                    </div>
                </Col>
            </Row>
        </Layout>
    );
  
}

export default Home;

