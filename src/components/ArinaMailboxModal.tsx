import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Mail,
  BookOpen,
  Calendar,
  User,
  MapPin,
  Trash2,
  RefreshCw,
  Award,
  Sparkles,
  Inbox,
  Lock,
  KeyRound,
  LogOut,
} from 'lucide-react';
import { SubmissionEntry } from '../types';

interface ArinaMailboxModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ArinaMailboxModal({ isOpen, onClose }: ArinaMailboxModalProps) {
  const [submissions, setSubmissions] = useState<SubmissionEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterBooksOnly, setFilterBooksOnly] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('arina_mailbox_authenticated') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleUnlock = (e: FormEvent) => {
    e.preventDefault();
    const clean = pinInput.trim().toLowerCase();
    if (clean === 'arina2026' || clean === 'arina' || clean === '2026' || clean === '1234') {
      setIsAuthenticated(true);
      localStorage.setItem('arina_mailbox_authenticated', 'true');
      setErrorMessage('');
      setPinInput('');
    } else {
      setErrorMessage('Неверный пароль. Доступ к ящику разрешён только Арине.');
    }
  };

  const handleLock = () => {
    localStorage.removeItem('arina_mailbox_authenticated');
    setIsAuthenticated(false);
  };

  const fetchSubmissions = async () => {
    setLoading(true);
    let remoteList: SubmissionEntry[] = [];
    try {
      const res = await fetch('/api/submissions');
      const data = await res.json();
      if (data.success && Array.isArray(data.submissions)) {
        remoteList = data.submissions;
      }
    } catch (e) {
      console.warn('API submissions not reachable, using local storage', e);
    }

    let localList: SubmissionEntry[] = [];
    try {
      const stored = localStorage.getItem('arina_local_submissions');
      if (stored) localList = JSON.parse(stored);
    } catch (e) {
      console.warn('Failed to parse local submissions', e);
    }

    // Combine and deduplicate by id
    const map = new Map<string, SubmissionEntry>();
    [...remoteList, ...localList].forEach((item) => {
      if (item && item.id && !map.has(item.id)) {
        map.set(item.id, item);
      }
    });

    const combined = Array.from(map.values());
    // Sort newest first
    combined.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    setSubmissions(combined);
    setLoading(false);
  };

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      fetchSubmissions();
    }
  }, [isOpen, isAuthenticated]);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Удалить эту запись?')) return;
    try {
      const stored = localStorage.getItem('arina_local_submissions');
      if (stored) {
        const list = JSON.parse(stored);
        localStorage.setItem('arina_local_submissions', JSON.stringify(list.filter((s: any) => s.id !== id)));
      }
    } catch (e) {
      console.warn('Error clearing local storage item', e);
    }
    try {
      const res = await fetch(`/api/submissions/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setSubmissions((prev) => prev.filter((s) => s.id !== id));
      }
    } catch (e) {
      console.error('Failed to delete on server', e);
      setSubmissions((prev) => prev.filter((s) => s.id !== id));
    }
  };

  if (!isOpen) return null;

  const filtered = filterBooksOnly
    ? submissions.filter((s) => s.lovesReading && s.bookTitle)
    : submissions;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-[#faf7f2] w-full max-w-3xl max-h-[90vh] rounded-3xl shadow-2xl border border-stone-200 flex flex-col overflow-hidden text-left"
        >
          {!isAuthenticated ? (
            <div className="flex flex-col h-full">
              <div className="p-5 sm:p-6 border-b border-stone-200 bg-[#fffefc] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
                    <Lock className="w-5 h-5 text-amber-800" />
                  </div>
                  <div>
                    <h3 className="font-serif-display font-bold text-xl text-stone-900">
                      Личный ящик Арины
                    </h3>
                    <p className="text-xs text-stone-500 font-sans-ui">
                      Доступ только для хозяйки открытки
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl border border-stone-200 hover:bg-stone-100 text-stone-600 transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-8 sm:p-12 flex flex-col items-center text-center space-y-5 my-auto">
                <div className="w-16 h-16 rounded-2xl bg-amber-100/70 border border-amber-200 flex items-center justify-center text-amber-800 shadow-xs">
                  <KeyRound className="w-8 h-8" />
                </div>

                <div className="max-w-md space-y-2">
                  <h4 className="font-serif-display text-2xl font-bold text-stone-900">
                    Доступ только для автора
                  </h4>
                  <p className="text-sm text-stone-600 font-sans-ui leading-relaxed">
                    Здесь хранятся все полученные отзывы, контакты и рекомендации книг участников МФМ. Посторонним вход закрыт.
                  </p>
                </div>

                <form onSubmit={handleUnlock} className="w-full max-w-xs space-y-3 pt-2">
                  <div>
                    <input
                      type="password"
                      value={pinInput}
                      onChange={(e) => {
                        setPinInput(e.target.value);
                        if (errorMessage) setErrorMessage('');
                      }}
                      placeholder="Введите пароль"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 text-center font-mono text-sm tracking-widest focus:outline-hidden focus:border-amber-600 shadow-inner"
                      autoFocus
                    />
                    {errorMessage && (
                      <p className="text-xs text-rose-600 font-medium mt-2 font-sans-ui">
                        {errorMessage}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-xl bg-amber-700 hover:bg-amber-800 text-white text-sm font-bold shadow-xs transition-all cursor-pointer"
                  >
                    Войти в ящик
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <>
              {/* Header */}
          <div className="p-5 sm:p-6 border-b border-stone-200 bg-[#fffefc] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
                <Mail className="w-5 h-5 text-amber-800" />
              </div>
              <div>
                <h3 className="font-serif-display font-bold text-xl text-stone-900">
                  Почтовый ящик Арины • МФМ 2026
                </h3>
                <p className="text-xs text-stone-500 font-sans-ui">
                  Все полученные послания, контакты и рекомендации книг участников
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={fetchSubmissions}
                disabled={loading}
                className="p-2 rounded-xl border border-stone-200 hover:bg-stone-100 text-stone-600 transition-all cursor-pointer"
                title="Обновить"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </button>
              <button
                onClick={handleLock}
                className="p-2 rounded-xl border border-stone-200 hover:bg-rose-50 text-stone-600 hover:text-rose-700 transition-all cursor-pointer"
                title="Заблокировать ящик (Выйти)"
              >
                <LogOut className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-xl border border-stone-200 hover:bg-stone-100 text-stone-600 transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Subheader Filters */}
          <div className="px-6 py-3 bg-stone-100/70 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs font-sans-ui">
            <div className="flex items-center gap-2">
              <span className="font-bold text-stone-700">
                Всего записей: {submissions.length}
              </span>
              <span className="text-stone-300">•</span>
              <span className="text-stone-600">
                С рекомендациями: {submissions.filter((s) => s.bookTitle || s.recommendationTitle).length}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setFilterBooksOnly(false)}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  !filterBooksOnly
                    ? 'bg-stone-900 text-white'
                    : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
                }`}
              >
                Все
              </button>
              <button
                onClick={() => setFilterBooksOnly(true)}
                className={`px-3 py-1 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                  filterBooksOnly
                    ? 'bg-rose-700 text-white'
                    : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
                }`}
              >
                <Sparkles className="w-3 h-3" />
                <span>С рекомендациями</span>
              </button>
            </div>
          </div>

          {/* Submissions List */}
          <div className="p-6 overflow-y-auto space-y-4 flex-1">
            {loading ? (
              <div className="text-center py-12 text-stone-500 font-sans-ui text-sm flex flex-col items-center gap-2">
                <RefreshCw className="w-6 h-6 animate-spin text-amber-700" />
                <span>Загрузка писем...</span>
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-12 text-stone-400 font-sans-ui text-sm flex flex-col items-center gap-3">
                <Inbox className="w-10 h-10 text-stone-300" />
                <p>Пока нет входящих посланий. Они появятся здесь сразу после заполнения формы гостями!</p>
              </div>
            ) : (
              filtered.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs space-y-3 relative group"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-serif-display font-bold text-lg text-stone-900">
                          {item.name}
                        </span>
                        {item.countryCity && (
                          <span className="px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 text-[11px] font-sans-ui flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-stone-400" />
                            {item.countryCity}
                          </span>
                        )}
                        {item.quizScore !== null && (
                          <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[10px] font-bold flex items-center gap-1">
                            <Award className="w-3 h-3" />
                            {item.quizScore}/5 в викторине
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-stone-500 font-sans-ui mt-0.5 flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {item.createdAtFormatted}
                        </span>
                        {item.contact && (
                          <span className="font-semibold text-rose-700">
                            Контакт: {item.contact}
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-all"
                      title="Удалить"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {item.howMet && (
                    <div className="text-xs text-stone-600 font-sans-ui italic bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                      «{item.howMet}»
                    </div>
                  )}

                  {/* Media / Book / Game Recommendation block */}
                  {(item.lovesReading || item.bookTitle || item.recommendationTitle) && (item.bookTitle || item.recommendationTitle) ? (
                    <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-xs font-sans-ui space-y-2">
                      <div className="flex items-center gap-2 font-bold text-amber-950 text-sm">
                        <span className="text-base">
                          {item.recommendationType === 'game'
                            ? '🎮'
                            : item.recommendationType === 'movie'
                            ? '🍿'
                            : item.recommendationType === 'series'
                            ? '📺'
                            : item.recommendationType === 'article'
                            ? '📰'
                            : '📖'}
                        </span>
                        <span>
                          {item.recommendationTitle || item.bookTitle}{' '}
                          {(item.recommendationCreator || item.bookAuthor)
                            ? `— ${item.recommendationCreator || item.bookAuthor}`
                            : ''}
                        </span>
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 ml-auto">
                          {item.recommendationType === 'game'
                            ? 'Игра'
                            : item.recommendationType === 'movie'
                            ? 'Фильм'
                            : item.recommendationType === 'series'
                            ? 'Сериал'
                            : item.recommendationType === 'article'
                            ? 'Статья'
                            : 'Книга'}
                        </span>
                      </div>

                      {(item.recommendationReview || item.bookReview) && (
                        <p className="text-stone-700 leading-relaxed">
                          <strong>Впечатления / Отзыв:</strong> {item.recommendationReview || item.bookReview}
                        </p>
                      )}

                      {item.favoriteQuote && (
                        <p className="text-stone-600 italic">
                          <strong>
                            {item.recommendationType === 'game' ? 'Момент / Персонаж:' : 'Цитата / Момент:'}
                          </strong>{' '}
                          «{item.favoriteQuote}»
                        </p>
                      )}

                      {item.recommendationTarget && (
                        <p className="text-amber-900">
                          <strong>Кому советует:</strong> {item.recommendationTarget}
                        </p>
                      )}
                    </div>
                  ) : null}

                  {item.interests && item.interests.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {item.interests.map((int) => (
                        <span
                          key={int}
                          className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 text-[10px]"
                        >
                          {int}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-4 bg-[#fffefc] border-t border-stone-200 text-center text-xs text-stone-500 font-sans-ui">
            Копия каждого отправленного отзыва также направляется на почту <span className="font-semibold text-stone-800">arinast101@gmail.com</span>
          </div>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
