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
import { INTERNATIONAL_STAMPS, CITIZEN_STAMPS } from './data/russiaFacts';
import { PostcardStamp } from './types';
import { useAudience } from './context/AudienceContext';

export default function App() {
  const { mode } = useAudience();
  const [unlockedStampIds, setUnlockedStampIds] = useState<string[]>(() => {
    const idsSet = new Set<string>();
    try {
      const saved = localStorage.getItem('mfm_unlocked_stamps');
      if (saved) {
        const ids = JSON.parse(saved);
        if (Array.isArray(ids)) {
          ids.forEach((id) => {
            if (typeof id === 'string') idsSet.add(id);
          });
        }
      }
    } catch (e) {
      console.warn('Could not read stamps from localStorage', e);
    }

    // Cross-sync equivalent stamps between modes
    if (idsSet.has('stamp-tea')) idsSet.add('stamp-samovar');
    if (idsSet.has('stamp-samovar')) idsSet.add('stamp-tea');
    if (idsSet.has('stamp-mosaic')) idsSet.add('stamp-matryoshka');
    if (idsSet.has('stamp-matryoshka')) idsSet.add('stamp-mosaic');

    // Also check saved interactive state flags so users don't lose stamps
    try {
      const fortuneRaw = localStorage.getItem('mfm_daily_fortune_state');
      if (fortuneRaw) {
        const fState = JSON.parse(fortuneRaw);
        if (fState?.dailyFortuneId || (Array.isArray(fState?.collectedIds) && fState.collectedIds.length > 0)) {
          idsSet.add('stamp-samovar');
          idsSet.add('stamp-tea');
        }
      }
    } catch {}

    try {
      if (localStorage.getItem('mfm_puzzle_solved') === 'true') {
        idsSet.add('stamp-mosaic');
        idsSet.add('stamp-matryoshka');
      }
    } catch {}

    try {
      if (localStorage.getItem('mfm_city_bridge_passed') === 'true') {
        idsSet.add('stamp-bridge');
      }
    } catch {}

    try {
      if (localStorage.getItem('mfm_envelope_open') === 'true') {
        idsSet.add('stamp-envelope');
      }
    } catch {}

    const result = Array.from(idsSet);
    try {
      localStorage.setItem('mfm_unlocked_stamps', JSON.stringify(result));
    } catch {}
    return result;
  });

  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [isMailboxOpen, setIsMailboxOpen] = useState(false);

  // Derive stamps list based on audience mode
  const currentStampsTemplate = mode === 'citizen' ? CITIZEN_STAMPS : INTERNATIONAL_STAMPS;
  const stamps: PostcardStamp[] = currentStampsTemplate.map((s) => ({
    ...s,
    unlocked: s.unlocked || unlockedStampIds.includes(s.id),
  }));

  const handleUnlockStamp = (id: string) => {
    setUnlockedStampIds((prev) => {
      const toAdd = new Set<string>([id]);
      // Pair equivalencies so both modes stay in sync
      if (id === 'stamp-samovar' || id === 'stamp-tea') {
        toAdd.add('stamp-samovar');
        toAdd.add('stamp-tea');
      }
      if (id === 'stamp-mosaic' || id === 'stamp-matryoshka') {
        toAdd.add('stamp-mosaic');
        toAdd.add('stamp-matryoshka');
      }

      let changed = false;
      const nextList = [...prev];
      toAdd.forEach((item) => {
        if (!nextList.includes(item)) {
          nextList.push(item);
          changed = true;
        }
      });

      if (!changed) return prev;

      try {
        localStorage.setItem('mfm_unlocked_stamps', JSON.stringify(nextList));
      } catch (e) {
        console.warn('Could not save stamps to localStorage', e);
      }
      return nextList;
    });
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
