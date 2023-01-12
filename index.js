window.onload = async (event) => {
    const result = await fetch('https://twitter-backend-6yot.onrender.com/tweet/recent');
    const tweets = await result.json();

    document.getElementById('tweet-mid-new-tweets').insertAdjacentHTML('afterbegin', tweets.data.map((tweet) => {
        const date = new Date(tweet.creationDatetime);

        return `<section class="tweetMidNewTweets" id="tweet-mid-new-tweets">
        <section class="tweetMidTweetOwner">
            <i class="fa fa-certificate" aria-hidden="true"></i>
            <p class="tweetMidTweetOwnerPara"><span class="tweetMidTweetOwnerSpan">Entertainment. </span><a class="tweetMidTweetOwnerAnchor">See more</a></p>
            <button data-id=${tweet._id} class="tweet-edit"> Edit </button>
            <button data-id=${tweet._id} class="tweet-delete"> Delete </button>
        </section>
        <section class="tweetMidMainTweet">
            <figure><img class="tweetMidSomeoneImg" src="./images/NedaWafa.jpeg" alt=""></figure>
            <section class="tweetMidMainTweetSection">
                <p class="tweetMidMainTweetOwnName"><a href="#">Neda Wafa</a><span>@neda_wafa . ${date.toDateString()}</span></p>
                <p class="tweetMidMainTweetDetails">${tweet.title}</p>
                <figure><img class="tweetMidSomeoneImgOnTweet" src="./images/useForTweetImg.jpeg" alt=""></figure>    
                <section class="tweetMidReaction">
                    <section class="tweetMidReactionCount">
                        <i class="fa fa-bar-chart" aria-hidden="true"></i>
                        <p class="tweetMidReactionCountView">1.3M</p>
                    </section>
                    <section class="tweetMidReactionCount">
                        <i class="fa fa-comments-o" aria-hidden="true"></i>
                        <p class="tweetMidReactionCountView">1996</p>
                    </section>
                    <section class="tweetMidReactionCount">
                        <i class="fa fa-retweet" aria-hidden="true"></i>
                        <p class="tweetMidReactionCountView">1309</p>
                    </section>
                    <section class="tweetMidReactionCount">
                        <i class="fa fa-heart-o" aria-hidden="true"></i>
                        <p class="tweetMidReactionCountView">130996</p>
                    </section>
                    <i class="fa fa-share-square-o" aria-hidden="true"></i>
                </section>
            </section>
        </section>
    </section>`
    }).join("")
    )

    // if (event.target.classList.contains('tweet-delete')) {
    //     if (confirm("Are you sure you want to delete this tweet?")) {
    //         const tweetId = event.target.getAttribute('data-id');

    //         const data = {
    //             tweetId,
    //             userId: "12345"
    //         }

    //         const response = await fetch('https://twitter-backend-6yot.onrender.com/tweet/delete', {
    //             method: 'POST',
    //             headers: {
    //                 'content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(data)
    //         })
    //         const result = await response.json();

    //         if (result.status !== 200) {
    //             alert(result.message);
    //             return;
    //         }

    //         alert("Tweet deleted Successfully");

    //         document.getElementById("tweetId").remove();
    //     }
    // }

};

