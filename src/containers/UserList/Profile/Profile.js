import React from 'react'
 import { Card,Row,Col} from 'react-bootstrap'
import style from './Profile.module.css'
import {getProfileData} from '../../../global/leadsGlobalData'
export default function Profile() {
    const profileData = getProfileData();
    let userName = profileData.username.toLowerCase();
    userName = userName.replace(/^\s+|\s+$/g, "");
   userName = userName.replace(/\s+/g, " ");
    const capitalLetter = (str)=>{
        str = str.split(" ");
    
        for (var i = 0; i < str.length; i++) {
            str[i] = str[i][0].toUpperCase() + str[i].substr(1);
        }
    
        return str.join(" ");
      }
    return (
        <div>
            {/* <Card className={style.Card}>
                <Card.Body>
                    <Card.Text>Name:{profileData.username}</Card.Text>
                    <Card.Text>Email:{profileData.email}</Card.Text>
                    <Card.Text>Mobile No:{profileData.phone_no}</Card.Text>
                    <Card.Text>Admin Verified:{JSON.stringify(profileData.is_admin_verified)}</Card.Text>
                    <Card.Text>Allowed Product:{profileData.user_roles[0].allowed_products}</Card.Text>
                </Card.Body>
            </Card> */}
            <div className="container">
                <Row>
                    <Col m={4} >
                        <Card className={style.Card}>
                            <table >
                                <thead>
                                    <th colSpan="2" className={style.Header}>Profile</th>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>Name</th>
                                        <td>{capitalLetter(userName)}</td>
                                    </tr>
                                    <tr>
                                        <th>Email</th>
                                        <td>{profileData.email}</td>
                                    </tr>
                                    <tr>
                                        <th>Phone no</th>
                                        <td>{profileData.phone_no}</td>
                                    </tr>
                                    <tr>
                                        <th>Admin Verified</th>
                                        <td>{JSON.stringify(profileData.is_admin_verified)}</td>
                                    </tr>
                                    <tr>
                                        <th>Allowed Product</th>
                                        <td>{profileData.user_roles[0].allowed_products}</td>
                                    </tr>
                                    <tr>
                                        <th>User Type</th>
                                        <td>{profileData.user_roles[0].user_type}</td>
                                    </tr>
                                    <tr>
                                        <th>User Access Type</th>
                                        <td>{profileData.user_roles[0].user_access_type}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
