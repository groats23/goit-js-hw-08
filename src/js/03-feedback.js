import throttle from 'lodash.throttle';

const refs = {
  feedbackForm: document.querySelector('.feedback-form'),
  formInput: document.querySelector('.feedback-form input'),
  formTextarea: document.querySelector('.feedback-form textarea'),
};

const STORAGE_KEY = 'feedback-form-state';
let formFeedbackData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

refs.feedbackForm.addEventListener('input', throttle(formInputHandler, 500));
refs.feedbackForm.addEventListener('submit', onSubmitFormBtnClick);
populateSavedData();

function formInputHandler(e) {
  formFeedbackData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formFeedbackData));
}

function populateSavedData() {
  const savedFormData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (savedFormData) {
    refs.formInput.value = savedFormData.email || '';
    refs.formTextarea.value = savedFormData.message || '';
  }
}

function onSubmitFormBtnClick(e) {
  e.preventDefault();
  if (
    e.currentTarget.email.value === '' ||
    e.currentTarget.message.value === ''
  ) {
    alert('Please, fill in empty areas in order to submit the form!');
  } else {
    console.log('formData:', formFeedbackData);
    e.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
    formFeedbackData = {};
  }
}
