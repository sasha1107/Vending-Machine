"use strict";
var _a;
// **** 변수선언 ****
let drinks = [
    {
        "name": "Original_Cola",
        "img": "./src/img/Original_Cola.png",
        "price": 1000,
        "count": 0,
        "stock": 3
    },
    {
        "name": "Violet_Cola",
        "img": "./src/img/Violet_Cola.png",
        "price": 1000,
        "count": 0,
        "stock": 3
    },
    {
        "name": "Yellow_Cola",
        "img": "./src/img/Yellow_Cola.png",
        "price": 1000,
        "count": 0,
        "stock": 3
    },
    {
        "name": "Cool_Cola",
        "img": "./src/img/Cool_Cola.png",
        "price": 1000,
        "count": 0,
        "stock": 3
    },
    {
        "name": "Green_Cola",
        "img": "./src/img/Green_Cola.png",
        "price": 1000,
        "count": 0,
        "stock": 3
    },
    {
        "name": "Orange_Cola",
        "img": "./src/img/Orange_Cola.png",
        "price": 1000,
        "count": 0,
        "stock": 3
    }
];
let walletCoin = 25000; //소지금
let inputCoin = 10000; // 입금액
let totalPrice = 0; //총 금액 (총금엑 += 음료가격 * 음료 개수)
let itemNum = drinks.length; // 음료의 개수
let balance = 0; //잔액
// **** drinks 객체 디스플레이 ****
let domFrag = document.createDocumentFragment();
for (let i = 0; i < itemNum; i++) {
    let item_Li = document.createElement("li");
    let item_Img = document.createElement("img");
    let p_itemName = document.createElement("p");
    let span_priceTag = document.createElement("span");
    item_Li.setAttribute("class", "item-li");
    item_Img.setAttribute("class", "items-img");
    item_Img.setAttribute("src", drinks[i].img);
    item_Img.setAttribute("alt", drinks[i].name);
    p_itemName.setAttribute("class", "items-name");
    span_priceTag.setAttribute("class", "items-pricetag");
    p_itemName.textContent = drinks[i].name;
    span_priceTag.textContent = drinks[i].price + "원";
    item_Li.appendChild(item_Img);
    item_Li.appendChild(p_itemName);
    item_Li.appendChild(span_priceTag);
    domFrag.appendChild(item_Li);
}
(_a = document.querySelector(".machine-items-list")) === null || _a === void 0 ? void 0 : _a.appendChild(domFrag);
// **** DOM API ****
const machineItems = document.querySelector(".machine-items");
const machineFunc = document.querySelector(".machine-func");
const pocket = document.querySelector(".pocket");
const itemList = [...document.querySelectorAll(".item-li")];
const inputBtn = machineFunc === null || machineFunc === void 0 ? void 0 : machineFunc.querySelector(".btn-payment"); // 입금버튼
const changeBtn = machineFunc === null || machineFunc === void 0 ? void 0 : machineFunc.querySelector(".btn-change"); // 거스름돈 반환 버튼
const getBtn = machineFunc === null || machineFunc === void 0 ? void 0 : machineFunc.querySelector(".btn-get"); // 획득 버튼
// **** 이벤트 추가 ****
itemList.forEach((item, index) => {
    item.addEventListener("click", () => {
        selectItem(index);
    });
});
inputBtn === null || inputBtn === void 0 ? void 0 : inputBtn.addEventListener("click", deposit);
changeBtn === null || changeBtn === void 0 ? void 0 : changeBtn.addEventListener("click", changeBalance);
getBtn === null || getBtn === void 0 ? void 0 : getBtn.addEventListener("click", getDrink);
// **** 함수선언문 ****
// 금액 업데이트 함수 update()
function update() {
    // 잔액을 찍어주는 코드
    const $balanceResult = machineFunc === null || machineFunc === void 0 ? void 0 : machineFunc.querySelector(".balance_result");
    if ($balanceResult instanceof HTMLSpanElement) {
        $balanceResult.textContent = balance.toLocaleString() + "원";
    }
    // 소지금을 찍어주는 코드
    const $walletCoin = pocket === null || pocket === void 0 ? void 0 : pocket.querySelector(".wallet_coin");
    if ($walletCoin instanceof HTMLSpanElement) {
        $walletCoin.textContent = walletCoin.toString().toLocaleString() + "원";
    }
    // 총금액을 찍어주는 코드
    const $totalPrice = pocket === null || pocket === void 0 ? void 0 : pocket.querySelector(".total-price");
    if ($totalPrice instanceof HTMLSpanElement) {
        $totalPrice.textContent = "총금액 : " + totalPrice.toLocaleString() + "원";
    }
}
update();
// 입금 기능 함수 deposit()
function deposit() {
    const inputElem = machineFunc === null || machineFunc === void 0 ? void 0 : machineFunc.querySelector(".input-payment");
    if (inputElem instanceof HTMLInputElement) {
        inputCoin = parseInt(inputElem === null || inputElem === void 0 ? void 0 : inputElem.value);
    }
    if (!(inputCoin)) {
        alert("금액을 입력해주세요!");
        return;
    }
    if (inputCoin > walletCoin) {
        alert("소지금보다 많은 금액을 입금할 수 없습니다!");
        return;
    }
    balance += inputCoin;
    // 입금 시 소지금에서 차감
    walletCoin -= inputCoin;
    // 인풋창 초기화
    if (inputElem instanceof HTMLInputElement) {
        inputElem.value = "";
    }
    update();
}
// 거스름돈 반환기능 함수 changeBalance()
function changeBalance() {
    walletCoin += balance;
    balance = 0;
    update();
}
// 선택 음료 카운트하는 함수 selectItem(id)
function selectItem(id) {
    //재고가 없을 땐 선택할 수 없도록 예외처리
    if (drinks[id].stock < 1) {
        alert("재고가 없습니다!");
        return;
    }
    if (balance < drinks[id].price) {
        alert("잔액이 부족하여 상품을 담을 수 없습니다!");
        return;
    }
    drinks[id].count += 1;
    if (drinks[id].count > 1) {
        // 이미 선택되어 있다면 새로 생성하지 않고 카운트만 증가
        const countElem = document.getElementById(drinks[id].name);
        if (countElem instanceof HTMLSpanElement) {
            countElem.innerHTML = drinks[id].count.toString();
        }
        drinks[id].stock -= 1;
    }
    else {
        addtoSelectedList(id);
        drinks[id].stock -= 1;
    }
    // 재고(stock)가 0이 되면 품절 마크를 표시
    let item_list = machineItems === null || machineItems === void 0 ? void 0 : machineItems.getElementsByClassName("item-li");
    for (let i = 0; i < itemNum; i++) {
        if (drinks[i].stock == 0 && item_list !== undefined) {
            item_list[i].classList.add("soldout");
        }
    }
    balance -= drinks[id].price;
    update();
}
// 카운트한 음료수를 출력하는 함수 addtoSelectedList(id)
function addtoSelectedList(id) {
    let selectarea = document.getElementById("selectarea");
    //      <li class="get-drinks">
    //          <p class="get-drinks-item">
    //              <img
    //                  src="./mediaquery/Original_Cola.png"
    //                  alt="Original Cola"
    //              />
    //              <span class="get-drinks-item-name">Original_Cola</span>
    //          </p>
    //          <span class="count">1</span>
    //      </li>
    const liTag = document.createElement("li");
    const pTag = document.createElement("p");
    const imgTag = document.createElement("img");
    const span1Tag = document.createElement("span");
    const span2Tag = document.createElement("span");
    liTag.setAttribute("class", "get-drinks");
    pTag.setAttribute("class", "get-drinks-item");
    imgTag.setAttribute("src", drinks[id].img);
    imgTag.setAttribute("alt", drinks[id].name);
    span1Tag.setAttribute("class", "get-drinks-item-name");
    span2Tag.setAttribute("class", "count");
    span2Tag.setAttribute("id", drinks[id].name);
    span1Tag.innerHTML = drinks[id].name;
    span2Tag.innerHTML = drinks[id].count.toString();
    liTag.appendChild(pTag);
    pTag.appendChild(imgTag);
    pTag.appendChild(span1Tag);
    liTag.appendChild(span2Tag);
    liTag.addEventListener("click", () => {
        cancel(liTag);
    });
    selectarea === null || selectarea === void 0 ? void 0 : selectarea.appendChild(liTag);
}
// 획득 기능 함수 getDrink()
function getDrink() {
    let selectOl = machineFunc === null || machineFunc === void 0 ? void 0 : machineFunc.querySelector(".selected-list");
    let getOl = pocket === null || pocket === void 0 ? void 0 : pocket.querySelector(".selected-list");
    let getDrinkList = [];
    let getListCnt = pocket === null || pocket === void 0 ? void 0 : pocket.querySelectorAll(".count");
    if (getListCnt !== undefined) {
        [...getListCnt].forEach((i) => {
            if (i instanceof HTMLSpanElement) {
                getDrinkList.push(i.id);
            }
        });
    }
    console.log(getDrinkList);
    let selectList = machineFunc === null || machineFunc === void 0 ? void 0 : machineFunc.querySelectorAll(".get-drinks");
    if (selectList !== undefined) {
        [...selectList].forEach(i => {
            let countTag = i.querySelector(".count");
            if (countTag !== null && getDrinkList.includes(countTag.id)) {
                const tempElem = pocket === null || pocket === void 0 ? void 0 : pocket.querySelector(`#${countTag === null || countTag === void 0 ? void 0 : countTag.id}`);
                if (tempElem instanceof HTMLSpanElement) {
                    tempElem.innerHTML = (~~(tempElem.innerHTML) + 1).toString();
                }
            }
            else {
                getOl === null || getOl === void 0 ? void 0 : getOl.appendChild(i);
            }
        });
    }
    if (selectOl instanceof HTMLOListElement) {
        selectOl.innerHTML = "";
    }
    totalPrice += calTotalPrice();
    // balance -= calTotalPrice();
    update();
    for (let i = 0; i < itemNum; i++) {
        drinks[i].count = 0;
    }
}
// totalPrice 계산함수 calTotalPrice()
function calTotalPrice() {
    let temp = 0;
    for (let i = 0; i < itemNum; i++) {
        temp += +(drinks[i].price) * +(drinks[i].count);
    }
    return temp;
}
// 음료 선택 취소 기능 함수 cancel(tag)
function cancel(tag) {
    var _a;
    const countTag = tag.querySelector(".count");
    let index = drinks.indexOf(drinks.filter(i => i.name == (countTag === null || countTag === void 0 ? void 0 : countTag.id))[0]);
    if (drinks[index].count > 1) {
        drinks[index].count -= 1;
        drinks[index].stock += 1;
        // -1된 개수를 다시 찍어주는거
        if (countTag instanceof HTMLSpanElement) {
            countTag.textContent = drinks[index].count.toString();
        }
    }
    else if (drinks[index].count == 1) {
        drinks[index].count -= 1;
        drinks[index].stock += 1;
        // 아예 li 삭제
        (_a = tag === null || tag === void 0 ? void 0 : tag.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(tag);
    }
    let item_list = machineItems === null || machineItems === void 0 ? void 0 : machineItems.getElementsByClassName("item-li");
    if (item_list !== undefined) {
        for (let i = 0; i < itemNum; i++) {
            if (drinks[i].stock == 0) {
                item_list[i].classList.add("soldout");
            }
            else if (drinks[i].stock > 0) {
                item_list[i].classList.remove("soldout");
            }
        }
    }
    balance += drinks[index].price;
    update();
    alert("상품 선택 취소!");
}
