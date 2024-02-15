import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Avatar } from "@nextui-org/react";
import '../index.css'
import { VistaMart } from './../assets/VistaMart';
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate()

  const auth = localStorage.getItem('authenticatedUser');
  const userData = JSON.parse(auth)

  const menuItems = auth ? [
    {
      name: "Home",
      link: '/'
    },
    {
      name: "Add Products",
      link: '/addProduct'
    },
    {
      name: "Products",
      link: '/products'
    }
  ] : [
    {
      name: "Login",
      link: '/login'
    }
  ]

  const logOutUser = () => {
    localStorage.clear();
    navigate('/signup');
  }


  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} isBordered>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link className="cursor-pointer" onClick={() => toast('Hey! This is Vista Mart', {
            description: "Here you can sell and buy products."
          })}>
            <VistaMart // color='#47143D'
            />
            <p className="font-bold text-inherit hidden sm:block">Vista Mart</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>
      {
        auth &&
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="/">
              Home
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/addProduct">
              Add Product
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/products">
              Products
            </Link>
          </NavbarItem>
        </NavbarContent>
      }
      <NavbarContent justify="end">
        {
          !auth ? <React.Fragment>
            <NavbarItem className="hidden md:flex">
              <Link href="/login">Login</Link>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} className="font-semibold text-primary-500" href="/signup" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          </React.Fragment> :
            <React.Fragment>
              <NavbarItem>
                <Avatar src={userData.image} name={userData.name} />
              </NavbarItem>
              <NavbarItem className="hidden sm:block">
                <Button className="font-semibold text-primary-500" variant="light"
                  onClick={logOutUser}>
                  Sign out
                </Button>
              </NavbarItem>
            </React.Fragment>
        }
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              href={item.link}
              size="lg"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
        {
          auth &&
          <NavbarMenuItem>
            <Link
              color={"danger"}
              className="w-full"
              size="lg"
              onClick={logOutUser}
            >
              Sign Out
            </Link>
          </NavbarMenuItem>
        }
      </NavbarMenu>
    </Navbar>
  )
}

export default Header