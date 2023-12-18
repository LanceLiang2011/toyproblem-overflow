import Link from 'next/link';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Input
} from '@nextui-org/react';
import { CiSearch } from 'react-icons/ci';
import HeaderAuth from '@/components/header-auth';

export default function Header() {
  return (
    <Navbar className="shadow mb-6">
      <NavbarBrand>
        <Link href="/" className="font-bold font-mono text-xl">
          ToyProblem Overflow
        </Link>
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavbarItem>
          <Input placeholder="Search..." startContent={<CiSearch />} />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <HeaderAuth />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
