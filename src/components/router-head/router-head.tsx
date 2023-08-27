import { component$ } from '@builder.io/qwik';
import {
  DocumentHeadValue,
  DocumentLink,
  DocumentMeta,
  DocumentStyle,
  RouteLocation,
  useDocumentHead,
  useLocation,
} from '@builder.io/qwik-city';
import { JSX } from '@builder.io/qwik/jsx-runtime';

/**
 * The RouterHead component is placed inside of the document `<head>` element.
 */
const metaMapper = (m: DocumentMeta) => <meta key={m.key} {...m} />;
const linkMapper: (l: DocumentLink) => JSX.Element = (l: DocumentLink) => (
  <link key={l.key} {...l} />
);
const styleMapper: (s: DocumentStyle) => JSX.Element = (s: DocumentStyle) => (
  <style key={s.key} {...s.props} dangerouslySetInnerHTML={s.style} />
);
export const RouterHead = component$(() => {
  const head: Required<Required<DocumentHeadValue>> = useDocumentHead();
  const loc: RouteLocation = useLocation();
  const LINK_REL_CANONICAL = 'canonical';
  const META_NAME_VIEWPORT = 'viewport';
  const META_CONTENT = 'width=device-width, initial-scale=1.0';
  const headDocumentMeta: ReadonlyArray<DocumentMeta> = head.meta;
  const headDocumentLink: ReadonlyArray<DocumentLink> = head.links;
  const headDocumentStyle: ReadonlyArray<DocumentStyle> = head.styles;
  return (
    <>
      <title>{head.title}</title>

      <link rel={LINK_REL_CANONICAL} href={loc.url.href} />
      <meta name={META_NAME_VIEWPORT} content={META_CONTENT} />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

      {headDocumentMeta.map<JSX.Element>(metaMapper)}

      {headDocumentLink.map<JSX.Element>(linkMapper)}

      {headDocumentStyle.map<JSX.Element>(styleMapper)}
    </>
  );
});
