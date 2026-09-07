export interface PostcardStamp {
  id: string;
  name: string;
  subtitle: string;
  icon: string;
  color: string;
  description: string;
  questHint: string;
  targetSection: string;
  unlocked: boolean;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  funFact: string;
}

export interface SurveyFormData {
  name: string;
  countryCity: string;
  howMet: string;
  interests: string[];
  recommendationType: 'book' | 'movie' | 'series' | 'article' | 'game';
  lovesReading?: boolean;
  recommendationTitle: string;
  recommendationCreator: string;
  recommendationReview: string;
  favoriteQuote: string;
  recommendationTarget: string;
  hasSouvenirToExchange: boolean;
  souvenirLink: string;
  contact: string;
  quizScore?: number | null;
  // Backwards compatibility aliases
  bookTitle?: string;
  bookAuthor?: string;
  bookReview?: string;
}

export interface SubmissionEntry extends SurveyFormData {
  id: string;
  timestamp: string;
  createdAtFormatted: string;
}

export interface BookRecommendation {
  title: string;
  author: string;
  type: 'novel' | 'manhwa' | 'classic' | 'fantasy';
  country: 'China' | 'Korea' | 'Russia' | 'Japan' | 'World';
  coverAccent: string;
  description: string;
  arinaComment: string;
  tags: string[];
}
