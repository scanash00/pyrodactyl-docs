import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { DocsPage, DocsBody, DocsTitle, DocsDescription } from 'fumadocs-ui/page';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import { Card, Cards } from 'fumadocs-ui/components/card';
import defaultMdxComponents, { createRelativeLink } from 'fumadocs-ui/mdx';
import { source } from '@/lib/source';

export default async function Page({ params }: { params: { slug?: string[] } }) {
  const page = source.getPage(params.slug);

  if (!page) {
    notFound();
  }

  const MDXContent = page.data.body;

  return (
    <DocsPage 
      toc={page.data.toc} 
      tableOfContent={{
        enabled: true,
        style: 'clerk'
      }}
      lastUpdate={page.data.lastModified ? new Date(page.data.lastModified) : undefined}
      editOnGithub={{
        owner: 'pyrohost',
        repo: 'pyrodactyl-docs',
        sha: 'main',
        path: `content/docs/${page.file.path}`,
      }}
      full={page.data.full}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDXContent
          components={{
            ...defaultMdxComponents,
            a: createRelativeLink(source, page),
            Tabs,
            Tab,
            Card,
            Cards
          }}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export function generateMetadata({ params }: { params: { slug?: string[] } }): Metadata {
  const page = source.getPage(params.slug);

  if (!page) return {};

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
