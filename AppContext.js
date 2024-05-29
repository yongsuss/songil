import React, { createContext, useState } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [id, setId] = useState(''); // 사용자 ID
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
  

  const apiUrl = "http://20.39.190.194"; // API의 기본 URL

  const contextValue = {
    id,
    setId,
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
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
