//src/pages/EditProfile.jsx
import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import Layout from "../components/Layouts";
import UpdateProfileForm from "../components/profile/UpdateProfileForm";
import { fetcher } from "../helpers/axios";
import { Row, Col } from "react-bootstrap";
import LoadingSpinner from "../components/LoadingSpinner";


function EditProfile() {
    const { profileId } = useParams();
    const {data: profile} = useSWR(`https://postgram.hamzabakkour.se/api/user/${profileId}/`, fetcher);


    if ( typeof profile === 'undefined' ){
        return <LoadingSpinner />
        }


    return(
        <Layout hasNavigationBack>
            {profile ? (
                <Row className = "justify-content-evenly">
                    <Col sm = {9}>
                        <UpdateProfileForm profile = {profile} />
                    </Col>
                </Row>
            ) : (
                <div>Loading...EditProfile_2</div>
            )}
        </Layout>
    );


}

export default EditProfile;


