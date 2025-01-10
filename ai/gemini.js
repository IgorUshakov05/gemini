const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const time = require("./time");
async function chaenl(useText) {
  try {
    // Выбираем модель Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Формируем запрос для имитации речи с ошибками и коротких ответов
    let prompt = `Сгенерируй очень мотивирующий небольшой текст на тему:${useText}
    Можно использовать ненормативную лексику, но чтобы прям в тему была и поощеряла задуматься! Но в один абзац
    `;

    // Генерация контента с использованием модели
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    console.log(text);

    return { success: true, message: text };
  } catch (e) {
    console.log(e);
    return { success: false, message: e };
  }
}

async function montivationOnDay() {
  try {
    // Выбираем модель Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Формируем запрос для имитации речи с ошибками и коротких ответов
    let prompt = `${time()}. Текст не большой!`;

    // Генерация контента с использованием модели
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    console.log(text);

    return { success: true, message: text };
  } catch (e) {
    console.log(e);
    return { success: false, message: e };
  }
}

async function engWord() {
  try {
    // Выбираем модель Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    let prompt = `Generate a JSON object with 5 random English words from different categories, including IT, business, and everyday conversation, along with their Russian translations. Make sure the words are not basic or too simple. Format it for Telegram as follows:
    {
      "words": [
        {"word": "algorithm", "translation": "алгоритм"},
        {"word": "startup", "translation": "стартап"},
        {"word": "browser", "translation": "браузер"},
        {"word": "feedback", "translation": "отзыв"},
        {"word": "innovation", "translation": "инновация"}
      ]
    }`;

    // Генерация контента с использованием модели
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    let parsedResponse;
    parsedResponse = text.slice(text.indexOf("{"), text.lastIndexOf("}") + 1);

    const validatedResponse = JSON.parse(parsedResponse);
    console.log(validatedResponse);
    return { success: true, message: validatedResponse };
  } catch (e) {
    console.log(e);
    return { success: false, message: e };
  }
}

async function say(useText) {
  try {
    // Выбираем модель Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Формируем запрос для имитации речи с ошибками и коротких ответов
    let prompt = useText;

    // Генерация контента с использованием модели
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    console.log(text);

    return { success: true, message: text };
  } catch (e) {
    console.log(e);
    return { success: false, message: e };
  }
}

module.exports = { chaenl, say, montivationOnDay, engWord };
