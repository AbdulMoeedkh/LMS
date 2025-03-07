import React, { memo, useContext, useEffect, useState } from 'react';
import { Modal, Form, Input, Button, Upload, message } from 'antd';
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import api from '../../api/api';
import uploadFileToFirebase from '../../utils/uploadFileToFirebase';
import useFetchProfile from '../../utils/useFetchProfile';
import LoaderContext from '../../Context/LoaderContext';
import { toast } from 'react-toastify';
import { useParams } from 'react-router';

const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
        return Upload.LIST_IGNORE; // Prevent the upload
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must be smaller than 2MB!');
        return Upload.LIST_IGNORE; // Prevent the upload
    }
    return false; // Prevent automatic upload
};

const UpdateClassModal = ({ isModalVisible, closeModal, getClassDetail, detail }) => {
    const { user } = useFetchProfile();
    const [form] = Form.useForm();
    const { loader, setLoader } = useContext(LoaderContext);
    const { classId } = useParams();

    const [fileList, setFileList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (detail) {
            form.setFieldsValue({
                name: detail.name,
                description: detail.description,
                classImage: detail.classImage,
            });

            if (detail.classImage) {
                setFileList([{ url: detail.classImage }]);
            }
        }
    }, [detail]);

    const handleChange = (info) => {
        let newFileList = [...info.fileList].slice(-1);
        setFileList(newFileList);

        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.originFileObj) {
            const imageUrl = URL.createObjectURL(info.file.originFileObj);
            setLoading(false);
        }
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    const handleCancel = () => {
        closeModal();
        form.resetFields();
        setFileList([]);
    };

    const handleOk = () => {
        form
            .validateFields()
            .then(async (values) => {
                setLoader(true);
                const file = fileList[0]?.originFileObj;
                if (file) {
                    try {
                        const fileURL = await uploadFileToFirebase(file, `classes/${user._id}/${file.name}`);
                        values.classImage = fileURL;
                    } catch (error) {
                        setLoader(false);
                        toast.error('Failed to upload image.');
                        return;
                    }
                }
                console.log("values ==>", values);

                await api.put(`/api/classes/${classId}`, values);

                closeModal();
                getClassDetail();
                setLoader(false);
                toast.success('Class updated successfully!');
                form.resetFields();
                setFileList([]);
            })
            .catch(info => {
                setLoader(false);
                toast.error(info?.message);
            });
    };

    return (
        <Modal
            title="Update Class"
            open={isModalVisible}
            onCancel={handleCancel}
            onOk={handleOk}
            footer={[
                <div className='flex gap-3 justify-center xsm:justify-end flex-wrap' key={0}>
                    <Button key="back" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button key="submit" type="primary" onClick={handleOk}>
                        Update
                    </Button>
                </div>
            ]}
        >
            <Form form={form} layout="vertical" name="update-class-form">
                <Form.Item
                    label="Class Name:"
                    name="name"
                    rules={[{ required: true, message: 'Please enter class name!' }]}
                >
                    <Input className="w-full p-2 text-sm text-gray-700" />
                </Form.Item>
                <Form.Item
                    label="Class Description:"
                    name="description"
                    rules={[{ required: true, message: 'Please enter class description!' }]}
                >
                    <Input className="w-full p-2 text-sm text-gray-700" />
                </Form.Item>
                <Form.Item label="Class Image" name="classImage">
                    <Upload
                        action="" // Prevent automatic upload
                        listType="picture-circle"
                        className="avatar-uploader"
                        fileList={fileList}
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                    >
                        {fileList.length > 0 ? null : uploadButton}
                    </Upload>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default memo(UpdateClassModal);
