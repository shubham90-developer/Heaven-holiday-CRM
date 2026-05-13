import logo from "@/assets/images/logo.png";
import Link from "next/link";
import Image from "next/image";

const LogoBox = () => {
  return (
    <Link href="/" className="logo">
      <span className="logo-light">
        <span className="logo-lg">
          <Image src={logo} width={100} height={200} alt="logo" />
        </span>

        <span className="logo-sm">
          <Image src={logo} width={40} height={40} alt="small logo" />
        </span>
      </span>

      <span className="logo-dark">
        <span className="logo-lg">
          <Image src={logo} width={100} height={90} alt="dark logo" />
        </span>

        <span className="logo-sm">
          <Image src={logo} width={40} height={40} alt="small logo" />
        </span>
      </span>
    </Link>
  );
};

export default LogoBox;
