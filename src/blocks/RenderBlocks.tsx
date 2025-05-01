
import React, { Fragment } from 'react';
import type { Theme } from '@/payload-types';
import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component';
import { CallToActionBlock } from '@/blocks/CallToAction/Component';
import { ContentBlock } from '@/blocks/Content/Component';
import { FormBlock } from '@/blocks/Form/Component';
import { MediaBlock } from '@/blocks/MediaBlock/Component';
import { ImageSlider } from '@/blocks/ImageSlider/Component';
import { TestContentBlock } from '@/blocks/Test-Content/Component';
import { TestCallToActionBlock } from '@/blocks/Test-CallToAction/Component';
import { TestImageSlider } from '@/blocks/Test-ImageSlider/Component';
import { useCurrentUser } from '@/hooks/useCurrentUser';

// Define block component types
type BlockComponentProps = {
  theme?: Theme | null;
  disableInnerContainer?: boolean;
  id?: string;
  blockType: keyof typeof blockComponents;
  [key: string]: any;
};

type BlockComponent = React.ComponentType<BlockComponentProps>;

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  imageSlider: ImageSlider,
  testContent: TestContentBlock,
  testCallToAction: TestCallToActionBlock,
  testImageSlider: TestImageSlider,
} as const;

interface RenderBlocksProps {
  blocks: Array<BlockComponentProps>;
  theme?: Theme | null;
}

export const RenderBlocks: React.FC<RenderBlocksProps> = ({ blocks, theme }) => {
  const { user, loading } = useCurrentUser();

  if (loading) return null;
  if (!blocks?.length) return null;

  return (
    <Fragment>
      {blocks.map((block, index) => {
        const { blockType, id } = block;
        const Block = blockType ? blockComponents[blockType] as BlockComponent : null;

        // Skip if no valid block
        if (!blockType || !Block) return null;

        // Check access permissions
        let isAllowed = true;
        let isDimmed = false;

        if (user?.role === 'editor') {
          const allowedIDs = user.subscription?.allowedBlocks ?? [];
          isAllowed = typeof id === 'string' && allowedIDs.includes(id);
        }

        if (user?.role === 'admin') {
          const allowedIDs = user.subscription?.allowedBlocks ?? [];
          isDimmed = typeof id === 'string' && !allowedIDs.includes(id);
        }

        // Show only allowed blocks for editors
        if (user?.role === 'editor' && !isAllowed) return null;

        return (
          <div
            key={`block-${index}`}
            className={`my-16 ${isDimmed ? 'opacity-50 pointer-events-none' : ''}`}
          >
            <Block {...block} theme={theme} disableInnerContainer />
          </div>
        );
      })}
    </Fragment>
  );
};
