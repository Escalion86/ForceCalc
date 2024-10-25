const language = (lng, word) => {
  if (lng === 'ru') return word
  const obj = {
    'Горячие клавиши': { en: 'Keyboard shortcuts' },
    'Процесс демонстрации': { en: 'Demonstration process' },
    'Настройки внешнего вида': { en: 'Appearance Settings' },
    'Настройки форсирования': { en: 'Force Settings' },
    Инструкция: { en: 'Instructions' },
    'Срок вашей лецензии истек! Для продления и других вопросов обратитесь к разработчику':
      {
        en: 'Your license has expired! For renewal and other questions, contact the developer',
      },
    Режим: { en: 'Mode' },
    'Проверте код и попробуйте еще раз': { en: 'Check the code and try again' },
    'Код не верный': { en: 'The code is not correct' },
    'Следующая попытка': { en: 'Next try after' },
    'Слишком много попыток ввода кода': { en: 'Too many code attempts' },
    'Спасибо что приобрели это замечательное приложение': {
      en: 'Thank you for purchasing this wonderful application',
    },
    'Приветствую вас': { en: 'Greetings' },
    'Начать пользоваться': { en: 'Start to use' },
    'Введите выданный вам код': { en: 'Enter the code given to you' },
    'Связаться с разработчиком': { en: 'Contact the developer' },
    до: { en: 'until' },
    'для пользователя': { en: 'for user' },
    Лицензия: { en: 'License' },
    'Внешний вид': { en: 'Appearance' },
    'Параметры форсирования': { en: 'Force options' },
    'О приложении': { en: 'About app' },
    'При запуске открывать калькулятор': { en: 'Open calculator on startup' },
    Язык: { en: 'Language' },
    'Ориентация экрана': { en: 'Screen orientation' },
    'Темная тема': { en: 'Dark theme' },
    Общие: { en: 'General' },
    Авто: { en: 'Auto' },
    Вертикальный: { en: 'Vertical' },
    Горизонтальный: { en: 'Horizontal' },
    Калькулятор: { en: 'Calculator' },
    Тема: { en: 'Theme' },
    Классическая: { en: 'Classic' },
    Стандартная: { en: 'Standart' },
    'Разделитель тысяч': { en: 'Thousand Separator' },
    'Без разделения': { en: 'No Separation' },
    Точка: { en: 'Dot' },
    Пробел: { en: 'Space' },
    'При активном триггере подсвечивать нажатия триггерных кнопок (не фактически нажатых)':
      {
        en: 'When the trigger is active, highlight pressing trigger buttons (not actually pressed)',
      },
    'При активном триггере слегка подсвечивать цифру, для демонстрации кол-ва оставшихся цифр необходимых для введения форсированного числа':
      {
        en: 'When the trigger is active, lightly highlight the digit to show the number of remaining digits needed to enter the forced number',
      },
    'Контрастность подсветки цифры': { en: 'Digit backlight contrast' },
    'Очень высокий': { en: 'Very high' },
    Высокий: { en: 'High' },
    Нормальный: { en: 'Normal' },
    Низкий: { en: 'Low' },
    'Очень низкий': { en: 'Very Low' },
    'Внешний вид': { en: 'Appearance' },
    'Параметры форсирования': { en: 'Forcing parameters' },
    Настройки: { en: 'Settings' },
    'О приложении': { en: 'About app' },
    'Тип форсирования': { en: 'Forcing type' },
    Дата: { en: 'Date' },
    Число: { en: 'Number' },
    Криптотекст: { en: 'Cryptotext' },
    'Отклонение от даты на, сек': { en: 'Deviation from the date, sec' },
    Результат: { en: 'Result' },
    день: { en: 'day' },
    месяц: { en: 'month' },
    год: { en: 'year' },
    минуты: { en: 'minutes' },
    'часы (12 часовой формат)': { en: 'hours  (12 hour format)' },
    'часы (24 часовой формат)': { en: 'hours  (24 hour format)' },
    'Форсируемое число': { en: 'Forced number' },
    'Форсируемое слово': { en: 'Forced word' },
    цифра: { en: 'number' },
    цифры: { en: 'numbers' },
    цифр: { en: 'numbers' },
    'Как написать': { en: 'How to write' },
    'Формат даты': { en: 'Date format' },
    'Приложение для форсирования определенного числа или текущей даты и времени':
      { en: 'Application to force a specific number or current date and time' },
    'Если у Вас появились предложения или замечания по приложению, то сообщите об этом разработчику напрямую':
      {
        en: 'If you have any suggestions or comments about the application, please contact the developer directly',
      },
    Разработчик: { en: 'Developer' },
    'Алексей Белинский': { en: 'Alexey Belinsky' },
    'Поблагодарить разработчика': { en: 'Thank the developer' },
    Версия: { en: 'Version' },
    'Внимание! Слово не может заканчиваться на букву "О", "C" , "D", "U" и "P", так как форсируемый результат (число) начинается с нуля "0", что не может быть отображено в результате вычисления в калькуляторе.':
      {
        en: 'Attention! The word cannot end with the letter "O", since the forced result (number) starts from zero "O", "C", "D", "U" and "P", which cannot be displayed as a result of the calculation in the calculator.',
      },
    'Дополнительные фишки': { en: 'Additional features' },
  }

  return obj[word] ? obj[word][lng] : word
}

export default language
