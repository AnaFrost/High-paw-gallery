const userEditButton = document.querySelector(".user__edit-btn");

const popup = document.querySelector(".popup");

const editUserForm = popup.querySelector(".popup__container");

const closeButtonPopUp = editUserForm.querySelector(".close-btn");

const saveButtonPopUp = editUserForm.querySelector(".popup__save-btn");

let userName = document.querySelector(".user__name");

let userDescription = document.querySelector(".user__bio");

const LIKE_BUTTON = "image/paw_in_heart.svg";
const LIKE_BUTTON_ACTIVE = "image/paw_in_heart_active.svg";

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

Array.from(document.querySelectorAll(".card__like-btn")).forEach((button) =>
	button.addEventListener("click", (e) => {
		button.classList.toggle("card__like-btn_active");
		if (button.classList.contains("card__like-btn_active")) {
			e.target.src = LIKE_BUTTON_ACTIVE;
		} else {
			e.target.src = LIKE_BUTTON;
		}
	})
);
