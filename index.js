const userEditButton = document.querySelector(".user__edit-btn");

const popupWithForm = document.querySelector("#form-popup");
const popupWithImage = document.querySelector("#image-popup");

const imagePopup = popupWithImage.querySelector(".popup__image");
const imageText = popupWithImage.querySelector(".image__description");

const form = popupWithForm.querySelector(".form");

const popupTitle = form.querySelector(".popup__title");
const firstInput = form.querySelector("#first_input");
const secondInput = form.querySelector("#second_input");

const closeButtonForm = form.querySelector("#close-btn-form");
const closeButtonImage = popupWithImage.querySelector("#close-btn-image");

const saveButtonPopUp = form.querySelector(".popup__save-btn");

const addCardButton = document.querySelector(".card__add-btn");

const cardTemplate = document.querySelector("#card-template").content;
const cardElement = cardTemplate.querySelector(".card");

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
		link: "image/lakita1.jpg",
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
		description: "Rats <3",
		link: "image/rats2.jpg",
		type: "other",
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
	const cardImage = currentCard.querySelector(".card__image");

	cardImage.src = link;
	currentCard.querySelector(".marker__image").src = getCardTypeLink(type);
	currentCard.querySelector(".card__title").textContent = description;

	cardContainer.prepend(currentCard);

	cardImage.addEventListener("click", () => {
		imagePopup.src = link;
		imageText.textContent = description;
		openPopup(popupWithImage);
	});

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
			popupTitle.textContent = "Edit profile";
			firstInput.placeholder = "Name";
			firstInput.name = "name";
			secondInput.placeholder = "Description";
			secondInput.name = "description";
			form.setAttribute("id", "profile");
			break;
		case ADD_CARD:
			popupTitle.textContent = "Add new card";
			firstInput.placeholder = "Description";
			firstInput.name = "description";
			secondInput.placeholder = "Photo link";
			secondInput.name = "link";
			form.setAttribute("id", "add_card");
			break;
		default:
			break;
	}
};

const openPopup = (element) => {
	element.classList.add("popup_opened");
};

const closeFormPopup = () => {
	popupWithForm.classList.remove("popup_opened");
	closeButtonForm.disabled = true;
	setTimeout(() => {
		firstInput.value = "";
		secondInput.value = "";
		closeButtonForm.disabled = false;
	}, 300);
	form.removeAttribute("id");
};

const closeImagePopup = () => {
	popupWithImage.classList.remove("popup_opened");
	closeButtonImage.disabled = true;
	setTimeout(() => {
		closeButtonImage.disabled = false;
	}, 300);
};

function submitEditForm(e) {
	e.preventDefault();
	const data = Object.fromEntries(new FormData(e.target).entries());

	if (form.id === "profile") {
		userName.textContent = data.name;
		userDescription.textContent = data.description;
	} else {
		generateCard({ ...data, type: "other" });
	}
	closeFormPopup();
}

userEditButton.addEventListener("click", () => {
	generetePopupForm(EDIT_USER);
	openPopup(popupWithForm);
});

addCardButton.addEventListener("click", () => {
	generetePopupForm(ADD_CARD);
	openPopup(popupWithForm);
});

closeButtonForm.addEventListener("click", closeFormPopup);
closeButtonImage.addEventListener("click", closeImagePopup);

popupWithForm.addEventListener("click", (e) => {
	if (
		e.target === popupWithForm &&
		popupWithForm.classList.contains("popup_opened")
	) {
		closeFormPopup();
	}
});

popupWithImage.addEventListener("click", (e) => {
	if (
		e.target === popupWithImage &&
		popupWithImage.classList.contains("popup_opened")
	) {
		closeImagePopup();
	}
});

form.addEventListener("submit", submitEditForm);
