import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Main = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleInputChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleSubmit = () => {
    navigate('/html1', {
      state: { phoneNumber },
    });
  };

  const handleClickDirections = () => {
    window.open('https://map.naver.com/v5/entry/place/20133235?c=15,0,0,2,dh', '_blank');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', position: 'relative' }}>
      <img
        src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMDEyMTlfNTYg%2FMDAxNjA4MzU4NDk5OTA0.cjZsGORQIlu08gULCnYDXNxsvGZ_CXvN4mYz1UMr_Gsg.EPV5a9nLjsoJx0qpOeL-MSeFRHyfzVYPRt_i7KAjab0g.PNG.guistave%2F%25B0%25E6%25B1%25E2%25B4%25EB%25C7%25D0%25B1%25B3_png_202012191516568474.png&type=a340"
        alt="Image"
        style={{width: '125px', position: 'absolute', top: 0, left: 0}}
      />
      <div style={{
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        position: 'absolute', 
        top: 'calc(50% - 220px)'
      }}>
        <h1 style={{textAlign: 'center', fontSize: '2rem'}}>WPS 환영합니다!</h1>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <input
            type="tel"
            placeholder="전화번호를 입력하세요"
            style={{width: '250px', textAlign: 'center', fontSize: '1rem', boxSizing: 'border-box'}}
            value={phoneNumber}
            onChange={handleInputChange}
          />
          <button style={{textAlign: 'center', fontSize: '1rem'}} onClick={handleSubmit}>확인</button>
        </div>
      </div>
      <div style={{position: 'absolute', bottom: 0, left: 0}}>
        <p style={{fontSize: '0.8rem'}}>주소:경기도 수원시 영통구 광교산로 경기드림타워1층</p>
        <p style={{fontSize: '0.8rem'}}>전화번호: 031-xxx-xxxx</p>
      </div>
      <img
        src="https://search.pstatic.net/common/?src=http%3A%2F%2Fcafefiles.naver.net%2FMjAyMDA4MDVfOTcg%2FMDAxNTk2NTY2ODE2ODU5.jeNE0URzUz2ZzYyooEXQQylWHhahbmkeZb6GeGelLA0g.8ib7YsaD-MXS2HPuzk3mW0BBiqfDueYCgiGpLT7ufKMg.JPEG%2FexternalFile.jpg&type=a340"
        alt="directions"
        style={{width: '75px', position: 'absolute', bottom: '10px', right: '10px', cursor: 'pointer'}}
        onClick={handleClickDirections}
      />
    </div>
  );
};

export default Main;