export type MenuItem = {
  name: string;
  link: string;
};

const MenuItems: MenuItem[] = [
  { name: 'Home', link: '/' },
  { name: 'Blog', link: '/blog' },
  { name: 'About', link: '/about' },
  { name: 'Contact', link: '/contact' },
];

export default MenuItems;
