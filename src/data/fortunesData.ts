// Heartfelt tea fortune scrolls database (100 unique predictions)
// Tones: soulful, good, funny, caution, love, study
// Rarities: common, rare, legendary

export type FortuneTone = 'soulful' | 'good' | 'funny' | 'caution' | 'love' | 'study';
export type FortuneRarity = 'legendary' | 'rare' | 'common';

export interface FortuneItem {
  id: string;
  category: 'peace' | 'love' | 'study' | 'day' | 'week' | 'funny' | 'caution';
  categoryLabel: string;
  categoryBadgeBg: string;
  categoryTextColor: string;
  tone: FortuneTone;
  toneLabel: string;
  rarity: FortuneRarity;
  rarityLabel: string;
  icon: string;
  headline: string;
  text: string;
  teaSuggestion: string;
}

export const FORTUNES_COLLECTION: FortuneItem[] = [
  {
    "id": "f-peace-1",
    "category": "peace",
    "categoryLabel": "Спокойствие души",
    "categoryBadgeBg": "bg-emerald-100 border-emerald-300",
    "categoryTextColor": "text-emerald-900",
    "tone": "soulful",
    "toneLabel": "Душевное 🕊️",
    "rarity": "rare",
    "rarityLabel": "Редкий свиток ✨",
    "icon": "🕊️",
    "headline": "Отпусти тревогу и доверься судьбе",
    "text": "То, о чём ты так сильно переживаешь в последнее время, разрешится самым лучшим и неожиданным образом. Просто прекрати изводить себя мыслями и доверься судьбе — всё обязательно будет хорошо!",
    "teaSuggestion": "Успокаивающий сбор с мятой, чабрецом и ложечкой мёда"
  },
  {
    "id": "f-peace-2",
    "category": "peace",
    "categoryLabel": "Спокойствие души",
    "categoryBadgeBg": "bg-teal-100 border-teal-300",
    "categoryTextColor": "text-teal-900",
    "tone": "soulful",
    "toneLabel": "Душевное 🕊️",
    "rarity": "common",
    "rarityLabel": "Доброе напутствие 📜",
    "icon": "🌿",
    "headline": "Узелок распутается сам собой",
    "text": "Ситуация, которая сейчас кажется запутанным клубком, распутается сама собой уже в ближайшие дни. Перестань прокручивать в голове тревожные сценарии — жизнь уже готовит для тебя благополучное решение.",
    "teaSuggestion": "Травяной иван-чай с душицей и мелиссой"
  },
  {
    "id": "f-peace-3",
    "category": "peace",
    "categoryLabel": "Спокойствие души",
    "categoryBadgeBg": "bg-sky-100 border-sky-300",
    "categoryTextColor": "text-sky-900",
    "tone": "soulful",
    "toneLabel": "Душевное 🕊️",
    "rarity": "legendary",
    "rarityLabel": "Легендарный свиток 👑",
    "icon": "🌊",
    "headline": "Выдохни: впереди светлая полоса",
    "text": "То, что сейчас тревожит твоё сердце, совсем скоро покажется лишь маленьким пройденным этапом. Позволь себе отдохнуть, выпить горячего чая и ни о чём не беспокоиться: ты в полной безопасности.",
    "teaSuggestion": "Липовый чай с ромашкой и капелькой малинового варенья"
  },
  {
    "id": "f-peace-4",
    "category": "peace",
    "categoryLabel": "Спокойствие души",
    "categoryBadgeBg": "bg-emerald-100 border-emerald-300",
    "categoryTextColor": "text-emerald-900",
    "tone": "soulful",
    "toneLabel": "Душевное 🕊️",
    "rarity": "common",
    "rarityLabel": "Доброе напутствие 📜",
    "icon": "🕯️",
    "headline": "Тишина внутри важнее шума снаружи",
    "text": "В суете дней найди пять минут, чтобы просто прислушаться к себе. Всё, что истинно твоё, никуда от тебя не уйдёт. Храни мир в сердце, как огонёк в ладонях.",
    "teaSuggestion": "Мятный чай с цветами липы и василька"
  },
  {
    "id": "f-peace-5",
    "category": "peace",
    "categoryLabel": "Спокойствие души",
    "categoryBadgeBg": "bg-teal-100 border-teal-300",
    "categoryTextColor": "text-teal-900",
    "tone": "soulful",
    "toneLabel": "Душевное 🕊️",
    "rarity": "common",
    "rarityLabel": "Доброе напутствие 📜",
    "icon": "🌲",
    "headline": "Твои корни крепче любых бурь",
    "text": "Вспомни, сколько трудностей ты уже преодолел(а). Ты сильнее, чем кажешься в моменты усталости. Подобно вековому кедру, ты выстоишь под любым ветром.",
    "teaSuggestion": "Хвойный чай со смородиновым листом и кедровыми орешками"
  },
  {
    "id": "f-peace-6",
    "category": "peace",
    "categoryLabel": "Спокойствие души",
    "categoryBadgeBg": "bg-sky-100 border-sky-300",
    "categoryTextColor": "text-sky-900",
    "tone": "soulful",
    "toneLabel": "Душевное 🕊️",
    "rarity": "rare",
    "rarityLabel": "Редкий свиток ✨",
    "icon": "🌅",
    "headline": "Рассвет наступает после самой тёмной ночи",
    "text": "Если сейчас кажется, что силы на исходе — помни: именно перед рассветом сгущается туман. Солнце уже на подходе, приготовься встречать ясный и радостный день.",
    "teaSuggestion": "Бодрящий настой шиповника с мёдом"
  },
  {
    "id": "f-peace-7",
    "category": "peace",
    "categoryLabel": "Спокойствие души",
    "categoryBadgeBg": "bg-emerald-100 border-emerald-300",
    "categoryTextColor": "text-emerald-900",
    "tone": "soulful",
    "toneLabel": "Душевное 🕊️",
    "rarity": "common",
    "rarityLabel": "Доброе напутствие 📜",
    "icon": "🍃",
    "headline": "Не суди себя за медленный шаг",
    "text": "Даже малый шаг вперёд — это движение. Ты не обязан(а) бежать марафон каждый день. Дай себе право на паузу, глоток тёплого чая и глубокий вдох.",
    "teaSuggestion": "Зелёный чай с жасмином и мелиссой"
  },
  {
    "id": "f-peace-8",
    "category": "peace",
    "categoryLabel": "Спокойствие души",
    "categoryBadgeBg": "bg-teal-100 border-teal-300",
    "categoryTextColor": "text-teal-900",
    "tone": "soulful",
    "toneLabel": "Душевное 🕊️",
    "rarity": "legendary",
    "rarityLabel": "Легендарный свиток 👑",
    "icon": "✨",
    "headline": "Твоя искренность защищает тебя",
    "text": "Когда ты остаёшься собой и не надеваешь чужих масок, вселенная сама отводит от тебя фальшивых людей и приводит тех, кто полюбит тебя настоящим.",
    "teaSuggestion": "Белый чай с лепестками яблони"
  },
  {
    "id": "f-peace-9",
    "category": "peace",
    "categoryLabel": "Спокойствие души",
    "categoryBadgeBg": "bg-sky-100 border-sky-300",
    "categoryTextColor": "text-sky-900",
    "tone": "soulful",
    "toneLabel": "Душевное 🕊️",
    "rarity": "common",
    "rarityLabel": "Доброе напутствие 📜",
    "icon": "🏡",
    "headline": "Дом там, где твоё сердце спокойно",
    "text": "Где бы ты ни находился — на фестивале, в поезде или в чужом городе — носи уют внутри себя. Чашка горячего чая и добрые мысли мгновенно создают домашнее тепло.",
    "teaSuggestion": "Иван-чай с черникой и мятой"
  },
  {
    "id": "f-peace-10",
    "category": "peace",
    "categoryLabel": "Спокойствие души",
    "categoryBadgeBg": "bg-emerald-100 border-emerald-300",
    "categoryTextColor": "text-emerald-900",
    "tone": "soulful",
    "toneLabel": "Душевное 🕊️",
    "rarity": "rare",
    "rarityLabel": "Редкий свиток ✨",
    "icon": "🌈",
    "headline": "Всё встанет на свои места",
    "text": "Пазл твоей жизни сейчас складывается. Даже те кусочки, назначение которых пока неясно, окажутся важной частью красивой и счастливой картины.",
    "teaSuggestion": "Чай с земляничным листом и долькой яблока"
  },
  {
    "id": "f-peace-11",
    "category": "peace",
    "categoryLabel": "Спокойствие души",
    "categoryBadgeBg": "bg-teal-100 border-teal-300",
    "categoryTextColor": "text-teal-900",
    "tone": "soulful",
    "toneLabel": "Душевное 🕊️",
    "rarity": "common",
    "rarityLabel": "Доброе напутствие 📜",
    "icon": "☁️",
    "headline": "Тревожные мысли — это просто облака",
    "text": "Облака приходят и уходят, а небо остаётся чистым и высоким. Не держись за хмурые мысли — позволь ветру времени унести их прочь.",
    "teaSuggestion": "Ромашковый настой с капелькой липового мёда"
  },
  {
    "id": "f-peace-12",
    "category": "peace",
    "categoryLabel": "Спокойствие души",
    "categoryBadgeBg": "bg-sky-100 border-sky-300",
    "categoryTextColor": "text-sky-900",
    "tone": "soulful",
    "toneLabel": "Душевное 🕊️",
    "rarity": "common",
    "rarityLabel": "Доброе напутствие 📜",
    "icon": "🌸",
    "headline": "Ты заслуживаешь доброты и заботы",
    "text": "Относись к себе так же нежно и заботливо, как ты относишься к самому близкому другу. Побалуй себя чем-то тёплым прямо сегодня.",
    "teaSuggestion": "Чай с лепестками пиона и малиной"
  },
  {
    "id": "f-love-1",
    "category": "love",
    "categoryLabel": "Любовь и сердце",
    "categoryBadgeBg": "bg-rose-100 border-rose-300",
    "categoryTextColor": "text-rose-900",
    "tone": "love",
    "toneLabel": "Любовь 💖",
    "rarity": "rare",
    "rarityLabel": "Редкий свиток ✨",
    "icon": "💖",
    "headline": "Особенная встреча уже близко",
    "text": "Очень скоро в твоей жизни появится особенный человек. Его взгляд и тёплые слова заставят твоё сердце биться чаще, а рядом с ним ты почувствуешь себя невероятно уютно и спокойно.",
    "teaSuggestion": "Чай со спелой земляникой и лепестками роз"
  },
  {
    "id": "f-love-2",
    "category": "love",
    "categoryLabel": "Любовь и сердце",
    "categoryBadgeBg": "bg-pink-100 border-pink-300",
    "categoryTextColor": "text-pink-900",
    "tone": "love",
    "toneLabel": "Любовь 💖",
    "rarity": "common",
    "rarityLabel": "Доброе напутствие 📜",
    "icon": "✨",
    "headline": "Кто-то тайно восхищается тобой",
    "text": "Кто-то прямо сейчас тайно тобой восхищается и невольно улыбается, вспоминая твой голос или улыбку. Любовь бродит где-то совсем рядом — оглянись вокруг и не бойся открыть своё сердце!",
    "teaSuggestion": "Смородиновый чай с листочками мяты"
  },
  {
    "id": "f-love-3",
    "category": "love",
    "categoryLabel": "Любовь и сердце",
    "categoryBadgeBg": "bg-amber-100 border-amber-300",
    "categoryTextColor": "text-amber-900",
    "tone": "love",
    "toneLabel": "Любовь 💖",
    "rarity": "legendary",
    "rarityLabel": "Легендарный свиток 👑",
    "icon": "🌸",
    "headline": "Твоя искренность притягивает родственную душу",
    "text": "Случайный взгляд или короткий разговор в самый неожиданный момент положат начало трогательной романтической истории. Доверься велению сердца — оно точно не ошибётся.",
    "teaSuggestion": "Чай с брусникой и корицей"
  },
  {
    "id": "f-love-4",
    "category": "love",
    "categoryLabel": "Любовь и сердце",
    "categoryBadgeBg": "bg-rose-100 border-rose-300",
    "categoryTextColor": "text-rose-900",
    "tone": "love",
    "toneLabel": "Любовь 💖",
    "rarity": "common",
    "rarityLabel": "Доброе напутствие 📜",
    "icon": "💌",
    "headline": "Тёплое сообщение согреет твой вечер",
    "text": "Человек, о котором ты думаешь, скоро напомнит о себе. Пара добрых строк принесёт улыбку и напомнит, что расстояние не властно над искренней симпатией.",
    "teaSuggestion": "Чай с вишнёвым листом и мёдом"
  },
  {
    "id": "f-love-5",
    "category": "love",
    "categoryLabel": "Любовь и сердце",
    "categoryBadgeBg": "bg-pink-100 border-pink-300",
    "categoryTextColor": "text-pink-900",
    "tone": "love",
    "toneLabel": "Любовь 💖",
    "rarity": "rare",
    "rarityLabel": "Редкий свиток ✨",
    "icon": "🌹",
    "headline": "Разговор по душам под звёздами",
    "text": "Впереди вечер, наполненный глубоким и честным разговором. Вы поймёте друг друга с полуслова, будто были знакомы целую вечность.",
    "teaSuggestion": "Пряный чай с бадьяном и яблоком"
  },
  {
    "id": "f-love-6",
    "category": "love",
    "categoryLabel": "Любовь и сердце",
    "categoryBadgeBg": "bg-amber-100 border-amber-300",
    "categoryTextColor": "text-amber-900",
    "tone": "love",
    "toneLabel": "Любовь 💖",
    "rarity": "common",
    "rarityLabel": "Доброе напутствие 📜",
    "icon": "💫",
    "headline": "Случайная встреча станет судьбоносной",
    "text": "Не отказывайся от спонтанных предложений прогуляться или выпить чаю. Самые красивые истории любви начинаются с самых незапланированных шагов.",
    "teaSuggestion": "Облепиховый чай с имбирём"
  },
  {
    "id": "f-love-7",
    "category": "love",
    "categoryLabel": "Любовь и сердце",
    "categoryBadgeBg": "bg-rose-100 border-rose-300",
    "categoryTextColor": "text-rose-900",
    "tone": "love",
    "toneLabel": "Любовь 💖",
    "rarity": "legendary",
    "rarityLabel": "Легендарный свиток 👑",
    "icon": "💞",
    "headline": "Взаимность расцветёт, как весенний сад",
    "text": "Сомнения рассеются: чувства, которые ты бережно хранишь в сердце, найдут самый тёплый отклик. Впереди время нежности, заботы и взаимной поддержки.",
    "teaSuggestion": "Белый чай с лепестками жасмина и клубникой"
  },
  {
    "id": "f-love-8",
    "category": "love",
    "categoryLabel": "Любовь и сердце",
    "categoryBadgeBg": "bg-pink-100 border-pink-300",
    "categoryTextColor": "text-pink-900",
    "tone": "love",
    "toneLabel": "Любовь 💖",
    "rarity": "common",
    "rarityLabel": "Доброе напутствие 📜",
    "icon": "🕊️",
    "headline": "Прости старую обиду и освободи место для счастья",
    "text": "Отпустив то, что ранило в прошлом, ты откроешь дверь для чистой и бережной любви. Твоё сердце готово к новому красивому полёту.",
    "teaSuggestion": "Успокаивающий настой мяты и мелиссы"
  },
  {
    "id": "f-love-9",
    "category": "love",
    "categoryLabel": "Любовь и сердце",
    "categoryBadgeBg": "bg-amber-100 border-amber-300",
    "categoryTextColor": "text-amber-900",
    "tone": "love",
    "toneLabel": "Любовь 💖",
    "rarity": "rare",
    "rarityLabel": "Редкий свиток ✨",
    "icon": "🧁",
    "headline": "Уютный чай на двоих",
    "text": "Скоро тебе предстоит разделить чашку чая с тем, кто сделает этот момент незабываемым. Никаких телефонов — только глаза напротив и искренний смех.",
    "teaSuggestion": "Классический цейлонский чай с чабрецом и пряником"
  },
  {
    "id": "f-love-10",
    "category": "love",
    "categoryLabel": "Любовь и сердце",
    "categoryBadgeBg": "bg-rose-100 border-rose-300",
    "categoryTextColor": "text-rose-900",
    "tone": "love",
    "toneLabel": "Любовь 💖",
    "rarity": "common",
    "rarityLabel": "Доброе напутствие 📜",
    "icon": "🌙",
    "headline": "Кто-то засыпает с мыслями о тебе",
    "text": "Даже когда кажется, что ты одинок(а), в этом мире есть человек, для которого воспоминание о твоём голосе — лучшее утешение перед сном.",
    "teaSuggestion": "Лавандовый чай с липой"
  },
  {
    "id": "f-love-11",
    "category": "love",
    "categoryLabel": "Любовь и сердце",
    "categoryBadgeBg": "bg-pink-100 border-pink-300",
    "categoryTextColor": "text-pink-900",
    "tone": "love",
    "toneLabel": "Любовь 💖",
    "rarity": "rare",
    "rarityLabel": "Редкий свиток ✨",
    "icon": "🎁",
    "headline": "Неожиданный знак внимания",
    "text": "Жди милого сюрприза или неожиданного комплимента, который заставит твои щёки вспыхнуть румянцем, а сердце — улыбнуться.",
    "teaSuggestion": "Земляничный чай с лепестками календулы"
  },
  {
    "id": "f-love-12",
    "category": "love",
    "categoryLabel": "Любовь и сердце",
    "categoryBadgeBg": "bg-amber-100 border-amber-300",
    "categoryTextColor": "text-amber-900",
    "tone": "love",
    "toneLabel": "Любовь 💖",
    "rarity": "common",
    "rarityLabel": "Доброе напутствие 📜",
    "icon": "☀️",
    "headline": "Твоя улыбка согревает сильнее солнца",
    "text": "Улыбайся чаще: твоя искренняя радость обладает магической силой притягивать к тебе самых добрых и преданных людей.",
    "teaSuggestion": "Чай с лимоном, имбирём и мёдом"
  },
  {
    "id": "f-love-13",
    "category": "love",
    "categoryLabel": "Любовь и сердце",
    "categoryBadgeBg": "bg-rose-100 border-rose-300",
    "categoryTextColor": "text-rose-900",
    "tone": "love",
    "toneLabel": "Любовь 💖",
    "rarity": "legendary",
    "rarityLabel": "Легендарный свиток 👑",
    "icon": "💎",
    "headline": "Любовь, проверенная временем и верностью",
    "text": "Тебе суждено испытать глубокую, зрелую любовь, которая не боится невзгод и ветров. Береги чистоту помыслов — судьба уже плетёт этот драгоценный узор.",
    "teaSuggestion": "Выдержанный шу пуэр с хризантемой"
  },
  {
    "id": "f-love-14",
    "category": "love",
    "categoryLabel": "Любовь и сердце",
    "categoryBadgeBg": "bg-pink-100 border-pink-300",
    "categoryTextColor": "text-pink-900",
    "tone": "love",
    "toneLabel": "Любовь 💖",
    "rarity": "common",
    "rarityLabel": "Доброе напутствие 📜",
    "icon": "🤝",
    "headline": "Крепкое дружеское плечо рядом",
    "text": "Настоящая любовь всегда вырастает из крепкой дружбы. Обрати внимание на тех, кто рядом с тобой в горе и радости — там скрыто самое ценное.",
    "teaSuggestion": "Алтайский сбор с курильским чаем"
  },
  {
    "id": "f-love-15",
    "category": "love",
    "categoryLabel": "Любовь и сердце",
    "categoryBadgeBg": "bg-amber-100 border-amber-300",
    "categoryTextColor": "text-amber-900",
    "tone": "love",
    "toneLabel": "Любовь 💖",
    "rarity": "rare",
    "rarityLabel": "Редкий свиток ✨",
    "icon": "🎇",
    "headline": "Фейерверк эмоций на фестивале",
    "text": "Эти дни на МФМ 2026 подарят тебе знакомство, о котором ты с упоением будешь рассказывать друзьям спустя много лет. Будь открыт(а) общению!",
    "teaSuggestion": "Каркаде с ягодами малины и долькой апельсина"
  },
  {
    "id": "f-study-1",
    "category": "study",
    "categoryLabel": "Учёба и экзамены",
    "categoryBadgeBg": "bg-indigo-100 border-indigo-300",
    "categoryTextColor": "text-indigo-900",
    "tone": "study",
    "toneLabel": "Экзамены & Учёба 🎓",
    "rarity": "common",
    "rarityLabel": "Доброе напутствие 📜",
    "icon": "🎓",
    "headline": "Экзамен будет сдан на отлично!",
    "text": "Ты обязательно успешно сдашь все экзамены и справишься с любым сложным испытанием! Все твои старания, волнения и бессонные ночи окупятся сполна. Главное — выдохни перед дверью и верь в свои силы.",
    "teaSuggestion": "Бодрящий черный чай с лимоном и мятой"
  },
  {
    "id": "f-study-2",
    "category": "study",
    "categoryLabel": "Учёба и экзамены",
    "categoryBadgeBg": "bg-violet-100 border-violet-300",
    "categoryTextColor": "text-violet-900",
    "tone": "study",
    "toneLabel": "Экзамены & Учёба 🎓",
    "rarity": "rare",
    "rarityLabel": "Редкий свиток ✨",
    "icon": "📚",
    "headline": "Попадётся именно то, что ты знаешь лучше всего",
    "text": "Удача целиком на твоей стороне: в самый нужный момент на экзамене или защите проекта тебе попадётся именно тот вопрос и та тема, в которой ты разбираешься лучше всего!",
    "teaSuggestion": "Байховый крепкий чай с сахаром вприкуску"
  },
  {
    "id": "f-study-3",
    "category": "study",
    "categoryLabel": "Учёба и экзамены",
    "categoryBadgeBg": "bg-blue-100 border-blue-300",
    "categoryTextColor": "text-blue-900",
    "tone": "study",
    "toneLabel": "Экзамены & Учёба 🎓",
    "rarity": "common",
    "rarityLabel": "Доброе напутствие 📜",
    "icon": "🌟",
    "headline": "Твои труды принесут прекрасный результат",
    "text": "То, что сейчас кажется неприступной стеной, на деле окажется ступенькой к твоей большой победе. Сделай первый уверенный шаг — и преподаватели будут приятно удивлены!",
    "teaSuggestion": "Чай с горным чабрецом и облепихой"
  },
  {
    "id": "f-study-4",
    "category": "study",
    "categoryLabel": "Учёба и экзамены",
    "categoryBadgeBg": "bg-indigo-100 border-indigo-300",
    "categoryTextColor": "text-indigo-900",
    "tone": "study",
    "toneLabel": "Экзамены & Учёба 🎓",
    "rarity": "legendary",
    "rarityLabel": "Легендарный свиток 👑",
    "icon": "💡",
    "headline": "Озарение придёт в нужную секунду",
    "text": "Сложная задача, над которой ты ломаешь голову, решится в один миг. Твой мозг уже собрал нужные данные — просто доверься своей интуиции и памяти.",
    "teaSuggestion": "Зелёный чай с женьшенем"
  },
  {
    "id": "f-study-5",
    "category": "study",
    "categoryLabel": "Учёба и экзамены",
    "categoryBadgeBg": "bg-violet-100 border-violet-300",
    "categoryTextColor": "text-violet-900",
    "tone": "study",
    "toneLabel": "Экзамены & Учёба 🎓",
    "rarity": "common",
    "rarityLabel": "Доброе напутствие 📜",
    "icon": "📝",
    "headline": "Курсовая и проект закроются с первого раза",
    "text": "Все правки научного руководителя окажутся мелочью, а итоговая оценка заставит гордиться собой. Ты проделал(а) огромный путь — результат будет достойным!",
    "teaSuggestion": "Крепкий чай с лимоном и кусочком тёмного шоколада"
  },
  {
    "id": "f-study-6",
    "category": "study",
    "categoryLabel": "Учёба и экзамены",
    "categoryBadgeBg": "bg-blue-100 border-blue-300",
    "categoryTextColor": "text-blue-900",
    "tone": "study",
    "toneLabel": "Экзамены & Учёба 🎓",
    "rarity": "rare",
    "rarityLabel": "Редкий свиток ✨",
    "icon": "🎯",
    "headline": "Строгий преподаватель сменит гнев на милость",
    "text": "Тот, кого все боятся на кафедре, оценит твою искреннюю вовлечённость и задаст на удивление доброжелательный наводящий вопрос. Удача на твоей стороне!",
    "teaSuggestion": "Чай с мелиссой и мятой"
  },
  {
    "id": "f-study-7",
    "category": "study",
    "categoryLabel": "Учёба и экзамены",
    "categoryBadgeBg": "bg-indigo-100 border-indigo-300",
    "categoryTextColor": "text-indigo-900",
    "tone": "study",
    "toneLabel": "Экзамены & Учёба 🎓",
    "rarity": "common",
    "rarityLabel": "Доброе напутствие 📜",
    "icon": "💻",
    "headline": "Код скомпилируется без единого бага",
    "text": "Для программистов и инженеров: та самая ошибка в логике, которая мучила тебя три дня, разрешится элегантным исправлением одной строчки!",
    "teaSuggestion": "Матча с овсяным молоком и мёдом"
  },
  {
    "id": "f-study-8",
    "category": "study",
    "categoryLabel": "Учёба и экзамены",
    "categoryBadgeBg": "bg-violet-100 border-violet-300",
    "categoryTextColor": "text-violet-900",
    "tone": "study",
    "toneLabel": "Экзамены & Учёба 🎓",
    "rarity": "common",
    "rarityLabel": "Доброе напутствие 📜",
    "icon": "🏆",
    "headline": "Твой доклад на конференции вызовет аплодисменты",
    "text": "Смело выходи к трибуне: твоя увлечённость темой заразит аудиторию. Ты ответишь на все вопросы с лёгкостью и достоинством.",
    "teaSuggestion": "Чай с сушёной черёмухой и мёдом"
  },
  {
    "id": "f-study-9",
    "category": "study",
    "categoryLabel": "Учёба и экзамены",
    "categoryBadgeBg": "bg-blue-100 border-blue-300",
    "categoryTextColor": "text-blue-900",
    "tone": "study",
    "toneLabel": "Экзамены & Учёба 🎓",
    "rarity": "rare",
    "rarityLabel": "Редкий свиток ✨",
    "icon": "🚀",
    "headline": "Стажировка мечты откроет двери",
    "text": "Твоё резюме или портфолио заметят нужные люди. Приготовься к интересному собеседованию, где оценят не только оценки, но и горящие глаза!",
    "teaSuggestion": "Тонизирующий саган-дайля с чабрецом"
  },
  {
    "id": "f-study-10",
    "category": "study",
    "categoryLabel": "Учёба и экзамены",
    "categoryBadgeBg": "bg-indigo-100 border-indigo-300",
    "categoryTextColor": "text-indigo-900",
    "tone": "study",
    "toneLabel": "Экзамены & Учёба 🎓",
    "rarity": "common",
    "rarityLabel": "Доброе напутствие 📜",
    "icon": "📖",
    "headline": "Память не подведёт в решающий час",
    "text": "Даже то, что ты читал(а) мельком полгода назад, всплывёт перед глазами с кристальной чёткостью. Ты знаешь гораздо больше, чем думаешь.",
    "teaSuggestion": "Чай с розмарином и долькой грейпфрута"
  },
  {
    "id": "f-study-11",
    "category": "study",
    "categoryLabel": "Учёба и экзамены",
    "categoryBadgeBg": "bg-violet-100 border-violet-300",
    "categoryTextColor": "text-violet-900",
    "tone": "study",
    "toneLabel": "Экзамены & Учёба 🎓",
    "rarity": "legendary",
    "rarityLabel": "Легендарный свиток 👑",
    "icon": "⚡",
    "headline": "Грант или стипендия найдут своего героя",
    "text": "Твой проект получит заслуженное признание и поддержку. Продолжай вкладывать душу — это фундамент твоего большого профессионального будущего.",
    "teaSuggestion": "Золотой юньнаньский чай с мёдом"
  },
  {
    "id": "f-study-12",
    "category": "study",
    "categoryLabel": "Учёба и экзамены",
    "categoryBadgeBg": "bg-blue-100 border-blue-300",
    "categoryTextColor": "text-blue-900",
    "tone": "study",
    "toneLabel": "Экзамены & Учёба 🎓",
    "rarity": "common",
    "rarityLabel": "Доброе напутствие 📜",
    "icon": "🕰️",
    "headline": "Дедлайн перестанет быть страшным",
    "text": "Правильное планирование и пара часов 집중ённой работы за чаем творят чудеса. Ты всё успеешь до полуночи и выспишься!",
    "teaSuggestion": "Эрл Грей с бергамотом и сахаром"
  },
  {
    "id": "f-study-13",
    "category": "study",
    "categoryLabel": "Учёба и экзамены",
    "categoryBadgeBg": "bg-indigo-100 border-indigo-300",
    "categoryTextColor": "text-indigo-900",
    "tone": "study",
    "toneLabel": "Экзамены & Учёба 🎓",
    "rarity": "rare",
    "rarityLabel": "Редкий свиток ✨",
    "icon": "🧩",
    "headline": "Командный проект завершится триумфом",
    "text": "Даже если в группе были разногласия, вы сумеете объединить сильные стороны каждого и представить работу лучше всех конкурентов.",
    "teaSuggestion": "Травяной сбор с таволгой и земляникой"
  },
  {
    "id": "f-study-14",
    "category": "study",
    "categoryLabel": "Учёба и экзамены",
    "categoryBadgeBg": "bg-violet-100 border-violet-300",
    "categoryTextColor": "text-violet-900",
    "tone": "study",
    "toneLabel": "Экзамены & Учёба 🎓",
    "rarity": "common",
    "rarityLabel": "Доброе напутствие 📜",
    "icon": "🎉",
    "headline": "Сессия закроется вовремя и без «хвостов»",
    "text": "Смело вычёркивай предметы один за другим из зачётки. Впереди заслуженные каникулы, путешествия и свободное творчество!",
    "teaSuggestion": "Чай со смородиновым листом и мятой"
  },
  {
    "id": "f-study-15",
    "category": "study",
    "categoryLabel": "Учёба и экзамены",
    "categoryBadgeBg": "bg-blue-100 border-blue-300",
    "categoryTextColor": "text-blue-900",
    "tone": "study",
    "toneLabel": "Экзамены & Учёба 🎓",
    "rarity": "rare",
    "rarityLabel": "Редкий свиток ✨",
    "icon": "🔍",
    "headline": "Найдётся пропавший конспект или нужная формула",
    "text": "То, что ты так долго искал(а) в закладках или на рабочем столе, внезапно окажется прямо под рукой. Всё сложится как надо.",
    "teaSuggestion": "Крепкий краснодарский чай с баранками"
  },
  {
    "id": "f-funny-1",
    "category": "funny",
    "categoryLabel": "Смешные & Ироничные",
    "categoryBadgeBg": "bg-amber-100 border-amber-300",
    "categoryTextColor": "text-amber-900",
    "tone": "funny",
    "toneLabel": "Смешное 🤭",
    "rarity": "rare",
    "rarityLabel": "Редкий свиток ✨",
    "icon": "🍪",
    "headline": "Печенька упала в чай — не грусти!",
    "text": "Если печенька упала на дно кружки — не грусти, она просто решила согреться и стать нежнее. А тебе это намёк: хватит смотреть в монитор, сделай перерыв на 15 минут и улыбнись!",
    "teaSuggestion": "Крепкий чай с двойной порцией пряников"
  },
  {
    "id": "f-funny-2",
    "category": "funny",
    "categoryLabel": "Смешные & Ироничные",
    "categoryBadgeBg": "bg-orange-100 border-orange-300",
    "categoryTextColor": "text-orange-900",
    "tone": "funny",
    "toneLabel": "Смешное 🤭",
    "rarity": "common",
    "rarityLabel": "Доброе напутствие 📜",
    "icon": "😴",
    "headline": "Кофе в полночь не сделает код идеальным",
    "text": "Самовар предупреждает: третья чашка кофе в 23:45 не решит баг в программе, а вот крепкий 8-часовой сон — запросто! Ложись спать вовремя, даже самовар ночью остывает.",
    "teaSuggestion": "Тёплый ромашковый чай без кофеина"
  },
  {
    "id": "f-funny-3",
    "category": "funny",
    "categoryLabel": "Смешные & Ироничные",
    "categoryBadgeBg": "bg-yellow-100 border-yellow-300",
    "categoryTextColor": "text-yellow-900",
    "tone": "funny",
    "toneLabel": "Смешное 🤭",
    "rarity": "legendary",
    "rarityLabel": "Легендарный свиток 👑",
    "icon": "🐱",
    "headline": "Сегодня дворовый кот признает тебя повелителем",
    "text": "Сегодня случайный пушистый кот на улице посмотрит на тебя с королевским одобрением. Считай это высшим знаком признания от вселенной. Прими эту почесть достойно!",
    "teaSuggestion": "Чай с кошачьей мятой и молоком"
  },
  {
    "id": "f-funny-4",
    "category": "funny",
    "categoryLabel": "Смешные & Ироничные",
    "categoryBadgeBg": "bg-lime-100 border-lime-300",
    "categoryTextColor": "text-lime-900",
    "tone": "funny",
    "toneLabel": "Смешное 🤭",
    "rarity": "common",
    "rarityLabel": "Доброе напутствие 📜",
    "icon": "🥨",
    "headline": "Вселенная подождёт, пока ты допьёшь чай",
    "text": "Не пытайся спасти всех и решить все мировые проблемы за один день. Налей чаю, откуси ватрушку — мир прекрасно постоит на паузе ещё полчаса.",
    "teaSuggestion": "Сладкий чай с малиной и баранками"
  },
  {
    "id": "f-funny-5",
    "category": "funny",
    "categoryLabel": "Смешные & Ироничные",
    "categoryBadgeBg": "bg-amber-100 border-amber-300",
    "categoryTextColor": "text-amber-900",
    "tone": "funny",
    "toneLabel": "Смешное 🤭",
    "rarity": "common",
    "rarityLabel": "Доброе напутствие 📜",
    "icon": "🧦",
    "headline": "Второй носок найдётся сам",
    "text": "Великая тайна стиральной машины наконец раскроется: потерянный любимый носок обнаружится в самом неожиданном месте. Жизнь налаживается!",
    "teaSuggestion": "Чай с сушёными ягодами шиповника"
  },
  {
    "id": "f-funny-6",
    "category": "funny",
    "categoryLabel": "Смешные & Ироничные",
    "categoryBadgeBg": "bg-orange-100 border-orange-300",
    "categoryTextColor": "text-orange-900",
    "tone": "funny",
    "toneLabel": "Смешное 🤭",
    "rarity": "rare",
    "rarityLabel": "Редкий свиток ✨",
    "icon": "🥐",
    "headline": "Круассан осыплется точно на салфетку",
    "text": "Редчайшее физическое явление: ты съешь слоёную выпечку, и ни одна крошка не упадёт на чистую футболку перед важным выходом. Считай это чудом!",
    "teaSuggestion": "Чай с лимоном и щепоткой корицы"
  },
  {
    "id": "f-funny-7",
    "category": "funny",
    "categoryLabel": "Смешные & Ироничные",
    "categoryBadgeBg": "bg-yellow-100 border-yellow-300",
    "categoryTextColor": "text-yellow-900",
    "tone": "funny",
    "toneLabel": "Смешное 🤭",
    "rarity": "common",
    "rarityLabel": "Доброе напутствие 📜",
    "icon": "🔋",
    "headline": "1% батарейки проживёт ещё 40 минут",
    "text": "Твой телефон проявит нечеловеческую стойкость и не выключится ровно до того момента, пока ты не приложишь билет на фестиваль или не отправишь важное сообщение!",
    "teaSuggestion": "Бодрящий зелёный чай с имбирём"
  },
  {
    "id": "f-funny-8",
    "category": "funny",
    "categoryLabel": "Смешные & Ироничные",
    "categoryBadgeBg": "bg-lime-100 border-lime-300",
    "categoryTextColor": "text-lime-900",
    "tone": "funny",
    "toneLabel": "Смешное 🤭",
    "rarity": "legendary",
    "rarityLabel": "Легендарный свиток 👑",
    "icon": "🛸",
    "headline": "Инопланетяне прилетали, но увидели цены и улетели",
    "text": "Не переживай о глобальных угрозах: самовар докладывает, что в ближайшие сутки всё будет спокойно, весело и под контролем.",
    "teaSuggestion": "Космический чай с анчаном (синий тайский чай) и лимоном"
  },
  {
    "id": "f-funny-9",
    "category": "funny",
    "categoryLabel": "Смешные & Ироничные",
    "categoryBadgeBg": "bg-amber-100 border-amber-300",
    "categoryTextColor": "text-amber-900",
    "tone": "funny",
    "toneLabel": "Смешное 🤭",
    "rarity": "common",
    "rarityLabel": "Доброе напутствие 📜",
    "icon": "🥞",
    "headline": "Первый блин НЕ будет комом",
    "text": "Любое новое дело, за которое ты возьмёшься на этой неделе, получится с первой же попытки, вопреки всем законам физики и поговоркам!",
    "teaSuggestion": "Чай с мёдом, маслом и пышными блинами"
  },
  {
    "id": "f-funny-10",
    "category": "funny",
    "categoryLabel": "Смешные & Ироничные",
    "categoryBadgeBg": "bg-orange-100 border-orange-300",
    "categoryTextColor": "text-orange-900",
    "tone": "funny",
    "toneLabel": "Смешное 🤭",
    "rarity": "rare",
    "rarityLabel": "Редкий свиток ✨",
    "icon": "🚌",
    "headline": "Автобус подъедет ровно в секунду твоего шага на остановку",
    "text": "Никаких 20 минут на морозе или ветру: транспорт материализуется прямо перед тобой с открытыми тёплыми дверями. Магия самовара в действии!",
    "teaSuggestion": "Горячий чай в термокружке с мятой"
  },
  {
    "id": "f-funny-11",
    "category": "funny",
    "categoryLabel": "Смешные & Ироничные",
    "categoryBadgeBg": "bg-yellow-100 border-yellow-300",
    "categoryTextColor": "text-yellow-900",
    "tone": "funny",
    "toneLabel": "Смешное 🤭",
    "rarity": "common",
    "rarityLabel": "Доброе напутствие 📜",
    "icon": "🧋",
    "headline": "Раф окажется именно той температуры",
    "text": "Бариста угадает твоё настроение без слов, сделает идеальную пенку и не перепутает сироп. Маленькое бытовое счастье гарантировано!",
    "teaSuggestion": "Чайный раф со специями и лавандой"
  },
  {
    "id": "f-funny-12",
    "category": "funny",
    "categoryLabel": "Смешные & Ироничные",
    "categoryBadgeBg": "bg-lime-100 border-lime-300",
    "categoryTextColor": "text-lime-900",
    "tone": "funny",
    "toneLabel": "Смешное 🤭",
    "rarity": "rare",
    "rarityLabel": "Редкий свиток ✨",
    "icon": "🦔",
    "headline": "Включи режим «Ёжик в тумане»",
    "text": "Если вокруг творится суета и непонятные разговоры — просто тихонько скажи «Лошаааадь...», сделай глоток чая и не вступай в споры.",
    "teaSuggestion": "Чай с можжевельником и клюквой"
  },
  {
    "id": "f-funny-13",
    "category": "funny",
    "categoryLabel": "Смешные & Ироничные",
    "categoryBadgeBg": "bg-amber-100 border-amber-300",
    "categoryTextColor": "text-amber-900",
    "tone": "funny",
    "toneLabel": "Смешное 🤭",
    "rarity": "common",
    "rarityLabel": "Доброе напутствие 📜",
    "icon": "🛋️",
    "headline": "Диван притянет сильнее земной гравитации",
    "text": "Сегодня разрешено законное ничегонеделание. Закутайся в плед, включи старый добрый советский мультфильм и ни о чём не жалей!",
    "teaSuggestion": "Травяной чай с чабрецом и душицей"
  },
  {
    "id": "f-funny-14",
    "category": "funny",
    "categoryLabel": "Смешные & Ироничные",
    "categoryBadgeBg": "bg-orange-100 border-orange-300",
    "categoryTextColor": "text-orange-900",
    "tone": "funny",
    "toneLabel": "Смешное 🤭",
    "rarity": "legendary",
    "rarityLabel": "Легендарный свиток 👑",
    "icon": "👑",
    "headline": "Ты официально признан(а) солнышком дня",
    "text": "Самовар провёл голосование среди чашек, блюдец и заварочного чайника: единогласно решено, что ты сегодня самый очаровательный человек в радиусе 100 км!",
    "teaSuggestion": "Царский чай с мёдом, шафраном и лимоном"
  },
  {
    "id": "f-caution-1",
    "category": "caution",
    "categoryLabel": "С перчинкой & Осторожно",
    "categoryBadgeBg": "bg-rose-100 border-rose-300",
    "categoryTextColor": "text-rose-900",
    "tone": "caution",
    "toneLabel": "С перчинкой 🌶️",
    "rarity": "rare",
    "rarityLabel": "Редкий свиток ✨",
    "icon": "🌶️",
    "headline": "Остерегайся тех, кто пьёт чай без души",
    "text": "Предостережение от самовара: не доверяй тем, кто пьёт чай на бегу, без сахара и с ледяным лицом. В их планах явно слишком много скучных таблиц и слишком мало искренности!",
    "teaSuggestion": "Чай с имбирём, гвоздикой и долькой лимона"
  },
  {
    "id": "f-caution-2",
    "category": "caution",
    "categoryLabel": "С перчинкой & Осторожно",
    "categoryBadgeBg": "bg-red-100 border-red-300",
    "categoryTextColor": "text-red-900",
    "tone": "caution",
    "toneLabel": "С перчинкой 🌶️",
    "rarity": "common",
    "rarityLabel": "Доброе напутствие 📜",
    "icon": "⚠️",
    "headline": "Не открывай переписку в 2 часа ночи",
    "text": "Самовар настойчиво советует: не пиши бывшим, не начинай философские споры в чатах и не перечитывай старые сообщения ночью. Утром ты скажешь себе спасибо!",
    "teaSuggestion": "Успокаивающий настой мяты и валерианы"
  },
  {
    "id": "f-caution-3",
    "category": "caution",
    "categoryLabel": "С перчинкой & Осторожно",
    "categoryBadgeBg": "bg-orange-100 border-orange-300",
    "categoryTextColor": "text-orange-900",
    "tone": "caution",
    "toneLabel": "С перчинкой 🌶️",
    "rarity": "legendary",
    "rarityLabel": "Легендарный свиток 👑",
    "icon": "🔥",
    "headline": "Осторожно: твой сарказм сегодня на максимуме",
    "text": "Сегодня твои шутки будут острее сибирского мороза. Постарайся не ранить тех, кто понимает юмор буквально. Смягчи остроту чашкой сладкого чая!",
    "teaSuggestion": "Чай с малиновым вареньем для смягчения нрава"
  },
  {
    "id": "f-caution-4",
    "category": "caution",
    "categoryLabel": "С перчинкой & Осторожно",
    "categoryBadgeBg": "bg-amber-100 border-amber-300",
    "categoryTextColor": "text-amber-900",
    "tone": "caution",
    "toneLabel": "С перчинкой 🌶️",
    "rarity": "common",
    "rarityLabel": "Доброе напутствие 📜",
    "icon": "👀",
    "headline": "Кто-то завидует твоей лёгкости",
    "text": "Не хвастайся планами раньше времени. Сделай всё молча, красиво и покажи уже готовый блестящий результат!",
    "teaSuggestion": "Иван-чай с душицей и мёдом"
  },
  {
    "id": "f-caution-5",
    "category": "caution",
    "categoryLabel": "С перчинкой & Осторожно",
    "categoryBadgeBg": "bg-rose-100 border-rose-300",
    "categoryTextColor": "text-rose-900",
    "tone": "caution",
    "toneLabel": "С перчинкой 🌶️",
    "rarity": "common",
    "rarityLabel": "Доброе напутствие 📜",
    "icon": "🛍️",
    "headline": "Опасность спонтанного шоппинга",
    "text": "Прежде чем купить третью милую кружку или пятую толстовку с символикой, выпей стакан воды. Твой кошелёк просит пощады!",
    "teaSuggestion": "Чистый кипяток из самовара без добавок"
  },
  {
    "id": "f-caution-6",
    "category": "caution",
    "categoryLabel": "С перчинкой & Осторожно",
    "categoryBadgeBg": "bg-red-100 border-red-300",
    "categoryTextColor": "text-red-900",
    "tone": "caution",
    "toneLabel": "С перчинкой 🌶️",
    "rarity": "rare",
    "rarityLabel": "Редкий свиток ✨",
    "icon": "⏳",
    "headline": "«Ещё пять минуточек» превратятся в два часа",
    "text": "Не ложись «полежать полминуты» с телефоном перед выходом. Ставь будильник на другой конец комнаты!",
    "teaSuggestion": "Крепкий пуэр с корнем женьшеня"
  },
  {
    "id": "f-caution-7",
    "category": "caution",
    "categoryLabel": "С перчинкой & Осторожно",
    "categoryBadgeBg": "bg-orange-100 border-orange-300",
    "categoryTextColor": "text-orange-900",
    "tone": "caution",
    "toneLabel": "С перчинкой 🌶️",
    "rarity": "common",
    "rarityLabel": "Доброе напутствие 📜",
    "icon": "🤐",
    "headline": "Прикуси язык во время спора",
    "text": "Доказывать кому-то свою правоту в интернете — это как кипятить воду в решете. Сохрани нервы и выпей ароматного чаю.",
    "teaSuggestion": "Ромашковый чай с каплей лаванды"
  },
  {
    "id": "f-caution-8",
    "category": "caution",
    "categoryLabel": "С перчинкой & Осторожно",
    "categoryBadgeBg": "bg-amber-100 border-amber-300",
    "categoryTextColor": "text-amber-900",
    "tone": "caution",
    "toneLabel": "С перчинкой 🌶️",
    "rarity": "legendary",
    "rarityLabel": "Легендарный свиток 👑",
    "icon": "🐺",
    "headline": "Не верь волку в овечьей шкуре",
    "text": "Слишком приторные комплименты от малознакомого человека должны насторожить. Доверяй делам, а не красивым обещаниям.",
    "teaSuggestion": "Таёжный сбор с брусничным листом и перцем"
  },
  {
    "id": "f-caution-9",
    "category": "caution",
    "categoryLabel": "С перчинкой & Осторожно",
    "categoryBadgeBg": "bg-rose-100 border-rose-300",
    "categoryTextColor": "text-rose-900",
    "tone": "caution",
    "toneLabel": "С перчинкой 🌶️",
    "rarity": "common",
    "rarityLabel": "Доброе напутствие 📜",
    "icon": "☔",
    "headline": "Возьми зонт, даже если на небе ни облачка",
    "text": "Уральская и подмосковная погода славятся внезапным нравом. Перестрахуйся — и день пройдёт в тепле и комфорте!",
    "teaSuggestion": "Согревающий чай с имбирём и мёдом"
  },
  {
    "id": "f-caution-10",
    "category": "caution",
    "categoryLabel": "С перчинкой & Осторожно",
    "categoryBadgeBg": "bg-red-100 border-red-300",
    "categoryTextColor": "text-red-900",
    "tone": "caution",
    "toneLabel": "С перчинкой 🌶️",
    "rarity": "rare",
    "rarityLabel": "Редкий свиток ✨",
    "icon": "🧂",
    "headline": "Не сыпь соль на чужую рану",
    "text": "Если кто-то ошибся рядом с тобой — поддержи, а не читай нотации. Твоё великодушие вернётся сторицей.",
    "teaSuggestion": "Мягкий липовый чай с мелиссой"
  },
  {
    "id": "f-caution-11",
    "category": "caution",
    "categoryLabel": "С перчинкой & Осторожно",
    "categoryBadgeBg": "bg-orange-100 border-orange-300",
    "categoryTextColor": "text-orange-900",
    "tone": "caution",
    "toneLabel": "С перчинкой 🌶️",
    "rarity": "common",
    "rarityLabel": "Доброе напутствие 📜",
    "icon": "👟",
    "headline": "Не надевай новую неразношенную обувь",
    "text": "На фестивале придётся намотать тысячи шагов между площадками. Выбирай комфорт, а не показуху — твои ноги скажут спасибо!",
    "teaSuggestion": "Травяной сбор для лёгкости шага с таволгой"
  },
  {
    "id": "f-caution-12",
    "category": "caution",
    "categoryLabel": "С перчинкой & Осторожно",
    "categoryBadgeBg": "bg-amber-100 border-amber-300",
    "categoryTextColor": "text-amber-900",
    "tone": "caution",
    "toneLabel": "С перчинкой 🌶️",
    "rarity": "rare",
    "rarityLabel": "Редкий свиток ✨",
    "icon": "🔑",
    "headline": "Проверь карманы перед выходом",
    "text": "Ключи, бейдж, телефон и хорошее настроение — не оставляй ничего в номере. Внимание к мелочам спасёт от лишней беготни!",
    "teaSuggestion": "Крепкий чёрный чай с чабрецом"
  },
  {
    "id": "f-caution-13",
    "category": "caution",
    "categoryLabel": "С перчинкой & Осторожно",
    "categoryBadgeBg": "bg-rose-100 border-rose-300",
    "categoryTextColor": "text-rose-900",
    "tone": "caution",
    "toneLabel": "С перчинкой 🌶️",
    "rarity": "common",
    "rarityLabel": "Доброе напутствие 📜",
    "icon": "🧊",
    "headline": "Не пей ледяную воду залпом",
    "text": "Береги горло: впереди столько песен у костра, кричалок и разговоров до рассвета. Горячий чай — твой лучший союзник!",
    "teaSuggestion": "Тёплый чай с малиной и липовым цветом"
  },
  {
    "id": "f-caution-14",
    "category": "caution",
    "categoryLabel": "С перчинкой & Осторожно",
    "categoryBadgeBg": "bg-red-100 border-red-300",
    "categoryTextColor": "text-red-900",
    "tone": "caution",
    "toneLabel": "С перчинкой 🌶️",
    "rarity": "legendary",
    "rarityLabel": "Легендарный свиток 👑",
    "icon": "🎯",
    "headline": "Не соглашайся на меньшее из страха остаться ни с чем",
    "text": "Ты достоин(на) лучшего проекта, лучшего отношения и искренней дружбы. Умей вовремя сказать твёрдое «нет» тому, что тебя разрушает.",
    "teaSuggestion": "Сибирский иван-чай с золотым корнем (родиола розовая)"
  },
  {
    "id": "f-day-1",
    "category": "day",
    "categoryLabel": "Знак дня на МФМ",
    "categoryBadgeBg": "bg-blue-100 border-blue-300",
    "categoryTextColor": "text-blue-900",
    "tone": "good",
    "toneLabel": "Хорошие знаки 🌟",
    "rarity": "common",
    "rarityLabel": "Доброе напутствие 📜",
    "icon": "☀️",
    "headline": "День открытых сердец и улыбок",
    "text": "Сегодня всё будет складываться легко: люди вокруг будут улыбчивы, очереди быстрыми, а разговоры — тёплыми и вдохновляющими. Наслаждайся каждой минутой фестиваля!",
    "teaSuggestion": "Чай с ромашкой, мятой и ложкой мёда"
  },
  {
    "id": "f-day-2",
    "category": "day",
    "categoryLabel": "Знак дня на МФМ",
    "categoryBadgeBg": "bg-purple-100 border-purple-300",
    "categoryTextColor": "text-purple-900",
    "tone": "good",
    "toneLabel": "Хорошие знаки 🌟",
    "rarity": "rare",
    "rarityLabel": "Редкий свиток ✨",
    "icon": "🎉",
    "headline": "Впереди яркое фестивальное приключение",
    "text": "Тебя ждёт событие, которое запомнится на долгие годы. Ты окажешься в центре потрясающей компании, где каждый разделяет твои ценности и мечты!",
    "teaSuggestion": "Облепиховый чай с апельсином и бадьяном"
  },
  {
    "id": "f-day-3",
    "category": "day",
    "categoryLabel": "Знак дня на МФМ",
    "categoryBadgeBg": "bg-emerald-100 border-emerald-300",
    "categoryTextColor": "text-emerald-900",
    "tone": "good",
    "toneLabel": "Хорошие знаки 🌟",
    "rarity": "legendary",
    "rarityLabel": "Легендарный свиток 👑",
    "icon": "🌟",
    "headline": "Знак большой удачи и творческого взлёта",
    "text": "Сегодня твоя энергия способна свернуть горы! Все идеи, которые придут тебе в голову во время чаепития, окажутся золотыми. Не бойся делиться ими с миром!",
    "teaSuggestion": "Горный травяной сбор с чабрецом и шиповником"
  },
  {
    "id": "f-week-1",
    "category": "week",
    "categoryLabel": "Взгляд на неделю",
    "categoryBadgeBg": "bg-indigo-100 border-indigo-300",
    "categoryTextColor": "text-indigo-900",
    "tone": "good",
    "toneLabel": "Хорошие знаки 🌟",
    "rarity": "common",
    "rarityLabel": "Доброе напутствие 📜",
    "icon": "📅",
    "headline": "Неделя принесёт долгожданные ответы",
    "text": "В ближайшие семь дней прояснятся многие вопросы, висевшие в воздухе. Ты обретёшь уверенность в завтрашнем дне и почувствуешь прилив свежих сил.",
    "teaSuggestion": "Чай со смородиновым листом и мелиссой"
  },
  {
    "id": "f-week-2",
    "category": "week",
    "categoryLabel": "Взгляд на неделю",
    "categoryBadgeBg": "bg-cyan-100 border-cyan-300",
    "categoryTextColor": "text-cyan-900",
    "tone": "good",
    "toneLabel": "Хорошие знаки 🌟",
    "rarity": "rare",
    "rarityLabel": "Редкий свиток ✨",
    "icon": "✨",
    "headline": "Семь дней вдохновения и новых знакомств",
    "text": "Эта неделя станет одной из самых насыщенных и душевных в году. Заведи блокнот для новых контактов и идей — они обязательно перерастут в большие дела!",
    "teaSuggestion": "Таёжный чай с брусникой и сосновыми почками"
  },
  {
    "id": "f-good-1",
    "category": "day",
    "categoryLabel": "Знак дня на МФМ",
    "categoryBadgeBg": "bg-blue-100 border-blue-300",
    "categoryTextColor": "text-blue-900",
    "tone": "good",
    "toneLabel": "Хорошие знаки 🌟",
    "rarity": "common",
    "rarityLabel": "Доброе напутствие 📜",
    "icon": "🍀",
    "headline": "Четырёхлистный клевер на твоём пути",
    "text": "Сегодня удача будет буквально ходить за тобой по пятам. Любая мелочь будет складываться в твою пользу — лови момент!",
    "teaSuggestion": "Зелёный чай с лемонграссом и мятой"
  },
  {
    "id": "f-good-2",
    "category": "day",
    "categoryLabel": "Знак дня на МФМ",
    "categoryBadgeBg": "bg-purple-100 border-purple-300",
    "categoryTextColor": "text-purple-900",
    "tone": "good",
    "toneLabel": "Хорошие знаки 🌟",
    "rarity": "rare",
    "rarityLabel": "Редкий свиток ✨",
    "icon": "🎨",
    "headline": "Твоё творчество найдет преданных зрителей",
    "text": "Стихи, код, рисунки или песни — покажи то, что ты создаёшь. Вокруг найдутся единомышленники, которые искренне поддержат твой талант!",
    "teaSuggestion": "Чай с гибискусом, корицей и яблоком"
  },
  {
    "id": "f-good-3",
    "category": "day",
    "categoryLabel": "Знак дня на МФМ",
    "categoryBadgeBg": "bg-emerald-100 border-emerald-300",
    "categoryTextColor": "text-emerald-900",
    "tone": "good",
    "toneLabel": "Хорошие знаки 🌟",
    "rarity": "common",
    "rarityLabel": "Доброе напутствие 📜",
    "icon": "🧭",
    "headline": "Правильный поворот судьбы",
    "text": "Случайный выбор дороги или павильона приведёт тебя к самому захватывающему событию дня. Доверяй зову любопытства!",
    "teaSuggestion": "Чай с душицей и медовым пряником"
  },
  {
    "id": "f-good-4",
    "category": "week",
    "categoryLabel": "Взгляд на неделю",
    "categoryBadgeBg": "bg-indigo-100 border-indigo-300",
    "categoryTextColor": "text-indigo-900",
    "tone": "good",
    "toneLabel": "Хорошие знаки 🌟",
    "rarity": "legendary",
    "rarityLabel": "Легендарный свиток 👑",
    "icon": "🚀",
    "headline": "Космический масштаб твоих идей",
    "text": "В тебе дремлет сила, способная менять города и судьбы. Не соглашайся на узкие рамки — мечтай так широко, как мечтали Циолковский и Королёв!",
    "teaSuggestion": "Алтайский иван-чай с саган-дайля"
  },
  {
    "id": "f-good-5",
    "category": "day",
    "categoryLabel": "Знак дня на МФМ",
    "categoryBadgeBg": "bg-cyan-100 border-cyan-300",
    "categoryTextColor": "text-cyan-900",
    "tone": "good",
    "toneLabel": "Хорошие знаки 🌟",
    "rarity": "common",
    "rarityLabel": "Доброе напутствие 📜",
    "icon": "🎁",
    "headline": "Неожиданный подарок или сувенир",
    "text": "Кто-то подарит тебе памятную вещицу или значок, который станет твоим счастливым талисманом на весь следующий год!",
    "teaSuggestion": "Чай с земляникой и цветками липы"
  },
  {
    "id": "f-good-6",
    "category": "day",
    "categoryLabel": "Знак дня на МФМ",
    "categoryBadgeBg": "bg-blue-100 border-blue-300",
    "categoryTextColor": "text-blue-900",
    "tone": "good",
    "toneLabel": "Хорошие знаки 🌟",
    "rarity": "rare",
    "rarityLabel": "Редкий свиток ✨",
    "icon": "🤝",
    "headline": "Мост дружбы через тысячи километров",
    "text": "Ты обменяешься контактами с человеком из самого далёкого региона или другой страны. Эта дружба переживёт любые расстояния и годы!",
    "teaSuggestion": "Русский чай из самовара с сушками"
  },
  {
    "id": "f-good-7",
    "category": "week",
    "categoryLabel": "Взгляд на неделю",
    "categoryBadgeBg": "bg-purple-100 border-purple-300",
    "categoryTextColor": "text-purple-900",
    "tone": "good",
    "toneLabel": "Хорошие знаки 🌟",
    "rarity": "common",
    "rarityLabel": "Доброе напутствие 📜",
    "icon": "⚡",
    "headline": "Энергия вернётся сторицей",
    "text": "Всё доброе слово, сказанное тобой сегодня волонтёру, прохожему или соседу, вернётся к тебе морем тёплых эмоций и поддержки.",
    "teaSuggestion": "Чай с мелиссой и ягодами клюквы"
  },
  {
    "id": "f-good-8",
    "category": "day",
    "categoryLabel": "Знак дня на МФМ",
    "categoryBadgeBg": "bg-emerald-100 border-emerald-300",
    "categoryTextColor": "text-emerald-900",
    "tone": "good",
    "toneLabel": "Хорошие знаки 🌟",
    "rarity": "legendary",
    "rarityLabel": "Легендарный свиток 👑",
    "icon": "👑",
    "headline": "Птица счастья на твоём плече",
    "text": "Славянская птица Гамаюн вещает: все твои заветные надежды найдут воплощение. Смело иди вперёд с открытым сердцем и чистой душой!",
    "teaSuggestion": "Царский сбор с липой, чабрецом, мятой и мёдом"
  },
  {
    "id": "f-good-9",
    "category": "week",
    "categoryLabel": "Взгляд на неделю",
    "categoryBadgeBg": "bg-indigo-100 border-indigo-300",
    "categoryTextColor": "text-indigo-900",
    "tone": "good",
    "toneLabel": "Хорошие знаки 🌟",
    "rarity": "common",
    "rarityLabel": "Доброе напутствие 📜",
    "icon": "🔥",
    "headline": "Огонёк веры разгорится в пламя",
    "text": "Даже если вокруг сомневаются в твоём успехе — не сворачивай. Твоя вера в своё дело зажжёт сердца окружающих.",
    "teaSuggestion": "Пряный чай с корицей, кардамоном и гвоздикой"
  },
  {
    "id": "f-good-10",
    "category": "day",
    "categoryLabel": "Знак дня на МФМ",
    "categoryBadgeBg": "bg-cyan-100 border-cyan-300",
    "categoryTextColor": "text-cyan-900",
    "tone": "good",
    "toneLabel": "Хорошие знаки 🌟",
    "rarity": "rare",
    "rarityLabel": "Редкий свиток ✨",
    "icon": "🎸",
    "headline": "Любимая песня прозвучит в нужный миг",
    "text": "Случайный трек из колонок на площади или гитарный аккорд у костра попадут прямо в твоё сердце и подарят мурашки счастья.",
    "teaSuggestion": "Чай с брусникой и веточкой розмарина"
  },
  {
    "id": "f-good-11",
    "category": "week",
    "categoryLabel": "Взгляд на неделю",
    "categoryBadgeBg": "bg-blue-100 border-blue-300",
    "categoryTextColor": "text-blue-900",
    "tone": "good",
    "toneLabel": "Хорошие знаки 🌟",
    "rarity": "common",
    "rarityLabel": "Доброе напутствие 📜",
    "icon": "🕊️",
    "headline": "Мир и согласие в семье",
    "text": "Твои близкие гордятся тобой больше, чем ты думаешь. Позвони родителям или бабушке — твой голос станет для них лучшим подарком.",
    "teaSuggestion": "Тёплый чай с ромашкой и молоком"
  },
  {
    "id": "f-good-12",
    "category": "day",
    "categoryLabel": "Знак дня на МФМ",
    "categoryBadgeBg": "bg-purple-100 border-purple-300",
    "categoryTextColor": "text-purple-900",
    "tone": "good",
    "toneLabel": "Хорошие знаки 🌟",
    "rarity": "rare",
    "rarityLabel": "Редкий свиток ✨",
    "icon": "📸",
    "headline": "Самый удачный кадр в галерее",
    "text": "Случайная фестивальная фотография передаст твой настоящий живой взгляд и искреннюю улыбку. Это фото ты будешь хранить годами!",
    "teaSuggestion": "Чай с облепихой и грушей"
  },
  {
    "id": "f-good-13",
    "category": "week",
    "categoryLabel": "Взгляд на неделю",
    "categoryBadgeBg": "bg-emerald-100 border-emerald-300",
    "categoryTextColor": "text-emerald-900",
    "tone": "good",
    "toneLabel": "Хорошие знаки 🌟",
    "rarity": "common",
    "rarityLabel": "Доброе напутствие 📜",
    "icon": "🌱",
    "headline": "Зерно, посеянное сегодня, даст богатый урожай",
    "text": "Каждое доброе дело и каждое новое знакомство этих дней прорастут крепкими побегами больших совместных свершений в будущем.",
    "teaSuggestion": "Зелёный чай с мятой и чабрецом"
  },
  {
    "id": "f-good-14",
    "category": "day",
    "categoryLabel": "Знак дня на МФМ",
    "categoryBadgeBg": "bg-indigo-100 border-indigo-300",
    "categoryTextColor": "text-indigo-900",
    "tone": "good",
    "toneLabel": "Хорошие знаки 🌟",
    "rarity": "legendary",
    "rarityLabel": "Легендарный свиток 👑",
    "icon": "💎",
    "headline": "Уральский самоцвет удачи",
    "text": "Земля Бажова дарит тебе невидимый талисман: стойкость малахита, чистоту горного хрусталя и тепло родного очага!",
    "teaSuggestion": "Сбор уральских таёжных трав с кедровой шишкой"
  },
  {
    "id": "f-good-15",
    "category": "week",
    "categoryLabel": "Взгляд на неделю",
    "categoryBadgeBg": "bg-cyan-100 border-cyan-300",
    "categoryTextColor": "text-cyan-900",
    "tone": "good",
    "toneLabel": "Хорошие знаки 🌟",
    "rarity": "rare",
    "rarityLabel": "Редкий свиток ✨",
    "icon": "🌟",
    "headline": "Твой след в истории фестиваля",
    "text": "Твой голос, твоя улыбка и твои идеи навсегда останутся частью летописи МФМ 2026. Спасибо, что ты здесь и делаешь этот мир лучше!",
    "teaSuggestion": "Золотой чай из самовара с мёдом и лимоном"
  },
  {
    "id": "f-peace-13",
    "category": "peace",
    "categoryLabel": "Спокойствие души",
    "categoryBadgeBg": "bg-emerald-100 border-emerald-300",
    "categoryTextColor": "text-emerald-900",
    "tone": "soulful",
    "toneLabel": "Душевное 🕊️",
    "rarity": "common",
    "rarityLabel": "Доброе напутствие 📜",
    "icon": "🌾",
    "headline": "Дыши глубже: земля держит тебя крепко",
    "text": "Когда мысли путаются, почувствуй опору под ногами. Ты часть огромной прекрасной земли, и всё задуманное придёт в свой назначенный час.",
    "teaSuggestion": "Ромашковый чай с липовым цветом"
  },
  {
    "id": "f-peace-14",
    "category": "peace",
    "categoryLabel": "Спокойствие души",
    "categoryBadgeBg": "bg-teal-100 border-teal-300",
    "categoryTextColor": "text-teal-900",
    "tone": "soulful",
    "toneLabel": "Душевное 🕊️",
    "rarity": "rare",
    "rarityLabel": "Редкий свиток ✨",
    "icon": "🪶",
    "headline": "Лёгкость пера в твоих мыслях",
    "text": "Сбрось с плеч ненужные обязательства перед теми, кто тебя не ценит. Твоё время и внимание бесценны — дари их тем, с кем легко молчать и радостно говорить.",
    "teaSuggestion": "Белый чай с мятой"
  },
  {
    "id": "f-peace-15",
    "category": "peace",
    "categoryLabel": "Спокойствие души",
    "categoryBadgeBg": "bg-sky-100 border-sky-300",
    "categoryTextColor": "text-sky-900",
    "tone": "soulful",
    "toneLabel": "Душевное 🕊️",
    "rarity": "legendary",
    "rarityLabel": "Легендарный свиток 👑",
    "icon": "🌌",
    "headline": "Звёздное небо над головой",
    "text": "Взгляни сегодня ночью на звёзды: они помнят века и тысячелетия. Все наши сиюминутные тревоги растворяются в этой вечной гармонии.",
    "teaSuggestion": "Иван-чай с лавандой и черникой"
  },
  {
    "id": "f-love-16",
    "category": "love",
    "categoryLabel": "Любовь и сердце",
    "categoryBadgeBg": "bg-rose-100 border-rose-300",
    "categoryTextColor": "text-rose-900",
    "tone": "love",
    "toneLabel": "Любовь 💖",
    "rarity": "common",
    "rarityLabel": "Доброе напутствие 📜",
    "icon": "💌",
    "headline": "Письмо счастья долетит вовремя",
    "text": "Слова благодарности и любви, которые ты скажешь близкому человеку, согреют его душу на долгие месяцы вперёд. Не откладывай добрые признания.",
    "teaSuggestion": "Чай со смородиновым вареньем"
  },
  {
    "id": "f-love-17",
    "category": "love",
    "categoryLabel": "Любовь и сердце",
    "categoryBadgeBg": "bg-pink-100 border-pink-300",
    "categoryTextColor": "text-pink-900",
    "tone": "love",
    "toneLabel": "Любовь 💖",
    "rarity": "rare",
    "rarityLabel": "Редкий свиток ✨",
    "icon": "🕯️",
    "headline": "Уютный огонёк в окне",
    "text": "Где-то есть окно, за которым тебя всегда искренне ждут, верят в тебя и ставят чайник, едва услышав твои шаги на крыльце.",
    "teaSuggestion": "Чай с чабрецом и сушёной земляникой"
  },
  {
    "id": "f-love-18",
    "category": "love",
    "categoryLabel": "Любовь и сердце",
    "categoryBadgeBg": "bg-amber-100 border-amber-300",
    "categoryTextColor": "text-amber-900",
    "tone": "love",
    "toneLabel": "Любовь 💖",
    "rarity": "legendary",
    "rarityLabel": "Легендарный свиток 👑",
    "icon": "💍",
    "headline": "Сердечное согласие и верность",
    "text": "Настоящее чувство не требует громких клятв — оно проявляется в заботливо наброшенном пледе, чашке горячего чая и бережном молчании.",
    "teaSuggestion": "Медовый чай с липовым цветом"
  },
  {
    "id": "f-study-16",
    "category": "study",
    "categoryLabel": "Учёба и экзамены",
    "categoryBadgeBg": "bg-indigo-100 border-indigo-300",
    "categoryTextColor": "text-indigo-900",
    "tone": "study",
    "toneLabel": "Экзамены & Учёба 🎓",
    "rarity": "common",
    "rarityLabel": "Доброе напутствие 📜",
    "icon": "💡",
    "headline": "Ясность ума и лёгкое перо",
    "text": "Тест или контрольная работа пройдут на одном дыхании: рука сама напишет верные ответы, словно кто-то невидимый подсказывает правильные мысли.",
    "teaSuggestion": "Зелёный чай с лимоном и мятой"
  },
  {
    "id": "f-study-17",
    "category": "study",
    "categoryLabel": "Учёба и экзамены",
    "categoryBadgeBg": "bg-violet-100 border-violet-300",
    "categoryTextColor": "text-violet-900",
    "tone": "study",
    "toneLabel": "Экзамены & Учёба 🎓",
    "rarity": "rare",
    "rarityLabel": "Редкий свиток ✨",
    "icon": "🎯",
    "headline": "Твоя цель ближе, чем ты думаешь",
    "text": "Каждый выученный билет и каждая прочитанная страница приближают тебя к диплому и любимой профессии. Ты почти у цели!",
    "teaSuggestion": "Чай с шиповником и сахаром вприкуску"
  },
  {
    "id": "f-good-16",
    "category": "day",
    "categoryLabel": "Знак дня на МФМ",
    "categoryBadgeBg": "bg-blue-100 border-blue-300",
    "categoryTextColor": "text-blue-900",
    "tone": "good",
    "toneLabel": "Хорошие знаки 🌟",
    "rarity": "common",
    "rarityLabel": "Доброе напутствие 📜",
    "icon": "🎈",
    "headline": "Праздник в твоём сердце",
    "text": "Сегодня день, когда нужно радоваться мелочам: первому лучу солнца, вкусному прянику, дружескому приветствию и новым горизонтам!",
    "teaSuggestion": "Чай с яблоком, корицей и гвоздикой"
  },
  {
    "id": "f-good-17",
    "category": "week",
    "categoryLabel": "Взгляд на неделю",
    "categoryBadgeBg": "bg-purple-100 border-purple-300",
    "categoryTextColor": "text-purple-900",
    "tone": "good",
    "toneLabel": "Хорошие знаки 🌟",
    "rarity": "legendary",
    "rarityLabel": "Легендарный свиток 👑",
    "icon": "🌈",
    "headline": "Большое счастье стучится в дверь",
    "text": "Сотый юбилейный свиток самовара несёт высшее благословение: пусть твоя дорога будет широкой, сердце — любящим, а в доме всегда пахнет свежим чаем и пирогами!",
    "teaSuggestion": "Царский сбор из самовара со всеми травами России"
  }
];

