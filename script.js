let drinks = {
    // key(키) : {
    //     name(이름):
    //     img(이미지 경로):
    //     price(가격):
    //     count(선택한 음료 개수):
    //     stock(재고):
    // }
    original: {
        name: "Original_Cola",
        img: "./mediaquery/Original_Cola.png",
        price: 1000,
        count: 0,
        stock: 3,
    },
    violet: {
        name: "Violet_Cola",
        img: "./mediaquery/Violet_Cola.png",
        price: 1000,
        count: 0,
        stock: 3,
    },
    yellow: {
        name: "Yellow_Cola",
        img: "./mediaquery/Yellow_Cola.png",
        price: 1000,
        count: 0,
        stock: 3,
    },
    cool: {
        name: "Cool_Cola",
        img: "./mediaquery/Cool_Cola.png",
        price: 1000,
        count: 0,
        stock: 3,
    },
    green: {
        name: "Green_Cola",
        img: "./mediaquery/Green_Cola.png",
        price: 1000,
        count: 0,
        stock: 3,
    },
    orange: {
        name: "Orange_Cola",
        img: "./mediaquery/Orange_Cola.png",
        price: 1000,
        count: 0,
        stock: 3,
    },
};
let walletCoin = 25000; //소지금
let inputCoin = 10000; // 입금액
let totalPrice = 0; //총 금액 (총금엑 += 음료가격 * 음료 개수)

for (let i = 0; i < Object.keys(drinks).length; i++) {
    totalPrice +=
        parseInt(Object.values(drinks)[i].price) *
        parseInt(Object.values(drinks)[i].count);
}
let balance = inputCoin - totalPrice; //잔액

