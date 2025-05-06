
import React, { Fragment } from 'react';
import type { Page } from '@/payload-types';
import type { Theme } from '@/payload-types';

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component';
import { CallToActionBlock } from '@/blocks/CallToAction/Component';
import { ContentBlock } from '@/blocks/Content/Component';
import { FormBlock } from '@/blocks/Form/Component';
import { MediaBlock } from '@/blocks/MediaBlock/Component';
import { ImageSlider } from '@/blocks/ImageSlider/Component'
import { TestContentBlock } from '@/blocks/Test-Content/Component';
import { TestCallToActionBlock } from '@/blocks/Test-CallToAction/Component';
import { TestImageSlider } from '@/blocks/Test-ImageSlider/Component'

import { useCurrentUser } from '@/hooks/useCurrentUser';

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  imageSlider: ImageSlider,
  testContent: TestContentBlock,
  testCTA: TestCallToActionBlock,
  testImageSlider: TestImageSlider,
};

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][];
  theme?: Theme | null;
}> = ({ blocks, theme }) => {
  if (!blocks || blocks.length === 0) return null;
  return (
    <Fragment>
      {blocks.map((block, index) => {
        const { blockType, id } = block;
        const Block = blockType && blockComponents[blockType];

        // Wenn kein gültiger Block: skippen
        if (!blockType || !Block) return null;

        return (
          <div
            key={index}
            className={`my-16`}
          >
            {/* @ts-expect-error some blocks may not be perfectly typed */}
            <Block {...block} theme={theme} disableInnerContainer />
          </div>
        );
      })}
    </Fragment>
  );
};
