const subOptionsData = {
  "HVAC": [
    { value: "full-check", text: "Full System Check" },
    { value: "heating", text: "Heating Repair / Replacement" },
    { value: "ac", text: "AC Repair / Replacement" },
    { value: "heating-maint", text: "Heating Maintenance" },
    { value: "ac-maint", text: "AC Maintenance" },
    { value: "other", text: "Other" }
  ],
  "Pool": [
    { value: "full-check", text: "Full Pool System Check" },
    { value: "spa-repair", text: "Spa / Hot Tub Repair" },
    { value: "spa-service", text: "Spa / Hot Tub Maintenance" },
    { value: "pump", text: "Pump Repair / Replacement" },
    { value: "filter", text: "Filter Repair / Replacement" },
    { value: "heater", text: "Heater Repair / Replacement" },
    { value: "plumbing", text: "Above-Ground Plumbing" },
    { value: "smart", text: "Timers & Smart Systems" },
    { value: "repair", text: "Other" }
  ],
  "Refrigerator": [
    { value: "full-check", text: "Full System Check" },
    { value: "freon", text: "Freon Leak Repair" },
    { value: "ice-maker", text: "Ice Maker Repair" },
    { value: "cooling", text: "Cooling Issue Repair" },
    { value: "electrical", text: "Electrical / Defrost Repair" },
    { value: "repair", text: "Other" }
  ],
  "Washer": [
    { value: "full-check", text: "Full System Check" },
    { value: "drum", text: "Washer Drum & Bearings Repair" },
    { value: "dryer-heat", text: "Dryer Heating / Air Flow Repair" },
    { value: "leak", text: "Water Leak Repair" },
    { value: "drain", text: "Drain & Spin Issue Repair" },
    { value: "electrical", text: "Electrical / Control Repair" },
    { value: "repair", text: "Other" }
  ],
  "Oven": [
    { value: "full-check", text: "Full System Check" },
    { value: "element", text: "Oven / Cooktop Element Repair" },
    { value: "stove-burner", text: "Stove Burner / Ignition Repair" },
    { value: "temperature", text: "Temperature Calibration / Repair" },
    { value: "electrical", text: "Control Panel / Electrical Repair" },
    { value: "repair", text: "Other" }
  ]
};

const categorySelect = document.getElementById('category-select');
const subSelect = document.getElementById('sub-select');

function updateSubOptions() {
  if (!categorySelect || !subSelect) return;
  
  const selectedCategory = categorySelect.value;
  const options = subOptionsData[selectedCategory] || [];

  subSelect.innerHTML = "";

  options.forEach(item => {
    const opt = document.createElement('option');
    opt.value = item.value;
    opt.textContent = item.text;
    subSelect.appendChild(opt);
  });
}

if (categorySelect) {
  categorySelect.addEventListener('change', updateSubOptions);
  updateSubOptions();
}










const textarea = document.getElementById('details-textarea');
const counter = document.getElementById('char-counter');

if (textarea && counter) {
  textarea.addEventListener('input', () => {
    const currentLength = textarea.value.length;
    counter.textContent = `${currentLength} / 2000`;
  });
}

// --------------- ПОЛЕ ВВОДУ -----------------------------------

const star = document.getElementById('required-star');
const label = document.getElementById('details-label');
const nextButton = document.getElementById('next_button_1');
const descriptionInput = document.querySelector('.description-input'); // Отримуємо блок з рамкою

// 1. Під час введення тексту
if (textarea && counter) {
  textarea.addEventListener('input', () => {
    const currentLength = textarea.value.length;
    counter.textContent = `${currentLength} / 2000`;

    if (currentLength > 0) {
      // Якщо текст є — прибираємо зірочку, червоний колір тексту і червону рамку
      star.classList.add('star-hidden');
      label.classList.remove('error-label');
      if (descriptionInput) descriptionInput.classList.remove('error-border');
    } else {
      // Якщо знову стер — показуємо зірочку
      star.classList.remove('star-hidden');
    }
  });
}




// 2. При кліку на кнопку "Next"

