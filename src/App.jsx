import React, {useEffect, useState} from 'react'
import './App.css'

import {Row, Container, Tabs, Tab, Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import {MediumTitle, SmallTitle} from "./style";

function App() {
    const [resources, setResources] = useState([]);

    useEffect(() => {
        axios.get('./js/projects.json').then(res => setResources(res.data.projects))
    }, []);

    function getMembers(resources) {
        return resources.map(item => {
            return (
                <Card className='text-center col-md-3 col-sm-12 mx-auto'>
                    <div className={'text-center m-4'}><i className="fa-solid fa-user-large fa-4x main-color"/></div>
                    <Card.Body>
                        <Card.Title className='orange-color'>{item.name}</Card.Title>
                        <div className={'pt-2 text-center'}>
                            <a href={item.facebook} className="btn btn-outline-light mx-2 main-color"><i
                                className="fa-brands fa-facebook"/></a>
                            <a href={item.linkedin} className="btn btn-outline-light mx-2 main-color"><i
                                className="fa-brands fa-linkedin"/></a>
                        </div>
                    </Card.Body>
                </Card>
            )
        })
    }

    const data = resources.map(item => {
        const frontendTeam = getMembers(item.teams.frontend);
        const backendTeam = getMembers(item.teams.backend);
        const mobileTeam = getMembers(item.teams.mobile);
        const devopsTeam = getMembers(item.teams.devops);
        const testersTeam = getMembers(item.teams.testers);
        const designersTeam = getMembers(item.teams.designers);
        const sprints = item.sprints.map((sprint, index) => {
            const sprintItem = sprint.map(story => {
                return (
                    <div className='col-md-6 col-sm-12'>
                        <Card className={'w-100'}>
                            <Card.Body>
                                <Card.Title className='orange-color'>{story.title}</Card.Title>
                                <Card.Text>
                                    <p><b>What: </b> {story.acceptance_criteria.what}</p>
                                    <p><b>Why: </b> {story.acceptance_criteria.why}</p>
                                    <p><b>When: </b> {story.acceptance_criteria.when}</p>
                                    <p><b>Estimation: </b> {story.estimation}</p>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                )
            });
            return (
                <Tab eventKey={'Sprint ' + index} title={'Sprint ' + index}>
                    <div className={'row'}>{sprintItem}</div>
                </Tab>
            )
        });
        return (
            <Row className="p-3">
                <Card>
                    <Card.Body>
                        <Card.Title><MediumTitle>{item.title}</MediumTitle></Card.Title>
                        <Card.Text>
                            {item.description}
                        </Card.Text>
                        <SmallTitle> Teams </SmallTitle>
                        <hr/>
                        <Tabs defaultActiveKey="product_owner" className="mb-3">
                            <Tab eventKey="product_owner" title="Product Owner">
                                <Card style={{width: '18rem'}} className='text-center'>
                                    <div className={'text-center m-4'}><i
                                        className="fa-solid fa-user-large fa-4x main-color"/></div>
                                    <Card.Body>
                                        <Card.Title
                                            className='orange-color'>{item.teams.product_owner.name}</Card.Title>
                                        <div className={'pt-2 text-center'}>
                                            <a href={item.teams.product_owner.facebook}
                                               className="btn btn-outline-light mx-2 main-color"><i
                                                className="fa-brands fa-facebook"/></a>
                                            <a href={item.teams.product_owner.linkedin}
                                               className="btn btn-outline-light mx-2 main-color"><i
                                                className="fa-brands fa-linkedin"/></a>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Tab>
                            <Tab eventKey="scrum_master" title="Scrum Master">
                                <Card style={{width: '18rem'}} className='text-center '>
                                    <div className={'text-center m-4'}><i
                                        className="fa-solid fa-user-large fa-4x main-color"/></div>
                                    <Card.Body>
                                        <Card.Title className='orange-color'>{item.teams.scrum_master.name}</Card.Title>
                                        <div className={'pt-2 text-center'}>
                                            <a href={item.teams.scrum_master.facebook}
                                               className="btn btn-outline-light mx-2 main-color"><i
                                                className="fa-brands fa-facebook"/></a>
                                            <a href={item.teams.scrum_master.linkedin}
                                               className="btn btn-outline-light mx-2 main-color"><i
                                                className="fa-brands fa-linkedin"/></a>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Tab>
                            <Tab eventKey="frontend" title="Frontend">
                                <div className={'row'}>
                                    {frontendTeam}
                                </div>
                            </Tab>
                            <Tab eventKey="backend" title="Backend">
                                <div className={'row'}>
                                    {backendTeam}
                                </div>
                            </Tab>
                            <Tab eventKey="mobile" title="Mobile">
                                <div className={'row'}>
                                    {mobileTeam}
                                </div>
                            </Tab>
                            <Tab eventKey="devops" title="Dev Ops">
                                <div className={'row'}>
                                    {devopsTeam}
                                </div>
                            </Tab>
                            <Tab eventKey="testers" title="Testers">
                                <div className={'row'}>
                                    {testersTeam}
                                </div>
                            </Tab>
                            <Tab eventKey="designers" title="Designers">
                                <div className={'row'}>
                                    {designersTeam}
                                </div>
                            </Tab>
                        </Tabs>
                        <hr/>
                        <div className={'sprints'}>
                            <div>
                                <SmallTitle>Sprints</SmallTitle>
                                <Tabs defaultActiveKey="Sprint 1" className="mb-3">
                                    {sprints}
                                </Tabs>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </Row>
        );
    });


    return (
        <Container>
            {data}
        </Container>
    )
}

export default App
