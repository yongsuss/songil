import React, { createContext, useState } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [id, setId] = useState(''); // 사용자 ID
  const [name, setName] = useState('');//사용자 이름
  const [admin, setAdmin] = useState(false); // 관리자 여부, 불리언으로 초기화
  const [nickname, setNickname] = useState(''); // 닉네임
  const [age, setAge] = useState(''); // 나이
  const [gender, setGender] = useState(''); // 성별
  const [message, setMessage] = useState(''); // 메시지
  const [certification, setCertification] = useState(false); // 취약계층 인증, 불리언으로 초기화
  const [notice, setNotice] = useState(false); // 공지 수신 여부, 불리언으로 초기화
  const [phone, setPhone] = useState(''); // 전화번호
  const [point, setPoint] = useState(0); // 포인트, 숫자로 초기화
  const [rank, setRank] = useState(0); // 등급, 숫자로 초기화
  const [address, setAddress] = useState(''); //주소
  const [profileimage, setProfileimage] = useState('');
  const [resident, setResident] = useState(''); //

  const apiUrl = "http://20.39.190.194"; // API의 기본 URL
  const profileToken = "sp=racwdl&st=2024-05-29T06:45:59Z&se=2024-07-01T14:45:59Z&sv=2022-11-02&sr=c&sig=y8UG%2BXMIhySPhH615bHhGQykSnIK4%2BC0VKS%2B2RwSA%2BI%3D";
  const reviewToken = "sp=r&st=2024-05-29T06:46:47Z&se=2024-07-01T14:46:47Z&sv=2022-11-02&sr=c&sig=dbhijyXwC%2Fn72ZeX9sm2%2B9ks2Xnpb7Lo%2FbqvDwcUkfI%3D";
  const boardToken = "sp=racwdl&st=2024-05-29T06:43:26Z&se=2024-07-01T14:43:26Z&sv=2022-11-02&sr=c&sig=aLJ0%2BeIYaXeYNURwV0%2FaKSfUlRyCcRoTRaH20HFXj%2Bo%3D";
  const documentToken = "sp=racwdl&st=2024-05-29T06:44:54Z&se=2024-07-01T14:44:54Z&sv=2022-11-02&sr=c&sig=ImfE%2BtbeioOJiDquqKvYeon1CobFlfqkrWUz6pXSfw4%3D";
  const fundraisingToken = "sp=racwdl&st=2024-05-29T06:45:29Z&se=2024-07-01T14:45:29Z&sv=2022-11-02&sr=c&sig=76EjXar4G7gpKncA2TqwiN53dyWymN1tKiGU6V9B%2FFs%3D";
  const azureUrl = "https://songilstorage.blob.core.windows.net";

  const contextValue = {
    profileimage,
    setProfileimage,
    profileToken,
    reviewToken,
    boardToken,
    documentToken,
    fundraisingToken,
    azureUrl,
    id,
    setId,
    name,
    setName,
    apiUrl,
    admin,
    setAdmin,
    nickname,
    setNickname,
    age,
    setAge,
    gender,
    setGender,
    message,
    setMessage,
    certification,
    setCertification,
    notice,
    setNotice,
    phone,
    setPhone,
    point,
    setPoint,
    rank, 
    setRank,
    address,
    setAddress,
    resident,
    setResident

  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
