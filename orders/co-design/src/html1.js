import React, { useState } from "react";
import "./html1.css";
import { useLocation } from "react-router-dom";
import axios from "axios";

const menuItems = [
  ////////메뉴 항목과 금액////////
  { name: "중식", price: 4500 },
  { name: "석식", price: 4500 },
  { name: "돈가스", price: 6000 },
  { name: "냉면", price: 6000 },
];

const MenuItem = ({ name, price, quantity, setQuantity, imageUrl }) => {
  const increment = () => {
    setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div>
      <img
        src={imageUrl}
        alt={`${name} 이미지`}
        style={{ width: "200px", height: "200px" }}
      />
      <div>
        <div className="namePriceContainerStyle">
          <h3
            style={{ marginTop: "0", marginBottom: "8px", marginRight: "5px" }}
          >
            {name}
          </h3>
          <span>{price}원</span>
        </div>
        <div className="quantityContainerStyle">
          <button onClick={increment} className="buttonStyle">
            +
          </button>
          <span style={{ margin: "0 5px" }}>{quantity}</span>
          <button onClick={decrement} className="buttonStyle">
            -
          </button>
        </div>
      </div>
    </div>
  );
};
const SelectedMenuItem = ({ menuItem, index, quantities, setQuantities }) => {
  //quantities 변수 각 매뉴 항목의 수량을 나타냄.
  //quantities[0]은 중식, quantities[1]은 석식
  const buttonStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    width: "1.5rem",
    height: "1.5rem",
    fontSize: "0.7rem",
    marginLeft: "5px",
    padding: "0",
    backgroundColor: "green",
  };
  const quantityButtonStyle = {
    ...buttonStyle,
    marginLeft: "10px", // 적당한 마진을 추가
  };

  const quantityDisplayStyle = {
    marginLeft: "10px", // 수량과 가격 사이에 적당한 공간을 만듭니다.
  };

  const listItemStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    borderBottom: "1px solid #ccc", // 항목들 사이에 선을 추가
    padding: "10px 0", // 선과 텍스트 사이에 간격을 추가
  };

  const priceQuantityContainer = {
    display: "flex",
    alignItems: "center",
  };

  const increment = () => {
    setQuantities((prevQuantities) => {
      const updatedQuantities = [...prevQuantities];
      updatedQuantities[index] += 1;
      return updatedQuantities;
    });
  };

  const decrement = () => {
    setQuantities((prevQuantities) => {
      const updatedQuantities = [...prevQuantities];
      if (updatedQuantities[index] > 0) {
        updatedQuantities[index] -= 1;
      }
      return updatedQuantities;
    });
  };

  const priceStyle = {
    width: "60px", // 너비를 고정합니다.
    textAlign: "right", // 텍스트를 오른쪽으로 정렬합니다.
  };

  if (quantities[index] === 0) return null;

  return (
    <li style={listItemStyle}>
      <span>{menuItem.name}</span>
      <div style={priceQuantityContainer}>
        <button onClick={increment} style={quantityButtonStyle}>
          +
        </button>
        <span style={quantityDisplayStyle}>{quantities[index]}</span>
        <button onClick={decrement} style={quantityButtonStyle}>
          -
        </button>
        <span> {quantities[index] * menuItem.price}원</span>
      </div>
    </li>
  );
};

const SelectedMenuItems = ({ menuItems, quantities, setQuantities }) => (
  <ul>
    {menuItems.map((menuItem, index) => (
      <SelectedMenuItem
        key={index}
        menuItem={menuItem}
        index={index}
        quantities={quantities}
        setQuantities={setQuantities}
      />
    ))}
  </ul>
);

