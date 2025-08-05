const cardsSection = document.querySelector("#cards-section");

const data = [
    {
        profilePic: 'assets/images/avatar-mark-webber.webp',
        userName: 'Mark Webber',
        subject: 'reacted to your recent post <strong>My first tournament today!</strong>',
        read: false,
        time: "1m ago"
    },
    {
        profilePic: 'assets/images/avatar-angela-gray.webp',
        userName: 'Angela Gray',
        subject: 'followed you',
        read: false,
        time: "5m ago"
    },
    {
        profilePic: 'assets/images/avatar-jacob-thompson.webp',
        userName: 'Jacob Thompson',
        subject: 'has joined your group <strong>Chess Club</strong>',
        read: false,
        time: "1 day ago"
    },
    {
        profilePic: 'assets/images/avatar-rizky-hasanuddin.webp',
        userName: 'Rizky Hasanuddin',
        subject: 'sent you a private message',
        read: true,
        time: "5 days ago",
        message: "Hello, thanks for setting up the Chess Club. I've been a member for a few weeks now and I'm already having lots of fun and improving my game."
    },
    {
        profilePic: 'assets/images/avatar-kimberly-smith.webp',
        userName: 'Kimberly Smith',
        subject: 'commented on your picture',
        read: true,
        time: "1 week ago",
        image: 'assets/images/image-chess.webp'
    },
    {
        profilePic: 'assets/images/avatar-nathan-peterson.webp',
        userName: 'Nathan Peterson',
        subject: 'reacted to your recent post <strong>5 end-game strategies to increase your win rate</strong>',
        read: true,
        time: "2 weeks ago"
    },
    {
        profilePic: 'assets/images/avatar-anna-kim.webp',
        userName: 'Anna Kim',
        subject: 'left the group <strong>Chess Club</strong>',
        read: true,
        time: "2 weeks ago"
    }
]

const styles = {
    article: "my-1 p-2 text-sm grid grid-cols-[56px_1fr] self-center rounded-md gap-3",
    unread: "bg-blue-100",
    profilePic: "h-14 object-cover object-center",
    otherImage: "h-14 object-cover object-center",
    notificationContainer: "text-gray-700 flex gap-2",
    textContainer: "grow flex flex-col justify-center p-1 sm:p-2",
    userName: "font-bold text-black",
    messageContainer: "border-1 my-4 p-3",
    redDot: "after:content-[''] after:inline-block after:h-2.5 after:w-2.5 after:rounded-full after:bg-red-500 after:ml-1"
};

function addNotification(notification, fragment) {
    // Create Elements
        // Parent Element
    const article = document.createElement("article");
        // Childs of article
    const profilePic = document.createElement("img");
    const notificationsContainer = document.createElement("div");
        // Child of notificationsContainer
    const textContainer = document.createElement("div");
        // Childs of textContainer
    const subject = document.createElement("p");
    const time = document.createElement("p");

    // Append childs to their parents
    
    article.appendChild(profilePic);
    article.appendChild(notificationsContainer)
    
    notificationsContainer.appendChild(textContainer);

    // Append subject and time to textContainer
    textContainer.appendChild(subject);
    textContainer.appendChild(time);
    
    // Styling
    article.className += styles.article;
    notificationsContainer.className += styles.notificationContainer;
    textContainer.className += styles.textContainer;
    profilePic.className += styles.profilePic;
    
    // Add content
    profilePic.src = notification.profilePic;
    profilePic.alt = "Profile"

    subject.innerHTML = `<span class="${styles.userName}">${notification.userName}</span> ${notification.subject}`;
    time.textContent = notification.time;

    // If message isn't yet read
    if (!notification.read) {
        notificationsContainer.classList.add(styles.unread);
        subject.className += styles.redDot;
    }

    // If notification has image
    if (notification.image) {
        const img = document.createElement("img")
        img.src = notification.image;
        
        img.className = styles.otherImage;
        notificationsContainer.appendChild(img);
    }

    // If notification has some message
    if (notification.message) {
        const div = document.createElement("div");
        const message = document.createElement("p");

        message.textContent = notification.message;

        div.appendChild(message);
        div.className += styles.messageContainer;
        textContainer.appendChild(div)
    }

    // Append notification to fragement
    fragment.appendChild(article);
}

// Fragement which will store all notifications to append them at once to DOM
const fragment = document.createDocumentFragment();
data.forEach(notification => addNotification(notification, fragment));

// Append all notifications to DOM
cardsSection.appendChild(fragment);