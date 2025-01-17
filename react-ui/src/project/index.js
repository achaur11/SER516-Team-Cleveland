import React, { useState, useEffect } from "react";
import { Button, FloatingLabel, Form, Stack, Image, Dropdown, InputGroup, Spinner } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import CustomModal from "../modal";
import axios from "axios";
import Cleveland from "./Cleveland.png"
import Graph from "../graph";
import SprintDetail from "../sprint";
import DateSelector from '../devfocus';
import DateSelectorCruft from '../cruft';

const Project = () => {
    const location = useLocation();
    const [auth, setAuth] = useState("");
    const [project, setProject] = useState("");
    const [error, setError] = useState(false);
    const [data, setData] = useState(null);
    const [selectedValue, setSelectedValue] = useState(null);
    const [metric, setMetric] = useState(null);
    const [spinnerFlag, setSpinnerFlag] = useState(false);
    const [isBurndown, setIsBurndown] = useState(false);
    const [isLeadTime, setIsLeadTime] = useState(false);
    const [isCycleTime, setIsCycleTime] = useState(false);
    const [isDevFocus, setIsDevFocus] = useState(false);
    const [isCruft, setIsCruft] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleSelect = (eventKey) => {
        setSelectedValue(eventKey);
        if (eventKey === "Lead Time") {
            setMetric("metric/LeadTime");
            setIsBurndown(false);
            setIsCycleTime(false);
            setIsDevFocus(false);
            setIsCruft(false);
            setIsLeadTime(true);
        }
        else if (eventKey === "Cycle Time") {
            setMetric("metric/CycleTime");
            setIsBurndown(false);
            setIsCycleTime(true);
            setIsDevFocus(false);
            setIsCruft(false);
            setIsLeadTime(false);
        }
        else if (eventKey === "Burndown Chart") {
            setMetric("Sprints");
            setIsCycleTime(false);
            setIsDevFocus(false);
            setIsLeadTime(false);
            setIsCruft(false);
        }
        else if (eventKey === "Dev Focus") {
            setIsBurndown(false);
            setIsLeadTime(false);
            setIsCycleTime(false);
            setIsCruft(false);
            setMetric("Project");
        }
        else if (eventKey === "Cruft") {
            setMetric("Sprints");
            setIsBurndown(false);
            setIsCycleTime(false);
            setIsDevFocus(false);
            setIsLeadTime(false);
        }
    };

    useEffect(() => {
        setAuth(location?.state?.token);
    }, [location]);

    const handleSubmit = (event) => {
        event.preventDefault();

        setSpinnerFlag(true);

        axios({
            method: "post",
            url: `http://localhost:8000/${metric}`,
            data: {
                projectslug: project,
                from_date: startDate,
                to_date: endDate
            },
            headers: {
                "Content-Type": "application/json",
                "token": auth
            }
        })
            .then(res => {
                setData(res.data);
                console.log(data);
                setSpinnerFlag(false);
                setError(false);
                selectedValue === "Dev Focus" ? setIsDevFocus(true) : setIsDevFocus(false);
                selectedValue === "Burndown Chart" ? setIsBurndown(true) : setIsBurndown(false);
                selectedValue === "Cruft" ? setIsCruft(true) : setIsCruft(false);
            })
            .catch(ex => {
                setError(true);
                setSpinnerFlag(false);
                setIsBurndown(false);
                setIsDevFocus(false);
            });
    }

    const handleProjectSlugField = (event) => {
        event.preventDefault();
        setProject(event.target.value);
        setError(false);
    }

    if (!location?.state) {
        return (
            <CustomModal message="User not authenticated" headerTitle="Invalid Authentication!" showModal={true} />
        );
    }

    return (
        <div className="background" style={{ display: 'flex', width: "100%", minHeight: "100vh", overflow: "auto", justifyContent: 'center', alignItems: 'center' }}>
            <div className="backgroundWhite" style={{ width: '90%', display: 'flex', minHeight: "80vh", maxheight: "100vh", margin: "5%", justifyContent: 'center', alignItems: 'center' }}>
                <Stack>
                    <div>
                        <br />
                        <Form style={{ width: "100%" }}>
                            <Image src={Cleveland} className='col-sm-2 offset-sm-5' /><br /><br /><br /><br />
                            <div className="mb-3 col-sm-6 offset-sm-2">Welcome to our project! <br /><br />Please input your Project Slug
                                <br /></div>
                            <div className="d-flex justify-content-center col-sm-8 offset-sm-2">
                                <InputGroup>
                                    <FloatingLabel
                                        controlId="formProjectSlug"
                                        label="Project Slug"
                                    >
                                        <Form.Control type="text" placeholder="Project Slug" onChange={handleProjectSlugField} />
                                    </FloatingLabel>
                                    <Dropdown onSelect={handleSelect}>
                                        <Dropdown.Toggle variant="outline-secondary" className="backgroundButton">
                                            {selectedValue ? selectedValue : 'Select Metric'}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item eventKey="Lead Time">Lead Time</Dropdown.Item>
                                            <Dropdown.Item eventKey="Cycle Time">Cycle Time</Dropdown.Item>
                                            <Dropdown.Item eventKey="Burndown Chart">Burndown Chart</Dropdown.Item>
                                            <Dropdown.Item eventKey="Dev Focus">Dev Focus</Dropdown.Item>
                                            <Dropdown.Item eventKey="Cruft">Cruft</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </InputGroup>
                            </div><br />

                            {isLeadTime ? (<div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                                    <Form.Group controlId="dateFrom" style={{ width: '15%' }}>
                                        <Form.Label>From</Form.Label>
                                        <Form.Control type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group controlId="dateTo" style={{ width: '15%' }}>
                                        <Form.Label>To</Form.Label>
                                        <Form.Control type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
                                    </Form.Group>
                                </div>
                            </div>) : null}

                            <Button variant="info" type="submit" className="submitButton backgroundButton" onClick={handleSubmit}>
                                Submit
                            </Button>

                            <br />

                            {error ? (
                                <p className="errorMessage">Unable to fetch project detail</p>
                            ) : null}

                            {spinnerFlag ? <Spinner variant="primary" animation="border" style={{ justifyContent: "center", alignItems: "center", display: "flex", marginLeft: "49%" }} /> : null}
                        </Form>
                    </div>

                    {data?.metric === "LEAD" && isLeadTime ? (
                        <div>
                            <br />
                            <h3 className="projectName">{data.projectInfo.name}</h3>
                            <Graph type="Lead Time" apiData={data.leadTime.storiesLeadTime.userStory} avg={data.leadTime.storiesLeadTime.avgLeadTime} chartFor={"User Story"} title={`User Story ${selectedValue}`} />
                            <br />
                            <Graph type="Lead Time" apiData={data.leadTime.tasksLeadTime.task} avg={data.leadTime.tasksLeadTime.avgLeadTime} chartFor={"Task"} title={`Task ${selectedValue}`} />
                        </div>
                    ) : null}
                    {data?.metric === "CYCLE" && isCycleTime ? (
                        <div>
                            <br />
                            <h3 className="projectName">{data.projectInfo.name}</h3>
                            <Graph type="Cycle Time" apiData={data.cycleTime.storyCycleTime.story} avg={data.cycleTime.storyCycleTime.avgCycleTime} chartFor={"User Story"} title={`User Story ${selectedValue}`} />
                            <br />
                            <Graph type="Cycle Time" apiData={data.cycleTime.taskCycleTime.task} avg={data.cycleTime.taskCycleTime.avgCycleTime} chartFor={"Task"} title={`Task ${selectedValue}`} />
                        </div>
                    ) : null}
                    {selectedValue === "Burndown Chart" && isBurndown ? (
                        <SprintDetail sprintDetails={data.sprints} attributes={data.custom_attributes} token={auth} projectName={data.name} />
                    ) : null}
                    {selectedValue === "Dev Focus" && isDevFocus ? (
                        <DateSelector memberDetails={data.members} token={auth} projectId={data.id} onDateSubmit={(startDate, endDate) => {
                            console.log("Date range submitted:", startDate, "to", endDate);
                        }} />
                    ) : null}
                    {selectedValue === "Cruft" && isCruft ? (
                        <DateSelectorCruft attributes={data.custom_attributes} token={auth} projectId={data.id} onDateSubmit={(startDate, endDate) => {
                            console.log("Date range submitted:", startDate, "to", endDate);
                        }} />
                    ) : null}
                    <br />
                </Stack>
            </div>
        </div>
    );
}

export default Project;
