const userEditButton = document.querySelector(".user__edit-btn");

const popupWithForm = document.querySelector("#form-popup");
const popupWithImage = document.querySelector("#image-popup");

const imagePopup = popupWithImage.querySelector(".popup__image");
const imageText = popupWithImage.querySelector(".image__description");

const editForm = popupWithForm.querySelector(".form");

const closeButtonForm = editForm.querySelector("#close-btn-form");
const closeButtonImage = popupWithImage.querySelector("#close-btn-image");

const saveButtonPopUp = editForm.querySelector(".popup__save-btn");

const addCardButton = document.querySelector(".profile__add-btn");

const cardTemplate = document.querySelector("#card__template").content;
const cardElement = cardTemplate.querySelector(".card");

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

const openPopup = (element) => {
	element.classList.add("popup_opened");
};

const closeFormPopup = () => {
	popupWithForm.classList.remove("popup_opened");
	closeButtonForm.disabled = true;
	setTimeout(() => {
		editForm.querySelector("#first_input").value = "";
		editForm.querySelector("#second_input").value = "";
		closeButtonForm.disabled = false;
	}, 300);
	editForm.removeAttribute("id");
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

	if (editForm.id === "profile") {
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

editForm.addEventListener("submit", submitEditForm);
