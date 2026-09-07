import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;
const DATA_DIR = path.join(process.cwd(), 'data');
const SUBMISSIONS_FILE = path.join(DATA_DIR, 'submissions.json');
const TARGET_EMAIL = process.env.RECIPIENT_EMAIL || 'arinast101@gmail.com';

// Ensure data folder and file exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(SUBMISSIONS_FILE)) {
  fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify([], null, 2), 'utf-8');
}

app.use(express.json({ limit: '2mb' }));

// Helper to read submissions
function getSubmissions(): any[] {
  try {
    const raw = fs.readFileSync(SUBMISSIONS_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

// Helper to save submissions
function saveSubmissions(list: any[]): void {
  fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(list, null, 2), 'utf-8');
}

// API: Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// API: Get submissions
app.get('/api/submissions', (req, res) => {
  const submissions = getSubmissions();
  res.json({ success: true, count: submissions.length, submissions });
});

// API: Submit survey & book review
app.post('/api/submit-survey', async (req, res) => {
  try {
    const {
      name,
      countryCity,
      howMet,
      interests = [],
      recommendationType = 'book',
      lovesReading,
      recommendationTitle,
      recommendationCreator,
      recommendationReview,
      bookTitle,
      bookAuthor,
      bookReview,
      favoriteQuote,
      recommendationTarget,
      hasSouvenirToExchange,
      souvenirLink,
      contact,
      quizScore,
    } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, error: 'Пожалуйста, укажите ваше имя или никнейм' });
    }

    const resolvedTitle = (recommendationTitle || bookTitle || '').trim();
    const resolvedCreator = (recommendationCreator || bookAuthor || '').trim();
    const resolvedReview = (recommendationReview || bookReview || '').trim();

    const newEntry = {
      id: 'sub_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      timestamp: new Date().toISOString(),
      createdAtFormatted: new Intl.DateTimeFormat('ru-RU', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }).format(new Date()),
      name: String(name).trim(),
      countryCity: countryCity ? String(countryCity).trim() : 'Не указано',
      howMet: howMet ? String(howMet).trim() : '',
      interests: Array.isArray(interests) ? interests : [],
      recommendationType: recommendationType || 'book',
      lovesReading: Boolean(lovesReading),
      recommendationTitle: resolvedTitle,
      recommendationCreator: resolvedCreator,
      recommendationReview: resolvedReview,
      bookTitle: resolvedTitle,
      bookAuthor: resolvedCreator,
      bookReview: resolvedReview,
      favoriteQuote: favoriteQuote ? String(favoriteQuote).trim() : '',
      recommendationTarget: recommendationTarget ? String(recommendationTarget).trim() : '',
      hasSouvenirToExchange: Boolean(hasSouvenirToExchange),
      souvenirLink: souvenirLink ? String(souvenirLink).trim() : '',
      contact: contact ? String(contact).trim() : '',
      quizScore: typeof quizScore === 'number' ? quizScore : null,
    };

    const currentList = getSubmissions();
    currentList.unshift(newEntry);
    saveSubmissions(currentList);

    // Try optional SMTP if environment variables provided
    let emailSent = false;
    let emailError: string | null = null;

    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT) || 587,
          secure: process.env.SMTP_SECURE === 'true',
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        const subject = `[МФМ 2026] Новое послание и книга от: ${newEntry.name} (${newEntry.countryCity})`;
        const textBody = `
Привет, Арина!

Тебе пришло новое послание от участника Международного молодежного фестиваля (МФМ 2026)!

От кого: ${newEntry.name}
Город / Страна: ${newEntry.countryCity}
Контакты для связи: ${newEntry.contact || 'Не указаны'}
Как познакомились: ${newEntry.howMet || 'Не указано'}
Интересы: ${newEntry.interests.join(', ') || 'Не выбраны'}
${newEntry.hasSouvenirToExchange ? `🎁 Ссылка на ответный сувенир: ${newEntry.souvenirLink || 'Есть сувенир для обмена'}\n` : ''}

${newEntry.lovesReading ? `
--- РЕКОМЕНДАЦИЯ КНИГИ / НОВЕЛЛЫ ---
Название: ${newEntry.bookTitle || 'Не указано'}
Автор: ${newEntry.bookAuthor || 'Не указан'}
Чем зацепила и о чем:
${newEntry.bookReview || 'Без подробностей'}

Любимая цитата / мысль:
${newEntry.favoriteQuote || '-'}

Кому рекомендует: ${newEntry.recommendationTarget || '-'}
` : 'Человек отметил, что книги пока не в приоритете, но передает теплый привет!'}

Результат викторины о России: ${newEntry.quizScore !== null ? `${newEntry.quizScore}/5 баллов` : 'Не проходил'}
Дата отправки: ${newEntry.createdAtFormatted}
        `.trim();

        await transporter.sendMail({
          from: `"МФМ 2026 Сувенир" <${process.env.SMTP_USER}>`,
          to: TARGET_EMAIL,
          subject,
          text: textBody,
        });
        emailSent = true;
      } catch (err: any) {
        console.error('SMTP Delivery error:', err.message);
        emailError = err.message;
      }
    }

    // Build pre-filled mailto URL for direct email client execution
    const mailSubject = encodeURIComponent(`[МФМ 2026] Привет от ${newEntry.name}! Моя любимая книга и послание`);
    const mailBody = encodeURIComponent(
      `Привет, Арина!\n\n` +
      `Пишет ${newEntry.name} из ${newEntry.countryCity}.\n` +
      `Мы пересеклись на МФМ 2026!\n` +
      (newEntry.contact ? `Мой контакт: ${newEntry.contact}\n` : '') +
      (newEntry.hasSouvenirToExchange && newEntry.souvenirLink ? `🎁 Мой сувенир в ответ: ${newEntry.souvenirLink}\n` : '') +
      (newEntry.howMet ? `Заметка о встрече: ${newEntry.howMet}\n\n` : '\n') +
      (newEntry.lovesReading && newEntry.bookTitle
        ? `Хочу поделиться с тобой любимой книгой/новеллой!\n` +
          `📖 Название: ${newEntry.bookTitle}\n` +
          `✍️ Автор: ${newEntry.bookAuthor || 'Не указан'}\n\n` +
          `Почему она мне понравилась и о чем:\n${newEntry.bookReview}\n\n` +
          (newEntry.favoriteQuote ? `Цитата:\n"${newEntry.favoriteQuote}"\n\n` : '')
        : `Был(а) очень рад(а) получить твою цифровую открытку программиста!\n`) +
      `Удачи на МФМ 2026 и в программировании!`
    );
    const mailtoUrl = `mailto:${TARGET_EMAIL}?subject=${mailSubject}&body=${mailBody}`;

    return res.json({
      success: true,
      id: newEntry.id,
      emailSent,
      emailError,
      targetEmail: TARGET_EMAIL,
      mailtoUrl,
      entry: newEntry,
    });
  } catch (error: any) {
    console.error('Submit error:', error);
    res.status(500).json({ success: false, error: 'Не удалось сохранить ответ' });
  }
});

// API: Delete a submission (for Arina's mailbox management)
app.delete('/api/submissions/:id', (req, res) => {
  try {
    const { id } = req.params;
    let list = getSubmissions();
    const initialLen = list.length;
    list = list.filter((item) => item.id !== id);
    if (list.length === initialLen) {
      return res.status(404).json({ success: false, error: 'Запись не найдена' });
    }
    saveSubmissions(list);
    res.json({ success: true, remaining: list.length });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Ошибка удаления' });
  }
});

// Setup Vite or static serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
