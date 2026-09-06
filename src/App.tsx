/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { HeaderNavbar } from './components/HeaderNavbar';
import { PostcardEnvelope } from './components/PostcardEnvelope';
import { RussiaCultureSection } from './components/RussiaCultureSection';
import { CitySpotlightSection } from './components/CitySpotlightSection';
import { AboutArinaSection } from './components/AboutArinaSection';
import { QuizSection } from './components/QuizSection';
import { SurveyBookSection } from './components/SurveyBookSection';
import { ArinaMailboxModal } from './components/ArinaMailboxModal';
import { Footer } from './components/Footer';
import { INITIAL_STAMPS } from './data/russiaFacts';
import { PostcardStamp } from './types';

export default function App() {
  const [stamps, setStamps] = useState<PostcardStamp[]>(INITIAL_STAMPS);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [isMailboxOpen, setIsMailboxOpen] = useState(false);

  const handleUnlockStamp = (id: string) => {
    setStamps((prev) =>
      prev.map((s) => (s.id === id ? { ...s, unlocked: true } : s))
    );
  };

  const unlockedCount = stamps.filter((s) => s.unlocked).length;

  return (
    <div className="min-h-screen flex flex-col bg-[#faf7f2] text-stone-800 font-sans-ui selection:bg-amber-200 selection:text-stone-900">
      
      {/* Top Navbar */}
      <HeaderNavbar
        onOpenMailbox={() => setIsMailboxOpen(true)}
        stampsCount={unlockedCount}
        totalStamps={stamps.length}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Vintage Postcard & Wax Seal Envelope */}
        <PostcardEnvelope
          stamps={stamps}
          onUnlockStamp={handleUnlockStamp}
        />

        {/* 2. Russia: Soul, Culture & Interactive Tea / Matryoshka */}
        <RussiaCultureSection
          onUnlockStamp={handleUnlockStamp}
        />

        {/* 3. City Spotlight: Реутов, Чистые пруды & Школа №6 */}
        <CitySpotlightSection
          onUnlockStamp={handleUnlockStamp}
        />

        {/* 4. About Arina: Developer, Web Novels, Dramas, Anime & Games */}
        <AboutArinaSection />

        {/* 5. Interactive Quiz about Russia */}
        <QuizSection
          onUnlockStamp={handleUnlockStamp}
          onScoreUpdated={(score) => setQuizScore(score)}
        />

        {/* 6. Guest Survey & Favorite Book Recommendation */}
        <SurveyBookSection
          quizScore={quizScore}
          onUnlockStamp={handleUnlockStamp}
        />
      </main>

      {/* Footer & Festival Exchange Link */}
      <Footer />

      {/* Arina's Mailbox Drawer / Modal */}
      <ArinaMailboxModal
        isOpen={isMailboxOpen}
        onClose={() => setIsMailboxOpen(false)}
      />

    </div>
  );
}
