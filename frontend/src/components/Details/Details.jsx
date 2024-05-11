import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl } from '../../config/Url';
import { Modal, Button, Input, message } from 'antd';
import './Details.css'

const { TextArea } = Input;

const Details = () => {
    const [apiData, setApiData] = useState({
        id: "",
        title: "",
        content: ""
    });
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
    const [isCountModalVisible, setIsCountModalVisible] = useState(false);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const addElement = async () => {
        setLoading(true);
        try {
            const response = await axios.post(`${backendUrl}/api/v1/create`, {
                title,
                content
            });
            if (response?.data?.success) {
                setIsCreateModalVisible(false);
                setTitle("");
                setContent("");
                setApiData({
                    id: response?.data?.component?._id,
                    title: response?.data?.component?.title,
                    content: response?.data?.component?.content
                });
                message.success('Element added successfully');
            }
        } catch (error) {
            console.error("Error adding element:", error);
            setError('Error adding element');
        } finally {
            setLoading(false);
        }
    };

    const editElement = async () => {
        setLoading(true);
        try {
            const response = await axios.put(`${backendUrl}/api/v1/update/${apiData.id}`, {
                title,
                content
            });
            if (response.data?.success) {
                setIsUpdateModalVisible(false);
                setTitle("");
                setContent("");
                setApiData({
                    id: response?.data?.component?._id,
                    title: response?.data?.component?.title,
                    content: response?.data?.component?.content
                });
                message.success('Element updated successfully');
            }
        } catch (error) {
            console.error("Error editing element:", error);
            setError('Error editing element');
        } finally {
            setLoading(false);
        }
    };

    const handleCount = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${backendUrl}/api/v1/count`);
            if (response.data) {
                setCount(response?.data?.count);
                setIsCountModalVisible(true);
            }
        } catch (error) {
            console.error("Error counting elements:", error);
            setError('Error counting elements');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='details'>
            <div >
                {
                    apiData?.id ? <div>
                        <h3 style={{ textAlign: "center" }}>{apiData.title}</h3>
                        <p style={{ textAlign: "center" }}>{apiData.content}</p>
                    </div> :
                        <div>    Hello Guys
                        </div>
                }

            </div>

            <div
                className='buttons'
            >
                <Button onClick={() => setIsCreateModalVisible(true)}>Create</Button>
                <Button disabled={apiData?.id ? false : true} onClick={() => setIsUpdateModalVisible(true)}>Update</Button>
                <Button onClick={handleCount}>Count</Button>
            </div>

            <Modal
                title="Create Element"
                visible={isCreateModalVisible}
                onOk={addElement}
                onCancel={() => setIsCreateModalVisible(false)}
            >
                <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
                <TextArea style={{ marginTop: "20px" }} value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" />
            </Modal>

            <Modal
                title="Update Element"
                visible={isUpdateModalVisible}
                onOk={editElement}
                onCancel={() => setIsUpdateModalVisible(false)}
            >
                <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
                <TextArea style={{ marginTop: "20px" }} value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" />
            </Modal>

            <Modal
                visible={isCountModalVisible}
                onCancel={() => setIsCountModalVisible(false)}
                footer={null}
            >
                <h1> Count </h1>
                <div style={{ marginTop: "10px", display: 'flex', justifyContent: "center", alignItems: 'center' }} >
                    <h5 style={{ marginRight: "10px" }} >Add Count :  </h5> {count?.addCount}
                </div>
                <div style={{ marginTop: "10px", display: 'flex', justifyContent: "center", alignItems: 'center' }}  >
                    <h5 style={{ marginRight: "10px" }} >Update Count  : </h5> {count?.updateCount}
                </div>
            </Modal>

            {loading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
        </div>
    );
};

export default Details;
