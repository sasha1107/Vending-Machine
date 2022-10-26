let drinks = [
    {
        "name": "Original_Cola",
        "img": "./mediaquery/Original_Cola.png",
        "price": 1000,
        "count": 0,
        "stock": 3
    },
    {
        "name": "Violet_Cola",
        "img": "./mediaquery/Violet_Cola.png",
        "price": 1000,
        "count": 0,
        "stock": 3
    },
    {
        "name": "Yellow_Cola",
        "img": "./mediaquery/Yellow_Cola.png",
        "price": 1000,
        "count": 0,
        "stock": 3
    },
    {
        "name": "Cool_Cola",
        "img": "./mediaquery/Cool_Cola.png",
        "price": 1000,
        "count": 0,
        "stock": 3
    },
    {
        "name": "Green_Cola",
        "img": "./mediaquery/Green_Cola.png",
        "price": 1000,
        "count": 0,
        "stock": 3
    },
    {
        "name": "Orange_Cola",
        "img": "./mediaquery/Orange_Cola.png",
        "price": 1000,
        "count": 0,
        "stock": 3
    }
];

let walletCoin = 25000; //소지금
let inputCoin = 10000; // 입금액
let totalPrice = 0; //총 금액 (총금엑 += 음료가격 * 음료 개수)
let itemNum = drinks.length; // 음료의 개수

for (let i = 0; i < itemNum; i++) {
    totalPrice += +(drinks[i].price) * +(drinks[i].count);
}
let balance = inputCoin - totalPrice; //잔액


// DOM API
const machineItems = document.querySelector(".machine-items");
const machineFunc = document.querySelector(".machine-func");
const pocket = document.querySelector(".pocket");

// drinks 객체에 있는 이미지경로, 금액, 상품 이름만 변경하면 화면에 반영될 수 있도록 처리
drink_list = [...machineItems.querySelectorAll(".items-img")];
pricetag_list = [...machineItems.querySelectorAll(".items-pricetag")];
drinks_name = [...machineItems.querySelectorAll(".items-name")];

for (let i = 0; i < itemNum; i++) {
    let src = drinks[i].img;
    let price = drinks[i].price;
    let name = drinks[i].name;
    drink_list[i].src = src;
    drink_list[i].alt = name;
    drinks_name[i].textContent = name;
    pricetag_list[i].textContent = price + "원";
}

update();

// 입금버튼
const inputBtn = machineFunc.querySelector(".btn-payment"); 
inputBtn.addEventListener("click", deposit);

// 거스름돈 반환 버튼
const changeBtn = machineFunc.querySelector(".btn-change");
changeBtn.addEventListener("click", changeBalance);

// 획득 버튼
const getBtn = machineFunc.querySelector(".btn-get");
getBtn.addEventListener("click", getDrink);

// 금액 업데이트 함수
function update(){
    // 잔액을 찍어주는 코드
    document.getElementById("balance_result").textContent =
        balance.toLocaleString() + "원";

    //소지금을 찍어주는 코드
    document.getElementById("wallet_coin").textContent =
        walletCoin.toLocaleString() + "원";
}

// 인풋창에서 입금액 입력 시 더해주는 함수
function deposit() {
    inputCoin = parseInt(
        machineFunc.querySelector(".input-payment").value
    );
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

    machineFunc.querySelector(".input-payment").value = null;
    update();
}

// 거스름돈을 반환하는 함수
function changeBalance() {
    walletCoin += balance;
    balance = 0;
    update();
}

// 음료 클릭 시 선택 count를 늘리는 함수
function selectItem(id) { 
    //재고가 없을 땐 선택할 수 없도록 예외처리
    if (drinks[id].stock < 1) {
        alert("재고가 없습니다!")
        return;
    }
    drinks[id].count += 1;

    if (drinks[id].count > 1) {
        // 이미 선택되어 있다면 새로 생성하지 않고 카운트만 증가
        document.getElementById(drinks[id].name).innerHTML = drinks[id].count;
        drinks[id].stock -= 1;

        // 재고(stock)가 0이 되면 품절 마크를 표시
        item_list = document.getElementsByClassName("item-li");
        for (let i = 0; i < itemNum; i++) {
            if (drinks[i].stock == 0) {
                item_list[i].classList.add("soldout");
            }
        }
    }
    else {
        addtoSelectedList(id);
        drinks[id].stock -= 1;

        // 재고(stock)가 0이 되면 품절 마크를 표시
        item_list = document.getElementsByClassName("item-li");
        for (let i = 0; i < itemNum; i++) {
            if (drinks[i].stock == 0) {
                item_list[i].classList.add("soldout");
            }
        }
    }
    
}

// count한 음료 수 만큼 selected-list에 표시해주는 함수
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
    // 이거를 <ol class="selected-list"> 아래 노드로 추가
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
    selectarea.appendChild(liTag);
    liTag.appendChild(pTag);
    pTag.appendChild(imgTag);
    pTag.appendChild(span1Tag);
    liTag.appendChild(span2Tag);
    span1Tag.innerHTML = drinks[id].name;
    span2Tag.innerHTML = drinks[id].count;
}

function getDrink() {
    let currentPrice = null;
    for (let i = 0; i < itemNum; i++) {
        currentPrice +=
            +(drinks[i].price) *
            +(drinks[i].count);
    }

    // 잔액보다 금액이 많으면 획득할 수 없게 하고
    if (currentPrice > balance) {
        alert('잔액을 초과한 금액입니다!')
        return;
    }

    // 잔액에서 차감하고 잔액 다시 찍어주기
    balance -= currentPrice;
    update();
    
    for (let i = 0; i < itemNum; i++) {
        if (drinks[i].count > 0) {
            // 획득한 음료로 넘기기
            let getArea = document.getElementById("getarea");
            const liTag = document.createElement("li");
            const pTag = document.createElement("p");
            const imgTag = document.createElement("img");
            const span1Tag = document.createElement("span");
            const span2Tag = document.createElement("span");
            liTag.setAttribute("class", "get-drinks");
            pTag.setAttribute("class", "get-drinks-item");
            imgTag.setAttribute("src", drinks[i].img);
            imgTag.setAttribute("alt", drinks[i].name);
            span1Tag.setAttribute("class", "get-drinks-item-name");
            span2Tag.setAttribute("class", "count");
            
            getarea.appendChild(liTag);
            liTag.appendChild(pTag);
            pTag.appendChild(imgTag);
            pTag.appendChild(span1Tag);
            liTag.appendChild(span2Tag);
            span1Tag.innerHTML = drinks[i].name;
            span2Tag.innerHTML = drinks[i].count;
        }
    }

    // 선택한 리스트에서 제거
    let parent = document.getElementById("selectarea");
    parent.innerHTML = "";

    // count = 0으로 초기화
    for (let i = 0; i < itemNum; i++) {
            drinks[i].count = 0;
    }
    totalPrice += currentPrice;
    currentPrice = 0;
    // // count들을 합산하여 총금액으로 찍어주기
    document.getElementById("total_price").innerHTML =
        "총금액 : " + totalPrice.toLocaleString() + "원";

}