document.addEventListener('DOMContentLoaded', () => {
  const textarea = document.getElementById('details-textarea');
  const counter = document.getElementById('char-counter');
  const star = document.getElementById('required-star');
  const label = document.getElementById('details-label');
  const nextButton = document.getElementById('next_button_1');
  const descriptionInput = document.querySelector('.description-input'); 

  // Змінні для блоків форми
  const block1 = document.getElementById('block-1');
  const block2 = document.getElementById('block-2');

  // Перевірка в консолі, чи знайшов браузер усі елементи
  console.log("Статус елементів:", { 
    textarea: !!textarea, 
    nextButton: !!nextButton, 
    block1: !!block1, 
    block2: !!block2 
  });

  // 1. Під час введення тексту
  if (textarea && counter) {
    textarea.addEventListener('input', () => {
      const currentLength = textarea.value.length;
      counter.textContent = `${currentLength} / 2000`;

      if (currentLength > 0) {
        if (star) star.classList.add('star-hidden');
        if (label) label.classList.remove('error-label');
        if (descriptionInput) descriptionInput.classList.remove('error-border');
      } else {
        if (star) star.classList.remove('star-hidden');
      }
    });
  }

  // 2. При кліку на кнопку "Next"
  if (nextButton && textarea) {
    nextButton.addEventListener('click', (event) => {
      const currentLength = textarea.value.length;

      if (currentLength === 0) {
        event.preventDefault(); 
        if (label) label.classList.add('error-label');
        if (star) star.classList.remove('star-hidden');
        if (descriptionInput) descriptionInput.classList.add('error-border');
        textarea.focus();
      } else {
        console.log('Текст введено успішно! Перемикаємо блоки...');
        if (block1 && block2) {
          block1.classList.add('hidden');    // Ховаємо блок 1
          block2.classList.remove('hidden'); // Показуємо блок 2
        } else {
          console.error("Помилка: блок-1 або блок-2 не знайдені в HTML!");
        }
      }
    });
  }
});






// -------------------------------------------------------------------------------|   Uploa photos   |--------------------------------
const fileInput = document.getElementById('media-input');
const previewContainer = document.getElementById('preview-container');

// Зберігатимемо всі завантажені файли у масиві
let selectedFiles = [];

fileInput.addEventListener('change', (event) => {
  const newFiles = Array.from(event.target.files);
  
  // Перевірка на ліміт: загальна кількість не має перевищувати 5
  if (selectedFiles.length + newFiles.length > 5) {
    alert('Можна завантажити максимум 5 фото або відео!');
    fileInput.value = ''; // Скидаємо інпут
    return;
  }

  // Додаємо нові файли до загального масиву
  selectedFiles = selectedFiles.concat(newFiles);
  
  // Оновлюємо відображення мініатюр
  renderPreviews();
});

function renderPreviews() {
  // Очищуємо контейнер перед рендером
  previewContainer.innerHTML = '';

  selectedFiles.forEach((file, index) => {
    const reader = new FileReader();
    
    reader.onload = function(e) {
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('preview-item');

      // Перевіряємо, чи це відео чи зображення
      if (file.type.startsWith('video/')) {
        const video = document.createElement('video');
        video.src = e.target.result;
        itemDiv.appendChild(video);
      } else {
        const img = document.createElement('img');
        img.src = e.target.result;
        itemDiv.appendChild(img);
      }

      // Створюємо кнопку видалення (хрестик)
      const deleteBtn = document.createElement('button');
      deleteBtn.classList.add('delete-btn');
      deleteBtn.innerHTML = '&times;';
      
      // Подія натискання на хрестик
      deleteBtn.addEventListener('click', () => {
        // Видаляємо файл із масиву за його індексом
        selectedFiles.splice(index, 1);
        
        // Оновлюємо відображення мініатюр на екрані
        renderPreviews();
        
        // Якщо видалили всі файли, скидаємо інпут, щоб можна було обрати той самий файл знову
        if (selectedFiles.length === 0) {
          fileInput.value = '';
        }
      });

      itemDiv.appendChild(deleteBtn);
      previewContainer.appendChild(itemDiv);
    };

    reader.readAsDataURL(file);
  });
} // ---------------------------------------------------------------------------------------------------------------------------









document.addEventListener('DOMContentLoaded', () => { // <---------------------|   PHONE   |--------------------------------
  const phoneInput = document.getElementById('phone-input');

  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      // Залишаємо лише цифри з того, що ввів користувач
      let numbers = e.target.value.replace(/\D/g, '');
      
      // Обмежуємо максимум до 10 цифр (наприклад: 3 цифри коду + 7 цифр номера)
      if (numbers.length > 10) {
        numbers = numbers.slice(0, 10);
      }

      let formattedValue = '';

      if (numbers.length > 0) {
        // Додаємо перші 3 цифри в дужки
        formattedValue = '(' + numbers.substring(0, 3);
      }
      if (numbers.length >= 4) {
        // Закриваємо дужки і додаємо пробіл та наступні 3 цифри
        formattedValue += ') ' + numbers.substring(3, 6);
      }
      if (numbers.length >= 7) {
        // Додаємо дефіс і фінальні цифри
        formattedValue += '-' + numbers.substring(6, 10);
      }

      // Виводимо відформатований рядок назад у поле вводу
      e.target.value = formattedValue;
    });
  }
});

document.addEventListener('DOMContentLoaded', () => { // <------------------------|   E-Main adress   |-------------------------------
  const emailInput = document.getElementById('email-input');

  if (emailInput) {
    // Функція для перевірки формату email за допомогою регулярного виразу
    function isValidEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    }

    // Перевірка під час введення або втрати фокусу
    emailInput.addEventListener('blur', () => {
      const emailValue = emailInput.value.trim();
      
      if (emailValue.length > 0) {
        if (!isValidEmail(emailValue)) {
          // Якщо формат неправильний — підсвічуємо рамку червоним
          emailInput.style.borderColor = '#DA3D57';
          console.warn("Неправильний формат електронної пошти!");
        } else {
          // Якщо все ок — повертаємо білий контур
          emailInput.style.borderColor = '#ffffff';
        }
      }
    });
  }
});






