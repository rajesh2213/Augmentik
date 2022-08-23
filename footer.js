const createFooter = () => {
    let footer =document.querySelector('footer');

    footer.innerHTML = `
    <div class="footer-content">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

            <img src="./images/logoimages-removebg-preview.png" class="logo" alt="">
            <div class="footer-ul-container">
            
                <ul class="category">
                    <li class="category-title">Resourses</li>
                    <li><a href="#" class="footer-link">Policies</a></li>
                    <li><a href="#" class="footer-link">Whitepaper</a></li>
                    <li><a href="#" class="footer-link">Branding</a></li>
                </ul>
               
            </div>
            
        </div>
        <p class="footer-title"> </p>
            <p class="info">            Starterra is the first gamified launchpad with a unique combination of guranteed prize pools.
            </p>
            <p class="info">support emails - rm5703@srmist.edu.in</p>
            <div class="footer-social-container">
            <div>
            <a href="#" id="insta" class="social-link">instagram</a>
            <a href="#" id="fb" class="social-link">facebook</a>
            <a href="#" id="twt" class="social-link">twitter</a>
        </div>
                <div>
                    <a href="#" class="social-link">terms & services</a>
                    <a href="#" class="social-link">privacy page</a>
                </div>
                
            </div>
            <p class="footer-credit">StarTerra</p>
            
            <script src="/seller.js"></script>

    `;
}

createFooter();


var htmlD = {}

window.onload = () =>{

  
    fetch('http://localhost:3050/urlIn')
    .then(response => response.json())
    .then(htmlData =>{ htmlD = htmlData} ) 
    
    setTimeout(function(){
        console.log(Object.values(htmlD)[0])
        document.getElementById("fb").href = Object.values(htmlD)[0]
        document.getElementById("insta").href = Object.values(htmlD)[1]
        document.getElementById("twt").href = Object.values(htmlD)[2]

    //   navigator.clipboard.writeText(htmlD)
    //   .then(() => {
    //      console.log('success')
    //   })
    //   .catch(err => {
    //      console.log('Something went wrong', err);
    //   });
   
    //   setTimeout(function(){
    //     load.style.display = 'none';
  
    //   },7000)
    // // console.log('htmlD' , htmlD)
  
    },3000)
  
  }