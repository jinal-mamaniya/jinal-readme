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
        <Showcase />
        {/* Teaching/ — sits between Showcase and Notes per file tree order.
            Uses SystemFile component with section="Teaching" set in the
            experience entry (data-driven, not a separate component).
            The `#teaching` anchor here is the directory-level scroll target
            for the file tree's `Teaching/` link; the chapter itself owns
            `#teaching-northeastern`. */}
        <a id="teaching" className="block scroll-mt-12" aria-hidden="true" />
        <SystemFile slug="northeastern" />
        <Notes />
        <Glossary />
        <Maintainer />
      </main>
    </>
  );
}
