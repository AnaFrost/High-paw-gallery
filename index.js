const userEditButton = document.querySelector(".user__edit-btn");

const popup = document.querySelector(".popup");

const editForm = popup.querySelector(".popup__container");

const closeButtonPopUp = editForm.querySelector(".close-btn");

const saveButtonPopUp = editForm.querySelector(".popup__save-btn");

const addCardButton = document.querySelector(".profile__add-btn");

const cardTemplate = document.querySelector("#grid__card").content;
const cardElement = cardTemplate.querySelector(".grid__card");

const cardDeleteButton = cardElement.querySelector(".card__delete-btn");

const cardContainer = document.querySelector(".grid__container");

let userName = document.querySelector(".user__name");

let userDescription = document.querySelector(".user__bio");

const LIKE_BUTTON = "image/paw_in_heart.svg";
const LIKE_BUTTON_ACTIVE = "image/paw_in_heart_active.svg";

const EDIT_USER = "editUserForm";
const ADD_CARD = "addedCardForm";

const MARKER_CAT = "image/cat_moon.svg";
const MARKER_DOG = "image/dog.svg";
const MARKER_OTHER = "image/unicorn.svg";

const initialCards = [
	{
		description: "I`m sweety chocolate maffin",
		link: "image/goliaf.jpg",
		type: "cat",
	},
	{
		description: "i`m Luckyy and i`m cute",
		link: "image/lakky2.jpg",
		type: "cat",
	},
	{
		description: "Hey, find me :з",
		link: "image/prudence1.jpg",
		type: "dog",
	},
	{
		description: "Meowlax",
		link: "image/myaka2.jpg",
		type: "cat",
	},
	{
		description: "Puppy U・ᴥ・U",
		link: "image/prudence2.jpg",
		type: "dog",
	},
	{
		description: "Hanter ฅ(^◕ᴥ◕^)ฅ",
		link: "image/lakky1.jpg",
		type: "cat",
	},
];

const getCardTypeLink = (type) => {
	switch (type) {
		case "cat":
			return MARKER_CAT;
		case "dog":
			return MARKER_DOG;
		default:
			return MARKER_OTHER;
	}
};

const generateCard = ({ description, link, type }) => {
	const currentCard = cardElement.cloneNode(true);

	currentCard.querySelector(".card__image").src = link;
	currentCard.querySelector(".marker__image").src = getCardTypeLink(type);
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

const generetePopupForm = (typeForm) => {
	switch (typeForm) {
		case EDIT_USER:
			editForm.querySelector(".popup__title").textContent = "Edit profile";
			editForm.querySelector("#first_input").placeholder = "Name";
			editForm.querySelector("#first_input").name = "name";
			editForm.querySelector("#second_input").placeholder = "Description";
			editForm.querySelector("#second_input").name = "description";
			editForm.setAttribute("id", "profile");
			break;
		case ADD_CARD:
			editForm.querySelector(".popup__title").textContent = "Add new card";
			editForm.querySelector("#first_input").placeholder = "Description";
			editForm.querySelector("#first_input").name = "description";
			editForm.querySelector("#second_input").placeholder = "Photo link";
			editForm.querySelector("#second_input").name = "link";
			editForm.setAttribute("id", "add_card");
			break;
		default:
			break;
	}
};

const openPopup = () => {
	popup.classList.add("popup_opened");
};

const closePopup = () => {
	popup.classList.remove("popup_opened");
	closeButtonPopUp.disabled = true;
	setTimeout(() => {
		editForm.querySelector("#first_input").value = "";
		editForm.querySelector("#second_input").value = "";
		closeButtonPopUp.disabled = false;
	}, 300);
	editForm.removeAttribute("id");
};

function submitEditForm(e) {
	e.preventDefault();
	const data = Object.fromEntries(new FormData(e.target).entries());

	if (editForm.id === "profile") {
		userName.textContent = data.name;
		userDescription.textContent = data.description;
	} else {
		generateCard({ ...data, type: "other" });
	}
	closePopup();
}

userEditButton.addEventListener("click", () => {
	generetePopupForm(EDIT_USER);
	openPopup();
});

addCardButton.addEventListener("click", () => {
	generetePopupForm(ADD_CARD);
	openPopup();
});

closeButtonPopUp.addEventListener("click", (e) => {
	e.preventDefault();
	closePopup();
});

popup.addEventListener("click", (e) => {
	if (e.target === popup && popup.classList.contains("popup_opened")) {
		closePopup();
	}
});

editForm.addEventListener("submit", submitEditForm);