document.addEventListener('click', async (event) => {
    if (event.target.classList.contains('tweetMidTweetsBtn')) {
        const tweetText = document.querySelector('.tweetMidUserAreaSubSectionInput').value;

        const data = {
            title: tweetText,
            text: "Random value",
            userId: "12345"
        }

        const tweetResponse = await fetch('https://twitter-backend-6yot.onrender.com/tweet/create', {
            method: 'POST',
            headers: {
                'content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        const tweet = await tweetResponse.json();

        if (tweet.status !== 200) {
            alert(tweet.message);
            return;
        }

        document.querySelector('.tweetMidUserAreaSubSectionInput').value = "";
        alert(tweet.message);
    }
    if (event.target.classList.contains('tweet-delete')) {
        if (confirm("Are you sure you want to delete this tweet?")) {
            const tweetId = event.target.getAttribute('data-id');

            const data = {
                tweetId,
                userId: "12345"
            }

            const response = await fetch('https://twitter-backend-6yot.onrender.com/tweet/delete', {
                method: 'POST',
                headers: {
                    'content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            const result = await response.json();

            if (result.status !== 200) {
                alert(result.message);
                return;
            }

            alert("Tweet deleted Successfully");

            document.getElementById("tweetId").remove();
        }
    }

    if(event.target.classList.contains('tweet-edit')){
        const tweetId = event.target.getAttribute('data-id');
        const span = document.getElementById('span-' + tweetId);
        const tweetText = prompt("Enter new tweet text");

        const data = {
            tweetId,
            title: tweetText,
            text: "Random value",
            userId: "12345"
        }

        const response = await fetch('https://twitter-backend-6yot.onrender.com/tweet/update', {
            method: 'POST',
            headers:{
                'content-Type':'application/json',
            },
            body:JSON.stringify(data)
        })

        const result = await response.json();
        if (result.status !== 200){
            alert (result.message);
            return;
        }

        alert("Updated Successfully");
        span.innerText = tweetText;
    }
})


const twitter = document.getElementById('Main-Root');
const guestBtn = document.getElementById('guest');
const LogInFormSubmitBtn = document.getElementById('log-in-form');
const OpenSignInFormBtn = document.getElementById('signIn');
const LogInDisplay = document.getElementById('log-in-form-MainDiv');
const SignInDisplay = document.getElementById('sign-in-form-MainDiv');
const OpenLogInForm = document.getElementById('LogIn');
const SignInFormSubmitBtn = document.getElementById('sign-in-form')
const usernameLogIn = document.getElementById('usernameLogIn');
const passwordLogIn = document.getElementById('passwordLogIn');
const usernameSignIn = document.getElementById('SignInUsername');
const passwordSignIn = document.getElementById('SignInPassword');
const confirm_passwordSignIn = document.getElementById('SignInConfirmPassword');
const nameSignIn = document.getElementById('name');
const dobSignIn = document.getElementById('dob');
const myName = document.getElementById('myName');
const myId = document.getElementById('myId');
let localArr = [];

localArr = JSON.parse(localStorage.getItem('localArr')) ?? [];

function openGuest(e) {
    e.preventDefault();
    twitter.style.display = 'flex';
    LogInDisplay.style.display = 'none';
    SignInDisplay.style.display = 'none';
    myName.innerText = "Guest";
    myId.innerHTML = `<button id="LogInGuest">Log In ?</button>`;
    document.getElementById('guestImg').innerHTML = `<img class="tweetMidUserImg" src="./images/guestImg.png" alt="" class="tweetLeftUserImg">`
    document.getElementById('MidguestImg').innerHTML = `<img class="tweetMidUserImg" src="./images/guestImg.png" alt=""></figure>`
}

function SignInOpen(e) {
    e.preventDefault();
    if ((nameSignIn.value !== "") && (dobSignIn.value !== "") && (confirm_passwordSignIn.value == passwordSignIn.value)) {
        console.log(e);
        let obj = {
            username: document.getElementById('SignInUsername').value,
            password: passwordSignIn.value
        }
        localArr.push(obj);
        localStorage.setItem("kunal", JSON.stringify(localArr));

        alert("Sign Up SuccessFully!....Please Log in Now!")
        LogInDisplay.style.display = 'block';
        twitter.style.display = 'none';
        SignInDisplay.style.display = 'none';
        return;
    }
    alert("Please check details!");
    usernameSignIn.value = "";
    passwordSignIn.value = "";
    confirm_passwordSignIn.value = "";
    nameSignIn.value = "";
    dobSignIn.value = "";
}

function LogInOpen(e) {
    e.preventDefault();
    if (usernameLogIn.value == "Kunal Titare" && passwordLogIn.value == "12345") {
        twitter.style.display = 'flex';
        LogInDisplay.style.display = 'none';
        SignInDisplay.style.display = 'none';
        return;
    }
    else {
        alert("Please check details!");
        usernameLogIn.value = "";
        passwordLogIn.value = "";
    }
}

OpenSignInFormBtn.addEventListener("click", () => {
    twitter.style.display = 'none';
    LogInDisplay.style.display = 'none';
    SignInDisplay.style.display = 'block';
})

document.getElementById('LogIn').addEventListener("click", () => {
    twitter.style.display = 'none';
    LogInDisplay.style.display = 'block';
    SignInDisplay.style.display = 'none';
})



guestBtn.addEventListener("click", openGuest);
document.getElementById('SignUpguest').addEventListener("click", openGuest);
LogInFormSubmitBtn.addEventListener("submit", LogInOpen);
SignInFormSubmitBtn.addEventListener("submit", SignInOpen);
