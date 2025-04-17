import React, { Fragment } from 'react';
import type { Page } from '@/payload-types';

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component';
import { CallToActionBlock } from '@/blocks/CallToAction/Component';
import { ContentBlock } from '@/blocks/Content/Component';
import { FormBlock } from '@/blocks/Form/Component';
import { MediaBlock } from '@/blocks/MediaBlock/Component';
import { default as ImageSlider } from '@/blocks/ImageSlider/Component';
import type { Theme } from '@/payload-types';


const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  imageSlider: ImageSlider,
};

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][];
  theme?: Theme | null;

}> = (props) => {
  const { blocks, theme } = props;
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block;

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType];

            if (Block) {
              return (
                <div className="my-16" key={index}>
                  {/* @ts-expect-error some blocks may not be perfectly typed */}
                  <Block {...block} theme={theme} disableInnerContainer />
                </div>
              );
            }
          }

          return null;
        })}
      </Fragment>
    );
  }

  return null;
};
