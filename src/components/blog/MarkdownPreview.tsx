'use client';

import dynamic from 'next/dynamic';

const MDPreview = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default.Markdown),
  { ssr: false }
);

interface Props {
  content: string;
}

export default function MarkdownPreview({ content }: Props) {
  return (
    <MDPreview
      source={content}
      style={{
        background: 'transparent',
        color: 'inherit',
        fontSize: '0.9rem',
      }}
    />
  );
}
