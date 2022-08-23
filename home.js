

const setupSlidingEffect = () => {
    const productContainers = [...document.querySelectorAll('.product-container')];
    const nxtBtn = [...document.querySelectorAll('.nxt-btn')];
    const preBtn = [...document.querySelectorAll('.pre-btn')];

    productContainers.forEach((item, i) => {
        let containerDimenstions = item.getBoundingClientRect();
        let containerWidth = containerDimenstions.width;

        nxtBtn[i].addEventListener('click', () => {
            item.scrollLeft += containerWidth;
        })

        preBtn[i].addEventListener('click', () => {
            item.scrollLeft -= containerWidth;
        })

    })
}

const sendData = (path, data) => {
    fetch(path, {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify(data)
    }).then((res) => res.json())
    .then(response => {
        processData(response)
    })
}
const processData = (data) => {
   if(data.name){
        data.authToken = generateToken(data.email);
        sessionStorage.user = JSON.stringify(data);
        location.replace('/');

    }
}



// popup

window.addEventListener("load", function(){
    setTimeout(
        function open(event){
            document.querySelector(".popup").style.display = "block";
        },
        1000
    )
});



document.querySelector("#close").addEventListener("click", function(){
    document.querySelector(".popup").style.display = "none";
});

submitBtn = document.querySelector('.sub')
email = document.querySelector('.email')
names = document.querySelector('.name')


submitBtn.addEventListener('click', () => {

    if(email.value && names.value){
       
        // popup page
        
           sendData('/', {
                names: names.value,
                email: email.value,
            })
            console.log(names.value , email.value)
            var params = {
                to_name: names.value,
                email_id : email.value,

            }
            emailjs.send("service_w4jgdnm","template_0l7k812" , params).then(function (res) {
                alert("Success!" + res.status)
            })
            document.querySelector(".popup").style.display = "none";
    }else{
        alert("To Submit enter valid values")
    }

    
})





// fetch productcards
const getProducts = (tag) => {
    return fetch('/get-products', {
        method: "post",
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify({ tag: tag })
    })
        .then(res => res.json())
        .then(data => {
            return data;
        })
}
let combine;

// create product slider 
const createProductSlider = (data, parent, title) => {
    let slideContainer = document.querySelector(`${parent}`);

    //...........................................................

    console.log(slideContainer);
    let start = '<div class="product-container">';
    let middle = ''; // this will contain card HTML
    let end = '</div>';

    for (let i = 0; i < data.length; i++) {
        if (data[i].id != decodeURI(location.pathname.split('/').pop())) {
            middle += `
            <div class="product-card">
                <div class="product-image" onclick="location.href = '/products/${data[i].id}'">
                    <img src="${data[i].images[0]}" class="product-thumb" alt="">
                </div>
                <div class="product-info" onclick="location.href = '/products/${data[i].id}'">
                    <h2 class="product-brand">${data[i].name}</h2>
                    <p class="product-short-des">${data[i].shortDes}</p>
                    <span class="price">${data[i].sellPrice}</span> 
                    <span class="actual-price">${data[i].actualPrice}</span>
                </div>
            </div>
            
            `
        }
        
    }

    let flagSearch = 0;
    if(parent){
       let cardContainer = document.querySelector(parent);
      if(location.pathname.split('/')[1] == 'search'){
       cardContainer.innerHTML = start + middle + end;
       }
       Combine = start + middle + end;
   }else{
         Combine = start + middle + end;
    }

    //................................................................
    if (location.pathname.split('/')[1] != 'search') {
        flagSearch  = 1;
        slideContainer.innerHTML += `
    <section class="product">
        <h2 class="product-category">${title}</h2>
        <button class="pre-btn"><img src="../images/arrow.png" alt=""></button>
        <button class="nxt-btn"><img src="../images/arrow.png" alt=""></button>
        ${Combine}
        
    </section>  
    `
        setupSlidingEffect();

        //...............

    }

}


// const createProductCards = (data, parent) => {
//     let start = '<div class="product-container">';
//     let middle = ''; // this will contain card HTML
//     let end = '</div>';

//     for(let i = 0; i< data.length ; i++) {
//         middle += `
//         <div class="product-card">
//             <div class="product-image">
//                 <span class="discount-tag">${data[i].discount}% off</span>
//                 <img src="${data[i].images[0]}" class="product-thumb" alt="">

//             </div>
//             <div class="product-info">
//                 <h2 class="product-brand">${data[i].name}</h2>
//                 <p class="product-short-des">${data[i].shortDes}</p>
//                 <span class="price">${data[i].sellPrice}</span> 
//                 <span class="actual-price">${data[i].actualPrice}</span>
//             </div>
//         </div>
//         `
//     }
//     return start + middle + end;
// }

const testP = (data) => {
    console.log(data)
}

const add_product_to_cart_or_wishlist = (type,product) => {
    let data = JSON.parse(localStorage.getItem(type));
    if(data == null){
        data = [];
    }

    product = {
        item: 1,
        name: product.name,
        sellPrice: product.sellPrice,
        size: size || null,
        shortDes: product.shortDes,
        image: product.images[0]
    }
    data.push(product);
    localStorage.setItem(type, JSON.stringify(data));
    console.log(data);
    return 'added';
}

