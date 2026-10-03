/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { lazy, Suspense } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { StoryProvider } from './experience/StoryController';
import { StoryNavigation } from './experience/StoryNavigation';
import { OriginChapter } from './experience/OriginChapter';
import { CuriosityChapter } from './experience/CuriosityChapter';
import { ConnectionsChapter } from './experience/ConnectionsChapter';
import { ProcessChapter } from './experience/ProcessChapter';
import { ProofChapter } from './experience/ProofChapter';
import { GrowthChapter } from './experience/GrowthChapter';
import { LabChapter } from './experience/LabChapter';
import { FutureChapter } from './experience/FutureChapter';
import { ContactChapter } from './experience/ContactChapter';

const WorldLine = lazy(() => import('./experience/WorldLine'));

export default function App() {
  return (
    <StoryProvider>
      <div className="authored-world min-h-screen bg-brand-bg-primary text-brand-text-secondary selection:bg-brand-accent/30 selection:text-white">
        <Suspense fallback={<div className="world-line-fallback" aria-hidden="true" />}>
          <WorldLine />
        </Suspense>
        <Navbar />
        <StoryNavigation />
        <main>
          <OriginChapter />
          <CuriosityChapter />
          <ConnectionsChapter />
          <ProcessChapter />
          <ProofChapter />
          <GrowthChapter />
          <LabChapter />
          <FutureChapter />
          <ContactChapter />
        </main>
        <Footer />
      </div>
    </StoryProvider>
  );
}
