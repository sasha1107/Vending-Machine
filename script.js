var drinks = {
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
        count: 1,
        stock: 1,
    },
    violet: {
        name: "Violet_Cola",
        img: "./mediaquery/Violet_Cola.png",
        price: 1000,
        count: 5,
        stock: 0,
    },
    yellow: {
        name: "Yellow_Cola",
        img: "./mediaquery/Yellow_Cola.png",
        price: 1000,
        count: 0,
        stock: 1,
    },
    cool: {
        name: "Cool_Cola",
        img: "./mediaquery/Cool_Cola.png",
        price: 1000,
        count: 0,
        stock: 1,
    },
    green: {
        name: "Green_Cola",
        img: "./mediaquery/Green_Cola.png",
        price: 1000,
        count: 2,
        stock: 1,
    },
    orange: {
        name: "Orange_Cola",
        img: "./mediaquery/Orange_Cola.png",
        price: 1000,
        count: 1,
        stock: 1,
    },
};
var walletCoin = 25000; //소지금
var inputCoin = 10000; // 입금액

var totalPrice = 0; //총 금액 (총금엑 += 음료가격 * 음료 개수)
for (let i = 0; i < Object.keys(drinks).length; i++) {
    totalPrice +=
        parseInt(Object.values(drinks)[i].price) *
        parseInt(Object.values(drinks)[i].count);
}
var balance = inputCoin - totalPrice; //잔액

// 인풋창에서 입금액 입력 시 더해주는 함수
function deposit() {
    inputCoin = parseInt(document.getElementById("input-deposit").value);
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

// drinks 객체에 있는 이미지경로, 금액, 상품 이름만 변경하면 화면에 반영될 수 있도록 처리
drink_list = document.getElementsByClassName("items-img");
pricetag_list = document.getElementsByClassName("items-pricetag");
drinks_name = document.getElementsByClassName("items-name");
for (let i = 0; i < Object.keys(drinks).length; i++) {
    var src = Object.values(drinks)[i].img;
    var price = Object.values(drinks)[i].price;
    var name = Object.values(drinks)[i].name;
    drink_list[i].src = src;
    drink_list[i].alt = name;
    drinks_name[i].innerHTML = name;
    pricetag_list[i].innerHTML = price + "원";
}

// 재고(stock)가 0이 되면 품절 마크를 표시
item_list = document.getElementsByClassName("item-li");
for (let i = 0; i < Object.keys(drinks).length; i++) {
    if (Object.values(drinks)[i].stock == 0) {
        item_list[i].classList.add("soldout");
    }
}

// 잔액을 찍어주는 코드
document.getElementById("balance_result").innerHTML =
    balance.toLocaleString() + "원";

//소지금을 찍어주는 코드
document.getElementById("wallet_coin").innerHTML =
    walletCoin.toLocaleString() + "원";

//총금액을 찍어주는 코드
document.getElementById("total_price").innerHTML =
    "총금액 : " + totalPrice.toLocaleString() + "원";
