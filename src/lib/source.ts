import { docs } from '@/.source';
import { loader } from 'fumadocs-core/source';
import { createElement } from 'react';
import { icons } from 'lucide-react';
import PyrodactylLogo from '@/components/ui/PyrodactylLogo';

// `loader()` also assign a URL to your pages
// See https://fumadocs.vercel.app/docs/headless/source-api for more info
export const source = loader({
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),
  icon(icon) {
    if (!icon) {
      return
    }
    if (icon == "pyrodactyl") {
      return PyrodactylLogo();
    }

    if (icon in icons) return createElement(icons[icon as keyof typeof icons]);
  },
});

