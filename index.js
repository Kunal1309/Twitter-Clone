window.onload = async () => {
    const result = await fetch('https://twitter-backend-6yot.onrender.com/tweet/recent');
    const tweets = await result.json();

    document.getElementById('tweet-mid-new-tweets').insertAdjacentHTML('afterbegin', tweets.data.map((tweet) => {
        const date = new Date(tweet.creationDatetime);
     
        return `<section class="tweetMidNewTweets" id="tweet-mid-new-tweets">
        <section class="tweetMidTweetOwner">
            <i class="fa fa-certificate" aria-hidden="true"></i>
            <p class="tweetMidTweetOwnerPara"><span class="tweetMidTweetOwnerSpan">Entertainment. </span><a class="tweetMidTweetOwnerAnchor">See more</a></p>
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
)};

document.addEventListener('click', async(event) =>{
    if(event.target.classList.contains('tweetMidTweetsBtn')){
        const tweetText = document.querySelector('.tweetMidUserAreaSubSectionInput').value;

        const data = {
            title: tweetText,
            text: "Random value",
            userId: "12345"
        }

        const tweetResponse = await fetch('https://twitter-backend-6yot.onrender.com/tweet/create', {
            method: 'POST',
            headers:{
                'content-Type':'application/json',
            },
            body: JSON.stringify(data)
        })
        const tweet = await tweetResponse.json();

        if(tweet.status !== 200){
            alert(tweet.message);
            return;
        }

        document.querySelector('.tweetMidUserAreaSubSectionInput').value = "";
        alert(tweet.message);
    }
})