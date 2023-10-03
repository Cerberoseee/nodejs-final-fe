import Image from "next/image";
import NaviBar from "@/components/NaviBar/NaviBar";
import { Input, Upload, Button, notification, Form } from "antd";
import { LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import { useState } from "react";

const getBase64 = (img , callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

const PersonalInfo = () => {
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      notification.warning({
        message: 'You can only upload JPG or PNG file!',
        placement: 'topRight',
      });
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      notification.warning({
        message: 'Your file must be smaller than 2MB!',
        placement: 'topRight',
      });
    }
    return isJpgOrPng && isLt2M;
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const [form] = Form.useForm();
  const onFinish = (value) => {
    console.log(value);
  }

  return (
    <main className={`flex min-h-screen bg-[#FAF2E3]`}>
      <NaviBar avatar={"/avatar-placeholder.jpg"} name={"Nguyễn Văn A"} />
      <div className="p-[32px] w-full">
        <h1 className="font-bold text-2xl mb-[24px]">Account Information</h1>

        <div className="bg-white rounded-[4px] p-[16px] w-full">
          <Form 
            form={form}
            layout="vertical"
            onFinish={onFinish}
            requiredMark={false}
          >        
            <Form.Item 
              name="avatar"
              getValueFromEvent={({file}) => file.originFileObj}
              className={"mb-[24px]"}
              label={
                <p className="mb-[12px] font-semibold">Profile Picture</p>
              }
            >
              <Upload
                listType="picture-circle"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {
                  imageUrl ?
                  <Image 
                    style={{
                      width: "100%", 
                      height:"100%",
                      aspectRatio: 1, 
                      objectFit: "cover", 
                      borderRadius: "50%"
                    }} 
                    width={120} 
                    height={120} 
                    src={imageUrl} 
                    alt="avatar"
                  />
                  : uploadButton
                }
              </Upload>
            </Form.Item>
              
            <Form.Item 
              name="fullName"
              className={"mb-[24px]"}
              label={
                 <p className="mb-[12px] font-semibold">Fullname *</p>
              } 
              rules={[
                { required: true, message: 'Please enter your fullname!' }
              ]}
            >
              <Input
                placeholder="Enter fullname"
                size="large"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </Form.Item>

            <div className="mb-[24px]">
              <p className="mb-[12px] font-semibold">Email *</p>
              <Input
                disabled
                size="large"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </Form>
        </div>
            
        <Button
          onClick={() => form.submit()}
          type="primary" 
          color="#5FBFEF"
          style={{borderColor: '#5FBFEF'}} 
          size="large" 
          className="mt-[24px] ml-auto block w-fit font-semibold text-[#5FBFEF]"
        >
          Save changes
        </Button>
      </div>
    </main>
  );
}

export default PersonalInfo;