const Html1 = () => {
  const location = useLocation();
  const phoneNumber = location.state.phoneNumber;
  const [quantities, setQuantities] = useState([0, 0, 0, 0]);

  const setQuantity = (index) => (quantity) => {
    const newQuantities = [...quantities];
    newQuantities[index] = Number(quantity); // 문자열을 숫자로 변환
    setQuantities(newQuantities);
  };

  const calculateTotal = () => {
    ////총 금액 변수
    let total = 0;
    for (let i = 0; i < menuItems.length; i++) {
      total += menuItems[i].price * quantities[i];
    }
    return total;
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: "20px",
    height: "100vh",
  };

  // 총 아이템의 수를 계산하는 함수 생성
  const calculateTotalItems = () => {
    let totalItems = 0;
    for (let quantity of quantities) {
      totalItems += quantity;
    }
    return totalItems;
  };

  const menuContainerStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    width: "50%",
  };

  const menuItemStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flex: "0 0 50%",
  };

  const welcomeStyle = {
    fontSize: "2rem",
    color: "blue",
  };

  const cartStyle = {
    backgroundColor: "#F5F5F5",
    borderRadius: "3px",
    padding: "15px",
    marginTop: "25px",
    width: "80%",
    backgroundColor: "gray",
  };

  const menuImages = [
    "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxNzAxMThfMjY2%2FMDAxNDg0NzA3MjA5NzQ4.nPbfGphjPmpXsgi4jGIdhwjhjsXdlnEhD7XhLl4RM9Ag.4owmj1d4mAY9btXRRgsu-e8K7lHlXX4mbPICp6bkB6gg.JPEG.momc2684%2F9fa8b43a-218e-496f-be56-17964463222d.jpg&type=sc960_832",
    "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxNzAxMThfMjY2%2FMDAxNDg0NzA3MjA5NzQ4.nPbfGphjPmpXsgi4jGIdhwjhjsXdlnEhD7XhLl4RM9Ag.4owmj1d4mAY9btXRRgsu-e8K7lHlXX4mbPICp6bkB6gg.JPEG.momc2684%2F9fa8b43a-218e-496f-be56-17964463222d.jpg&type=sc960_832",
    "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA2MTlfMjEw%2FMDAxNjg3MTIzMzc1MTEw.1_QFytLWH4e-ljPylau-GdaO50IPjgzfy14YJrg7__wg.VOKXQYvgGgIYp1c--Is7JJgletyUVF3cmH9fl4C6dh8g.JPEG.abusymissj58%2F0.jpg&type=sc960_832",
    "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMDExMjBfNzEg%2FMDAxNjA1ODU3MjA2MjU2.YcB177rlGOZhOjvQ48csemDT6oEybSkcJ1RzhA7m0Cog.zCKspjce8OCm0wYDDMB4GspwNNK0PIOEs2-J1iK3DjQg.JPEG.zzzium%2FIMG_2002.jpg&type=sc960_832",
  ];

  //API --> 주문정보를 보낼 수 있도록 수정

  const handleCheckout = async () => {
    const orderSummary = menuItems
      .map((menuItem, index) => {
        if (quantities[index] > 0) {
          return `${menuItem.name} x${quantities[index]}: ${
            menuItem.price * quantities[index]
          }원`;
        }
        return null;
      })
      .filter((item) => item !== null)
      .join("\n");

    const totalPrice = calculateTotal();

    const confirmation = window.confirm(
      `주문 정보:\n${orderSummary}총 가격: ${totalPrice}원\n결제하시겠습니까?`
    );

    if (confirmation) {
      const orderResponse = await sendOrder(phoneNumber, menuItems, totalPrice);
      console.log("주문이 성공적으로 전송되었습니다:", orderResponse);
    } else {
      console.log("결제 거부");
    }
  };

  //API

  const handleCancel = () => {
    // 이 함수에서 취소 처리를 수행하시면 됩니다.
    // 예를 들어, 장바구니를 비우는 코드를 여기에 넣을 수 있습니다.
    setQuantities([0, 0, 0, 0]);
    console.log("취소 처리");
  };

  // 주문 정보를 저장하는 새로운 함수 "POST 썻습니다"
  const sendOrder = async (phoneNumber, orderItems, totalPrice) => {
    try {
      const response = await axios.post("/api/orders/", {
        phone_number: phoneNumber,
        items: orderItems,
        total_price: totalPrice,
      });
      return response.data;
    } catch (error) {
      console.error("Error sending order:", error);
    }
  };
  //주문 정보를 저장하는 새로운 함수

  return (
    <div style={containerStyle}>
      <h1 id="welcome-message" style={welcomeStyle}>
        {phoneNumber}님 환영합니다!
      </h1>
      <div style={menuContainerStyle}>
        {menuItems.map((menuItem, index) => (
          <div style={menuItemStyle} key={index}>
            <MenuItem
              {...menuItem}
              imageUrl={menuImages[index]}
              quantity={quantities[index]}
              setQuantity={setQuantity(index)}
            />
          </div>
        ))}
      </div>

      {/* 총 아이템의 수를 계산합니다. */}
      {calculateTotalItems() > 0 && (
        <div style={cartStyle}>
          <h2>장바구니</h2>
          <SelectedMenuItems
            menuItems={menuItems} ////결제할 총 항목 변수
            quantities={quantities} ///결제할 총 개수 변수
            setQuantities={setQuantities}
          />
          <div style={{ marginTop: "10px" }}>
            <span>총 가격: </span>
            <span>{calculateTotal()}원</span>{" "}
            {/* 총 결제 금액 calculateTotal 변수 위에거까지 세개 쓰시면 됩니다 */}
          </div>
          <button
            onClick={handleCheckout}
            style={{ marginTop: "10px", marginRight: "5px" }}
          >
            결제하기
          </button>
          <button
            onClick={handleCancel}
            style={{ marginTop: "10px", marginLeftt: "5px" }}
          >
            취소하기
          </button>
        </div>
      )}
    </div>
  );
};

export default Html1;