export interface UserFortuneState {
  todayDateStr: string;
  dailyFortuneId: string | null;
  collectedIds: string[];
  unlockedFortuneIds?: string[];
}

export function getTodayDateString(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function getFormattedTodayRussian(): string {
  const d = new Date();
  const months = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
  ];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()} г.`;
}

/**
 * Load user fortune state from localStorage.
 * CRITICAL FIX: Prunes duplicate and non-existent IDs so collectedCount strictly matches valid unlocked items in FORTUNES_COLLECTION.
 */
export function loadUserFortuneState(): UserFortuneState {
  const today = getTodayDateString();
  try {
    const raw = localStorage.getItem('mfm_fortune_state');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed) {
        const rawCollected: string[] = (
          Array.isArray(parsed.collectedIds)
            ? parsed.collectedIds
            : Array.isArray(parsed.unlockedFortuneIds)
            ? parsed.unlockedFortuneIds
            : []
        ).filter((id: unknown): id is string => typeof id === 'string');

        // Filter only valid IDs that actually exist in FORTUNES_COLLECTION, and deduplicate
        const validIds = Array.from(new Set(rawCollected)).filter((id) =>
          FORTUNES_COLLECTION.some((f) => f.id === id)
        );

        const dailyId =
          parsed.todayDateStr === today &&
          typeof parsed.dailyFortuneId === 'string' &&
          FORTUNES_COLLECTION.some((f) => f.id === parsed.dailyFortuneId)
            ? parsed.dailyFortuneId
            : null;

        if (dailyId && !validIds.includes(dailyId)) {
          validIds.push(dailyId);
        }

        return {
          todayDateStr: today,
          dailyFortuneId: dailyId,
          collectedIds: validIds,
          unlockedFortuneIds: validIds,
        };
      }
    }
  } catch {}

  return {
    todayDateStr: today,
    dailyFortuneId: null,
    collectedIds: [],
    unlockedFortuneIds: [],
  };
}

export function saveUserFortuneState(state: UserFortuneState) {
  try {
    const cleanCollected = Array.from(new Set(state.collectedIds || [])).filter((id) =>
      FORTUNES_COLLECTION.some((f) => f.id === id)
    );
    const cleanedState: UserFortuneState = {
      ...state,
      collectedIds: cleanCollected,
      unlockedFortuneIds: cleanCollected,
    };
    localStorage.setItem('mfm_fortune_state', JSON.stringify(cleanedState));
  } catch {}
}

/**
 * Draw today's fortune:
 * - If today already has a daily fortune, return it (alreadyReceivedToday = true).
 * - If not yet drawn today, randomly select a new fortune, record it as dailyFortuneId,
 *   and save to collectedIds (alreadyReceivedToday = false).
 */
export function getOrCreateDailyFortune(currentState: UserFortuneState): {
  fortune: FortuneItem;
  newState: UserFortuneState;
  isFirstTimeToday: boolean;
} {
  const today = getTodayDateString();

  // If already drawn today
  if (currentState.todayDateStr === today && currentState.dailyFortuneId) {
    const existing = FORTUNES_COLLECTION.find((f) => f.id === currentState.dailyFortuneId);
    if (existing) {
      return {
        fortune: existing,
        newState: currentState,
        isFirstTimeToday: false,
      };
    }
  }

  // Draw new fortune: prioritize uncollected ones
  const collectedSafe = Array.from(new Set(
    Array.isArray(currentState?.collectedIds)
      ? currentState.collectedIds
      : Array.isArray(currentState?.unlockedFortuneIds)
      ? currentState.unlockedFortuneIds
      : []
  )).filter((id) => FORTUNES_COLLECTION.some((f) => f.id === id));

  const uncollected = FORTUNES_COLLECTION.filter((f) => !collectedSafe.includes(f.id));
  const pool = uncollected.length > 0 ? uncollected : FORTUNES_COLLECTION;
  const picked = pool[Math.floor(Math.random() * pool.length)];

  const updatedCollected = collectedSafe.includes(picked.id)
    ? collectedSafe
    : [...collectedSafe, picked.id];

  const newState: UserFortuneState = {
    todayDateStr: today,
    dailyFortuneId: picked.id,
    collectedIds: updatedCollected,
    unlockedFortuneIds: updatedCollected,
  };

  saveUserFortuneState(newState);

  return {
    fortune: picked,
    newState,
    isFirstTimeToday: true,
  };
}