// <----------------------------------------------|   BUTTON 2   |-----------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  const nextButton2 = document.getElementById('next_button_2');
  
  const block2 = document.getElementById('block-2');
  const block3 = document.getElementById('block-3');

  const firstName = document.getElementById('first-name');
  const lastName = document.getElementById('last-name');
  const phoneInput = document.getElementById('phone-input');
  const emailInput = document.getElementById('email-input');

  if (nextButton2) {
    nextButton2.addEventListener('click', (event) => {
      let isValid = true;

      // 1. Перевірка імені (не порожнє)
      if (!firstName || firstName.value.trim() === '') {
        if (firstName) firstName.style.borderColor = '#DA3D57';
        isValid = false;
      } else {
        firstName.style.borderColor = '#ffffff';
      }

      // 2. Перевірка прізвища (не порожнє)
      if (!lastName || lastName.value.trim() === '') {
        if (lastName) lastName.style.borderColor = '#DA3D57';
        isValid = false;
      } else {
        lastName.style.borderColor = '#ffffff';
      }

      // 3. Перевірка телефону (має бути рівно 10 цифр / повна маска)
      const phoneDigits = phoneInput ? phoneInput.value.replace(/\D/g, '') : '';
      if (!phoneInput || phoneDigits.length < 10) {
        if (phoneInput) phoneInput.style.borderColor = '#DA3D57';
        isValid = false;
      } else {
        phoneInput.style.borderColor = '#ffffff';
      }

      // 4. Перевірка пошти (базовий формат з @ та крапкою)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput || !emailRegex.test(emailInput.value.trim())) {
        if (emailInput) emailInput.style.borderColor = '#DA3D57';
        isValid = false;
      } else {
        emailInput.style.borderColor = '#ffffff';
      }

      // Загальний результат перевірки
      if (!isValid) {
        event.preventDefault(); // Зупиняємо перехід, якщо щось заповнено неправльно
        console.warn("There are empty or invalid fields!");
      } else {
        // Якщо все ідеально — ховаємо блок 2 і показуємо блок 3
        if (block2 && block3) {
          block2.classList.add('hidden');
          block3.classList.remove('hidden');
        } else {
          console.error("block-2 or block-3 not founded");
        }
      }
    });
  }
});






















// 1. Отримуємо елементи
const streetInput = document.getElementById('street-input');
const cityInput = document.getElementById('city-input');
const zipInput = document.getElementById('zip-input');
const submitButton = document.getElementById('Submit-Request');
const unitInput = document.getElementById('Unit-input');




if (zipInput) {
  zipInput.addEventListener('input', function () {
    // Додали пробіл наприкінці виразу (після дефіса)
    this.value = this.value.replace(/[^0-9- ]/g, '');
  });
}






// 2. Додаємо слухачі подій: щойно користувач пише літеру — прибираємо червоний клас
streetInput.addEventListener('input', function() {
  if (this.value.trim() !== '') {
    this.classList.remove('error');
  }
});

cityInput.addEventListener('input', function() {
  if (this.value.trim() !== '') {
    this.classList.remove('error');
  }
});

zipInput.addEventListener('input', function() {
  if (this.value.trim() !== '') {
    this.classList.remove('error');
  }
});

unitInput.addEventListener('input', function() {
  if (this.value.trim() !== '') {
    this.classList.remove('error');
  }
});

// 3. Перевірка при натисканні кнопки Submit
submitButton.addEventListener('click', function () {
  let isValid = true;

  if (!streetInput.value.trim()) {
    streetInput.classList.add('error');
    isValid = false;
  }

  if (!cityInput.value.trim()) {
    cityInput.classList.add('error');
    isValid = false;
  }

  if (!zipInput.value.trim()) {
    zipInput.classList.add('error');
    isValid = false;
  }

  if (!unitInput.value.trim()) {
    unitInput.classList.add('error');
    isValid = false;
  }

  // Результат перевірки
  if (!isValid) {
    console.log("There are empty or invalid fields!");
  } else {
    alert('Success! Form submitted.');
    // Тут код відправки форми
  }
});











// Знаходимо всі інпути та текстові поля на сторінці
const allFields = document.querySelectorAll('input[type="text"], input[type="email"], textarea');

allFields.forEach(field => {
  // Пропускаємо поле штату (Illinois)
  if (field.id === 'state-input') return;

  field.addEventListener('input', function() {
    // Дозволяємо лише англійські літери, цифри, пробіли, дефіси, крапки, коми та знак @
    this.value = this.value.replace(/[^a-zA-Z0-9\s\-.,@]/g, '');
  });
});