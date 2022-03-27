const userEditButton = document.querySelector(".user__edit-btn");

const popup = document.querySelector(".popup");

const editUserForm = popup.querySelector(".popup__container");

const closeButtonPopUp = editUserForm.querySelector(".close-btn");

const saveButtonPopUp = editUserForm.querySelector(".popup__save-btn");

const cardTemplate = document.querySelector("#grid__card").content;
const cardElement = cardTemplate.querySelector(".grid__card");

const cardDeleteButton = cardElement.querySelector(".card__delete-btn");

const cardContainer = document.querySelector(".grid__container");

let userName = document.querySelector(".user__name");

let userDescription = document.querySelector(".user__bio");

const LIKE_BUTTON = "image/paw_in_heart.svg";
const LIKE_BUTTON_ACTIVE = "image/paw_in_heart_active.svg";

const initialCards = [
	{
		description: "I`m sweety chocolate maffin",
		link: "image/goliaf.jpg",
		type: "image/cat_moon.svg",
	},
	{
		description: "i`m Luckyy and i`m cute",
		link: "image/lakky2.jpg",
		type: "image/cat_moon.svg",
	},
	{
		description: "Hey, find me :з",
		link: "image/prudence1.jpg",
		type: "image/dog.svg",
	},
	{
		description: "Meowlax",
		link: "image/myaka2.jpg",
		type: "image/cat_moon.svg",
	},
	{
		description: "Puppy U・ᴥ・U",
		link: "image/prudence2.jpg",
		type: "image/dog.svg",
	},
	{
		description: "Hanter ฅ(^◕ᴥ◕^)ฅ",
		link: "image/lakky1.jpg",
		type: "image/cat_moon.svg",
	},
];

const generateCard = ({ description, link, type }) => {
	const currentCard = cardElement.cloneNode(true);

	currentCard.querySelector(".card__image").src = link;
	currentCard.querySelector(".marker__image").src = type;
	currentCard.querySelector(".card__title").textContent = description;

	cardContainer.prepend(currentCard);

	const cardLikeButton = currentCard.querySelector(".card__like-btn");
	const cardLikeImage = cardLikeButton.querySelector("img");

	const cardDeleteButton = currentCard.querySelector(".card__delete-btn");

	const likeCard = () => {
		cardLikeButton.classList.toggle("card__like-btn_active");
		if (cardLikeButton.classList.contains("card__like-btn_active")) {
			cardLikeImage.src = LIKE_BUTTON_ACTIVE;
		} else {
			cardLikeImage.src = LIKE_BUTTON;
		}
	};

	cardLikeButton.addEventListener("click", likeCard);

	const deleteCard = () => {
		cardDeleteButton.removeEventListener("click", deleteCard);
		cardLikeButton.removeEventListener("click", likeCard);
		currentCard.remove();
	};

	cardDeleteButton.addEventListener("click", deleteCard);
};

initialCards.forEach((cardEl) => generateCard(cardEl));

const openPopup = () => {
	popup.classList.add("popup_opened");
};

const closePopup = () => {
	popup.classList.remove("popup_opened");
	closeButtonPopUp.disabled = true;
	setTimeout(() => {
		editUserForm.querySelector("input[name=name]").value = "";
		editUserForm.querySelector("input[name=description]").value = "";
		closeButtonPopUp.disabled = false;
	}, 300);
};

function submitEditForm(e) {
	e.preventDefault();
	const data = Object.fromEntries(new FormData(e.target).entries());

	userName.textContent = data.name;
	userDescription.textContent = data.description;
	closePopup();
}

userEditButton.addEventListener("click", openPopup);

closeButtonPopUp.addEventListener("click", (e) => {
	e.preventDefault();
	closePopup();
});

popup.addEventListener("click", (e) => {
	if (e.target === popup && popup.classList.contains("popup_opened")) {
		closePopup();
	}
});

editUserForm.addEventListener("submit", submitEditForm);
