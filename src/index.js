const api = new Api({
  baseUrl: "http://95.216.175.5/cohort6",
  headers: {
    authorization: "3d370c1c-94fe-4e04-8eda-239688b6f9da",
    "Content-Type": "application/json"
  }
});
popDelete = new PopupDelete;
popErrors = new PopupErrors;
const card = new Card(document.querySelector(".template"), api, popDelete);


const cardList = new CardList(
  document.querySelector(".places-list"),
  card,
  api
);

const validation = new Validation(errors);
const popEdit = new PopupEdit(
  document.getElementById("popup-edit"),
  validation,
  api
);
const popPlace = new PopupPlace(
  document.getElementById("popup-place"),
  validation,
  api
);
const popAvatar = new PopupAvatar(document.getElementById("popup-avatar"),
validation,api)
const popImg = new PopupImg(document.getElementById("popup-image"));

// получение и отображение информации пользователя
api
  .getUserInformation()
  .then(res => {
    if (res.ok) {
      return res.json();
    } else return Promise.reject(res.status);
  })
  .then(res => {
    document.querySelector(".user-info__name").textContent = res.name;
    document.querySelector(".user-info__job").textContent = res.about;
    document.querySelector(
      ".user-info__photo"
    ).style.backgroundImage = `url(${res.avatar})`;
  })
  .catch(err =>{
    popErrors.openClose();
    document.querySelector(
      ".errors__text"
    ).textContent = `Где аватарка и описание? Им мешает ошибка ${err}`;

  })
  .finally(()=> cardList.render());

  // слушатели
  const root = document.querySelector(".root");

  root.addEventListener("click", event => {
    popImg.close(event);
    popImg.open(event);
    popPlace.close(event);
    popPlace.open(event);
    popEdit.close(event);
    popEdit.open(event);
    popAvatar.open(event);
    popAvatar.close(event);
    card.like(event);
    popDelete.open(event);
    popErrors.close(event)
  });
  document.getElementById("yes").addEventListener("click", event => {
    popDelete.choice(event);
  });
  
  document
    .getElementById("no")
    .addEventListener("click", () => popDelete.close());
  
  popPlace.form.addEventListener("submit", event => popPlace.submit(event));
  popPlace.form.addEventListener("input", event =>
    popPlace.validation.validate(event)
  );
  popEdit.form.addEventListener("submit", event => popEdit.submit(event));
  popEdit.form.addEventListener("input", event =>
    popEdit.validation.validate(event)
  );
  popAvatar.form.addEventListener("submit", event => popAvatar.submit(event));
  popAvatar.form.addEventListener("input", event =>
    popAvatar.validation.validateAva(event)
  );
  
  
  