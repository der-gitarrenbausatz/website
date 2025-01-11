import { getPermalink, getBlogPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Übersicht',
      href: getPermalink('/'),
    },
    {
      text: 'Blog',
      href: getBlogPermalink(),
    },
  ]
};

export const footerData = {
  links: [],
  secondaryLinks: [
    { text: 'Kontakt', href: getPermalink('/contact') },
    { text: 'Impressum', href: getPermalink('/terms') },
    { text: 'Datenschutz', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: 'https://www.instagram.com/dergitarrenbausatz/' },
    { ariaLabel: 'LinkedIn', icon: 'tabler:brand-linkedin', href: '#' },
  ],
};
