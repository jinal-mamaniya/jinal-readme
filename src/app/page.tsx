import { FileTree } from "@/components/layout/FileTree";
import { About } from "@/components/sections/About";
import { Endorsement } from "@/components/sections/Endorsement";
import { Readme } from "@/components/sections/Readme";
import { SystemsIntro } from "@/components/sections/SystemsIntro";
import { SystemFile } from "@/components/sections/SystemFile";
import { Showcase } from "@/components/sections/Showcase";
import { Notes } from "@/components/sections/Notes";
import { Glossary } from "@/components/sections/Glossary";
import { Maintainer } from "@/components/sections/Maintainer";
import { TeachingIntro } from "@/components/sections/TeachingIntro";
import { DirectoryCloser } from "@/components/sections/DirectoryCloser";

/**
 * Home — vertical-scroll composition of the README sections.
 *
 * Order follows the README narrative: About → README → Systems/ (×4)
 * → Showcase → Notes → Glossary → Maintainer. FileTree provides the
 * sticky navigation + scroll-spy.
 */
export default function Home() {
  return (
    <>
      <FileTree />
      <main id="main-content" className="xl:pl-[18rem]">
        <About />
        <Endorsement />
        <Readme />
        <SystemsIntro />
        <SystemFile slug="lexisnexis" />
        <SystemFile slug="motorola" />
        <SystemFile slug="tcs" />
        <SystemFile slug="lti" />
        <DirectoryCloser name="Systems" chapters={4} />
        <Showcase />
        <DirectoryCloser name="Showcase" chapters={1} />
        {/* Teaching/ — sits between Showcase and Notes per file tree order.
            TeachingIntro provides the directory-level intro (heading +
            subtitle) so Teaching/ follows the same pattern as every other
            directory (Systems/, Showcase/, Notes/, Glossary/). The empty
            anchor was the lone exception to rule #6 — closed 2026-06-06.
            Chapter itself owns `#teaching-northeastern`. */}
        <TeachingIntro />
        <SystemFile slug="northeastern" />
        <DirectoryCloser name="Teaching" chapters={1} />
        <Notes />
        <DirectoryCloser name="Notes" chapters={3} unit="essay" />
        <Glossary />
        <Maintainer />
      </main>
    </>
  );
}