// 인풋창에서 입금액 입력 시 더해주는 함수
function deposit() {
    inputCoin = parseInt(
        document.getElementById("input-deposit").value
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

    // 잔액 증가
    document.getElementById("balance_result").innerHTML =
        balance.toLocaleString() + "원";
    // 소지금 차감
    document.getElementById("wallet_coin").innerHTML =
        walletCoin.toLocaleString() + "원";
}

// 거스름돈을 반환하는 함수
function changeBalance() {
    walletCoin += balance;
    balance = 0;

    // 잔액 차감
    document.getElementById("balance_result").innerHTML =
        balance.toLocaleString() + "원";

    // 소지금 증가
    document.getElementById("wallet_coin").innerHTML =
        walletCoin.toLocaleString() + "원";
}

// 음료 클릭 시 선택 count를 늘리는 함수
function selectItem(id) { 
    //재고가 없을 땐 선택할 수 없도록 예외처리
    if (Object.values(drinks)[id].stock < 1) {
        alert("재고가 없습니다!")
        return;
    }
    Object.values(drinks)[id].count += 1;

    if (Object.values(drinks)[id].count > 1) {
        // 이미 선택되어 있다면 새로 생성하지 않고 카운트만 증가
        document.getElementById(Object.values(drinks)[id].name).innerHTML = Object.values(drinks)[id].count;
        Object.values(drinks)[id].stock -= 1;

        // 재고(stock)가 0이 되면 품절 마크를 표시
        item_list = document.getElementsByClassName("item-li");
        for (let i = 0; i < Object.keys(drinks).length; i++) {
            if (Object.values(drinks)[i].stock == 0) {
                item_list[i].classList.add("soldout");
            }
        }
    }
    else {
        addtoSelectedList(id);
        Object.values(drinks)[id].stock -= 1;

        // 재고(stock)가 0이 되면 품절 마크를 표시
        item_list = document.getElementsByClassName("item-li");
        for (let i = 0; i < Object.keys(drinks).length; i++) {
            if (Object.values(drinks)[i].stock == 0) {
                item_list[i].classList.add("soldout");
            }
        }
    }
    
}

// count한 음료 수 만큼 selected-list에 표시해주는 함수
function addtoSelectedList(id) {
    let tagArea = document.getElementById("tagarea");
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
    imgTag.setAttribute("src", Object.values(drinks)[id].img);
    imgTag.setAttribute("alt", Object.values(drinks)[id].name);
    span1Tag.setAttribute("class", "get-drinks-item-name");
    span2Tag.setAttribute("class", "count");
    span2Tag.setAttribute("id", Object.values(drinks)[id].name);
    
    tagArea.appendChild(liTag);
    liTag.appendChild(pTag);
    pTag.appendChild(imgTag);
    pTag.appendChild(span1Tag);
    liTag.appendChild(span2Tag);
    span1Tag.innerHTML = Object.values(drinks)[id].name;
    span2Tag.innerHTML = Object.values(drinks)[id].count;
}

function getDrink() {
    let currentPrice = null;
    // let totalPrice = t; // 총 금액 (총금엑 += 음료가격 * 음료 개수)
    for (let i = 0; i < Object.keys(drinks).length; i++) {
        currentPrice +=
            parseInt(Object.values(drinks)[i].price) *
            parseInt(Object.values(drinks)[i].count);
    }

    // 잔액보다 금액이 많으면 획득할 수 없게 하고
    if (currentPrice > balance) {
        alert('잔액을 초과한 금액입니다!')
        return;
    }

    // 잔액에서 차감하고 잔액 다시 찍어주기
    balance -= currentPrice;
    document.getElementById("balance_result").innerHTML =
    balance.toLocaleString() + "원";

    
    for (let i = 0; i < Object.keys(drinks).length; i++) {
        if (Object.values(drinks)[i].count > 0) {
            // 획득한 음료로 넘기기
            let getArea = document.getElementById("getarea");
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
            imgTag.setAttribute("src", Object.values(drinks)[i].img);
            imgTag.setAttribute("alt", Object.values(drinks)[i].name);
            span1Tag.setAttribute("class", "get-drinks-item-name");
            span2Tag.setAttribute("class", "count");
            
            getarea.appendChild(liTag);
            liTag.appendChild(pTag);
            pTag.appendChild(imgTag);
            pTag.appendChild(span1Tag);
            liTag.appendChild(span2Tag);
            span1Tag.innerHTML = Object.values(drinks)[i].name;
            span2Tag.innerHTML = Object.values(drinks)[i].count;
        }
    }
    

    // 선택한 리스트에서 제거
    let parent = document.getElementById("tagarea");
    parent.innerHTML = "";

    // count = 0으로 초기화
    for (let i = 0; i < Object.keys(drinks).length; i++) {
            Object.values(drinks)[i].count = 0;
    }
    totalPrice += currentPrice;
    currentPrice = 0;
    // // count들을 합산하여 총금액으로 찍어주기
    document.getElementById("total_price").innerHTML =
        "총금액 : " + totalPrice.toLocaleString() + "원";

}
// drinks 객체에 있는 이미지경로, 금액, 상품 이름만 변경하면 화면에 반영될 수 있도록 처리
drink_list = document.getElementsByClassName("items-img");
pricetag_list = document.getElementsByClassName("items-pricetag");
drinks_name = document.getElementsByClassName("items-name");
for (let i = 0; i < Object.keys(drinks).length; i++) {
    let src = Object.values(drinks)[i].img;
    let price = Object.values(drinks)[i].price;
    let name = Object.values(drinks)[i].name;
    drink_list[i].src = src;
    drink_list[i].alt = name;
    drinks_name[i].innerHTML = name;
    pricetag_list[i].innerHTML = price + "원";
}

// 재고(stock)가 0이 되면 품절 마크를 표시
// item_list = document.getElementsByClassName("item-li");
// for (let i = 0; i < Object.keys(drinks).length; i++) {
//     if (Object.values(drinks)[i].stock == 0) {
//         item_list[i].classList.add("soldout");
//     }
// }

// 잔액을 찍어주는 코드
// document.getElementById("balance_result").innerHTML =
//     balance.toLocaleString() + "원";

//소지금을 찍어주는 코드
document.getElementById("wallet_coin").innerHTML =
    walletCoin.toLocaleString() + "원";